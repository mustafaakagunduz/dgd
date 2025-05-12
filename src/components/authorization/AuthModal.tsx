"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const { t } = useLanguage();
    const { login, signup } = useAuth();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (isLoginMode) {
            const success = login(formData.email, formData.password);
            if (success) {
                onClose();
                setFormData({ email: '', password: '', confirmPassword: '' });
            } else {
                setError(t("auth.error.invalidCredentials"));
            }
        } else {
            if (formData.password !== formData.confirmPassword) {
                setError(t("auth.error.passwordMismatch"));
                return;
            }

            const success = signup(formData.email, formData.password);
            if (success) {
                onClose();
                setFormData({ email: '', password: '', confirmPassword: '' });
            } else {
                setError(t("auth.error.userExists"));
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-white/20"
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                        {isLoginMode ? t("auth.login.title") : t("auth.signup.title")}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Notice */}
                <p className="text-gray-300 text-center mb-6">
                    {t("auth.notice")}
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            {t("auth.email")}
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            {t("auth.password")}
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-400"
                            required
                        />
                    </div>

                    {!isLoginMode && (
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                {t("auth.confirmPassword")}
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-400"
                                required
                            />
                        </div>
                    )}

                    {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-400 hover:to-green-500 transition-all duration-300"
                    >
                        {isLoginMode ? t("auth.login.button") : t("auth.signup.button")}
                    </button>
                </form>

                {/* Switch Mode */}
                <div className="mt-4 text-center">
                    <button
                        onClick={() => {
                            setIsLoginMode(!isLoginMode);
                            setError('');
                            setFormData({ email: '', password: '', confirmPassword: '' });
                        }}
                        className="text-green-400 hover:text-green-300 transition-colors"
                    >
                        {isLoginMode ? t("auth.switchToSignup") : t("auth.switchToLogin")}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthModal;