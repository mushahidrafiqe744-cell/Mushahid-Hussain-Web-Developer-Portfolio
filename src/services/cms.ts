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

const isUUID = (str: any): boolean =>
  typeof str === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);

export const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const toValidUUID = (id: any): string => {
  if (isUUID(id)) return id;
  if (id === 'default_settings') return '00000000-0000-0000-0000-000000000002';
  if (id === 'exp_default_1') return '00000000-0000-0000-0000-000000000003';
  if (id === 'pillar_1') return '00000000-0000-0000-0000-000000000004';
  if (id === 'workflow_1') return '00000000-0000-0000-0000-000000000005';
  if (typeof id === 'string' && id.startsWith('skill_')) return generateUUID();
  return generateUUID();
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
    initial = [{ ...initialProfile, id: '00000000-0000-0000-0000-000000000001' }];
  } else if (table === 'projects') {
    initial = initialProjects.map((p: any, idx: number) => ({
      ...p,
      id: isUUID(p.id) ? p.id : generateUUID(),
      imageUrl: p.imageUrl || p.image,
    }));
  } else if (table === 'skills') {
    initial = initialSkillGroups.flatMap((group: any, gIdx) =>
      ((group.skills || group.items || []) as any[]).map((s: any, sIdx: number) => ({
        id: generateUUID(),
        name: s.name,
        percentage: s.levelPercentage || 85,
        category: group.category,
        icon: s.iconName || s.icon || 'Code',
      }))
    );
  } else if (table === 'services') {
    initial = initialServices.map((s) => ({
      id: isUUID(s.id) ? s.id : generateUUID(),
      title: s.title,
      description: s.description,
      icon: s.iconName,
    }));
  } else if (table === 'testimonials') {
    initial = initialTestimonials.map((t) => ({
      id: isUUID(t.id) ? t.id : generateUUID(),
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
        id: '00000000-0000-0000-0000-000000000002',
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
          id: '00000000-0000-0000-0000-000000000003',
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
      initial = initialCourses.map((c: any) => ({
        ...c,
        id: isUUID(c.id) ? c.id : generateUUID()
      }));
  } else if (table === 'why_us') {
      initial = [
          { id: '00000000-0000-0000-0000-000000000004', type: 'pillar', title: 'Creative Architecture', subtitle: 'Clean & Scalable Code', description: 'Writing maintainable, modular TypeScript.', icon: 'Lightbulb', displayOrder: 0 },
          { id: '00000000-0000-0000-0000-000000000005', type: 'workflow', title: 'Discovery & Scope', description: 'Understanding your goals.', stepNumber: 1, displayOrder: 10 }
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
        console.log('[CMS REALTIME EVENT DETECTED]', payload.eventType, payload.table);
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
        } else if (normTable === 'skills' || normTable === 'services') {
          // Keep default table ordering if available
        } else {
          query = query.order('createdAt', { ascending: false });
        }

        const { data, error } = await query;
          
        if (!error && data && data.length > 0) {
          setCacheData(normTable, data);
          return data;
        }

        if (error) {
          console.warn(`[CMS SUPABASE FETCH WARN] ${normTable}:`, error.message);
        }

        // If table in Supabase is empty, return local fallback and auto-seed Supabase in background
        if (!error && data && data.length === 0) {
          const fallback = getFallbackData(normTable);
          if (fallback && fallback.length > 0 && normTable !== 'messages') {
            const seedPayload = fallback.map((item: any) => ({
              ...item,
              id: isUUID(item.id) ? item.id : toValidUUID(item.id)
            }));
            supabase.from(normTable).upsert(seedPayload).then(({ error: seedErr }) => {
              if (seedErr) console.warn(`[CMS AUTO-SEED WARN] ${normTable}:`, seedErr.message);
            });
          }
          return fallback;
        }
      } catch (err) {
        console.warn(`[CMS SUPABASE FETCH EXCEPTION] ${normTable}:`, err);
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

  // Insert data to Supabase (with instant cloud upsert)
  async insertData(table: string, data: any): Promise<any[]> {
    const normTable = table === 'hero' || table === 'about' ? 'profiles' : table;
    const targetId = isUUID(data.id) ? data.id : generateUUID();
    const newItem = {
      ...data,
      id: targetId,
      updatedAt: new Date().toISOString()
    };

    if (supabase) {
      try {
        const { data: inserted, error } = await supabase
          .from(normTable)
          .insert(newItem)
          .select();
          
        if (!error && inserted && inserted.length > 0) {
          console.log(`[CMS SUPABASE INSERT OK] ${normTable}:`, inserted[0]);
          notifyCmsUpdated();
          return inserted;
        }

        if (error) {
          console.warn(`[CMS SUPABASE INSERT WARN] ${normTable}:`, error.message);
        }

        // Upsert fallback in case of key collision or non-existent record
        const { data: upserted, error: upsertErr } = await supabase
          .from(normTable)
          .upsert(newItem)
          .select();

        if (!upsertErr && upserted && upserted.length > 0) {
          console.log(`[CMS SUPABASE UPSERT OK] ${normTable}:`, upserted[0]);
          notifyCmsUpdated();
          return upserted;
        }

        if (upsertErr) {
          console.error(`[CMS SUPABASE UPSERT ERR] ${normTable}:`, upsertErr.message);
        }
      } catch (err) {
        console.error(`[CMS SUPABASE INSERT EXCEPTION] ${normTable}:`, err);
      }
    }
    
    // Fallback: save to local cache so frontend updates instantly
    this.updateLocalCache(normTable, (items) => [newItem, ...items]);
    notifyCmsUpdated();
    return [newItem];
  },

  // Update data in Supabase (with automatic upsert for global cloud sync)
  async updateData(table: string, id: string, data: any): Promise<any[]> {
    const normTable = table === 'hero' || table === 'about' ? 'profiles' : table;
    const targetId = toValidUUID(id);
    const updatePayload = {
      ...data,
      updatedAt: new Date().toISOString()
    };

    if (supabase) {
      try {
        // 1. Try standard update first
        const { data: updated, error } = await supabase
          .from(normTable)
          .update(updatePayload)
          .eq('id', targetId)
          .select();
          
        if (!error && updated && updated.length > 0) {
          console.log(`[CMS SUPABASE UPDATE OK] ${normTable}:`, updated[0]);
          notifyCmsUpdated();
          return updated;
        }

        // 2. If row does not exist in cloud database yet, upsert it so all browsers receive it!
        const upsertPayload = { id: targetId, ...updatePayload };
        const { data: upserted, error: upsertErr } = await supabase
          .from(normTable)
          .upsert(upsertPayload)
          .select();

        if (!upsertErr && upserted && upserted.length > 0) {
          console.log(`[CMS SUPABASE UPSERT OK] ${normTable}:`, upserted[0]);
          notifyCmsUpdated();
          return upserted;
        }

        if (upsertErr) {
          console.error(`[CMS SUPABASE UPDATE/UPSERT ERR] ${normTable}:`, upsertErr.message);
        }
      } catch (err) {
        console.error(`[CMS SUPABASE UPDATE EXCEPTION] ${normTable}:`, err);
      }
    }
    
    // Fallback: update local cache
    this.updateLocalCache(normTable, (items) =>
      items.map((item) => (String(item.id) === String(id) || String(item.id) === String(targetId) ? { ...item, ...updatePayload } : item))
    );
    notifyCmsUpdated();
    return [{ id: targetId, ...updatePayload }];
  },

  // Delete data from Supabase (with instant cloud & local sync)
  async deleteData(table: string, id: string): Promise<boolean> {
    const normTable = table === 'hero' || table === 'about' ? 'profiles' : table;
    const targetId = toValidUUID(id);
    
    if (supabase) {
      try {
        const { error } = await supabase.from(normTable).delete().eq('id', targetId);
        if (!error) {
          console.log(`[CMS SUPABASE DELETE OK] ${normTable}: ${targetId}`);
          notifyCmsUpdated();
          return true;
        } else {
          console.error(`[CMS SUPABASE DELETE ERR] ${normTable}:`, error.message);
        }
      } catch (err) {
        console.error(`[CMS SUPABASE DELETE EXCEPTION] ${normTable}:`, err);
      }
    }
    
    // Fallback: remove from local cache
    this.updateLocalCache(normTable, (items) => items.filter((item) => String(item.id) !== String(id) && String(item.id) !== String(targetId)));
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
