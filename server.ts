import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

// Initialize Gemini AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const io = new Server(httpServer, {
  cors: { origin: '*' }
});
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Static uploads & assets directory
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
app.use('/uploads', express.static(UPLOADS_DIR));
app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));

// Server-side storage directory (for chat fallbacks)
const DATA_DIR = path.join(__dirname, 'data');
const CHAT_FILE = path.join(DATA_DIR, 'chat_conversations.json');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// ==========================================
// LIVE CHAT SYSTEM STORAGE & HELPERS
// ==========================================
interface ChatMessage {
  id: string;
  sender: 'client' | 'owner';
  senderName: string;
  text: string;
  timestamp: string;
  timeFormatted: string;
  read: boolean;
}

interface ChatConversation {
  id: string;
  clientName: string;
  clientEmail: string;
  clientDevice: string;
  clientIp: string;
  createdAt: string;
  updatedAt: string;
  clientOnline: boolean;
  ownerTyping: boolean;
  clientTyping: boolean;
  unreadByOwner: number;
  unreadByClient: number;
  messages: ChatMessage[];
}

const getChatConversationsFromFile = (): ChatConversation[] => {
  try {
    if (fs.existsSync(CHAT_FILE)) {
      const data = fs.readFileSync(CHAT_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading chat conversations file:', err);
  }
  return [];
};

const saveChatConversationsToFile = (conversations: ChatConversation[]) => {
  try {
    fs.writeFileSync(CHAT_FILE, JSON.stringify(conversations, null, 2));
  } catch (err) {
    console.error('Error writing chat conversations file:', err);
  }
};

// SSE connections
const sseClients = new Set<{ res: Response; sessionId?: string; isOwner?: boolean }>();
const broadcastChatEvent = (event: string, payload: any) => {
  const messageStr = `event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`;
  sseClients.forEach((client) => {
    try {
      client.res.write(messageStr);
    } catch (e) {
      sseClients.delete(client);
    }
  });
};

// ==========================================
// BACKEND API ROUTES
// ==========================================

// Chat Stream
app.get('/api/chat/stream', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  const sessionId = req.query.sessionId as string | undefined;
  const isOwner = req.query.isOwner === 'true';

  const clientItem = { res, sessionId, isOwner };
  sseClients.add(clientItem);

  res.write(`event: connected\ndata: ${JSON.stringify({ status: 'connected', time: Date.now() })}\n\n`);

  const heartbeatInterval = setInterval(() => {
    try {
      res.write(`event: ping\ndata: ${JSON.stringify({ ping: true })}\n\n`);
    } catch (e) {
      clearInterval(heartbeatInterval);
      sseClients.delete(clientItem);
    }
  }, 25000);

  req.on('close', () => {
    clearInterval(heartbeatInterval);
    sseClients.delete(clientItem);
  });
});

// Chat Init
app.post('/api/chat/init', (req: Request, res: Response) => {
  try {
    let { sessionId, clientName, clientEmail, initialMessage } = req.body;
    const conversations = getChatConversationsFromFile();

    if (!sessionId) {
      sessionId = `chat_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    }

    const now = new Date();
    const timeFormatted = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    let conv = conversations.find((c) => c.id === sessionId);

    if (conv) {
      if (clientName) conv.clientName = clientName.trim();
      conv.clientOnline = true;
      conv.updatedAt = now.toISOString();
    } else {
      conv = {
        id: sessionId,
        clientName: clientName || 'Visitor',
        clientEmail: clientEmail || '',
        clientDevice: 'Web',
        clientIp: (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1') as string,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        clientOnline: true,
        ownerTyping: false,
        clientTyping: false,
        unreadByOwner: 0,
        unreadByClient: 1,
        messages: [{
          id: `msg_welcome_${Date.now()}`,
          sender: 'owner',
          senderName: 'Mushahid Hussain',
          text: '👋 Hi! Welcome to my portfolio. How can I help you?',
          timestamp: now.toISOString(),
          timeFormatted,
          read: false,
        }],
      };
      conversations.unshift(conv);
    }

    if (initialMessage) {
      const clientMsg: ChatMessage = {
        id: `msg_${Date.now()}`,
        sender: 'client',
        senderName: conv.clientName,
        text: initialMessage,
        timestamp: new Date().toISOString(),
        timeFormatted,
        read: false,
      };
      conv.messages.push(clientMsg);
      conv.unreadByOwner += 1;
      broadcastChatEvent('new_message', { sessionId: conv.id, message: clientMsg, conversation: conv });
    }

    saveChatConversationsToFile(conversations);
    return res.json({ success: true, conversation: conv, sessionId: conv.id });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
});

// Chat Messages
app.post('/api/chat/messages/:sessionId', (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { sender, text } = req.body;
    const conversations = getChatConversationsFromFile();
    const conv = conversations.find((c) => c.id === sessionId);

    if (!conv) return res.status(404).json({ success: false });

    const now = new Date();
    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender,
      senderName: sender === 'owner' ? 'Mushahid Hussain' : conv.clientName,
      text: text.trim(),
      timestamp: now.toISOString(),
      timeFormatted: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };

    conv.messages.push(newMessage);
    conv.updatedAt = now.toISOString();
    if (sender === 'client') conv.unreadByOwner += 1; else conv.unreadByClient += 1;

    saveChatConversationsToFile(conversations);
    broadcastChatEvent('new_message', { sessionId, message: newMessage, conversation: conv });

    return res.status(201).json({ success: true, message: newMessage });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
});

// AI Chat Endpoint
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemInstruction = `
      You are "Mushahid AI Assistant", the official representative for Mushahid Hussain, a professional Full-Stack Web Developer.
      
      About Mushahid:
      - Name: Mushahid Hussain
      - Role: Full-Stack Web Developer & Engineer
      - Location: Pakistan
      - Skills: React, Next.js, TypeScript, Node.js, Tailwind CSS, PostgreSQL, Supabase.
      - Experience: 8+ years, 50+ production web apps built.
      - Services: Custom Website Development, SaaS Platforms, E-Commerce Stores, API Development, UI/UX Optimization.
      - WhatsApp: +923490726485 (Direct contact).
      
      Guidelines:
      - Be professional, friendly, and helpful.
      - Answer questions about Mushahid's skills, experience, and services.
      - If a visitor wants a website, ask for their project requirements (niche, features, budget).
      - Always offer the WhatsApp link (+923490726485) for serious business inquiries.
      - You can reply in English, Urdu, or Roman Urdu depending on the user's language.
      - Keep responses concise and focused on converting the visitor into a client.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message,
      config: {
        systemInstruction,
      },
    });

    return res.json({ reply: response.text });
  } catch (err: any) {
    console.error('AI Chat Error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Admin stats (simplified)
app.get('/api/admin/server-status', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    backend: 'Vite + Express (Supabase Synced)',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// ==========================================
// Vite Middleware & Server Initialization
// ==========================================
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

startServer();
