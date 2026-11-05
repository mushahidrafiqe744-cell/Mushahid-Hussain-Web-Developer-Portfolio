import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Phone, ExternalLink, Sparkles, Layout, Zap, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export const MushahidAIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: '👋 Assalam-o-Alaikum! I am Mushahid AI Assistant. How can I help you today with your web development project?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim() }),
      });

      const data = await response.json();
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.reply || "I'm sorry, I encountered an error. Please try again or contact Mushahid on WhatsApp.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: "I am having trouble connecting to my brain. Please check your internet or contact Mushahid directly on WhatsApp (+923490726485).",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { label: 'Get a Website', icon: Layout, action: 'I want to build a new website. What is the process?' },
    { label: 'View Services', icon: Zap, action: 'What services do you offer?' },
    { label: 'Website Pricing', icon: ShoppingBag, action: 'What are your website packages and pricing?' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-[#11261B] text-[#50E364] shadow-2xl flex items-center justify-center cursor-pointer border-2 border-[#50E364]/20 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#50E364]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-8 h-8" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <MessageCircle className="w-8 h-8" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#11261B] animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh] bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#11261B] p-5 flex items-center justify-between text-white border-b border-[#50E364]/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#50E364] flex items-center justify-center text-[#11261B] shadow-lg">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">Mushahid AI Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Always Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <X className="w-5 h-5 opacity-70" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-[#11261B] text-white rounded-br-none' 
                      : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
                  }`}>
                    {msg.text}
                    <div className={`text-[9px] mt-1.5 opacity-50 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 p-3 rounded-2xl shadow-sm flex gap-1">
                    <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                    <span className="text-xs text-gray-500 font-medium">Mushahid is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer / Input */}
            <div className="p-4 bg-white border-t border-gray-100 space-y-3">
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mb-2">
                {quickActions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(item.action)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-[#11261B] text-[10px] font-bold border border-emerald-100 hover:bg-emerald-100 transition-colors cursor-pointer"
                  >
                    <item.icon className="w-3 h-3 text-emerald-600" />
                    {item.label}
                  </button>
                ))}
                <a
                  href="https://wa.me/923490726485"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold hover:bg-emerald-600 transition-colors cursor-pointer"
                >
                  <Phone className="w-3 h-3" />
                  WhatsApp
                </a>
              </div>

              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about project pricing or services..."
                  className="w-full pl-4 pr-12 py-3 bg-gray-100 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 bg-[#11261B] text-[#50E364] rounded-xl disabled:opacity-50 transition-all hover:scale-105 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[9px] text-center text-gray-400 font-medium italic">
                AI can provide project estimates & answer service queries.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
