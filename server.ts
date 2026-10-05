import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Server-side persistent storage directory
const DATA_DIR = path.join(__dirname, 'data');
const VISITORS_FILE = path.join(DATA_DIR, 'visitors.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

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
