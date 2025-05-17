// src/lib/essays.ts - Hata yönetimi iyileştirilmiş sürüm
import { supabase, Essay as SupabaseEssay, testSupabaseConnection } from './supabase';

// Re-export Essay from supabase
export type Essay = SupabaseEssay;

// Essay getirme fonksiyonları - gelişmiş hata yönetimi ile
export const getApprovedEssays = async (): Promise<Essay[]> => {
    try {
        // İlk olarak bağlantıyı kontrol et
        const isConnected = await testSupabaseConnection();
        if (!isConnected) {
            throw new Error('Veritabanı bağlantısı kurulamadı');
        }

        // RPC çağrısında timeout ayarla
        const timeoutPromise = new Promise<null>((_, reject) => {
            setTimeout(() => reject(new Error('Veritabanı sorgusu zaman aşımına uğradı')), 10000);
        });

        // Asıl veri çekme işlemi
        const dataPromise = supabase
            .from('essays')
            .select(`
                *,
                profiles(name)
            `)
            .eq('approved', true)
            .order('created_at', { ascending: false });

        // İki promise'i yarıştır
        const { data, error } = await Promise.race([
            dataPromise,
            timeoutPromise.then(() => ({ data: null, error: new Error('Timeout') })),
        ]) as any;

        // Hata kontrolü
        if (error) {
            console.error('Onaylı makaleleri getirirken hata oluştu:', error);
            console.error('Hata detayları:', JSON.stringify(error, null, 2));
            throw error;
        }

        // Veriyi kontrol et
        if (!data) {
            console.warn('Veri bulunamadı veya boş dizi döndü');
            return [];
        }

        return data;
    } catch (error) {
        console.error('Onaylı makaleleri getirirken beklenmeyen bir hata oluştu:', error);

        // Fallback olarak sabit veri dön
        return getFallbackEssays();
    }
};

// Diğer fonksiyonların iyileştirilmiş sürümleri...
export const getPendingEssays = async (): Promise<Essay[]> => {
    try {
        const { data, error } = await supabase
            .from('essays')
            .select(`
                *,
                profiles(name)
            `)
            .eq('approved', false)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Onay bekleyen makaleleri getirirken hata oluştu:', error);
            throw error;
        }

        return data || [];
    } catch (error) {
        console.error('Onay bekleyen makaleleri getirirken beklenmeyen bir hata oluştu:', error);
        return [];
    }
};

export const getEssaysByUserId = async (userId: string): Promise<Essay[]> => {
    if (!userId) {
        console.error('Kullanıcı ID\'si belirtilmedi');
        return [];
    }

    try {
        const { data, error } = await supabase
            .from('essays')
            .select(`
                *,
                profiles(name)
            `)
            .eq('author_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error(`Kullanıcı (${userId}) makalelerini getirirken hata oluştu:`, error);
            throw error;
        }

        return data || [];
    } catch (error) {
        console.error(`Kullanıcı (${userId}) makalelerini getirirken beklenmeyen bir hata oluştu:`, error);
        return [];
    }
};

export const getEssayById = async (id: string): Promise<Essay | null> => {
    if (!id) {
        console.error('Makale ID\'si belirtilmedi');
        return null;
    }

    try {
        const { data, error } = await supabase
            .from('essays')
            .select(`
                *,
                profiles(name)
            `)
            .eq('id', id)
            .single();

        if (error) {
            console.error(`ID'si ${id} olan makaleyi getirirken hata oluştu:`, error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error(`ID'si ${id} olan makaleyi getirirken beklenmeyen bir hata oluştu:`, error);
        return null;
    }
};

// Resim optimizasyon fonksiyonu - mevcut
const compressImage = (file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            reject(new Error('Canvas context not available'));
            return;
        }

        const img = new Image();

        img.onload = () => {
            try {
                // Aspect ratio'yu koruyarak resize et
                const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;

                // Resmi çiz ve sıkıştır
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('Failed to compress image'));
                    }
                }, 'image/jpeg', quality);
            } catch (error) {
                reject(error);
            }
        };

        img.onerror = () => {
            reject(new Error('Failed to load image'));
        };

        img.src = URL.createObjectURL(file);
    });
};

