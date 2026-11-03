import React, { useState, useEffect } from 'react';
import { cmsService } from '../../services/cms';
import { Plus, Trash2, Edit, Save } from 'lucide-react';

export const ManageSkills: React.FC = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any | null>(null);
  const [formData, setFormData] = useState({ name: '', percentage: 0 });

  useEffect(() => { loadSkills(); }, []);

  const loadSkills = async () => {
    try {
      const data = await cmsService.fetchData('skills');
      setSkills(data || []);
    } catch (e) { alert('Failed to load skills'); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await cmsService.updateData('skills', editingSkill.id, formData);
      } else {
        await cmsService.insertData('skills', formData);
      }
      setIsFormOpen(false);
      setEditingSkill(null);
      loadSkills();
    } catch (e) { alert('Failed to save skill'); }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Skills</h2>
        <button onClick={() => { setEditingSkill(null); setIsFormOpen(true); }} className="bg-[#0A3D22] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"><Plus size={18}/>Add Skill</button>
      </div>
      {isFormOpen && (
        <form onSubmit={handleSave} className="bg-gray-50 p-6 rounded-xl mb-6 border">
          <input className="w-full p-2 mb-2 border rounded" placeholder="Skill Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <input type="number" className="w-full p-2 mb-4 border rounded" placeholder="Percentage" value={formData.percentage} onChange={e => setFormData({...formData, percentage: parseInt(e.target.value)})} />
          <div className="flex gap-2">
            <button type="submit" className="bg-[#50E364] text-black px-4 py-2 rounded font-bold flex items-center gap-2"><Save size={18}/>Save</button>
            <button type="button" onClick={() => setIsFormOpen(false)} className="bg-gray-200 px-4 py-2 rounded font-bold">Cancel</button>
          </div>
        </form>
      )}
      <div className="grid gap-4">
        {skills.map((skill: any) => (
          <div key={skill.id} className="bg-white border rounded-xl p-4 flex justify-between items-center">
            <span>{skill.name} - {skill.percentage}%</span>
            <div className="flex gap-2">
                <button onClick={() => { setEditingSkill(skill); setFormData(skill); setIsFormOpen(true); }} className="p-2 text-blue-500"><Edit size={18}/></button>
                <button onClick={async () => { await cmsService.deleteData('skills', skill.id); loadSkills(); }} className="p-2 text-red-500"><Trash2 size={18}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
