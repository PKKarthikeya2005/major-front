import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useEffect, useState } from "react";

export const Success = () => {
    const [step, setStep] = useState(0); // 0: Black, 1: Text1, 2: Text2, 3: Reveal

    useEffect(() => {
        // Sequence Timing
        const t1 = setTimeout(() => setStep(1), 500);  // "This moment..."
        const t2 = setTimeout(() => setStep(2), 3500); // "Now it belongs..."
        const t3 = setTimeout(() => setStep(3), 6500); // Reveal

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    return (
        <div className="min-h-screen bg-rich-black text-white relative flex items-center justify-center overflow-hidden">

            {/* STAGE 1 & 2: REVELATION TEXT */}
            <AnimatePresence>
                {step < 3 && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-center px-6 pointer-events-none"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                    >
                        {step === 1 && (
                            <motion.h1
                                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                                transition={{ duration: 1.5 }}
                                className="font-playfair text-3xl md:text-5xl text-gray-400 font-light italic tracking-wide"
                            >
                                "This moment will never happen again."
                            </motion.h1>
                        )}
                        {step === 2 && (
                            <motion.h1
                                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                                transition={{ duration: 1.5 }}
                                className="font-playfair text-4xl md:text-6xl text-gold-leaf font-medium tracking-wider"
                            >
                                Now it belongs to you.
                            </motion.h1>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* STAGE 3: THE TICKET */}
            {step === 3 && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="max-w-md w-full px-6 relative z-10"
                >
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.5 }}
                            className="w-20 h-20 bg-gold-leaf/10 border border-gold-leaf rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_-10px_rgba(212,175,55,0.3)]"
                        >
                            <Ticket className="w-8 h-8 text-gold-leaf" />
                        </motion.div>
                        <h2 className="font-playfair text-4xl text-white mb-2">It is Done.</h2>
                        <p className="text-gray-400 font-light">The artist has been summoned.</p>
                    </div>

                    <div className="space-y-4">
                        <Link to="/my-bookings">
                            <Button size="lg" className="w-full bg-gold-leaf text-black hover:bg-white font-bold tracking-widest uppercase py-6 text-lg shadow-xl">
                                View Your Ticket
                            </Button>
                        </Link>
                        <Link to="/">
                            <Button variant="ghost" className="w-full text-gray-500 hover:text-white">
                                Return to Silence
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            )}

            {/* CINEMATIC BACKGROUND (Subtle) */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-transparent to-rich-black" />
                <img
                    src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop"
                    className="w-full h-full object-cover grayscale"
                />
            </div>
        </div>
    );
};
