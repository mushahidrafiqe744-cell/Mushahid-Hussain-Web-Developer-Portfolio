import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) { alert('Supabase not configured'); return; }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else navigate('/admin');
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="p-8 bg-white rounded-2xl shadow-xl w-96 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-[#11261B]">Admin Login</h2>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 mb-4 rounded-lg border border-gray-200" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full p-3 mb-6 rounded-lg border border-gray-200" required />
        <button type="submit" className="w-full bg-[#11261B] text-white p-3 rounded-lg font-bold">Sign In</button>
      </form>
    </div>
  );
};
