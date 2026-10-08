import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));

// Server-side persistent storage directory
const DATA_DIR = path.join(__dirname, 'data');
const VISITORS_FILE = path.join(DATA_DIR, 'visitors.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const CHAT_FILE = path.join(DATA_DIR, 'chat_conversations.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// ==========================================
// LIVE CHAT SYSTEM STORAGE & HELPERS
// ==========================================
interface ChatAttachment {
  name: string;
  url: string;
  type: 'image' | 'file';
  size?: number;
}

interface ChatMessage {
  id: string;
  sender: 'client' | 'owner';
  senderName: string;
  text: string;
  timestamp: string;
  timeFormatted: string;
  read: boolean;
  attachment?: ChatAttachment;
}

interface ChatConversation {
  id: string; // sessionId
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

// Seed sample initial conversation if file doesn't exist
if (!fs.existsSync(CHAT_FILE)) {
  const initialSeed: ChatConversation[] = [
    {
      id: 'chat_sample_101',
      clientName: 'Sarah Jenkins',
      clientEmail: 'sarah.jenkins.hr@gmail.com',
      clientDevice: 'Desktop (Chrome)',
      clientIp: '127.0.0.1',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 3.5).toISOString(),
      clientOnline: false,
      ownerTyping: false,
      clientTyping: false,
      unreadByOwner: 0,
      unreadByClient: 0,
      messages: [
        {
          id: 'msg_seed_1',
          sender: 'client',
          senderName: 'Sarah Jenkins',
          text: 'Hi Mushahid! We have an enterprise Next.js dashboard project and loved your portfolio.',
          timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
          timeFormatted: '02:30 PM',
          read: true,
        },
        {
          id: 'msg_seed_2',
          sender: 'owner',
          senderName: 'Mushahid Hussain',
          text: '👋 Hi Sarah! Thank you for reaching out. I would love to hear more about your dashboard requirements and timeline.',
          timestamp: new Date(Date.now() - 3600000 * 3.8).toISOString(),
          timeFormatted: '02:35 PM',
          read: true,
        },
        {
          id: 'msg_seed_3',
          sender: 'client',
          senderName: 'Sarah Jenkins',
          text: 'Awesome, we will review your CV and set up a consultation call shortly!',
          timestamp: new Date(Date.now() - 3600000 * 3.5).toISOString(),
          timeFormatted: '02:40 PM',
          read: true,
        },
      ],
    },
  ];
  saveChatConversationsToFile(initialSeed);
}

// Active Server-Sent Events (SSE) connections for live real-time messaging
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

// Helper to get project inquiries
const getInquiriesFromFile = (): any[] => {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const data = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading inquiries file:', err);
  }
  return [];
};

const saveInquiriesToFile = (inquiries: any[]) => {
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));
  } catch (err) {
    console.error('Error writing inquiries file:', err);
  }
};

// Seed sample inquiry if empty
if (!fs.existsSync(INQUIRIES_FILE)) {
  const initialInquiries = [
    {
      id: 'inq_1001',
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins.hr@gmail.com',
      projectType: 'Frontend (React/Next.js)',
      budget: '$3,000 - $7,000',
      message: 'Looking for a senior React/TypeScript engineer for building a high-performance customer dashboard.',
      timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
      dateFormatted: 'Oct 4, 2026, 03:30 PM',
      device: 'Desktop Browser',
      ip: '127.0.0.1',
      status: 'new',
    },
  ];
  saveInquiriesToFile(initialInquiries);
}

