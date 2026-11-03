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
        } else if ((table === 'profiles' || table === 'hero' || table === 'about') && parsed.length > 0) {
          if (parsed[0] && (!parsed[0].avatarUrl || parsed[0].avatarUrl.includes('i.pinimg.com'))) {
            parsed[0].avatarUrl = '/assets/images/mushahid_admin_profile.jpg';
          }
          return parsed;
        } else {
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
      technologies: p.technologies || [],
      imageUrl: p.imageUrl || p.image,
      link: p.liveUrl || p.githubUrl || '#',
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
  // Fetch data
  async fetchData(table: string) {
    if (supabase) {
      try {
        const { data, error } = await supabase.from(table).select('*');
        if (!error && data && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn(`Supabase fetch failed for table ${table}, using fallback storage`, err);
      }
    }
    return getFallbackData(table);
  },

  // Insert data
  async insertData(table: string, data: any) {
    const newItem = {
      id: data.id || `item_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
      ...data,
    };

    if (supabase) {
      try {
        const { data: inserted, error } = await supabase.from(table).insert(newItem).select();
        if (!error && inserted) {
          notifyCmsUpdated();
          return inserted;
        }
      } catch (err) {
        console.warn(`Supabase insert failed for ${table}, using local fallback`, err);
      }
    }

    const current = getFallbackData(table);
    const updated = [newItem, ...current];
    setFallbackData(table, updated);
    return [newItem];
  },

  // Update data
  async updateData(table: string, id: string, data: any) {
    if (supabase) {
      try {
        const { data: updated, error } = await supabase.from(table).update(data).eq('id', id).select();
        if (!error && updated) {
          notifyCmsUpdated();
          return updated;
        }
      } catch (err) {
        console.warn(`Supabase update failed for ${table}, using local fallback`, err);
      }
    }

    const current = getFallbackData(table);
    const updated = current.map((item: any) => (item.id === id ? { ...item, ...data } : item));
    setFallbackData(table, updated);
    return [data];
  },

  // Delete data
  async deleteData(table: string, id: string) {
    if (supabase) {
      try {
        const { error } = await supabase.from(table).delete().eq('id', id);
        if (!error) {
          notifyCmsUpdated();
        }
      } catch (err) {
        console.warn(`Supabase delete failed for ${table}, using local fallback`, err);
      }
    }

    const current = getFallbackData(table);
    const updated = current.filter((item: any) => String(item.id) !== String(id));
    setFallbackData(table, updated);
    return true;
  },

  // Upload file or image
  async uploadFile(bucket: string, file: File, path?: string) {
    const fileName = path || `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    if (supabase) {
      try {
        const { error } = await supabase.storage.from(bucket).upload(fileName, file, { upsert: true });
        if (!error) {
          const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
          return data.publicUrl;
        }
      } catch (err) {
        console.warn('Supabase file upload failed, creating object URL fallback', err);
      }
    }
    return URL.createObjectURL(file);
  },
};
