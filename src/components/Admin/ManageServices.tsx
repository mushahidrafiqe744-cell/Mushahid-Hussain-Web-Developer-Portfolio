import React, { useState, useEffect } from 'react';
import { cmsService } from '../../services/cms';
import { Plus, Trash2, Edit, Save } from 'lucide-react';

export const ManageServices: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '' });

  useEffect(() => { loadServices(); }, []);

  const loadServices = async () => {
    const data = await cmsService.fetchData('services');
    setServices(data || []);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) await cmsService.updateData('services', editingService.id, formData);
    else await cmsService.insertData('services', formData);
    setIsFormOpen(false);
    loadServices();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Services</h2>
        <button onClick={() => { setIsFormOpen(true); }} className="bg-[#0A3D22] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"><Plus size={18}/>Add Service</button>
      </div>
      <div className="grid gap-4">
        {services.map((svc: any) => (
          <div key={svc.id} className="bg-white border rounded-xl p-4 flex justify-between items-center">
            <span>{svc.title}</span>
            <button onClick={async () => { await cmsService.deleteData('services', svc.id); loadServices(); }} className="text-red-500"><Trash2 size={18}/></button>
          </div>
        ))}
      </div>
    </div>
  );
};
