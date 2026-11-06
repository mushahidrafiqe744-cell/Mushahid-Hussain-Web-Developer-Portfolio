import { supabase } from '../lib/supabase';
import {
  initialProfile,
  initialProjects,
  initialServices,
  initialSkillGroups,
  initialTestimonials,
  initialCourses,
} from '../data/portfolioData';

/**
 * CMS Service: Purely Supabase-driven for Real-time Portfolio Management
 */

const notifyCmsUpdated = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cms_data_updated'));
    // Trigger sync across iframes/tabs
    localStorage.setItem('cms_sync_trigger', Date.now().toString());
  }
};

// Fallback initial state for each domain (used if Supabase is empty or failing)
const getFallbackData = (table: string) => {
  const stored = localStorage.getItem(`cms_cache_${table}`);
  if (stored !== null) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.warn(`Failed to parse cached cms_${table}`, e);
    }
  }

  let initial: any[] = [];
  if (table === 'profiles' || table === 'hero' || table === 'about') {
    initial = [initialProfile];
  } else if (table === 'projects') {
    initial = initialProjects.map((p: any) => ({
      ...p,
      imageUrl: p.imageUrl || p.image,
    }));
  } else if (table === 'skills') {
    initial = initialSkillGroups.flatMap((group: any, gIdx) =>
      ((group.skills || group.items || []) as any[]).map((s: any, sIdx: number) => ({
        id: `skill_${gIdx}_${sIdx}`,
        name: s.name,
        percentage: s.levelPercentage || 85,
        category: group.category,
        icon: s.iconName || s.icon || 'Code',
      }))
    );
  } else if (table === 'services') {
    initial = initialServices.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      icon: s.iconName,
    }));
  } else if (table === 'testimonials') {
    initial = initialTestimonials.map((t) => ({
      id: t.id,
      name: t.name,
      role: t.role,
      company: t.company,
      review: (t.review || t.feedback || '').trim(),
      avatarUrl: t.avatar || t.avatarUrl || '',
      avatarColor: t.avatarColor || '#EA580C',
      rating: t.rating || 5,
      date: t.date || 'Recent',
      tags: t.tags || [],
      platform: t.platform || 'google',
    }));
  } else if (table === 'settings' || table === 'site_settings') {
    initial = [
      {
        id: 'default_settings',
        title: 'Mushahid Hussain - Web Developer Portfolio',
        description: 'Portfolio of Mushahid Hussain, Full-Stack Web Developer.',
        themePrimary: '#0A3D22',
        themeAccent: '#50E364',
        fontFamily: 'Inter',
        navbarItems: ['Home', 'About', 'Services', 'Skills', 'Projects', 'Contact'],
      },
    ];
  } else if (table === 'experiences') {
    initial = [
        {
          id: 'exp_default_1',
          role: 'Full-Stack Web Developer',
          company: 'Freelance & Independent Contractor',
          period: '2024 – Present',
          location: 'Remote Worldwide',
          badge: 'Current Role',
          description: 'Architecting and shipping responsive web apps, SaaS platforms, and headless e-commerce stores.',
          achievements: [
            'Built 30+ production web applications.',
            'Engineered high-concurrency REST & GraphQL APIs.'
          ],
          stack: ['React', 'Next.js', 'TypeScript', 'Node.js'],
          displayOrder: 0
        }
    ];
  } else if (table === 'courses') {
      initial = initialCourses;
  } else if (table === 'why_us') {
      initial = [
          { id: 'pillar_1', type: 'pillar', title: 'Creative Architecture', subtitle: 'Clean & Scalable Code', description: 'Writing maintainable, modular TypeScript.', icon: 'Lightbulb', displayOrder: 0 },
          { id: 'workflow_1', type: 'workflow', title: 'Discovery & Scope', description: 'Understanding your goals.', stepNumber: 1, displayOrder: 10 }
      ];
  }

  return initial;
};

const setCacheData = (table: string, data: any[]) => {
  localStorage.setItem(`cms_cache_${table}`, JSON.stringify(data));
};

// Set up Supabase Realtime Listener
if (supabase && typeof window !== 'undefined') {
  try {
    supabase
      .channel('portfolio_realtime_full')
      .on('postgres_changes', { event: '*', schema: 'public' }, (payload) => {
        console.log('[CMS REALTIME] Change detected:', payload);
        notifyCmsUpdated();
      })
      .subscribe();
  } catch (e) {
    console.warn('Supabase Realtime setup failed', e);
  }
}

