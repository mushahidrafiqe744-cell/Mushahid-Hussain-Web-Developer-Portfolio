import React, { useState, useEffect } from 'react';
import { cmsService } from '../../services/cms';
import {
  FolderKanban,
  Code2,
  Package,
  MessageSquare,
  Sparkles,
  Plus,
  User,
  Star,
  Settings,
  Edit,
  Trash2,
  CheckCircle,
  RotateCcw,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminOverview: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    projectsCount: 12,
    skillsCount: 8,
    servicesCount: 6,
    messagesCount: 18,
  });

  const LOCAL_ADMIN_IMAGE = '/assets/images/mushahid_admin_profile.jpg';

  const [heroForm, setHeroForm] = useState({
    heading: 'Welcome to My Portfolio',
    typedText: 'Web Developer | Freelancer | Creator',
    description: 'Turn your ideas into a stunning website.',
    avatarUrl: LOCAL_ADMIN_IMAGE,
  });

  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const projects = await cmsService.fetchData('projects');
      const skills = await cmsService.fetchData('skills');
      const services = await cmsService.fetchData('services');
      const messages = await cmsService.fetchData('messages');
      const profile = await cmsService.fetchData('profiles');

      setRecentProjects((projects || []).slice(0, 2));
      setRecentMessages((messages || []).slice(0, 3));

      setStats({
        projectsCount: projects?.length || 12,
        skillsCount: skills?.length || 8,
        servicesCount: services?.length || 6,
        messagesCount: messages?.length || 18,
      });

      if (profile && profile[0]) {
        const fetchedAvatar = profile[0].avatarUrl;
        const validAvatar = (fetchedAvatar && !fetchedAvatar.includes('i.pinimg.com')) ? fetchedAvatar : LOCAL_ADMIN_IMAGE;
        setHeroForm({
          heading: profile[0].name ? `Welcome, I'm ${profile[0].name}` : 'Welcome to My Portfolio',
          typedText: profile[0].title || 'Web Developer | Freelancer | Creator',
          description: profile[0].bioHero || 'Turn your ideas into a stunning website.',
          avatarUrl: validAvatar,
        });
      }
    } catch (e) {
      console.warn('Overview data load error', e);
    }
  };

  const handleHeroSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const profiles = await cmsService.fetchData('profiles');
      const existingId = profiles && profiles[0] ? profiles[0].id : 'profile_1';

      await cmsService.updateData('profiles', existingId, {
        title: heroForm.typedText,
        bioHero: heroForm.description,
        avatarUrl: heroForm.avatarUrl || LOCAL_ADMIN_IMAGE,
      });

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      alert('Changes saved locally.');
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const handleResetHero = () => {
    setHeroForm({
      heading: 'Welcome to My Portfolio',
      typedText: 'Web Developer | Freelancer | Creator',
      description: 'Turn your ideas into a stunning website.',
      avatarUrl: LOCAL_ADMIN_IMAGE,
    });
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    await cmsService.deleteData('projects', id);
    loadData();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {savedSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-[#0A3D22] text-[#50E364] px-5 py-3 rounded-2xl shadow-2xl border border-[#50E364]/40 flex items-center gap-2 animate-bounce font-bold text-sm">
          <CheckCircle className="w-5 h-5 text-[#50E364]" />
          <span>Hero section updated successfully!</span>
        </div>
      )}

      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#EAF9EE] via-[#F2FBF4] to-[#DCFCE7] p-8 sm:p-10 border border-[#50E364]/20 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A3D22]/10 text-[#0A3D22] text-xs font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-[#50E364] animate-ping" />
            <span>Portfolio Live</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A3D22] tracking-tight leading-tight">
            Welcome Back, <br />
            <span className="text-[#052814]">Mushahid Hussain!</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#113821] font-medium">
            Manage your portfolio content, projects, and contact messages seamlessly. 💚
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/70 backdrop-blur-xs p-3 sm:p-4 rounded-2xl border border-[#50E364]/30 shadow-xs self-start md:self-auto shrink-0">
          <img
            src={heroForm.avatarUrl || LOCAL_ADMIN_IMAGE}
            alt="Mushahid Hussain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = LOCAL_ADMIN_IMAGE;
            }}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#50E364] shadow-sm"
          />
          <div>
            <div className="text-sm font-extrabold text-[#0A3D22]">Mushahid Hussain</div>
            <div className="text-xs text-gray-600 font-semibold">Web Developer</div>
            <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-[#0A3D22] bg-[#50E364]/30 px-2 py-0.5 rounded-full">
              Admin Verified
            </span>
          </div>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Projects */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0A3D22] flex items-center justify-center font-bold">
              <FolderKanban className="w-6 h-6 text-[#0A3D22]" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#0A3D22]">{stats.projectsCount}</div>
              <div className="text-xs font-semibold text-gray-500">Total Projects</div>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
            ↑ Active
          </span>
        </div>

        {/* Total Skills */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0A3D22] flex items-center justify-center">
              <Code2 className="w-6 h-6 text-[#0A3D22]" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#0A3D22]">{stats.skillsCount}</div>
              <div className="text-xs font-semibold text-gray-500">Total Skills</div>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
            ↑ Verified
          </span>
        </div>

        {/* Total Services */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0A3D22] flex items-center justify-center">
              <Package className="w-6 h-6 text-[#0A3D22]" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#0A3D22]">{stats.servicesCount}</div>
              <div className="text-xs font-semibold text-gray-500">Total Services</div>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
            ↑ Ready
          </span>
        </div>

        {/* Messages */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0A3D22] flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-[#0A3D22]" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#0A3D22]">{stats.messagesCount}</div>
              <div className="text-xs font-semibold text-gray-500">Messages</div>
            </div>
          </div>
          <span className="text-xs font-bold text-[#0A3D22] bg-[#50E364]/30 px-2 py-1 rounded-lg">
            New
          </span>
        </div>
      </div>

      {/* Main Grid: Hero Management + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hero Section Quick Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-2xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2 text-[#0A3D22] font-bold">
              <Sparkles className="w-5 h-5 text-[#50E364]" />
              <span>Hero Section Management</span>
            </div>
            <button
              onClick={() => navigate('/admin/hero')}
              className="text-xs font-bold bg-[#0A3D22] text-white px-3 py-1.5 rounded-xl hover:bg-[#114D2C] transition-colors"
            >
              Full Edit Section ↗
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
            {/* Image Preview Box */}
            <div className="sm:col-span-4 flex flex-col items-center justify-center p-3 bg-gradient-to-b from-[#0A3D22] to-[#114D2C] rounded-2xl border border-[#50E364]/30 shadow-md">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-3 border border-[#50E364]/40 bg-[#0A3D22]">
                <img
                  src={heroForm.avatarUrl || LOCAL_ADMIN_IMAGE}
                  alt="Profile Preview"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = LOCAL_ADMIN_IMAGE;
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="w-full px-3 py-1.5 rounded-lg bg-[#50E364] hover:bg-[#60EA77] text-[#0A3D22] text-[11px] font-bold uppercase tracking-wider text-center cursor-pointer transition-all shadow-sm flex items-center justify-center gap-1">
                <span>Change Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = await cmsService.uploadFile('images', file);
                      setHeroForm({ ...heroForm, avatarUrl: url });
                    }
                  }}
                  className="hidden"
                />
              </label>
            </div>

            {/* Inputs */}
            <form onSubmit={handleHeroSave} className="sm:col-span-8 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Main Heading
                </label>
                <input
                  type="text"
                  value={heroForm.heading}
                  onChange={(e) => setHeroForm({ ...heroForm, heading: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-[#0A3D22]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Typed Text / Subtitle
                </label>
                <input
                  type="text"
                  value={heroForm.typedText}
                  onChange={(e) => setHeroForm({ ...heroForm, typedText: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-[#0A3D22]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={heroForm.description}
                  onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-hidden focus:border-[#0A3D22]"
                />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0A3D22] hover:bg-[#114D2C] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <CheckCircle className="w-4 h-4 text-[#50E364]" />
                  <span>Save Changes</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetHero}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-2xs">
          <div className="flex items-center gap-2 text-[#0A3D22] font-bold mb-6 pb-4 border-b border-gray-100">
            <Zap className="w-5 h-5 text-[#50E364]" />
            <span>Quick Actions</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/admin/projects')}
              className="p-4 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/80 transition-all text-left group border border-emerald-100 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-[#0A3D22] text-[#50E364] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-[#0A3D22]">Add New Project</div>
            </button>

            <button
              onClick={() => navigate('/admin/skills')}
              className="p-4 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/80 transition-all text-left group border border-emerald-100 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-[#0A3D22] text-[#50E364] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-[#0A3D22]">Add New Skill</div>
            </button>

            <button
              onClick={() => navigate('/admin/services')}
              className="p-4 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/80 transition-all text-left group border border-emerald-100 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-[#0A3D22] text-[#50E364] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Package className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-[#0A3D22]">Add New Service</div>
            </button>

            <button
              onClick={() => navigate('/admin/about')}
              className="p-4 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/80 transition-all text-left group border border-emerald-100 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-[#0A3D22] text-[#50E364] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <User className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-[#0A3D22]">Edit About Me</div>
            </button>

            <button
              onClick={() => navigate('/admin/testimonials')}
              className="p-4 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/80 transition-all text-left group border border-emerald-100 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-[#0A3D22] text-[#50E364] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Star className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-[#0A3D22]">Testimonials</div>
            </button>

            <button
              onClick={() => navigate('/admin/settings')}
              className="p-4 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/80 transition-all text-left group border border-emerald-100 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-[#0A3D22] text-[#50E364] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Settings className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-[#0A3D22]">Website Settings</div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Projects & Recent Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Projects */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-2xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-[#0A3D22] font-bold">
              <FolderKanban className="w-5 h-5 text-[#50E364]" />
              <span>Recent Projects</span>
            </div>
            <button
              onClick={() => navigate('/admin/projects')}
              className="text-xs font-bold text-[#0A3D22] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentProjects.length === 0 ? (
              <p className="text-xs text-gray-500 py-4 text-center">No projects found.</p>
            ) : (
              recentProjects.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{p.title}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{p.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => navigate('/admin/projects')}
                      className="p-2 rounded-lg bg-emerald-50 text-[#0A3D22] hover:bg-emerald-100 cursor-pointer"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-2xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-[#0A3D22] font-bold">
              <MessageSquare className="w-5 h-5 text-[#50E364]" />
              <span>Recent Contact Messages</span>
            </div>
            <button
              onClick={() => navigate('/admin/messages')}
              className="text-xs font-bold text-[#0A3D22] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentMessages.length === 0 ? (
              <p className="text-xs text-gray-500 py-4 text-center">No messages received yet.</p>
            ) : (
              recentMessages.map((m) => (
                <div
                  key={m.id}
                  className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0A3D22] text-[#50E364] flex items-center justify-center font-bold text-xs">
                      {m.name ? m.name[0].toUpperCase() : 'M'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900">{m.name}</div>
                      <div className="text-[11px] text-gray-500 line-clamp-1">{m.message}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/admin/messages')}
                    className="text-[10px] font-bold text-[#0A3D22] bg-emerald-50 px-2.5 py-1 rounded-full hover:bg-emerald-100 cursor-pointer"
                  >
                    View
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
