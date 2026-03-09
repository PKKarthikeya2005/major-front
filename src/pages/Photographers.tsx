import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Filter, MapPin, Star, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { usePhotographers } from "../context/PhotographerContext";

export const Photographers = () => {
    const { photographers } = usePhotographers(); // USE CONTEXT
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Extract unique values for filters
    const cities: string[] = Array.from(new Set(photographers.map((p) => p.city || "Unknown")));

    const filteredPhotographers = photographers.filter(p => {
        const roleMatch = selectedRole ? p.role.includes(selectedRole) : true;
        const cityMatch = selectedCity ? p.city === selectedCity : true;
        return roleMatch && cityMatch;
    });

    return (
        <div className="min-h-screen bg-rich-black text-white pt-24 pb-20 px-6 relative">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-leaf/5 blur-[150px] pointer-events-none fixed" />

            <div className="max-w-7xl mx-auto space-y-12 relative z-10">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="font-playfair text-5xl md:text-6xl font-bold tracking-tight">
                        Curated <span className="text-gold-leaf italic">Excellence</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Select from our roster of elite visual storytellers, each vetted for their unique artistic perspective.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 sticky top-24 z-40 py-4 backdrop-blur-md rounded-2xl border border-white/5 bg-black/40 shadow-xl max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 px-4 text-gray-500 uppercase tracking-widest text-xs font-bold border-r border-white/10">
                        <Filter className="w-4 h-4" /> Filter By
                    </div>

                    <div className="flex gap-2 overflow-x-auto px-2 no-scrollbar">
                        <button
                            onClick={() => { setSelectedRole(null); setSelectedCity(null); }}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedRole && !selectedCity ? "bg-white text-black" : "bg-white/5 text-gray-300 hover:bg-white/10"}`}
                        >
                            All
                        </button>
                        {cities.map(city => (
                            <button
                                key={city}
                                onClick={() => setSelectedCity(selectedCity === city ? null : city)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCity === city ? "bg-gold-leaf text-black" : "bg-white/5 text-gray-300 hover:bg-white/10"}`}
                            >
                                {city}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredPhotographers.map((p) => (
                            <motion.div
                                key={p.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Link to={`/photographers/${p.id}`} className="group block h-full">
                                    <Card className="h-full bg-white/[0.02] border-white/10 overflow-hidden hover:border-gold-leaf/30 transition-all duration-500 hover:-translate-y-2 group-hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                                        <div className="relative h-80 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60" />
                                            <img
                                                src={p.image}
                                                alt={p.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10 flex items-center gap-1 text-gold-leaf">
                                                <Star className="w-3 h-3 fill-gold-leaf" /> {p.rating}
                                            </div>
                                            <div className="absolute bottom-4 left-4 z-20">
                                                <p className="text-gold-leaf italic text-sm mb-1">{p.role}</p>
                                                <h3 className="font-playfair text-3xl text-white font-medium">{p.name}</h3>
                                            </div>
                                        </div>

                                        <div className="p-6 space-y-6">
                                            <p className="text-gray-400 font-light line-clamp-2 leading-relaxed text-sm">
                                                {p.description}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                                <div className="flex items-center gap-2 text-gray-300 text-sm">
                                                    <MapPin className="w-4 h-4 text-gold-leaf" /> {p.city}
                                                </div>
                                                <div className="text-white font-bold">
                                                    {p.price}
                                                </div>
                                            </div>

                                            <div className="pt-2">
                                                <Button className="w-full bg-white/5 border border-white/10 hover:bg-gold-leaf hover:text-black hover:border-gold-leaf transition-all duration-500 text-sm uppercase tracking-widest font-bold h-12">
                                                    View Portfolio <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredPhotographers.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No photographers found matching these filters.</p>
                        <Button variant="link" onClick={() => { setSelectedCity(null); setSelectedRole(null) }} className="text-gold-leaf">Clear Filters</Button>
                    </div>
                )}
            </div>
        </div>
    );
};
