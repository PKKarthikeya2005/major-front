import { useParams, Link } from "react-router-dom";
import { photographers } from "../data/photographers";
import { Button } from "../components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, Share2, Shield, Camera, Image as ImageIcon, X, Quote } from "lucide-react";
import { Card } from "../components/ui/Card";
import { useState } from "react";
import { MapPlaceholder } from "../components/MapPlaceholder"; // Imported

export const Profile = () => {
    const { id } = useParams();
    const photographer = photographers.find(p => p.id === id);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (!photographer) {
        return <div className="min-h-screen bg-rich-black flex items-center justify-center text-white">Photographer not found.</div>;
    }

    return (
        <div className="min-h-screen bg-rich-black text-white relative">
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none fixed" />

            {/* --- HERO BANNER (Cinematic Parallax Feel) --- */}
            <div className="h-[70vh] relative overflow-hidden">
                <div className="absolute inset-0 bg-rich-black/40 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-rich-black/60 to-transparent z-10" />
                <motion.img
                    initial={{ scale: 1.15, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    src={photographer.image}
                    alt={photographer.name}
                    className="w-full h-full object-cover object-top"
                />

                {/* Hero Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full z-20 px-6 pb-24">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="space-y-4"
                        >
                            <span className="inline-block px-4 py-1 border border-gold-leaf/50 rounded-full text-gold-leaf text-sm font-bold uppercase tracking-widest bg-black/40 backdrop-blur-md">
                                {photographer.role}
                            </span>
                            <h1 className="font-playfair text-6xl md:text-8xl font-medium text-white tracking-tight drop-shadow-2xl">
                                {photographer.name}
                            </h1>
                            <div className="flex items-center gap-6 text-gray-300 text-lg">
                                <span className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-gold-leaf" /> {photographer.city}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-gold-leaf fill-gold-leaf" /> {photographer.rating} <span className="text-gray-500">({photographer.reviews} Verified Reviews)</span>
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* --- CONTENT CONTAINER --- */}
            <div className="max-w-6xl mx-auto px-6 relative z-20 space-y-20 pb-20">

                {/* 1. INFO & BOOKING GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-12">
                    {/* LEFT: BIO & ENDORSEMENT & MAP */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Bio Section */}
                        <div className="prose prose-invert max-w-none">
                            <h3 className="text-2xl font-playfair text-gold-leaf mb-6 flex items-center gap-3">
                                <Camera className="w-6 h-6" /> The Artist's Vision
                            </h3>
                            <p className="text-xl text-gray-300 font-light leading-relaxed">
                                {photographer.description}
                            </p>
                            <div className="mt-8 p-6 bg-white/[0.02] border-l-2 border-gold-leaf rounded-r-xl italic text-gray-400">
                                "Photography is not just about capturing a moment, it's about preserving the feeling forever. My approach combines technical precision with an artistic eye to create images that are timeless, emotive, and uniquely yours."
                            </div>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { k: "Camera System", v: "Sony Alpha 1" },
                                { k: "Lenses", v: "G Master Prime" },
                                { k: "Experience", v: "5+ Years" },
                                { k: "Deliverables", v: "Raw + Edited" }
                            ].map((item, i) => (
                                <div key={i} className="bg-white/[0.03] border border-white/5 p-4 rounded-xl">
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{item.k}</p>
                                    <p className="text-white font-medium">{item.v}</p>
                                </div>
                            ))}
                        </div>

                        {/* Why We Chose Them (Curator's Note) */}
                        <div className="bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                            <Quote className="absolute top-4 right-4 text-white/5 w-24 h-24" />
                            <h3 className="text-xl font-playfair text-white mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-gold-leaf flex items-center justify-center text-black text-xs font-bold">C</span>
                                Curator's Note
                            </h3>
                            <p className="text-gray-300 font-light leading-relaxed relative z-10">
                                "{photographer.name.split(' ')[0]} was selected for the Elite Roster due to their exceptional command of natural light and consistent ability to deliver emotive, high-end editorial compositions. Their client satisfaction score is in the top 1% of our network."
                            </p>
                        </div>

                        {/* Map Section */}
                        <div>
                            <h3 className="text-2xl font-playfair text-white mb-6 flex items-center gap-3">
                                <MapPin className="w-6 h-6 text-gold-leaf" /> Location Base
                            </h3>
                            <MapPlaceholder city={photographer.city} />
                        </div>
                    </div>

                    {/* RIGHT: STICKY BOOKING CARD */}
                    <div className="lg:col-span-1 relative">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                            className="sticky top-24"
                        >
                            <Card className="bg-rich-black/80 backdrop-blur-xl border-white/10 p-8 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gold-leaf/10 blur-[60px] rounded-full group-hover:bg-gold-leaf/20 transition-colors duration-700" />

                                <div className="relative z-10 space-y-8">
                                    <div className="flex justify-between items-end border-b border-white/10 pb-6">
                                        <div>
                                            <p className="text-gray-400 text-sm mb-1">Daily Rate</p>
                                            <p className="text-4xl font-playfair text-white">{photographer.price}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                                                <Shield className="w-3 h-3" /> Verified Pro
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <Link to={`/booking/${photographer.id}`} className="block">
                                            <Button size="lg" className="w-full bg-gold-leaf text-rich-black hover:bg-white font-bold py-6 text-lg tracking-widest uppercase shadow-[0_0_20px_-5px_rgba(212,175,55,0.4)] hover:shadow-gold-leaf/60 hover:scale-[1.02] transition-all">
                                                Claim This Artist
                                            </Button>
                                        </Link>
                                        <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:text-white text-gray-400">
                                            <Share2 className="w-4 h-4 mr-2" /> Share Profile
                                        </Button>
                                    </div>

                                    <div className="text-center space-y-2">
                                        <p className="text-xs text-gray-500">100% Secure Payment • Satisfaction Guaranteed</p>
                                        <p className="text-xs text-gray-500">Free cancellation up to 48 hours before shoot.</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>

                {/* 2. PORTFOLIO WORK SECTION (Using Real Data) */}
                <div className="space-y-8 pt-12 border-t border-white/10">
                    <div className="flex items-end justify-between">
                        <h2 className="text-3xl font-playfair text-white flex items-center gap-3">
                            <ImageIcon className="w-6 h-6 text-gold-leaf" /> Featured Portfolio
                        </h2>
                        <span className="text-gray-500 text-sm">Tap image to view</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {photographer.portfolio?.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="aspect-[3/4] md:aspect-[4/3] relative group overflow-hidden rounded-xl cursor-pointer"
                                onClick={() => setSelectedImage(img)}
                            >
                                <div className="absolute inset-0 bg-rich-black/20 group-hover:bg-transparent transition-all z-10" />
                                <img
                                    src={img}
                                    alt={`Portfolio ${i + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 group-hover:ring-gold-leaf/50 transition-all rounded-xl z-20" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* LIGHTBOX */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        key="lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="absolute top-6 right-6 text-white/50 hover:text-white">
                            <X className="w-8 h-8" />
                        </button>
                        <motion.img
                            key={selectedImage}
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            src={selectedImage}
                            alt="Full screen portfolio"
                            className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-lg border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
