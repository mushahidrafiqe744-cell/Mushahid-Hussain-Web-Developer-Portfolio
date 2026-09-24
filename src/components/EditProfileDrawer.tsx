import React, { useState } from 'react';
import { X, Save, RotateCcw, Plus, Trash2, SlidersHorizontal, Check } from 'lucide-react';
import { DeveloperProfile, Project } from '../types/portfolio';

interface EditProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: DeveloperProfile;
  onUpdateProfile: (profile: DeveloperProfile) => void;
  onResetDefaults: () => void;
}

export const EditProfileDrawer: React.FC<EditProfileDrawerProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  onResetDefaults,
}) => {
  const [formData, setFormData] = useState<DeveloperProfile>(profile);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#11261B]/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#F8F5EE] h-full shadow-2xl border-l border-[#11261B]/20 flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#11261B] text-white border-b border-[#C5A059]/30 shrink-0">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#C5A059]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Personalize Portfolio
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body Form */}
        <form id="profile-form" onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs">
          
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px] leading-relaxed">
            💡 Customize your profile details here. All changes update instantly on your portfolio!
          </div>

          <div>
            <label className="block font-bold uppercase text-[#11261B] mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                const parts = e.target.value.split(' ');
                setFormData({
                  ...formData,
                  name: e.target.value,
                  firstName: parts[0] || e.target.value,
                  lastName: parts.slice(1).join(' ') || '',
                });
              }}
              className="w-full px-3 py-2 bg-white border border-[#11261B]/15 rounded-lg text-[#11261B] focus:border-[#C5A059]"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-[#11261B] mb-1">Professional Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#11261B]/15 rounded-lg text-[#11261B] focus:border-[#C5A059]"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-[#11261B] mb-1">Badge Tagline</label>
            <input
              type="text"
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#11261B]/15 rounded-lg text-[#11261B] focus:border-[#C5A059]"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-[#11261B] mb-1">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#11261B]/15 rounded-lg text-[#11261B] focus:border-[#C5A059]"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-[#11261B] mb-1">Phone / WhatsApp</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#11261B]/15 rounded-lg text-[#11261B] focus:border-[#C5A059]"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-[#11261B] mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#11261B]/15 rounded-lg text-[#11261B] focus:border-[#C5A059]"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-[#11261B] mb-1">GitHub Profile URL</label>
            <input
              type="text"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#11261B]/15 rounded-lg text-[#11261B] focus:border-[#C5A059]"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-[#11261B] mb-1">LinkedIn URL</label>
            <input
              type="text"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#11261B]/15 rounded-lg text-[#11261B] focus:border-[#C5A059]"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-[#11261B] mb-1">Hero Bio Paragraph</label>
            <textarea
              rows={3}
              value={formData.bioHero}
              onChange={(e) => setFormData({ ...formData, bioHero: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#11261B]/15 rounded-lg text-[#11261B] focus:border-[#C5A059]"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-[#11261B] mb-1">About Section Bio</label>
            <textarea
              rows={4}
              value={formData.bioAbout}
              onChange={(e) => setFormData({ ...formData, bioAbout: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#11261B]/15 rounded-lg text-[#11261B] focus:border-[#C5A059]"
            />
          </div>

        </form>

        {/* Drawer Footer Actions */}
        <div className="p-4 bg-[#F2EDE2] border-t border-[#11261B]/10 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onResetDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#5C6E61] hover:text-[#11261B] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="submit"
            form="profile-form"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#11261B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1A3828] transition-all shadow-sm"
          >
            {saved ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
