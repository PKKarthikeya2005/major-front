import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, CheckCircle, MapPin, Search } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useEffect, useState } from "react";
import { BookingTimeline } from "../components/BookingTimeline";
import { useAuth } from "../context/AuthContext";

interface BookingData {
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

export const MyBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState<BookingData[]>([]);

    useEffect(() => {
        if (user) {
            const allBookings = JSON.parse(localStorage.getItem("chitrasetu_bookings") || "[]");
            // Filter: Bookings made BY this user
            const userBookings = allBookings.filter((b: BookingData) => b.userId === user.id);
            setBookings(userBookings);
        }
    }, [user]);

    if (!user) {
        return <div className="min-h-screen bg-rich-black flex items-center justify-center text-white">Please log in to view bookings.</div>;
    }

    return (
        <div className="min-h-screen bg-rich-black text-white pt-24 pb-20 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none fixed" />

            <div className="absolute top-20 left-10 w-[300px] h-[300px] bg-gold-leaf/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto space-y-12 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-2">My Bookings</h1>
                        <p className="text-gray-400 font-light">Welcome back, {user.name}. Here are your upcoming shoots.</p>
                    </motion.div>

                    <Link to="/photographers">
                        <Button variant="outline" className="border-white/10 hover:border-gold-leaf/50 text-gold-leaf">
                            <Search className="w-4 h-4 mr-2" /> Book New
                        </Button>
                    </Link>
                </div>

                {/* Bookings List */}
                <div className="space-y-8">
                    {bookings.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-24 bg-white/[0.02] border border-white/5 rounded-xl border-dashed"
                        >
                            <p className="text-gray-500 mb-6 font-light text-lg">You haven't made any bookings yet.</p>
                            <Link to="/photographers">
                                <Button size="lg" className="bg-gold-leaf text-black font-bold shadow-lg hover:shadow-gold-leaf/20">Find a Photographer</Button>
                            </Link>
                        </motion.div>
                    ) : (
                        bookings.map((booking, index) => (
                            <motion.div
                                key={booking.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="overflow-hidden bg-white/[0.03] border-white/10 hover:border-gold-leaf/30 transition-all group relative shadow-xl">
                                    <div className="absolute top-0 right-0 p-4">
                                        <div className="flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-green-500/20">
                                            <CheckCircle className="w-3 h-3" /> {booking.status}
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-8 p-8">
                                        {/* Image */}
                                        <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0 relative border border-white/10">
                                            <img
                                                src={booking.photographerImage}
                                                alt={booking.photographerName}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 space-y-6">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-playfair text-2xl text-white font-medium mb-1">{booking.photographerName}</h3>
                                                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                                                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {booking.photographerCity}</span>
                                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {booking.date || "Date Pending"}</span>
                                                    </div>
                                                </div>
                                                <span className="text-gold-leaf font-bold text-xl">₹{booking.totalAmount.toLocaleString()}</span>
                                            </div>

                                            {/* Integrated Timeline */}
                                            <div className="pt-2 border-t border-white/5">
                                                <BookingTimeline status={booking.status} date={booking.date || "Upcoming"} />
                                            </div>

                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
