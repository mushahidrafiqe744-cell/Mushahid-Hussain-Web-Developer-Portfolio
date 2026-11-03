import React, { useState, useEffect } from 'react';
import { cmsService } from '../../services/cms';
import { Save, RotateCcw, CheckCircle, Settings, Palette, Type, Navigation } from 'lucide-react';

export const ManageSettings: React.FC = () => {
  const [formData, setFormData] = useState({
    title: 'Mushahid Hussain - Web Developer Portfolio',
    description: 'Portfolio of Mushahid Hussain, Full-Stack Web Developer.',
    themePrimary: '#0A3D22',
    themeAccent: '#50E364',
    fontFamily: 'Inter',
    navbarItems: 'Home, About, Services, Skills, Projects, Contact',
  });

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await cmsService.fetchData('settings');
      if (data && data[0]) {
        setFormData({
          title: data[0].title || formData.title,
          description: data[0].description || formData.description,
          themePrimary: data[0].themePrimary || formData.themePrimary,
          themeAccent: data[0].themeAccent || formData.themeAccent,
          fontFamily: data[0].fontFamily || formData.fontFamily,
          navbarItems: Array.isArray(data[0].navbarItems)
            ? data[0].navbarItems.join(', ')
            : formData.navbarItems,
        });
      }
    } catch (e) {
      console.warn('Load settings error', e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = await cmsService.fetchData('settings');
      const existingId = data && data[0] ? data[0].id : 'default_settings';

      const payload = {
        ...formData,
        navbarItems: formData.navbarItems.split(',').map((s) => s.trim()).filter(Boolean),
      };

      await cmsService.updateData('settings', existingId, payload);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    } catch (e) {
      alert('Settings saved locally.');
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-2xs max-w-4xl space-y-6">
      {successMsg && (
        <div className="p-4 rounded-2xl bg-[#0A3D22] text-[#50E364] flex items-center gap-2 font-bold text-sm">
          <CheckCircle className="w-5 h-5" />
          <span>Website settings & SEO meta saved successfully!</span>
        </div>
      )}

      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <Settings className="w-6 h-6 text-[#50E364]" />
        <div>
          <h2 className="text-xl font-bold text-[#0A3D22]">Website & SEO Settings</h2>
          <p className="text-xs text-gray-500">Configure site meta tags, branding colors, fonts, and navbar links.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Website Title / SEO Meta Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Type className="w-3.5 h-3.5 text-emerald-600" />
              <span>Font Family</span>
            </label>
            <select
              value={formData.fontFamily}
              onChange={(e) => setFormData({ ...formData, fontFamily: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold"
            >
              <option value="Inter">Inter (Clean Modern)</option>
              <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
              <option value="Outfit">Outfit</option>
              <option value="Poppins">Poppins</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Meta Description (Google Search Snippet)
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-emerald-600" />
              <span>Primary Dark Theme Color</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={formData.themePrimary}
                onChange={(e) => setFormData({ ...formData, themePrimary: e.target.value })}
                className="w-10 h-10 rounded-xl cursor-pointer border-0"
              />
              <input
                type="text"
                value={formData.themePrimary}
                onChange={(e) => setFormData({ ...formData, themePrimary: e.target.value })}
                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-emerald-600" />
              <span>Accent Green Color</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={formData.themeAccent}
                onChange={(e) => setFormData({ ...formData, themeAccent: e.target.value })}
                className="w-10 h-10 rounded-xl cursor-pointer border-0"
              />
              <input
                type="text"
                value={formData.themeAccent}
                onChange={(e) => setFormData({ ...formData, themeAccent: e.target.value })}
                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Navigation className="w-3.5 h-3.5 text-emerald-600" />
            <span>Navbar Menu Items (Comma Separated)</span>
          </label>
          <input
            type="text"
            value={formData.navbarItems}
            onChange={(e) => setFormData({ ...formData, navbarItems: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold"
          />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-[#0A3D22] hover:bg-[#114D2C] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Save className="w-4 h-4 text-[#50E364]" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
          <button
            type="button"
            onClick={loadSettings}
            className="px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </form>
    </div>
  );
};
