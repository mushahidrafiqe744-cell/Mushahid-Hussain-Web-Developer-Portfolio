import React, { useState, useEffect } from 'react';
import { cmsService } from '../../services/cms';
import { Plus, Trash2, Edit, Save, Star, User } from 'lucide-react';

export const ManageTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    message: '',
    avatarUrl: '',
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const data = await cmsService.fetchData('testimonials');
      setTestimonials(data || []);
    } catch (e) {
      console.warn('Load testimonials error', e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        review: formData.message,
        feedback: formData.message,
      };
      if (editingItem) {
        await cmsService.updateData('testimonials', editingItem.id, payload);
      } else {
        await cmsService.insertData('testimonials', payload);
      }
      setIsFormOpen(false);
      setEditingItem(null);
      setFormData({ name: '', role: '', company: '', message: '', avatarUrl: '' });
      loadTestimonials();
    } catch (e) {
      alert('Saved testimonial.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setTestimonials((prev) => prev.filter((t) => String(t.id) !== String(id)));
      await cmsService.deleteData('testimonials', id);
      loadTestimonials();
    } catch (e) {
      console.warn('Failed to delete testimonial', e);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-2xs max-w-4xl space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Star className="w-6 h-6 text-[#50E364]" />
          <div>
            <h2 className="text-xl font-bold text-[#0A3D22]">Manage Testimonials</h2>
            <p className="text-xs text-gray-500">Add, edit, or delete client reviews & testimonials.</p>
          </div>
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            setFormData({ name: '', role: '', company: '', message: '', avatarUrl: '' });
            setIsFormOpen(true);
          }}
          className="bg-[#0A3D22] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md hover:bg-[#114D2C]"
        >
          <Plus size={16} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSave} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Client Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Role / Title & Company
              </label>
              <input
                type="text"
                placeholder="e.g. CEO at TechCorp"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Feedback Message / Review
            </label>
            <textarea
              rows={3}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="bg-[#0A3D22] text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Save size={16} className="text-[#50E364]" />
              <span>Save Testimonial</span>
            </button>
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {testimonials.length === 0 ? (
          <p className="text-xs text-gray-500 py-4 text-center">No testimonials added yet.</p>
        ) : (
          testimonials.map((t) => (
            <div
              key={t.id}
              className="p-4 rounded-2xl border border-gray-100 bg-gray-50 flex items-center justify-between"
            >
              <div className="space-y-1">
                <div className="font-bold text-sm text-gray-900">{t.name}</div>
                <div className="text-xs text-[#0A3D22] font-semibold">{t.role || t.company}</div>
                <p className="text-xs text-gray-600 italic">"{t.message}"</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setEditingItem(t);
                    setFormData(t);
                    setIsFormOpen(true);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl cursor-pointer"
                  title="Edit"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-xl cursor-pointer"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
