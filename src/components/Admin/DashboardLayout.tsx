import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FolderKanban, BookOpen, Layers, User, MessageSquare, Settings, Globe, Award, ExternalLink, LogOut } from 'lucide-react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { cmsService } from '../../services/cms';

export const ADMIN_IMAGE_URL = '/assets/images/mushahid_admin_profile.jpg';

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminAvatar, setAdminAvatar] = useState(ADMIN_IMAGE_URL);

  useEffect(() => {
    const loadProfileImg = async () => {
      try {
        const data = await cmsService.fetchData('profiles');
        if (data && data[0] && data[0].avatarUrl) {
          const url = data[0].avatarUrl;
          setAdminAvatar(url.includes('i.pinimg.com') ? ADMIN_IMAGE_URL : url);
        }
      } catch (e) {
        setAdminAvatar(ADMIN_IMAGE_URL);
      }
    };
    loadProfileImg();
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Hero Section', path: '/admin/hero', icon: Globe },
    { name: 'About Me', path: '/admin/about', icon: User },
    { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { name: 'Skills', path: '/admin/skills', icon: BookOpen },
    { name: 'Services', path: '/admin/services', icon: Layers },
    { name: 'Testimonials', path: '/admin/testimonials', icon: Award },
    { name: 'Contact Messages', path: '/admin/messages', icon: MessageSquare },
    { name: 'Website Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A3D22] text-white flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <img
            src={adminAvatar || ADMIN_IMAGE_URL}
            alt="Mushahid Hussain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = ADMIN_IMAGE_URL;
            }}
            className="w-11 h-11 rounded-full object-cover border-2 border-[#50E364] shadow-sm"
          />
          <div>
            <h1 className="text-sm font-bold text-white leading-tight">Mushahid Hussain</h1>
            <p className="text-xs text-[#50E364] font-medium">Web Developer</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm ${location.pathname === item.path ? 'bg-[#50E364] text-[#0A3D22] font-bold shadow-md' : 'hover:bg-white/10 text-gray-200'}`}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={async () => { if (supabase) await supabase.auth.signOut(); navigate('/admin/login'); }}
            className="flex items-center gap-3 px-4 py-2.5 w-full hover:bg-white/10 rounded-xl text-sm font-bold text-red-300 transition-colors cursor-pointer"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-800">
            {navItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
             <Link
               to="/"
               className="inline-flex items-center gap-2 text-xs font-bold text-[#0A3D22] bg-[#EAF9EE] hover:bg-[#d5f5db] px-4 py-2 rounded-full border border-[#50E364]/40 transition-all cursor-pointer shadow-2xs"
             >
               <ExternalLink size={14} />
               <span>Live Preview</span>
             </Link>
             
             <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
               <img
                 src={adminAvatar || ADMIN_IMAGE_URL}
                 alt="Admin Avatar"
                 referrerPolicy="no-referrer"
                 onError={(e) => {
                   e.currentTarget.src = ADMIN_IMAGE_URL;
                 }}
                 className="w-9 h-9 rounded-full object-cover border border-[#50E364]"
               />
               <div className="text-left">
                 <div className="text-xs font-bold text-gray-900">Mushahid Hussain</div>
                 <div className="text-[10px] text-gray-500 font-semibold">Administrator</div>
               </div>
             </div>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
};
