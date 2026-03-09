import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface CinematicIntroProps {
    onComplete: () => void;
}

export const CinematicIntro = ({ onComplete }: CinematicIntroProps) => {
    // Phases: 0=Start, 1=Shutter/Dark, 2=Text1, 3=Text2, 4=Logo, 5=Exit
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        // Sequence Timing:
        // 0.0s - Start
        // 0.5s - "Moments are born in silence"
        // 2.5s - "Legends are captured in light"
        // 4.5s - Camera Shutter & Brand
        // 6.0s - Fade Out
        const steps = [
            setTimeout(() => setPhase(1), 100),
            setTimeout(() => setPhase(2), 500),  // Text 1
            setTimeout(() => setPhase(3), 2500), // Text 2
            setTimeout(() => setPhase(4), 4500), // Brand
            setTimeout(() => setPhase(5), 6000), // Exit
            setTimeout(onComplete, 6500)         // Done
        ];

        return () => steps.forEach(clearTimeout);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden pointer-events-none font-playfair"
            initial={{ opacity: 1 }}
            animate={phase === 5 ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* Ambient Gold Dust */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

            {/* Text 1: Moments are born in silence */}
            <AnimatePresence>
                {phase === 2 && (
                    <motion.div
                        className="absolute z-20 text-center"
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                        transition={{ duration: 1 }}
                    >
                        <p className="text-gray-400 text-xl tracking-[0.2em] uppercase">Moments are born in silence</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Text 2: Legends are captured in light */}
            <AnimatePresence>
                {phase === 3 && (
                    <motion.div
                        className="absolute z-20 text-center"
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(5px)" }}
                        transition={{ duration: 1 }}
                    >
                        <p className="text-gold-leaf text-2xl tracking-[0.2em] uppercase border-b border-gold-leaf/30 pb-2">Legends are captured in light</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Phase 4: Brand Reveal */}
            <AnimatePresence>
                {phase >= 4 && (
                    <motion.div
                        className="relative z-30 text-center"
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        {/* Flash Effect */}
                        <motion.div
                            className="absolute inset-0 bg-white z-50 rounded-full blur-3xl"
                            initial={{ opacity: 0.8, scale: 0 }}
                            animate={{ opacity: 0, scale: 2 }}
                            transition={{ duration: 0.3 }}
                        />

                        <h1 className="text-6xl md:text-8xl text-white font-bold tracking-tighter drop-shadow-2xl">
                            Chitra<span className="text-gold-leaf italic">Setu</span>
                        </h1>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="h-[1px] bg-gold-leaf mt-4 mx-auto"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
