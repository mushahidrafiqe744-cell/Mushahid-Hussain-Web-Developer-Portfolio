import { supabase } from '../lib/supabase';
import {
  initialProfile,
  initialProjects,
  initialServices,
  initialSkillGroups,
  initialTestimonials,
} from '../data/portfolioData';

const notifyCmsUpdated = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cms_data_updated'));
  }
};

// Fallback initial state for each domain
const getFallbackData = (table: string) => {
  const stored = localStorage.getItem(`cms_fallback_${table}`);
  if (stored !== null) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        if (table === 'testimonials' && parsed.length > 0) {
          const hasBlankReview = parsed.some(
            (item: any) => !(item.review || item.feedback || item.message || '').trim()
          );
          if (!hasBlankReview && parsed.length >= initialTestimonials.length) {
            return parsed;
          }
        } else if (table === 'projects' && parsed.length >= initialProjects.length) {
          return parsed.map((p: any) => ({
            ...p,
            image: p.image || p.imageUrl || '/assets/images/biztop_full_web_1790852703068.jpg',
            imageUrl: p.imageUrl || p.image || '/assets/images/biztop_full_web_1790852703068.jpg',
          }));
        } else if ((table === 'profiles' || table === 'hero' || table === 'about') && parsed.length > 0) {
          if (parsed[0] && (!parsed[0].avatarUrl || parsed[0].avatarUrl.includes('i.pinimg.com'))) {
            parsed[0].avatarUrl = '/assets/images/mushahid_admin_profile.jpg';
          }
          return parsed;
        } else if (table !== 'projects') {
          return parsed;
        }
      }
    } catch (e) {
      console.warn(`Failed to parse cached cms_${table}`, e);
    }
  }

  let initial: any[] = [];
  if (table === 'profiles' || table === 'hero' || table === 'about') {
    initial = [initialProfile];
  } else if (table === 'projects') {
    initial = initialProjects.map((p: any) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      category: p.category,
      categoryLabel: p.categoryLabel || p.category,
      year: p.year,
      metrics: p.metrics,
      technologies: p.technologies || [],
      image: p.image || p.imageUrl,
      imageUrl: p.imageUrl || p.image,
      link: p.liveUrl || p.githubUrl || '#',
      liveUrl: p.liveUrl || '#',
      githubUrl: p.githubUrl || '#',
      featured: p.featured ?? true,
      hidden: p.hidden ?? false,
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
      feedback: (t.review || t.feedback || '').trim(),
      message: (t.review || t.feedback || '').trim(),
      avatar: t.avatar || t.avatarUrl || '',
      avatarUrl: t.avatar || t.avatarUrl || '',
      avatarColor: t.avatarColor || '#EA580C',
      avatarLetter: t.avatarLetter || t.name.charAt(0).toUpperCase() || 'U',
      date: t.date || 'Recent',
      flag: t.flag || '⭐',
      rating: t.rating || 5,
      metricsResult: t.metricsResult || '',
      tags: t.tags || ['Web App', 'React', 'TypeScript'],
      project: t.project || 'Web Application',
      location: t.location || 'Global',
      platform: t.platform || 'google',
    }));
  } else if (table === 'messages') {
    initial = [
      {
        id: 'msg_1',
        name: 'Ahmed Khan',
        email: 'ahmed.khan@example.com',
        projectType: 'Business Website',
        message: 'Can you build a business website for my agency?',
        status: 'unread',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: 'msg_2',
        name: 'Sara Ali',
        email: 'sara.ali@example.com',
        projectType: 'Full-Stack Web App',
        message: 'Great portfolio! I would like to consult regarding a React app.',
        status: 'read',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
    ];
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
  }

  localStorage.setItem(`cms_fallback_${table}`, JSON.stringify(initial));
  return initial;
};

const setFallbackData = (table: string, data: any[]) => {
  localStorage.setItem(`cms_fallback_${table}`, JSON.stringify(data));
  notifyCmsUpdated();
};

// Set up Supabase Realtime Listener if Supabase is active
if (supabase && typeof window !== 'undefined') {
  try {
    supabase
      .channel('public_portfolio_cms')
      .on('postgres_changes', { event: '*', schema: 'public' }, () => {
        notifyCmsUpdated();
      })
      .subscribe();
  } catch (e) {
    console.warn('Realtime channel setup error', e);
  }
}

