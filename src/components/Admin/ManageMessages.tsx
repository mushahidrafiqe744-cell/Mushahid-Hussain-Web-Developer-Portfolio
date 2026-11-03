import React, { useState, useEffect } from 'react';
import { cmsService } from '../../services/cms';
import { Trash2, MessageSquare } from 'lucide-react';

export const ManageMessages: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => { loadMessages(); }, []);

  const loadMessages = async () => {
    const data = await cmsService.fetchData('messages');
    setMessages(data || []);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold mb-6">Contact Messages</h2>
      <div className="grid gap-4">
        {messages.map((msg: any) => (
          <div key={msg.id} className="bg-white border rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="font-bold">{msg.name}</p>
              <p className="text-sm text-gray-500">{msg.email}</p>
              <p className="text-sm mt-1">{msg.message}</p>
            </div>
            <button onClick={async () => { await cmsService.deleteData('messages', msg.id); loadMessages(); }} className="text-red-500"><Trash2 size={18}/></button>
          </div>
        ))}
      </div>
    </div>
  );
};
