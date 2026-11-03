import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { LayoutDashboard, FolderKanban, BookOpen, Layers, User, MessageSquare, LogOut } from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      if (!supabase) return;
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
      }
    };
    checkUser();
  }, [navigate]);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { name: 'Skills', path: '/admin/skills', icon: BookOpen },
    { name: 'Services', path: '/admin/services', icon: Layers },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-[#11261B] text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-white/10">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path ? 'bg-[#50E364] text-[#11261B]' : 'hover:bg-white/10'}`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
        </nav>
        <button 
          onClick={async () => { if (supabase) await supabase.auth.signOut(); navigate('/admin/login'); }}
          className="flex items-center gap-3 px-6 py-4 hover:bg-white/10"
        >
          <LogOut size={20} /> Sign Out
        </button>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
