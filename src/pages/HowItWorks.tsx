import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Camera, Search, Calendar, CreditCard, ImageOff } from "lucide-react";

export const HowItWorks = () => {
    const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

    const handleImageError = (id: number) => {
        setImageErrors(prev => ({ ...prev, [id]: true }));
    };

    const steps = [
        {
            id: 1,
            title: "Discover Your Vision",
            desc: "Begin your journey by defining the essence of your story. Browse our curated collection of elite visual artists.",
            icon: <Search className="w-8 h-8" />,
            image: "/images/how-it-works-1.jpg"
        },
        {
            id: 2,
            title: "Curated Matching",
            desc: "Our intelligent filters connect you with photographers who specialize in your specific aesthetic and location needs.",
            icon: <Calendar className="w-8 h-8" />,
            image: "/images/how-it-works-2.jpg"
        },
        {
            id: 3,
            title: "Explore Portfolios",
            desc: "Dive deep into cinematic portfolios. Witness the style, consistency, and 'Rajamouli-scale' grandeur of our artists.",
            icon: <CreditCard className="w-8 h-8" />,
            image: "/images/how-it-works-3.jpg"
        },
        {
            id: 4,
            title: "Secure Booking",
            desc: "Lock the dates with a secure advance payment. Your legend is now scheduled to be written in light.",
            icon: <CreditCard className="w-8 h-8" />,
            image: "/images/how-it-works-4.jpg"
        },
        {
            id: 5,
            title: "Capture The Moment",
            desc: "The shutter clicks. A memory is born. Experience the magic of a world-class photography session.",
            icon: <Camera className="w-8 h-8" />,
            image: "/images/how-it-works-5.jpg"
        },
    ];

    return (
        <div className="min-h-screen bg-rich-black text-white relative overflow-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 bg-noise opacity-[0.05] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 relative z-10">

                <div className="text-center mb-20 space-y-4">
                    <h1 className="font-playfair text-5xl md:text-7xl font-bold">
                        The <span className="text-gold-leaf italic">Process</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        A seamless journey from discovery to delivery.
                    </p>
                </div>

                <div className="space-y-16">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                        >
                            {/* STRICT RULE: Single Rounded Glass Card containing EVERYTHING */}
                            <Card className="overflow-hidden rounded-3xl bg-white/[0.03] border-white/10 p-0 hover:border-gold-leaf/30 transition-all duration-500 shadow-xl group h-full">
                                <div className={`flex flex-col md:flex-row items-stretch h-full ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>

                                    {/* Text Content */}
                                    <div className="flex-1 p-10 md:p-14 flex flex-col justify-center space-y-6">
                                        <div className="flex items-center gap-4">
                                            <span className="text-gold-leaf font-playfair text-7xl opacity-20 font-bold leading-none select-none">
                                                0{step.id}
                                            </span>
                                            <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-gold-leaf bg-white/5 backdrop-blur-md">
                                                {step.icon}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-3xl font-playfair font-bold text-white mb-4 group-hover:text-gold-leaf transition-colors duration-300">
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-400/80 leading-relaxed text-lg font-light">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Image Content - Full Height Cover */}
                                    <div className="flex-1 min-h-[300px] md:min-h-[400px] relative overflow-hidden bg-rich-black">
                                        <div className="absolute inset-0 bg-rich-black/10 group-hover:bg-transparent transition-all z-10 duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:hidden z-10" />

                                        {!imageErrors[step.id] ? (
                                            <img
                                                src={step.image}
                                                alt={step.title}
                                                onError={() => handleImageError(step.id)}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black p-8 text-center space-y-4">
                                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                                                    <ImageOff className="w-8 h-8 text-white/20" />
                                                </div>
                                                <p className="text-white/20 text-sm tracking-widest uppercase font-light">
                                                    Image Unavailable
                                                </p>
                                                {/* Fallback visual interest */}
                                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05),transparent_70%)]" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 text-center pb-12">
                    <p className="text-gray-400 mb-8 italic text-sm tracking-widest uppercase">Start your story today</p>
                    <Link to="/photographers">
                        <Button size="lg" className="bg-gold-leaf text-black font-bold h-16 px-12 rounded-full text-lg shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105 transition-transform">
                            Find Your Photographer
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