// Seed initial visitors if file doesn't exist
if (!fs.existsSync(VISITORS_FILE)) {
  const initialVisitors = [
    {
      id: 'v_seed_1',
      name: 'Alexander Wright',
      email: 'alex.wright.tech@gmail.com',
      company: 'VentureScale Global',
      purpose: 'Hiring / Web Project Consultation',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      dateStr: 'Oct 3, 2026, 02:15 PM',
      device: 'Desktop Browser (Chrome)',
      location: 'Islamabad, Pakistan',
      ip: '127.0.0.1',
    },
    {
      id: 'v_seed_2',
      name: 'Farhan Tariq',
      email: 'farhan.tariq99@gmail.com',
      company: 'InnovateX Media',
      purpose: 'Freelance / SaaS Development Inquiry',
      timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
      dateStr: 'Oct 3, 2026, 11:30 AM',
      device: 'Mobile (Safari)',
      location: 'Lahore, Pakistan',
      ip: '127.0.0.1',
    },
    {
      id: 'v_seed_3',
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins.hr@gmail.com',
      company: 'Apex Talent Recruitment',
      purpose: 'Recruiter / Full-time Job Opportunity',
      timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
      dateStr: 'Oct 2, 2026, 04:45 PM',
      device: 'Desktop (macOS)',
      location: 'London, UK',
      ip: '127.0.0.1',
    }
  ];
  fs.writeFileSync(VISITORS_FILE, JSON.stringify(initialVisitors, null, 2));
}

