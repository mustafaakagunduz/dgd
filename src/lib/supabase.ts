// src/lib/supabase.ts - Güçlendirilmiş Supabase bağlantısı
import { createClient } from '@supabase/supabase-js';

// Ortam değişkenlerinin kontrolü
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Ortam değişkenlerinin doğruluğunu kontrol et
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL veya Anon Key tanımlı değil! Lütfen .env dosyasını kontrol edin.');
}

// Supabase istemcisini oluştur
export const supabase = createClient(
    supabaseUrl || '',
    supabaseAnonKey || '',
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
        },
        // Başarısız ağ isteklerini yeniden denemek için
        global: {
            fetch: (...args) => {
                return fetch(...args);
            },
        },
    }
);

// Veri tipleri
export interface Profile {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
    email_verified: boolean;
    created_at: string;
}

export interface Essay {
    id: string;
    title: string;
    summary: string;
    content: string;
    image_url?: string;
    author_id: string;
    approved: boolean;
    created_at: string;
    updated_at: string;
    profiles?: Profile; // JOIN edilen author bilgisi
}

export interface Comment {
    id: string;
    essay_id: string;
    user_id: string;
    content: string;
    created_at: string;
    profiles?: Profile; // JOIN edilen author bilgisi
}

// Supabase bağlantı testi
export const testSupabaseConnection = async (): Promise<boolean> => {
    try {
        // Basit bir sorgu ile bağlantıyı test et
        const { data, error } = await supabase.from('profiles').select('count');

        if (error) {
            console.error('Supabase bağlantı testi başarısız:', error);
            return false;
        }

        console.log('Supabase bağlantı testi başarılı!');
        return true;
    } catch (err) {
        console.error('Supabase bağlantı testi beklenmeyen bir hata ile karşılaştı:', err);
        return false;
    }
};