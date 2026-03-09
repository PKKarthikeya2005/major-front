import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
    id: string; // email as id for simplicity
    name: string;
    email: string;
    role: 'client' | 'photographer' | 'admin';
    password?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (userData: User) => Promise<boolean>;
    logout: () => void;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // 1. Rehydrate from "chitrasetu_user" (User Request Requirement)
    const [user, setUser] = useState<User | null>(() => {
        try {
            const storedUser = localStorage.getItem("chitrasetu_user");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (e) {
            console.error("Failed to parse user from local storage", e);
            return null;
        }
    });
    const [error, setError] = useState<string | null>(null);

    // 2. Initialize "chitrasetu_users_db" if empty
    useEffect(() => {
        const db = localStorage.getItem("chitrasetu_users_db");
        if (!db) {
            const initialUsers: User[] = [
                { id: "admin@chitrasetu.com", name: "System Admin", email: "admin@chitrasetu.com", role: "admin", password: "admin" }, // DEMO PASSWORD: admin
                { id: "demo@client.com", name: "Demo Client", email: "demo@client.com", role: "client", password: "demo" } // DEMO PASSWORD: demo
            ];
            localStorage.setItem("chitrasetu_users_db", JSON.stringify(initialUsers));
        }
    }, []);

    // 3. Persist Session changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("chitrasetu_user", JSON.stringify(user));
        } else {
            localStorage.removeItem("chitrasetu_user");
        }
    }, [user]);

    const login = async (email: string, password: string): Promise<boolean> => {
        setError(null);
        await new Promise(resolve => setTimeout(resolve, 800)); // Cinematic delay

        const db = JSON.parse(localStorage.getItem("chitrasetu_users_db") || "[]");
        const foundUser = db.find((u: User) => u.email === email && u.password === password);

        if (foundUser) {
            const { password, ...safeUser } = foundUser;
            setUser(safeUser);
            return true;
        } else {
            setError("Invalid email or password.");
            return false;
        }
    };

    const signup = async (userData: User): Promise<boolean> => {
        setError(null);
        await new Promise(resolve => setTimeout(resolve, 800));

        const db = JSON.parse(localStorage.getItem("chitrasetu_users_db") || "[]");

        // Basic Check
        if (db.find((u: User) => u.email === userData.email)) {
            setError("User already exists with this email.");
            return false;
        }

        const newUser = { ...userData, id: userData.email };
        db.push(newUser);
        localStorage.setItem("chitrasetu_users_db", JSON.stringify(db));

        const { password, ...safeUser } = newUser;
        setUser(safeUser);
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("chitrasetu_user");
        window.location.href = "/";
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