// Helper to read visitors from server file
const getVisitorsFromFile = (): any[] => {
  try {
    if (fs.existsSync(VISITORS_FILE)) {
      const data = fs.readFileSync(VISITORS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading visitors file:', err);
  }
  return [];
};

// Helper to write visitors to server file
const saveVisitorsToFile = (visitors: any[]) => {
  try {
    fs.writeFileSync(VISITORS_FILE, JSON.stringify(visitors, null, 2));
  } catch (err) {
    console.error('Error writing visitors file:', err);
  }
};

// Helper to get messages
const getMessagesFromFile = (): any[] => {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const data = fs.readFileSync(MESSAGES_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading messages file:', err);
  }
  return [];
};

const saveMessagesToFile = (messages: any[]) => {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
  } catch (err) {
    console.error('Error writing messages file:', err);
  }
};

// ==========================================
// BACKEND API ROUTES
// ==========================================

// 1. POST /api/visitors -> Record a new visitor with Gmail ID
app.post('/api/visitors', (req: Request, res: Response) => {
  try {
    const { name, email, company, purpose } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Name and Email are required' });
    }

    const now = new Date();
    const userAgent = req.headers['user-agent'] || '';
    const isMobile = /mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(userAgent);
    const deviceType = isMobile ? 'Mobile Device' : 'Desktop Browser';
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Online';

    const newVisitor = {
      id: `v_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      company: company ? String(company).trim() : 'Individual Visitor',
      purpose: purpose ? String(purpose).trim() : 'Portfolio Exploration',
      timestamp: now.toISOString(),
      dateStr: now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      device: deviceType,
      location: 'Verified Visitor',
      ip: typeof clientIp === 'string' ? clientIp.split(',')[0] : 'Online',
    };

    const currentVisitors = getVisitorsFromFile();
    // Update or insert visitor
    const filtered = currentVisitors.filter((v: any) => v.email !== newVisitor.email);
    const updated = [newVisitor, ...filtered];
    saveVisitorsToFile(updated);

    console.log(`[BACKEND LOG] 👤 New Visitor Checked In: ${newVisitor.name} (${newVisitor.email}) for "${newVisitor.purpose}"`);

    return res.status(201).json({
      success: true,
      message: 'Visitor registered successfully in server database',
      visitor: newVisitor,
      totalVisitors: updated.length,
    });
  } catch (error: any) {
    console.error('Backend visitor save error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// 2. GET /api/visitors -> Fetch all recorded visitors for admin
app.get('/api/visitors', (_req: Request, res: Response) => {
  try {
    const visitors = getVisitorsFromFile();
    return res.json({
      success: true,
      visitors,
      totalCount: visitors.length,
      gmailCount: visitors.filter((v: any) => v.email && v.email.includes('@gmail.com')).length,
    });
  } catch (error: any) {
    console.error('Backend fetch error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// 3. DELETE /api/visitors/:id -> Delete a specific visitor
app.delete('/api/visitors/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const current = getVisitorsFromFile();
    const updated = current.filter((v: any) => v.id !== id);
    saveVisitorsToFile(updated);
    return res.json({ success: true, message: 'Visitor deleted', remaining: updated.length });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// 4. DELETE /api/visitors -> Clear all visitors
app.delete('/api/visitors', (_req: Request, res: Response) => {
  try {
    saveVisitorsToFile([]);
    return res.json({ success: true, message: 'All visitor logs cleared' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// 5. POST /api/admin/verify-pin -> Validate Admin PIN
app.post('/api/admin/verify-pin', (req: Request, res: Response) => {
  const { pin } = req.body;
  const validPins = ['7860', '1234', process.env.ADMIN_PIN].filter(Boolean);
  if (validPins.includes(String(pin).trim())) {
    return res.json({ success: true, authenticated: true });
  }
  return res.status(401).json({ success: false, authenticated: false, message: 'Invalid Admin PIN' });
});

// 6. Direct Project Inquiry API (POST /api/inquiries)
app.post('/api/inquiries', (req: Request, res: Response) => {
  try {
    const { name, email, projectType, budget, message, phone } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required fields (Name, Email, and Project Details)',
      });
    }

    const now = new Date();
    const userAgent = req.headers['user-agent'] || '';
    const isMobile = /mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(userAgent);
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

    const newInquiry = {
      id: `inq_${Date.now()}`,
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : '',
      projectType: projectType ? String(projectType).trim() : 'Full-Stack Web App',
      budget: budget ? String(budget).trim() : '$1,000 - $3,000',
      message: String(message).trim(),
      timestamp: now.toISOString(),
      dateFormatted: now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      device: isMobile ? 'Mobile Device' : 'Desktop Browser',
      ip: typeof clientIp === 'string' ? clientIp.split(',')[0] : '127.0.0.1',
      status: 'new',
    };

    const inquiries = getInquiriesFromFile();
    inquiries.unshift(newInquiry);
    saveInquiriesToFile(inquiries);

    console.log(`[BACKEND LOG] 🚀 New Project Inquiry received from ${newInquiry.name} (${newInquiry.email}) | Type: ${newInquiry.projectType} | Budget: ${newInquiry.budget}`);

    return res.status(201).json({
      success: true,
      message: 'Your project inquiry has been delivered directly to Mushahid Hussain. Thank you!',
      inquiry: newInquiry,
      referenceId: newInquiry.id,
    });
  } catch (error: any) {
    console.error('Backend inquiry error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error while saving inquiry' });
  }
});

// 7. GET /api/inquiries -> Fetch all received inquiries
app.get('/api/inquiries', (_req: Request, res: Response) => {
  try {
    const inquiries = getInquiriesFromFile();
    return res.json({
      success: true,
      inquiries,
      totalCount: inquiries.length,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch inquiries' });
  }
});

// 8. Contact Form API (POST /api/contact)
app.post('/api/contact', (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required' });
    }

    const newMessage = {
      id: `msg_${Date.now()}`,
      name: String(name).trim(),
      email: String(email).trim(),
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message: String(message).trim(),
      timestamp: new Date().toISOString(),
    };

    const messages = getMessagesFromFile();
    messages.unshift(newMessage);
    saveMessagesToFile(messages);

    console.log(`[BACKEND LOG] 📩 New Contact Message from ${name} (${email})`);
    return res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to save message' });
  }
});

// ==========================================
// REAL-TIME LIVE CHAT API ENDPOINTS
// ==========================================

// 1. GET /api/chat/stream -> Real-time Server-Sent Events (SSE)
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

  // Send initial handshake
  res.write(`event: connected\ndata: ${JSON.stringify({ status: 'connected', time: Date.now() })}\n\n`);

  // Heartbeat every 25 seconds to keep connection alive
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

// 2. POST /api/chat/init -> Initialize client session or retrieve conversation
app.post('/api/chat/init', (req: Request, res: Response) => {
  try {
    let { sessionId, clientName, clientEmail, initialMessage } = req.body;
    const conversations = getChatConversationsFromFile();

    if (!sessionId) {
      sessionId = `chat_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    }

    const now = new Date();
    const timeFormatted = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const userAgent = req.headers['user-agent'] || '';
    const isMobile = /mobile|iphone|ipod|android/i.test(userAgent);
    const clientDevice = isMobile ? 'Mobile' : 'Desktop';
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

    let conv = conversations.find((c) => c.id === sessionId);

    if (conv) {
      // Update details if passed
      if (clientName && clientName.trim()) conv.clientName = clientName.trim();
      if (clientEmail && clientEmail.trim()) conv.clientEmail = clientEmail.trim().toLowerCase();
      conv.clientOnline = true;
      conv.updatedAt = now.toISOString();
    } else {
      // Create new conversation with Welcome message from Mushahid
      const welcomeMessage: ChatMessage = {
        id: `msg_welcome_${Date.now()}`,
        sender: 'owner',
        senderName: 'Mushahid Hussain',
        text: '👋 Hi! Welcome to my portfolio. How can I help you?',
        timestamp: now.toISOString(),
        timeFormatted,
        read: false,
      };

      conv = {
        id: sessionId,
        clientName: (clientName && clientName.trim()) || 'Visitor',
        clientEmail: (clientEmail && clientEmail.trim()) || '',
        clientDevice,
        clientIp: typeof clientIp === 'string' ? clientIp.split(',')[0] : '127.0.0.1',
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        clientOnline: true,
        ownerTyping: false,
        clientTyping: false,
        unreadByOwner: 0,
        unreadByClient: 1,
        messages: [welcomeMessage],
      };

      conversations.unshift(conv);
    }

    // If an initial quick message was supplied, append it
    if (initialMessage && String(initialMessage).trim()) {
      const clientMsg: ChatMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        sender: 'client',
        senderName: conv.clientName || 'Client',
        text: String(initialMessage).trim(),
        timestamp: new Date().toISOString(),
        timeFormatted,
        read: false,
      };
      conv.messages.push(clientMsg);
      conv.unreadByOwner += 1;
      conv.updatedAt = new Date().toISOString();
      broadcastChatEvent('new_message', { sessionId: conv.id, message: clientMsg, conversation: conv });
    }

    saveChatConversationsToFile(conversations);

    return res.json({
      success: true,
      conversation: conv,
      sessionId: conv.id,
    });
  } catch (err: any) {
    console.error('Chat init error:', err);
    return res.status(500).json({ success: false, error: 'Failed to initialize chat' });
  }
});