export const cmsService = {
  // Fetch data from Supabase (Primary) with local cache fallback
  async fetchData(table: string): Promise<any[]> {
    const normTable = table === 'hero' || table === 'about' ? 'profiles' : table;
    
    if (supabase) {
      try {
        let query = supabase.from(normTable).select('*');
        
        if (normTable === 'experiences' || normTable === 'courses' || normTable === 'why_us') {
            query = query.order('displayOrder', { ascending: true });
        } else {
            query = query.order('createdAt', { ascending: false });
        }

        const { data, error } = await query;
          
        if (!error && data && data.length > 0) {
          setCacheData(normTable, data);
          return data;
        }
        
        if (!error && data && data.length === 0) {
            return getFallbackData(normTable);
        }
      } catch (err) {
        console.warn(`Supabase fetch failed for table ${normTable}`, err);
      }
    }

    return getFallbackData(normTable);
  },

  // Helper to update local cache array
  updateLocalCache(table: string, updateFn: (items: any[]) => any[]) {
    const current = getFallbackData(table);
    const updated = updateFn(current);
    setCacheData(table, updated);
  },

  // Insert data to Supabase (with instant local fallback update)
  async insertData(table: string, data: any): Promise<any[]> {
    const normTable = table === 'hero' || table === 'about' ? 'profiles' : table;
    const newItem = {
      id: data.id || `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (supabase) {
      try {
        const { data: inserted, error } = await supabase
          .from(normTable)
          .insert({
            ...data,
            updatedAt: new Date().toISOString()
          })
          .select();
          
        if (!error && inserted && inserted.length > 0) {
          // Update cache with fresh Supabase data
          const current = await this.fetchData(normTable);
          notifyCmsUpdated();
          return inserted;
        }
      } catch (err) {
        console.warn(`Supabase insert failed for ${normTable}, applying local fallback`, err);
      }
    }
    
    // Fallback: save to local cache so frontend updates instantly
    this.updateLocalCache(normTable, (items) => [newItem, ...items]);
    notifyCmsUpdated();
    return [newItem];
  },

  // Update data in Supabase (with instant local fallback update)
  async updateData(table: string, id: string, data: any): Promise<any[]> {
    const normTable = table === 'hero' || table === 'about' ? 'profiles' : table;
    const updatePayload = {
      ...data,
      updatedAt: new Date().toISOString()
    };

    if (supabase) {
      try {
        const { data: updated, error } = await supabase
          .from(normTable)
          .update(updatePayload)
          .eq('id', id)
          .select();
          
        if (!error && updated && updated.length > 0) {
          notifyCmsUpdated();
          return updated;
        }
      } catch (err) {
        console.warn(`Supabase update failed for ${normTable}, applying local fallback`, err);
      }
    }
    
    // Fallback: update local cache
    this.updateLocalCache(normTable, (items) =>
      items.map((item) => (String(item.id) === String(id) ? { ...item, ...updatePayload } : item))
    );
    notifyCmsUpdated();
    return [{ id, ...updatePayload }];
  },

  // Delete data from Supabase (with instant local fallback update)
  async deleteData(table: string, id: string): Promise<boolean> {
    const normTable = table === 'hero' || table === 'about' ? 'profiles' : table;
    
    if (supabase) {
      try {
        const { error } = await supabase.from(normTable).delete().eq('id', id);
        if (!error) {
          notifyCmsUpdated();
          return true;
        }
      } catch (err) {
        console.warn(`Supabase delete failed for ${normTable}, applying local fallback`, err);
      }
    }
    
    // Fallback: remove from local cache
    this.updateLocalCache(normTable, (items) => items.filter((item) => String(item.id) !== String(id)));
    notifyCmsUpdated();
    return true;
  },

  // Supabase Storage Upload
  async uploadFile(bucket: string, file: File, path?: string): Promise<string> {
    if (!supabase) {
        return URL.createObjectURL(file);
    }

    const fileName = path || `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, { upsert: true, cacheControl: '3600' });
        
      if (error) throw error;
      
      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
      return data.publicUrl;
    } catch (err) {
      console.error('Supabase storage upload failed', err);
      throw err;
    }
  },
};
