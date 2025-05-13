import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Profile {
    id: string
    email: string
    name: string
    role: 'admin' | 'user'
    email_verified: boolean
    created_at: string
}

export interface Essay {
    id: string
    title: string
    summary: string
    content: string
    image_url?: string
    author_id: string
    approved: boolean
    created_at: string
    updated_at: string
    profiles?: Profile // JOIN edilen author bilgisi
}

export interface Comment {
    id: string
    essay_id: string
    user_id: string
    content: string
    created_at: string
    profiles?: Profile // JOIN edilen author bilgisi
}