// 3. GET /api/chat/conversations/:sessionId -> Get conversation details
app.get('/api/chat/conversations/:sessionId', (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const conversations = getChatConversationsFromFile();
    const conv = conversations.find((c) => c.id === sessionId);

    if (!conv) {
      return res.status(404).json({ success: false, error: 'Conversation not found' });
    }

    return res.json({
      success: true,
      conversation: conv,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'Failed to fetch conversation' });
  }
});

// 4. POST /api/chat/messages/:sessionId -> Send a message (Client or Owner)
app.post('/api/chat/messages/:sessionId', (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { sender, senderName, text, attachment } = req.body;

    if (!text && !attachment) {
      return res.status(400).json({ success: false, error: 'Message text or attachment is required' });
    }

    const conversations = getChatConversationsFromFile();
    let conv = conversations.find((c) => c.id === sessionId);

    const now = new Date();
    const timeFormatted = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    if (!conv) {
      // Auto-create if somehow missing
      conv = {
        id: sessionId,
        clientName: sender === 'client' ? (senderName || 'Client') : 'Visitor',
        clientEmail: '',
        clientDevice: 'Web',
        clientIp: '127.0.0.1',
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        clientOnline: true,
        ownerTyping: false,
        clientTyping: false,
        unreadByOwner: 0,
        unreadByClient: 0,
        messages: [],
      };
      conversations.unshift(conv);
    }

    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      sender: sender === 'owner' ? 'owner' : 'client',
      senderName: senderName || (sender === 'owner' ? 'Mushahid Hussain' : conv.clientName || 'Client'),
      text: (text || '').trim(),
      timestamp: now.toISOString(),
      timeFormatted,
      read: false,
      attachment: attachment || undefined,
    };

    conv.messages.push(newMessage);
    conv.updatedAt = now.toISOString();

    if (sender === 'client') {
      conv.unreadByOwner += 1;
      conv.clientTyping = false;
    } else {
      conv.unreadByClient += 1;
      conv.ownerTyping = false;
    }

    // Move updated conversation to top of list
    const index = conversations.indexOf(conv);
    if (index > 0) {
      conversations.splice(index, 1);
      conversations.unshift(conv);
    }

    saveChatConversationsToFile(conversations);

    // Broadcast instant real-time message via SSE
    broadcastChatEvent('new_message', {
      sessionId,
      message: newMessage,
      conversation: conv,
    });

    console.log(`[LIVE CHAT] 💬 [${newMessage.sender.toUpperCase()}] to (${conv.clientName}): ${newMessage.text.slice(0, 50)}`);

    return res.status(201).json({
      success: true,
      message: newMessage,
      conversation: conv,
    });
  } catch (err: any) {
    console.error('Chat message send error:', err);
    return res.status(500).json({ success: false, error: 'Failed to send message' });
  }
});

