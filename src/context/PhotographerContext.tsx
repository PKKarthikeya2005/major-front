import React, { createContext, useContext, useState, useEffect } from "react";
import { photographers as initialData } from "../data/photographers";

export interface Photographer {
    id: string;
    name: string;
    role: string;
    city: string;
    price: string;
    description: string;
    image: string;
    rating: number;
    reviews: number;
    portfolio: string[];
    specialty: string;
    whyChosen: string;
    mapQuery: string;
    status: 'approved' | 'pending' | 'rejected'; // Added status
    email?: string;
    password?: string;
}

export interface Booking {
    id: string;
    userId: string;
    photographerId: string;
    photographerName: string;
    photographerImage: string;
    photographerCity: string;
    date: string;
    totalAmount: number;
    status: string;
}

interface PhotographerContextType {
    photographers: Photographer[]; // Only approved
    allPhotographers: Photographer[]; // All (for admin)
    pendingPhotographers: Photographer[]; // Only pending
    bookings: Booking[];
    addPhotographer: (p: Photographer) => void;
    registerPhotographer: (p: Omit<Photographer, "id" | "status" | "rating" | "reviews">) => void;
    approvePhotographer: (id: string) => void;
    rejectPhotographer: (id: string) => void;
    updatePhotographer: (p: Photographer) => void;
    deletePhotographer: (id: string) => void;
    stats: {
        totalPhotographers: number;
        totalBookings: number;
        activeCities: number;
        pendingRequests: number;
    };
}

const PhotographerContext = createContext<PhotographerContextType | undefined>(undefined);

export const PhotographerProvider = ({ children }: { children: React.ReactNode }) => {
    const [photographersList, setPhotographersList] = useState<Photographer[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);

    // 1. Initialize / Seed Data
    useEffect(() => {
        const stored = localStorage.getItem("chitrasetu_photographers");
        if (stored) {
            setPhotographersList(JSON.parse(stored));
        } else {
            // Seed initial data and mark them as APPROVED
            const seeded = initialData.map(p => ({ ...p, status: 'approved' as const }));
            localStorage.setItem("chitrasetu_photographers", JSON.stringify(seeded));
            setPhotographersList(seeded);
        }

        const storedBookings = JSON.parse(localStorage.getItem("chitrasetu_bookings") || "[]");
        setBookings(storedBookings);
    }, []);

    // 2. Persist changes
    const saveToStorage = (newData: Photographer[]) => {
        localStorage.setItem("chitrasetu_photographers", JSON.stringify(newData));
        setPhotographersList(newData);
    };

    // Actions
    const addPhotographer = (p: Photographer) => {
        // Admin force add (auto approved)
        const newRecord = { ...p, status: p.status || 'approved' };
        saveToStorage([...photographersList, newRecord]);
    };

    const registerPhotographer = (data: Omit<Photographer, "id" | "status" | "rating" | "reviews">) => {
        const newRecord: Photographer = {
            ...data,
            id: Date.now().toString(),
            status: 'pending',
            rating: 0, // New users start with 0
            reviews: 0
        };
        saveToStorage([...photographersList, newRecord]);
    };

    const approvePhotographer = (id: string) => {
        const photographer = photographersList.find(p => p.id === id);

        if (photographer && photographer.email && photographer.password) {
            // REGISTER USER IN AUTH DB
            const usersDb = JSON.parse(localStorage.getItem("chitrasetu_users_db") || "[]");
            // Check if user already exists
            if (!usersDb.find((u: any) => u.email === photographer.email)) {
                usersDb.push({
                    id: photographer.email,
                    name: photographer.name,
                    email: photographer.email,
                    role: 'photographer',
                    password: photographer.password
                });
                localStorage.setItem("chitrasetu_users_db", JSON.stringify(usersDb));
                console.log("User account created for:", photographer.email);
            }
        }

        const newData = photographersList.map(p => p.id === id ? { ...p, status: 'approved' as const } : p);
        saveToStorage(newData);

        // SYNC WITH "BACKEND TABLE" photographers_photographer
        try {
            const photographerToInsert = newData.find(p => p.id === id);
            if (photographerToInsert) {
                const dbKey = "photographers_photographer";
                const currentDb = JSON.parse(localStorage.getItem(dbKey) || "[]");

                // Avoid duplicates based on ID
                if (!currentDb.find((p: any) => p.id === photographerToInsert.id)) {
                    const updatedDb = [...currentDb, photographerToInsert];
                    localStorage.setItem(dbKey, JSON.stringify(updatedDb));
                    console.log(`Successfully inserted into ${dbKey}`, photographerToInsert);
                }
            }
        } catch (err) {
            console.error("Failed to update photographers_photographer DB:", err);
        }
    };

    const rejectPhotographer = (id: string) => {
        try {
            console.log("Rejecting (Deleting) ID:", id);
            const newData = photographersList.filter(p => p.id !== id);
            saveToStorage(newData);
        } catch (error) {
            console.error("Failed to reject photographer:", error);
        }
    };

    const updatePhotographer = (updated: Photographer) => {
        const newData = photographersList.map(p => p.id === updated.id ? updated : p);
        saveToStorage(newData);
    };

    const deletePhotographer = (id: string) => {
        try {
            console.log("Attempting to delete ID:", id);
            if (!id) {
                console.error("Error: ID is undefined or null");
                alert("Error: Cannot delete, ID is missing.");
                return;
            }
            const newData = photographersList.filter(p => p.id !== id);
            saveToStorage(newData);
            console.log("Deleted successfully. New list size:", newData.length);
        } catch (error) {
            console.error("Failed to delete photographer:", error);
            alert("Failed to delete photographer. Check console for details.");
        }
    };

    // Derived States
    const approvedPhotographers = photographersList.filter(p => p.status === 'approved' || !p.status); // specific fallback for legacy data
    const pendingPhotographers = photographersList.filter(p => p.status === 'pending');

    const stats = {
        totalPhotographers: approvedPhotographers.length,
        totalBookings: bookings.length,
        activeCities: new Set(approvedPhotographers.map(p => p.city)).size,
        pendingRequests: pendingPhotographers.length
    };

    return (
        <PhotographerContext.Provider value={{
            photographers: approvedPhotographers,
            allPhotographers: photographersList,
            pendingPhotographers,
            bookings,
            addPhotographer,
            registerPhotographer,
            approvePhotographer,
            rejectPhotographer,
            updatePhotographer,
            deletePhotographer,
            stats
        }}>
            {children}
        </PhotographerContext.Provider>
    );
};

export const usePhotographers = () => {
    const context = useContext(PhotographerContext);
    if (!context) throw new Error("usePhotographers must be used within PhotographerProvider");
    return context;
};
