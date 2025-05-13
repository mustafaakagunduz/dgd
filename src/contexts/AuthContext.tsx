"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { supabase, Profile } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
    isLoggedIn: boolean;
    currentUser: Profile | null;
    user: User | null; // Supabase auth user
    userRole: 'admin' | 'user' | null;
    isAdmin: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [currentUser, setCurrentUser] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initial session check
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchUserProfile(session.user.id);
            } else {
                setLoading(false);
            }
        });

        // Auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            setUser(session?.user ?? null);

            if (session?.user) {
                await fetchUserProfile(session.user.id);
            } else {
                setCurrentUser(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchUserProfile = async (userId: string) => {
        try {
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('Error fetching profile:', error);
                setLoading(false);
                return;
            }

            setCurrentUser(profile);
        } catch (error) {
            console.error('Error in fetchUserProfile:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                return { success: false, error: error.message };
            }

            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Giriş yapılırken bir hata oluştu' };
        }
    };

    const signup = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name: name, // Bu trigger tarafından kullanılacak
                    }
                }
            });

            if (error) {
                return { success: false, error: error.message };
            }

            // Artık manuel profil oluşturmaya gerek yok, trigger hallediyor

            return { success: true };
        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, error: 'Kayıt olurken bir hata oluştu' };
        }
    };
    const logout = async () => {
        await supabase.auth.signOut();
        setCurrentUser(null);
        setUser(null);
    };

    const isLoggedIn = !!user;
    const userRole = currentUser?.role || null;
    const isAdmin = userRole === 'admin';

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                currentUser,
                user,
                userRole,
                isAdmin,
                loading,
                login,
                signup,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};