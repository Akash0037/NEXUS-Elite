
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    gamertag?: string;
    email: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Restore session from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem('nexus_user');
            if (stored) {
                const parsed = JSON.parse(stored);
                setUser(parsed);
                setIsLoggedIn(true);
            }
        } catch {
            localStorage.removeItem('nexus_user');
        }
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('nexus_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('nexus_user');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
