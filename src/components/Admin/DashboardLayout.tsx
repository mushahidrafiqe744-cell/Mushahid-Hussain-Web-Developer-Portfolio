import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FolderKanban, BookOpen, Layers, User, MessageSquare, Settings, Globe, Award, ExternalLink, LogOut, Lock, Briefcase, GraduationCap, Zap, LayoutGrid } from 'lucide-react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { cmsService } from '../../services/cms';
import { AdminLogin } from './AdminLogin';

export const ADMIN_IMAGE_URL = '/assets/images/mushahid_admin_profile.jpg';

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminAvatar, setAdminAvatar] = useState(ADMIN_IMAGE_URL);
  const [dbStatus, setDbStatus] = useState<{ loading: boolean; connected: boolean; message: string }>({
    loading: true,
    connected: false,
    message: 'Testing Supabase connection...',
  });
  const [showDbModal, setShowDbModal] = useState(false);
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(
      sessionStorage.getItem('admin_token') || localStorage.getItem('admin_token')
    );
  });

  const [showSplitPreview, setShowSplitPreview] = useState(false);

  const PATH_TO_SECTION: Record<string, string> = {
    '/admin/hero': 'hero',
    '/admin/about': 'about',
    '/admin/projects': 'projects',
    '/admin/experience': 'experience',
    '/admin/skills': 'skills',
    '/admin/services': 'services',
    '/admin/courses': 'courses',
    '/admin/testimonials': 'testimonials',
    '/admin/why-us': 'why-choose-me',
    '/admin/settings': 'hero',
  };

  const currentSection = PATH_TO_SECTION[location.pathname] || 'hero';
  const previewUrl = `/#${currentSection}`;

  const checkSupabaseStatus = async () => {
    setDbStatus({ loading: true, connected: false, message: 'Testing Supabase...' });
    const res = await cmsService.testConnection();
    setDbStatus({ loading: false, connected: res.connected, message: res.message });
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    checkSupabaseStatus();

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
  }, [isAuthenticated]);

  const handleLogout = async () => {
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {}
    }
    sessionStorage.removeItem('admin_token');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setIsAuthenticated(false);
    navigate('/admin');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Hero Section', path: '/admin/hero', icon: Globe },
    { name: 'About Me', path: '/admin/about', icon: User },
    { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { name: 'Career Journey', path: '/admin/experience', icon: Briefcase },
    { name: 'Skills & Tech', path: '/admin/skills', icon: BookOpen },
    { name: 'Services', path: '/admin/services', icon: Layers },
    { name: 'Certifications', path: '/admin/courses', icon: GraduationCap },
    { name: 'Testimonials', path: '/admin/testimonials', icon: Award },
    { name: 'Value Prop', path: '/admin/why-us', icon: Zap },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
    { name: 'Settings & SEO', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A3D22] text-white flex flex-col shrink-0 overflow-y-auto border-r border-white/5">
        <div className="p-6 flex items-center gap-3 border-b border-white/10 sticky top-0 bg-[#0A3D22] z-10">
          <img
            src={adminAvatar || ADMIN_IMAGE_URL}
            alt="Mushahid Hussain"
            referrerPolicy="no-referrer"
            onError={(e) => { e.currentTarget.src = ADMIN_IMAGE_URL; }}
            className="w-11 h-11 rounded-full object-cover border-2 border-[#50E364] shadow-sm"
          />
          <div>
            <h1 className="text-sm font-bold text-white leading-tight">Mushahid Hussain</h1>
            <p className="text-xs text-[#50E364] font-medium">Web Developer</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1">
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

        <div className="p-4 border-t border-white/10 space-y-2 sticky bottom-0 bg-[#0A3D22]">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 w-full bg-red-500/10 hover:bg-red-500/20 rounded-xl text-sm font-bold text-red-300 transition-colors cursor-pointer border border-red-500/20"
          >
            <LogOut size={18} />
            <span>Lock & Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex justify-between items-center bg-white p-4 border-b border-gray-100 shadow-2xs z-20">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-800">
              {navItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
            </h2>
            
            {/* Supabase Status Indicator Pill */}
            <button
              onClick={() => setShowDbModal(true)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer shadow-2xs ${
                dbStatus.loading
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : dbStatus.connected
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-red-50 text-red-700 border-red-300 hover:bg-red-100'
              }`}
              title="Click to check Supabase connection details"
            >
              <span className={`w-2 h-2 rounded-full ${dbStatus.loading ? 'bg-amber-400 animate-ping' : dbStatus.connected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
              <span>{dbStatus.loading ? 'Testing DB...' : dbStatus.connected ? 'Supabase Connected' : 'DB Disconnected'}</span>
            </button>

            {/* Split View Toggle */}
            <button
              onClick={() => setShowSplitPreview(!showSplitPreview)}
              className={`hidden sm:inline-flex items-center gap-2 text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                showSplitPreview 
                ? 'bg-[#0A3D22] text-[#50E364] border-[#0A3D22]' 
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#0A3D22]'
              }`}
            >
              <LayoutGrid size={12} />
              <span>{showSplitPreview ? 'Close Preview' : 'Split Preview'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
             <Link
               to={previewUrl}
               className="inline-flex items-center gap-2 text-xs font-bold text-[#0A3D22] bg-[#EAF9EE] hover:bg-[#d5f5db] px-4 py-2 rounded-full border border-[#50E364]/40 transition-all cursor-pointer shadow-2xs"
             >
               <ExternalLink size={14} />
               <span>Full Preview</span>
             </Link>

             <button
               onClick={handleLogout}
               title="Lock admin session immediately"
               className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-red-600 bg-gray-100 hover:bg-red-50 px-3.5 py-2 rounded-full border border-gray-200 transition-all cursor-pointer"
             >
               <Lock size={13} />
               <span>Lock</span>
             </button>
             
             <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
               <img
                 src={adminAvatar || ADMIN_IMAGE_URL}
                 alt="Admin Avatar"
                 referrerPolicy="no-referrer"
                 onError={(e) => { e.currentTarget.src = ADMIN_IMAGE_URL; }}
                 className="w-9 h-9 rounded-full object-cover border border-[#50E364]"
               />
             </div>
          </div>
        </header>

        {/* Supabase Diagnostic Modal */}
        {showDbModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-gray-100 space-y-4 text-left">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${dbStatus.connected ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  <span>Supabase Connection Diagnostics</span>
                </h3>
                <button onClick={() => setShowDbModal(false)} className="text-gray-400 hover:text-gray-600 font-bold text-sm">✕</button>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-mono space-y-2">
                <div><strong>Status:</strong> {dbStatus.connected ? '🟢 ONLINE & ACTIVE' : '🔴 OFFLINE / WARN'}</div>
                <div className="break-all"><strong>URL:</strong> https://mmfbelknbomaoqnlvdgu.supabase.co</div>
                <div className="text-gray-700"><strong>Message:</strong> {dbStatus.message}</div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={checkSupabaseStatus}
                  className="px-4 py-2 rounded-xl bg-[#0A3D22] text-[#50E364] font-bold text-xs hover:bg-[#114D2C] transition-all"
                >
                  Re-Test Connection
                </button>
                <button
                  onClick={() => setShowDbModal(false)}
                  className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Split Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Admin Forms */}
          <main className={`flex-1 overflow-y-auto p-6 sm:p-8 transition-all duration-300 ${showSplitPreview ? 'sm:w-1/2 lg:w-2/5' : 'w-full'}`}>
            <div className="animate-fade-in max-w-5xl mx-auto">
                <Outlet />
            </div>
          </main>

          {/* Right: Live Preview Iframe */}
          {showSplitPreview && (
            <aside className="hidden sm:block sm:w-1/2 lg:w-3/5 border-l border-gray-200 bg-gray-100 animate-slide-in-right">
              <div className="h-full flex flex-col">
                <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 ml-4 truncate max-w-[200px]">
                      {previewUrl}
                    </span>
                  </div>
                  <button 
                    onClick={() => window.open(previewUrl, '_blank')}
                    className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 cursor-pointer"
                    title="Open in new tab"
                  >
                    <ExternalLink size={14} />
                  </button>
                </div>
                <div className="flex-1 relative bg-white">
                  <iframe 
                    src={previewUrl}
                    key={previewUrl} // Force reload iframe when section changes
                    className="absolute inset-0 w-full h-full border-none"
                    title="Live Preview"
                  />
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};