export const cmsService = {
  // Fetch data with Server-First persistence
  async fetchData(table: string): Promise<any[]> {
    // 1. First try Backend Server API
    try {
      const res = await fetch(`/api/cms/${table}`);
      if (res.ok) {
        const json = await res.json();
        const data = Array.isArray(json) ? json : (json.data || []);
        if (Array.isArray(data) && data.length > 0) {
          localStorage.setItem(`cms_fallback_${table}`, JSON.stringify(data));
          return data;
        }
      }
    } catch (err) {
      console.warn(`[CMS CLIENT] Backend fetch for ${table} unavailable, falling back:`, err);
    }

    // 2. Supabase if configured
    if (supabase) {
      try {
        const { data, error } = await supabase.from(table).select('*');
        if (!error && data && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn(`Supabase fetch failed for table ${table}`, err);
      }
    }

    // 3. Cached / Local fallback
    return getFallbackData(table);
  },

  // Insert data with Server persistence
  async insertData(table: string, data: any): Promise<any[]> {
    const newItem = {
      id: data.id || `${table.substring(0, 4)}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
      ...data,
    };

    // 1. Save to Backend Server
    try {
      const res = await fetch(`/api/cms/${table}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      if (res.ok) {
        const savedItem = await res.json();
        const current = getFallbackData(table);
        const updated = [savedItem, ...current.filter((i: any) => i.id !== savedItem.id)];
        setFallbackData(table, updated);
        notifyCmsUpdated();
        return [savedItem];
      }
    } catch (err) {
      console.warn(`[CMS CLIENT] Backend insert failed for ${table}:`, err);
    }

    // 2. Supabase fallback
    if (supabase) {
      try {
        const { data: inserted, error } = await supabase.from(table).insert(newItem).select();
        if (!error && inserted) {
          notifyCmsUpdated();
          return inserted;
        }
      } catch (err) {
        console.warn(`Supabase insert failed for ${table}`, err);
      }
    }

    // 3. Local fallback
    const current = getFallbackData(table);
    const updated = [newItem, ...current];
    setFallbackData(table, updated);
    return [newItem];
  },

  // Update data with Server persistence
  async updateData(table: string, id: string, data: any): Promise<any[]> {
    // 1. Update on Backend Server
    try {
      const res = await fetch(`/api/cms/${table}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const updatedItem = await res.json();
        const current = getFallbackData(table);
        const updated = current.map((item: any) =>
          String(item.id) === String(id) ? { ...item, ...updatedItem } : item
        );
        setFallbackData(table, updated);
        notifyCmsUpdated();
        return [updatedItem];
      }
    } catch (err) {
      console.warn(`[CMS CLIENT] Backend update failed for ${table}/${id}:`, err);
    }

    // 2. Supabase fallback
    if (supabase) {
      try {
        const { data: updated, error } = await supabase.from(table).update(data).eq('id', id).select();
        if (!error && updated) {
          notifyCmsUpdated();
          return updated;
        }
      } catch (err) {
        console.warn(`Supabase update failed for ${table}`, err);
      }
    }

    // 3. Local fallback
    const current = getFallbackData(table);
    const updated = current.map((item: any) => (String(item.id) === String(id) ? { ...item, ...data } : item));
    setFallbackData(table, updated);
    return [data];
  },

  // Delete data with Server persistence
  async deleteData(table: string, id: string): Promise<boolean> {
    // 1. Delete on Backend Server
    try {
      const res = await fetch(`/api/cms/${table}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        const current = getFallbackData(table);
        const updated = current.filter((item: any) => String(item.id) !== String(id));
        setFallbackData(table, updated);
        notifyCmsUpdated();
        return true;
      }
    } catch (err) {
      console.warn(`[CMS CLIENT] Backend delete failed for ${table}/${id}:`, err);
    }

    // 2. Supabase fallback
    if (supabase) {
      try {
        const { error } = await supabase.from(table).delete().eq('id', id);
        if (!error) {
          notifyCmsUpdated();
        }
      } catch (err) {
        console.warn(`Supabase delete failed for ${table}`, err);
      }
    }

    // 3. Local fallback
    const current = getFallbackData(table);
    const updated = current.filter((item: any) => String(item.id) !== String(id));
    setFallbackData(table, updated);
    return true;
  },

  // Permanent server file upload via Backend POST /api/upload
  async uploadFile(bucket: string, file: File, path?: string): Promise<string> {
    let base64Data = '';
    try {
      base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Data,
          fileName: path || file.name,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          return data.url;
        }
      }
    } catch (err) {
      console.warn('[CMS CLIENT] Backend upload failed, checking fallbacks:', err);
    }

    // 2. Supabase storage fallback
    const fileName = path || `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    if (supabase) {
      try {
        const { error } = await supabase.storage.from(bucket).upload(fileName, file, { upsert: true });
        if (!error) {
          const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
          return data.publicUrl;
        }
      } catch (err) {
        console.warn('Supabase storage upload failed', err);
      }
    }

    // 3. Robust Base64 or Object URL fallback
    return base64Data || URL.createObjectURL(file);
  },
};
