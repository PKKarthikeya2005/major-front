import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Sparkles, MapPin, ShieldCheck, Camera } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CinematicIntro } from "../components/ui/CinematicIntro";

export const Home = () => {
    // 1. Storage Check: Only show if not seen before (Persistent)
    const [showIntro, setShowIntro] = useState(() => {
        return !localStorage.getItem("chitrasetu_intro_seen");
    });

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    // 2. Mark as seen immediately
    useEffect(() => {
        if (showIntro) {
            localStorage.setItem("chitrasetu_intro_seen", "true");
        }
    }, [showIntro]);

    return (
        <div ref={ref} className="flex flex-col w-full overflow-hidden bg-rich-black text-white relative">

            {/* CINEMATIC INTRO - Overlay */}
            {showIntro && <CinematicIntro onComplete={() => setShowIntro(false)} />}

            {/* --- HERO SECTION --- */}
            {/* Render primarily to ensure it's ready behind the splash */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">

                {/* 1. Cinematic Background */}
                <motion.div
                    style={{ y: backgroundY }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-rich-black/30 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-transparent to-rich-black/60 z-10" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.8)_100%)] z-10" />

                    <img
                        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2500&auto=format&fit=crop"
                        alt="Epic Landscape"
                        className="w-full h-full object-cover scale-110"
                    />
                </motion.div>

                {/* 2. Atmosphere */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute inset-0 bg-noise opacity-[0.06] mix-blend-overlay fixed" />
                    <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-gold-leaf/10 blur-[150px] rounded-full mix-blend-screen" />

                    {/* Floating Dust Particles */}
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-gold-leaf rounded-full opacity-0"
                            initial={{
                                x: Math.random() * 100 + "%",
                                y: Math.random() * 100 + "%",
                                opacity: 0,
                                scale: 0
                            }}
                            animate={{
                                y: [Math.random() * 100 + "%", Math.random() * -20 + "%"],
                                opacity: [0, 0.4, 0],
                                scale: [0, Math.random() * 1.5 + 0.5, 0]
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 5
                            }}
                            style={{
                                width: Math.random() * 3 + 1 + "px",
                                height: Math.random() * 3 + 1 + "px",
                                filter: "blur(1px)"
                            }}
                        />
                    ))}

                    {/* Fog/Mist Simulation */}
                    <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-rich-black to-transparent opacity-80" />
                </div>

                {/* 3. Hero Content (Movie Title Style) */}
                <motion.div
                    style={{ y: textY }}
                    className="relative z-20 text-center px-6 max-w-6xl mx-auto space-y-10"
                >
                    {/* Main Headline: Simplified & Bigger */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, delay: showIntro ? 2.0 : 0.5, ease: "easeOut" }}
                        >
                            <span className="inline-block text-gold-leaf uppercase text-sm md:text-lg font-bold tracking-[0.3em] border-b border-gold-leaf/30 pb-4 mb-4">
                                The Cinematic Collection
                            </span>
                        </motion.div>

                        <h1 className="font-playfair font-medium text-white leading-[1.1] tracking-tight drop-shadow-2xl">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.5, delay: showIntro ? 2.2 : 0.7 }}
                                className="text-4xl md:text-7xl"
                            >
                                Where Every Moment
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.5, delay: showIntro ? 2.4 : 0.9 }}
                                className="text-4xl md:text-7xl"
                            >
                                Finds <span className="text-gold-leaf italic">Perfection</span>
                            </motion.div>
                        </h1>
                    </div>

                    {/* Subtitle 2: Smaller & Subtle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: showIntro ? 3.0 : 1.5 }}
                        className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto font-manrope font-light leading-relaxed tracking-wide opacity-80 px-4"
                    >
                        Discover and book photographers who perfectly match <br className="hidden md:block" /> your style, location, and vision.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: showIntro ? 4.5 : 2.5, ease: "easeOut" }} // Adjust delay
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
                    >
                        <Link to="/photographers">
                            <Button size="lg" className="min-w-[240px] text-lg h-16 rounded-full bg-gold-leaf text-rich-black hover:bg-white hover:text-black transition-all duration-500 shadow-[0_0_30px_-5px_rgba(212,175,55,0.4)] font-bold tracking-widest uppercase hover:scale-105">
                                Choose Your Moment
                            </Button>
                        </Link>
                        <Link to="/how-it-works">
                            <Button variant="outline" size="lg" className="min-w-[240px] text-lg h-16 rounded-full border-white/20 text-white hover:text-rich-black hover:bg-white hover:border-white backdrop-blur-md transition-all duration-500 font-medium tracking-wide hover:scale-105">
                                Witness the Journey
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: showIntro ? 7 : 4, duration: 2 }} // Adjust delay
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
                >
                    <span className="uppercase tracking-[0.3em] text-[10px] font-bold">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown className="w-4 h-4" />
                    </motion.div>
                </motion.div>
            </section>

            {/* --- TRAILER SECTION --- */}
            <section className="py-32 px-6 relative bg-rich-black border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="font-playfair text-4xl text-white tracking-wider">The Oath.</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { step: "01", title: "Share Requirements", desc: "Tell us your location, budget, and photography needs.", icon: <MapPin /> },
                            { step: "02", title: "Discover Professionals", desc: "Browse photographers matched to your preferences.", icon: <Sparkles /> },
                            { step: "03", title: "Book with Confidence", desc: "View portfolios, compare options, and book securely.", icon: <ShieldCheck /> }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 0.8 }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gold-leaf/5 rounded-3xl filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <Card className="relative h-full p-10 bg-white/[0.03] border-white/10 hover:border-gold-leaf/30 transition-all duration-500 backdrop-blur-xl group-hover:-translate-y-2">
                                    <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-2xl flex items-center justify-center border border-white/10 mb-8 text-gold-leaf shadow-lg">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-playfair text-2xl text-white mb-4">{item.title}</h3>
                                    <p className="text-gray-400 font-light leading-relaxed">
                                        {item.desc}
                                    </p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA SECTION --- */}
            <section className="relative py-40 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-rich-black">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1),transparent_70%)] opacity-30" />
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-10">
                    <Camera className="w-16 h-16 text-gold-leaf mx-auto animate-pulse-slow opacity-80" />
                    <h2 className="font-playfair text-5xl md:text-7xl font-medium text-white tracking-tight leading-tight">
                        Your Story Awaits.
                    </h2>
                    <Link to="/photographers">
                        <Button size="lg" className="bg-white text-rich-black hover:bg-gold-leaf hover:text-white border-0 text-xl px-12 py-6 rounded-full shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)] transition-all duration-500 transform hover:scale-105 font-bold uppercase tracking-widest">
                            Explore Roster
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};
