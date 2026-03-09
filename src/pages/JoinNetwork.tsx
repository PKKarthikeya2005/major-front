import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { usePhotographers } from "../context/PhotographerContext";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Camera, MapPin, Upload, CheckCircle } from "lucide-react";

export const JoinNetwork = () => {
    const navigate = useNavigate();
    const { registerPhotographer } = usePhotographers();
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        city: "",
        role: "Cinematic Photographer",
        price: "",
        specialty: "",
        description: "",
        image: "https://images.unsplash.com/photo-1554048612-387768052bf7?q=80&w=1000", // Default placeholder
        portfolioUrl1: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000",
        portfolioUrl2: "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?q=80&w=1000",
        portfolioUrl3: "https://images.unsplash.com/photo-1551316679-9c6ae9dec224?q=80&w=1000",
        whyChosen: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        registerPhotographer({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            city: formData.city,
            role: formData.role,
            price: formData.price,
            specialty: formData.specialty,
            description: formData.description,
            image: formData.image,
            whyChosen: formData.whyChosen || "Passionate cinematic storyteller.",
            mapQuery: `${formData.city}, India`,
            portfolio: [formData.portfolioUrl1, formData.portfolioUrl2, formData.portfolioUrl3]
        });

        setSubmitted(true);
        setTimeout(() => navigate("/"), 4000); // Redirect after 4 seconds
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-rich-black flex items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md"
                >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-playfair font-bold text-gold-leaf mb-4">Application Submitted</h2>
                    <p className="text-gray-300">
                        Thank you for applying to ChitraSetu. Your profile is now <b>Pending Approval</b>.
                        Our team will review your portfolio and activate your account shortly.
                    </p>
                    <p className="text-sm text-gray-500 mt-8">Redirecting to home...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-rich-black text-white pt-24 pb-20 px-6 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none fixed" />

            <div className="max-w-3xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Join Our Exclusive Network</h1>
                    <p className="text-gray-400 text-lg">Showcase your cinematic vision to premium clients.</p>
                </div>

                <Card className="bg-white/[0.03] border-white/10 p-8 md:p-10 backdrop-blur-xl">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Section 1: Basic Info */}
                        <div className="space-y-4">
                            <h3 className="text-gold-leaf font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                                <Camera className="w-4 h-4" /> Professional info
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Full Name</label>
                                    <input required type="text"
                                        value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:border-gold-leaf/50 outline-none transition-colors"
                                        placeholder="e.g. Anjali Menon" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Role / Title</label>
                                    <input required type="text"
                                        value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:border-gold-leaf/50 outline-none transition-colors"
                                        placeholder="e.g. Cinematic Wedding Photographer" />
                                </div>
                            </div>

                            {/* New Credential Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Email Address <span className="text-xs text-gold-leaf">(For Login)</span></label>
                                    <input required type="email"
                                        value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:border-gold-leaf/50 outline-none transition-colors"
                                        placeholder="you@studio.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Password</label>
                                    <input required type="password"
                                        value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:border-gold-leaf/50 outline-none transition-colors"
                                        placeholder="••••••••" />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Details */}
                        <div className="space-y-4">
                            <h3 className="text-gold-leaf font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> Location & Pricing
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">City</label>
                                    <input required type="text"
                                        value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:border-gold-leaf/50 outline-none transition-colors"
                                        placeholder="e.g. Bangalore" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Price per Day</label>
                                    <input required type="text"
                                        value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:border-gold-leaf/50 outline-none transition-colors"
                                        placeholder="e.g. ₹25,000" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Specialty</label>
                                    <select
                                        value={formData.specialty} onChange={e => setFormData({ ...formData, specialty: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:border-gold-leaf/50 outline-none transition-colors text-white"
                                    >
                                        <option value="">Select...</option>
                                        <option value="Wedding">Wedding</option>
                                        <option value="Fashion">Fashion</option>
                                        <option value="Travel">Travel</option>
                                        <option value="Wildlife">Wildlife</option>
                                        <option value="Portrait">Portrait</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Portfolio */}
                        <div className="space-y-4">
                            <h3 className="text-gold-leaf font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                                <Upload className="w-4 h-4" /> Portfolio Showcase
                            </h3>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Profile Image URL</label>
                                <input required type="url"
                                    value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:border-gold-leaf/50 outline-none transition-colors"
                                    placeholder="https://..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Bio / Description</label>
                                <textarea required
                                    value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 h-24 resize-none focus:border-gold-leaf/50 outline-none transition-colors"
                                    placeholder="Tell us about your style and vision..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Why should clients choose you?</label>
                                <textarea required
                                    value={formData.whyChosen} onChange={e => setFormData({ ...formData, whyChosen: e.target.value })}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 h-20 resize-none focus:border-gold-leaf/50 outline-none transition-colors"
                                    placeholder="e.g. I capture raw emotions with a cinematic touch..." />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 flex justify-end">
                            <Button type="submit" className="bg-gold-leaf text-black font-bold px-8 py-3 text-lg hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
                                Submit Application
                            </Button>
                        </div>

                    </form>
                </Card>
            </div>
        </div>
    );
};
