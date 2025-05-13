"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { users, User, UserRole } from '@/lib/users';

interface AuthContextType {
    isLoggedIn: boolean;
    currentUser: User | null;
    userRole: UserRole | null;
    isAdmin: boolean;
    login: (email: string, password: string) => boolean;
    signup: (email: string, password: string, name?: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    // LocalStorage'dan logged in durumu kontrol et
    useEffect(() => {
        try {
            const savedUser = localStorage.getItem("currentUser");
            if (savedUser) {
                const user = JSON.parse(savedUser);
                setCurrentUser(user);
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error("Error accessing localStorage:", error);
        }
    }, []);

    const login = (email: string, password: string): boolean => {
        const user = users.find(
            u => u.email === email && u.password === password
        );

        if (user) {
            setCurrentUser(user);
            setIsLoggedIn(true);
            try {
                localStorage.setItem("currentUser", JSON.stringify(user));
            } catch (error) {
                console.error("Error saving to localStorage:", error);
            }
            return true;
        }
        return false;
    };

    const signup = (email: string, password: string, name?: string): boolean => {
        // Kullanıcı zaten var mı kontrol et
        const existingUser = users.find(
            u => u.email === email
        );

        if (existingUser) {
            return false;
        }

        // Yeni kullanıcı oluştur (default olarak "user" rolü ve emailVerified: false)
        const newUser: User = {
            id: String(users.length + 1),
            email,
            password,
            role: "user", // Default role
            emailVerified: false, // Default emailVerifiedasdsad
            name: name || email // Use provided name or fallback to email
        };

        users.push(newUser);
        setCurrentUser(newUser);
        setIsLoggedIn(true);

        try {
            localStorage.setItem("currentUser", JSON.stringify(newUser));
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }

        return true;
    };

    const logout = () => {
        setCurrentUser(null);
        setIsLoggedIn(false);
        try {
            localStorage.removeItem("currentUser");
        } catch (error) {
            console.error("Error accessing localStorage:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                currentUser,
                userRole: currentUser?.role || null,
                isAdmin: currentUser?.role === "admin",
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