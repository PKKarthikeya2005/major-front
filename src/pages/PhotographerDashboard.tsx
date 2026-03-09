import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { usePhotographers } from "../context/PhotographerContext"; // To get profile details
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Calendar, DollarSign, MapPin, Camera } from "lucide-react";
import { motion } from "framer-motion";

export const PhotographerDashboard = () => {
    const { user } = useAuth();
    const { photographers } = usePhotographers();
    const [myBookings, setMyBookings] = useState<any[]>([]);

    // Find the photographer profile linked to this user (by email match or ID)
    // In this mock setup, we assume the user.email helps identify them, 
    // OR we just match the photographer.name if we didn't strictly link them in Auth.
    // For robust logic, we'll try to find a photographer whose ID or Name matches.
    const myProfile = photographers.find(p => p.name === user?.name || p.id === user?.email);

    useEffect(() => {
        if (myProfile) {
            const allBookings = JSON.parse(localStorage.getItem("chitrasetu_bookings") || "[]");
            // Filter bookings meant for THIS photographer
            const relevant = allBookings.filter((b: any) => b.photographerId === myProfile.id || b.photographerName === myProfile.name);
            setMyBookings(relevant);
        }
    }, [myProfile]);

    if (!user) return <div className="text-white pt-32 text-center">Please login.</div>;

    // Fallback if no profile found (e.g. just a regular user trying to access)
    if (!myProfile) {
        return (
            <div className="min-h-screen bg-rich-black pt-32 text-center px-6">
                <h1 className="text-3xl text-white font-playfair mb-4">Photographer Profile Not Found</h1>
                <p className="text-gray-400">Your account "{user.name}" is logged in, but we couldn't match you to a photographer profile in our roster.</p>
                <div className="p-4 bg-white/5 border border-white/10 mt-8 max-w-lg mx-auto rounded-xl">
                    <p className="text-sm text-yellow-500">For Demo: Ensure your User Name matches a Photographer Name exactly, or create a new photographer with your name in the Admin Panel.</p>
                </div>
            </div>
        );
    }

    const totalEarnings = myBookings.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

    return (
        <div className="min-h-screen bg-rich-black text-white pt-24 px-6 relative overflow-hidden">
            <div className="fixed inset-0 bg-noise opacity-[0.05] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-leaf/5 blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto space-y-12 relative z-10 pb-20">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="flex items-center gap-6">
                        <img src={myProfile.image} alt={myProfile.name} className="w-24 h-24 rounded-full border-2 border-gold-leaf object-cover shadow-[0_0_30px_rgba(212,175,55,0.3)]" />
                        <div>
                            <h1 className="font-playfair text-4xl font-bold mb-1">Studio Dashboard</h1>
                            <p className="text-gold-leaf text-lg">{myProfile.name} <span className="text-gray-500 text-sm ml-2">({myProfile.city})</span></p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6 bg-white/[0.03] border-white/10 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400"><DollarSign /></div>
                        <div>
                            <p className="text-gray-400 text-sm uppercase">Total Revenue</p>
                            <p className="text-2xl font-bold text-white">₹{totalEarnings.toLocaleString()}</p>
                        </div>
                    </Card>
                    <Card className="p-6 bg-white/[0.03] border-white/10 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400"><Calendar /></div>
                        <div>
                            <p className="text-gray-400 text-sm uppercase">Assignments</p>
                            <p className="text-2xl font-bold text-white">{myBookings.length}</p>
                        </div>
                    </Card>
                    <Card className="p-6 bg-white/[0.03] border-white/10 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400"><Camera /></div>
                        <div>
                            <p className="text-gray-400 text-sm uppercase">Profile Views</p>
                            <p className="text-2xl font-bold text-white">{myProfile.reviews * 12}</p>
                        </div>
                    </Card>
                </div>

                {/* Bookings Feed */}
                <div className="space-y-6">
                    <h2 className="font-playfair text-3xl font-bold">Upcoming Shoots</h2>
                    {myBookings.length === 0 ? (
                        <p className="text-gray-500 italic">No bookings assigned yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {myBookings.map((b, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Card className="p-6 bg-white/[0.02] border border-white/5 hover:border-gold-leaf/20 transition-all">
                                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold text-white">
                                                    {b.clientName[0]}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg text-white">{b.clientName}</h3>
                                                    <div className="flex gap-4 text-sm text-gray-400">
                                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {b.date}</span>
                                                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Venue Location</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-400">Earnings</p>
                                                    <p className="text-gold-leaf font-bold">₹{b.totalAmount.toLocaleString()}</p>
                                                </div>
                                                <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border-0">
                                                    View Details
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
