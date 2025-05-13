import { supabase, Comment as SupabaseComment, Profile } from './supabase';

// Re-export Comment from supabase
export type Comment = SupabaseComment;

// Yorumları getirme fonksiyonları
export const getCommentsByEssayId = async (essayId: string): Promise<Comment[]> => {
    const { data, error } = await supabase
        .from('comments')
        .select(`
            *,
            profiles(name)
        `)
        .eq('essay_id', essayId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching comments:', error);
        return [];
    }

    return data || [];
};

export const getCommentsByUserId = async (userId: string): Promise<Comment[]> => {
    const { data, error } = await supabase
        .from('comments')
        .select(`
            *,
            profiles(name)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching user comments:', error);
        return [];
    }

    return data || [];
};

export const getCommentsByEssayAndUser = async (
    essayId: string,
    userId: string
): Promise<Comment[]> => {
    const { data, error } = await supabase
        .from('comments')
        .select(`
            *,
            profiles(name)
        `)
        .eq('essay_id', essayId)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching comments by essay and user:', error);
        return [];
    }

    return data || [];
};

// Yorum sayısını getirme
export const getCommentCount = async (essayId: string): Promise<number> => {
    const { count, error } = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true })
        .eq('essay_id', essayId);

    if (error) {
        console.error('Error getting comment count:', error);
        return 0;
    }

    return count || 0;
};

// Yorum oluşturma
export const createComment = async (comment: {
    essay_id: string;
    user_id: string;
    content: string;
}): Promise<{ success: boolean; error?: string; comment?: Comment }> => {
    const { data, error } = await supabase
        .from('comments')
        .insert(comment)
        .select(`
            *,
            profiles(name)
        `)
        .single();

    if (error) {
        console.error('Error creating comment:', error);
        return { success: false, error: error.message };
    }

    return { success: true, comment: data };
};

// Yorum güncelleme
export const updateComment = async (
    id: string,
    content: string
): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase
        .from('comments')
        .update({ content })
        .eq('id', id);

    if (error) {
        console.error('Error updating comment:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

// Yorum silme
export const deleteComment = async (id: string): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting comment:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
};