// 5. POST /api/chat/typing/:sessionId -> Update typing status
app.post('/api/chat/typing/:sessionId', (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { isTyping, who } = req.body;

    const conversations = getChatConversationsFromFile();
    const conv = conversations.find((c) => c.id === sessionId);

    if (conv) {
      if (who === 'owner') {
        conv.ownerTyping = Boolean(isTyping);
      } else {
        conv.clientTyping = Boolean(isTyping);
      }
      broadcastChatEvent('typing', { sessionId, who, isTyping: Boolean(isTyping) });
    }

    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
});

// 6. POST /api/chat/read/:sessionId -> Mark messages as read
app.post('/api/chat/read/:sessionId', (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { reader } = req.body; // 'client' or 'owner'

    const conversations = getChatConversationsFromFile();
    const conv = conversations.find((c) => c.id === sessionId);

    if (conv) {
      if (reader === 'owner') {
        conv.unreadByOwner = 0;
        conv.messages.forEach((m) => {
          if (m.sender === 'client') m.read = true;
        });
      } else {
        conv.unreadByClient = 0;
        conv.messages.forEach((m) => {
          if (m.sender === 'owner') m.read = true;
        });
      }
      saveChatConversationsToFile(conversations);
      broadcastChatEvent('read_receipt', { sessionId, reader });
    }

    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
});

// 7. GET /api/chat/admin/conversations -> Fetch all conversations for Owner Panel
app.get('/api/chat/admin/conversations', (req: Request, res: Response) => {
  try {
    const search = ((req.query.search as string) || '').toLowerCase().trim();
    let conversations = getChatConversationsFromFile();

    if (search) {
      conversations = conversations.filter(
        (c) =>
          c.clientName.toLowerCase().includes(search) ||
          c.clientEmail.toLowerCase().includes(search) ||
          c.messages.some((m) => m.text.toLowerCase().includes(search))
      );
    }

    const totalUnread = conversations.reduce((acc, c) => acc + (c.unreadByOwner || 0), 0);

    return res.json({
      success: true,
      conversations,
      totalCount: conversations.length,
      totalUnread,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to fetch conversations' });
  }
});

// 8. DELETE /api/chat/admin/conversations/:sessionId -> Delete conversation
app.delete('/api/chat/admin/conversations/:sessionId', (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    let conversations = getChatConversationsFromFile();
    conversations = conversations.filter((c) => c.id !== sessionId);
    saveChatConversationsToFile(conversations);

    broadcastChatEvent('conversation_deleted', { sessionId });
    return res.json({ success: true, message: 'Conversation deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to delete conversation' });
  }
});

// 9. POST /api/chat/admin/verify -> Verify Owner PIN
app.post('/api/chat/admin/verify', (req: Request, res: Response) => {
  const { pin } = req.body;
  const validPins = ['7860', '1234', process.env.ADMIN_PIN].filter(Boolean);
  if (validPins.includes(String(pin).trim())) {
    return res.json({ success: true, authenticated: true });
  }
  return res.status(401).json({ success: false, authenticated: false, message: 'Invalid Owner Access PIN' });
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

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Full-Stack Backend Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
