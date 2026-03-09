import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Camera, User, ArrowRight, AlertCircle } from "lucide-react";

export const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [selectedRole, setSelectedRole] = useState<'client' | 'photographer' | 'admin'>('client');
    const [loading, setLoading] = useState(false);

    // Form State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const navigate = useNavigate();
    const { login, signup, error } = useAuth();

    const toggleMode = () => {
        setIsLogin(!isLogin);
        // Reset form
        setEmail("");
        setPassword("");
        setName("");
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let success = false;

            if (isLogin) {
                success = await login(email, password);
            } else {
                success = await signup({
                    id: email,
                    name,
                    email,
                    password,
                    role: selectedRole
                });
            }

            if (success) {
                setIsSuccess(true);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="min-h-screen bg-rich-black flex items-center justify-center p-4 relative overflow-hidden"
            animate={isSuccess ? { scale: [1, 1.02, 0.95], opacity: [1, 1, 0] } : {}}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            onAnimationComplete={() => {
                if (isSuccess) {
                    // Redirect logic
                    // const role = isLogin ? (email === 'admin@chitrasetu.com' ? 'admin' : selectedRole) : selectedRole;

                    if (email.includes('admin') || selectedRole === 'admin') navigate('/admin');
                    else if (selectedRole === 'photographer') navigate('/photographer-dashboard');
                    else navigate('/my-bookings');
                }
            }}
        >
            {/* Cinematic Background for Auth Page */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-rich-black/90 z-20" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-30 scale-105"
                >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-photographer-taking-pictures-of-a-model-in-the-forest-34440-large.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-rich-black via-rich-black/80 to-transparent z-30" />
            </div>

            <div className="w-full max-w-6xl z-40 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Text Content (Left Side) */}
                <div className="hidden lg:block space-y-8 p-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <div className="w-16 h-1 bg-gold-leaf mb-8" />
                        <h1 className="font-playfair text-7xl font-bold text-white leading-tight drop-shadow-lg">
                            Your Vision. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-leaf to-[#F2E8C4] animate-shine">Our Canvas.</span>
                        </h1>
                        <p className="text-2xl text-gray-400 mt-8 max-w-lg font-light leading-relaxed">
                            Access the nation's most exclusive network of visual artists. <br />
                            <span className="text-white font-medium">Create. Capture. Cherish.</span>
                        </p>
                    </motion.div>
                </div>

                {/* Auth Card (Right Side) */}
                <Card className="w-full max-w-xl mx-auto p-8 md:p-12 bg-white/[0.04] border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
                    {/* Subtle Gold Glow on Card Hover */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-gold-leaf/0 via-gold-leaf/5 to-gold-leaf/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl"></div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isLogin ? "login" : "signup"}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-8 relative z-10"
                        >
                            {/* Heading Section */}
                            <div className="text-center space-y-2 mb-8">
                                <h2 className="font-playfair text-4xl font-bold text-white">
                                    {isLogin ? "Welcome Back" : "Join the Elite"}
                                </h2>
                                <p className="text-gray-400 text-sm tracking-wide uppercase">
                                    {isLogin
                                        ? "Sign in to access your dashboard"
                                        : "Create your secure account"}
                                </p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-500/10 border border-red-500/20 text-red-200 text-sm p-3 rounded-lg flex items-center gap-2"
                                >
                                    <AlertCircle className="w-4 h-4" /> {error}
                                </motion.div>
                            )}

                            {/* Role Selection (Signup Only) */}
                            {!isLogin && (
                                <div className="grid grid-cols-3 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedRole('client')}
                                        className={`py-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-300 ${selectedRole === 'client' ? 'bg-gold-leaf text-black border-gold-leaf shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/30 hover:text-white'}`}
                                    >
                                        <User className="w-5 h-5" />
                                        <span className="text-xs font-bold uppercase tracking-wider">Client</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedRole('photographer')}
                                        className={`py-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-300 ${selectedRole === 'photographer' ? 'bg-gold-leaf text-black border-gold-leaf shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/30 hover:text-white'}`}
                                    >
                                        <Camera className="w-5 h-5" />
                                        <span className="text-xs font-bold uppercase tracking-wider">Artist</span>
                                    </button>
                                    {/* Admin Role Removed from UI as per strict rules */}
                                </div>
                            )}

                            {/* Form Fields */}
                            <form className="space-y-6" onSubmit={handleAuth}>
                                {!isLogin && (
                                    <Input
                                        label="Full Name"
                                        placeholder="Arjun Verma"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="bg-black/30 border-white/10 focus:border-gold-leaf/50 text-white placeholder:text-gray-700 h-12"
                                    />
                                )}

                                <Input
                                    label="Email Address"
                                    placeholder="user@example.com"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-black/30 border-white/10 focus:border-gold-leaf/50 text-white placeholder:text-gray-700 h-12"
                                />

                                <Input
                                    label="Password"
                                    placeholder="••••••••"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-black/30 border-white/10 focus:border-gold-leaf/50 text-white placeholder:text-gray-700 h-12"
                                />

                                <Button
                                    size="lg"
                                    disabled={loading}
                                    className="w-full bg-gold-leaf text-rich-black hover:bg-white font-bold text-lg py-6 mt-2 shadow-[0_4px_20px_rgba(212,175,55,0.2)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition-all duration-300 group disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            {isLogin ? "Enter Portal" : "Start Journey"}
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    )}
                                </Button>
                            </form>

                            {/* Toggle */}
                            <div className="text-center pt-6 border-t border-white/5">
                                <p className="text-sm text-gray-500 mb-3">
                                    {isLogin ? "First time visiting?" : "Already a member?"}
                                </p>
                                <button
                                    onClick={toggleMode}
                                    className="text-white hover:text-gold-leaf font-bold transition-colors text-sm uppercase tracking-widest border-b border-transparent hover:border-gold-leaf pb-1"
                                >
                                    {isLogin ? "Create an Account" : "Access Account"}
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </Card>
            </div>
        </motion.div>
    );
};
