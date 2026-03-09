import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { User, Camera, ShieldCheck, MapPin, Search, CreditCard, Activity, BarChart3, Lock, Zap } from "lucide-react";

export const VisionaryCosmos = () => {
    // Stars/Particles
    const [particles, setParticles] = useState<{ x: number; y: number; delay: number; scale: number }[]>([]);

    useEffect(() => {
        const p = Array.from({ length: 50 }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5,
            scale: Math.random() * 0.5 + 0.5
        }));
        setParticles(p);
    }, []);

    return (
        <div className="w-full h-screen bg-rich-black relative overflow-hidden flex items-center justify-center font-playfair">
            {/* --- COSMIC BACKGROUND --- */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15),transparent_70%)]" />
                <div className="absolute inset-0 bg-noise opacity-[0.05]" />
                {/* Data Ocean (Bottom) */}
                <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-gold-leaf/10 to-transparent blur-3xl opacity-30 animate-pulse-slow" />
            </div>

            {/* Particles */}
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-gold-leaf rounded-full z-10"
                    initial={{ x: `${p.x}vw`, y: `${p.y}vh`, opacity: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0, p.scale, 0] }}
                    transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: p.delay }}
                />
            ))}

            {/* --- CENTRAL AI CONSCIOUSNESS --- */}
            <div className="relative z-20 flex items-center justify-center">
                {/* Rings */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute border border-gold-leaf/30 rounded-full"
                        style={{ width: `${(i + 1) * 300}px`, height: `${(i + 1) * 300}px` }}
                        animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.02, 1] }}
                        transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                    />
                ))}

                {/* Core */}
                <motion.div
                    className="w-48 h-48 bg-gold-leaf/10 rounded-full backdrop-blur-md border border-gold-leaf/50 flex items-center justify-center relative shadow-[0_0_100px_rgba(212,175,55,0.3)]"
                    animate={{ boxShadow: ["0 0 50px rgba(212,175,55,0.2)", "0 0 150px rgba(212,175,55,0.5)", "0 0 50px rgba(212,175,55,0.2)"] }}
                    transition={{ duration: 4, repeat: Infinity }}
                >
                    <div className="text-gold-leaf text-6xl font-bold animate-pulse">AI</div>
                    <Zap className="absolute text-white/50 w-full h-full p-10 animate-spin-slow opacity-20" />
                </motion.div>

                {/* Connecting Sutras (Lines) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-visible">
                    <line x1="50%" y1="50%" x2="20%" y2="50%" stroke="url(#grad-left)" strokeWidth="1" className="opacity-30" />
                    <line x1="50%" y1="50%" x2="80%" y2="50%" stroke="url(#grad-right)" strokeWidth="1" className="opacity-30" />
                    <line x1="50%" y1="50%" x2="50%" y2="20%" stroke="url(#grad-top)" strokeWidth="1" className="opacity-30" />
                    <line x1="50%" y1="50%" x2="50%" y2="80%" stroke="url(#grad-bottom)" strokeWidth="1" className="opacity-30" />

                    <defs>
                        <linearGradient id="grad-left" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stopColor="#D4AF37" /><stop offset="100%" stopColor="transparent" /></linearGradient>
                        <linearGradient id="grad-right" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#D4AF37" /><stop offset="100%" stopColor="transparent" /></linearGradient>
                        <linearGradient id="grad-top" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stopColor="#D4AF37" /><stop offset="100%" stopColor="transparent" /></linearGradient>
                        <linearGradient id="grad-bottom" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#D4AF37" /><stop offset="100%" stopColor="transparent" /></linearGradient>
                    </defs>
                </svg>
            </div>

            {/* --- LEFT: HUMANITY --- */}
            <div className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 z-20 w-64 text-center">
                <div className="relative group">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm"
                    >
                        <div className="flex justify-center gap-4 mb-4 text-gold-leaf/80">
                            <User className="w-8 h-8" />
                            <MapPin className="w-8 h-8" />
                            <Search className="w-8 h-8" />
                        </div>
                        <h3 className="text-white text-xl font-bold tracking-widest uppercase mb-2">Humanity</h3>
                        <p className="text-gray-400 text-xs font-light">Intents • Locations • Dreams</p>
                    </motion.div>
                    {/* Floating Intents */}
                    <motion.div className="absolute -top-12 left-0 bg-gold-leaf/10 text-gold-leaf text-[10px] px-2 py-1 rounded border border-gold-leaf/20" animate={{ y: [0, -5, 0], opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity }}>Looking for Wedding...</motion.div>
                </div>
            </div>

            {/* --- RIGHT: PHOTOGRAPHERS --- */}
            <div className="absolute right-10 md:right-20 top-1/2 -translate-y-1/2 z-20 w-64 text-center">
                <div className="relative group">
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm"
                    >
                        <div className="flex justify-center gap-4 mb-4 text-gold-leaf/80">
                            <Camera className="w-8 h-8" />
                            <CreditCard className="w-8 h-8" />
                            {/* Represents Photos */}
                            <div className="w-6 h-8 border border-gold-leaf rounded-sm bg-gold-leaf/20" />
                        </div>
                        <h3 className="text-white text-xl font-bold tracking-widest uppercase mb-2">Creators</h3>
                        <p className="text-gray-400 text-xs font-light">Portfolios • Skills • Art</p>
                    </motion.div>

                    {/* Floating Photos (Abstract) */}
                    <motion.div
                        className="absolute -right-8 top-0 w-16 h-24 bg-black border border-gold-leaf/40 rounded-lg opacity-60 z-[-1]"
                        animate={{ rotate: [0, 5, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                    />
                </div>
            </div>

            {/* --- TOP: ADMIN --- */}
            <div className="absolute top-10 md:top-20 z-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col items-center"
                >
                    <div className="flex gap-8 mb-2">
                        <Activity className="w-5 h-5 text-gold-leaf/70" />
                        <ShieldCheck className="w-5 h-5 text-gold-leaf/70" />
                        <BarChart3 className="w-5 h-5 text-gold-leaf/70" />
                    </div>
                    <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold-leaf to-transparent mb-2" />
                    <span className="text-xs uppercase tracking-[0.3em] text-white/50">Governance • Dharma</span>
                </motion.div>
            </div>

            {/* --- BOTTOM: DATA OCEAN --- */}
            <div className="absolute bottom-10 z-20 text-center w-full">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <div className="flex justify-center items-center gap-2 text-gold-leaf/60 mb-2">
                        <Lock className="w-4 h-4" />
                        <span className="text-[10px] uppercase tracking-widest">Immutable Trust Layer</span>
                    </div>
                    <div className="w-full max-w-2xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </motion.div>
            </div>

        </div>
    );
};
