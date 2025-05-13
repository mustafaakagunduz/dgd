import { supabase, Essay as SupabaseEssay, Profile } from './supabase';

// Re-export Essay from supabase
export type Essay = SupabaseEssay;

// Essay getirme fonksiyonları
export const getApprovedEssays = async (): Promise<Essay[]> => {
    const { data, error } = await supabase
        .from('essays')
        .select(`
            *,
            profiles(name)
        `)
        .eq('approved', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching approved essays:', error);
        return [];
    }

    return data || [];
};

export const getPendingEssays = async (): Promise<Essay[]> => {
    const { data, error } = await supabase
        .from('essays')
        .select(`
            *,
            profiles(name)
        `)
        .eq('approved', false)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching pending essays:', error);
        return [];
    }

    return data || [];
};

export const getEssaysByUserId = async (userId: string): Promise<Essay[]> => {
    const { data, error } = await supabase
        .from('essays')
        .select(`
            *,
            profiles(name)
        `)
        .eq('author_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching user essays:', error);
        return [];
    }

    return data || [];
};

export const getEssayById = async (id: string): Promise<Essay | null> => {
    const { data, error } = await supabase
        .from('essays')
        .select(`
            *,
            profiles(name)
        `)
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching essay by id:', error);
        return null;
    }

    return data;
};

// Essay oluşturma
export const createEssay = async (essay: {
    title: string;
    summary: string;
    content: string;
    author_id: string;
    image_url?: string;
}): Promise<{ success: boolean; error?: string; essay?: Essay }> => {
    const { data, error } = await supabase
        .from('essays')
        .insert({
            ...essay,
            approved: false, // Default olarak onaysız
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating essay:', error);
        return { success: false, error: error.message };
    }

    return { success: true, essay: data };
};

// Essay güncelleme
export const updateEssay = async (
    id: string,
    updates: {
        title?: string;
        summary?: string;
        content?: string;
        image_url?: string;
    }
): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase
        .from('essays')
        .update({
            ...updates,
            updated_at: new Date().toISOString(),
        })
        .eq('id', id);

    if (error) {
        console.error('Error updating essay:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

// Essay silme
export const deleteEssay = async (id: string): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase
        .from('essays')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting essay:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

// Essay onaylama/reddetme (admin)
export const updateEssayApproval = async (
    id: string,
    approved: boolean
): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase
        .from('essays')
        .update({ approved })
        .eq('id', id);

    if (error) {
        console.error('Error updating essay approval:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

// Resim yükleme (essay resimleri için)
export const uploadEssayImage = async (
    file: File,
    essayId: string
): Promise<{ success: boolean; url?: string; error?: string }> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${essayId}-${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
        .from('essay-images')
        .upload(fileName, file);

    if (error) {
        console.error('Error uploading image:', error);
        return { success: false, error: error.message };
    }

    const { data: urlData } = supabase.storage
        .from('essay-images')
        .getPublicUrl(fileName);

    return { success: true, url: urlData.publicUrl };
};