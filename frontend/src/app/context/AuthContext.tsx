"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { isUserAuthenticated } from "../../../utils/auth";

interface AuthContextType {
    isAuthenticated: boolean | null;
    checkAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: null,
    checkAuth: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    const checkAuth = async () => {
        const result = await isUserAuthenticated();
        setIsAuthenticated(result);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return <AuthContext.Provider value={{ isAuthenticated, checkAuth }}>{children}</AuthContext.Provider>;
};