// Eski fonksiyonlar da korundu...
export const createEssayWithImage = async (essayData: {
    title: string;
    summary: string;
    content: string;
    author_id: string;
    image?: File;
}): Promise<{ success: boolean; error?: string; essay?: Essay }> => {
    try {
        // 1. Essay'i tam verilerle oluştur (image_url hariç)
        const { data: insertData, error: insertError } = await supabase
            .from('essays')
            .insert({
                title: essayData.title,
                summary: essayData.summary,
                content: essayData.content,
                author_id: essayData.author_id,
                approved: false
            })
            .select('*')
            .single();

        if (insertError || !insertData) {
            console.error('Essay insert error:', insertError);
            return { success: false, error: insertError?.message || 'Veri eklenemedi' };
        }

        // 2. Resim varsa upload et
        if (essayData.image) {
            try {
                const compressedBlob = await compressImage(essayData.image);
                const compressedFile = new File([compressedBlob], essayData.image.name, {
                    type: 'image/jpeg',
                    lastModified: Date.now()
                });

                const imageResult = await uploadEssayImage(compressedFile, insertData.id);

                if (imageResult.success && imageResult.url) {
                    const { error: updateError, data: updatedData } = await supabase
                        .from('essays')
                        .update({ image_url: imageResult.url })
                        .eq('id', insertData.id)
                        .select('*')
                        .single();

                    if (updateError || !updatedData) {
                        console.warn('Image uploaded but essay update failed:', updateError);
                        return { success: true, essay: insertData };
                    }

                    return { success: true, essay: updatedData };
                } else {
                    console.warn('Image upload failed:', imageResult.error);
                }
            } catch (err) {
                console.error('Image compress/upload error:', err);
            }
        }

        return { success: true, essay: insertData };
    } catch (error) {
        console.error('createEssayWithImage failed:', error);
        return { success: false, error: 'Makaleyi oluştururken beklenmeyen bir hata oluştu.' };
    }
};

// Eski fonksiyonlar aynı şekilde korundu
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
            approved: false,
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating essay:', error);
        return { success: false, error: error.message };
    }

    return { success: true, essay: data };
};

// Diğer fonksiyonlar aynı şekilde korundu
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

export const uploadEssayImage = async (
    file: File,
    essayId: string
): Promise<{ success: boolean; url?: string; error?: string }> => {
    try {
        const fileExt = file.name.split('.').pop() || 'jpg';
        const fileName = `${essayId}-${Date.now()}.${fileExt}`;

        // Chunked upload için büyük dosyalar
        const { data, error } = await supabase.storage
            .from('essay-images')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false,
                contentType: file.type
            });

        if (error) {
            console.error('Error uploading image:', error);
            return { success: false, error: error.message };
        }

        const { data: urlData } = supabase.storage
            .from('essay-images')
            .getPublicUrl(fileName);

        return { success: true, url: urlData.publicUrl };
    } catch (error) {
        console.error('Error in uploadEssayImage:', error);
        return { success: false, error: 'Image upload failed' };
    }
};

// Fallback veri - Supabase bağlantısı başarısız olduğunda kullanılır
const getFallbackEssays = (): Essay[] => {
    return [
        {
            id: 'fallback-1',
            title: 'Bağlantı Hatası',
            summary: 'Veritabanına bağlantı kurulamadı. Lütfen daha sonra tekrar deneyiniz.',
            content: '<p>Veritabanına bağlantı kurulamadı. Lütfen daha sonra tekrar deneyiniz.</p>',
            author_id: 'system',
            approved: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            profiles: {
                id: 'system',
                email: 'system@dgd.com',
                name: 'Sistem',
                role: 'admin',
                email_verified: true,
                created_at: new Date().toISOString()
            }
        }
    ];
};