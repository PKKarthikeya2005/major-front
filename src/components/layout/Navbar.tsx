import { Link, useLocation } from "react-router-dom";
import { Camera, User, Menu, X, LogOut, LayoutDashboard, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { user, logout, isAuthenticated } = useAuth();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Dashboard Link Logic
    const getDashboardLink = () => {
        if (!user) return null;
        if (user.role === 'admin') return { to: '/admin', label: 'Admin Dashboard', icon: <Shield className="w-4 h-4" /> };
        if (user.role === 'photographer') return { to: '/photographer-dashboard', label: 'Studio Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> };
        return { to: '/my-bookings', label: 'My Bookings', icon: <User className="w-4 h-4" /> };
    };

    const dashboardLink = getDashboardLink();

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Photographers", path: "/photographers" },
        { name: "How It Works", path: "/how-it-works" },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-rich-black/90 backdrop-blur-md border-b border-white/10 py-4 shadow-2xl" : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="relative">
                        <Camera className="w-8 h-8 text-gold-leaf group-hover:rotate-12 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gold-leaf blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
                    </div>
                    <span className="text-2xl font-playfair font-bold text-white tracking-tight">
                        Chitra<span className="text-gold-leaf italic">Setu</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm tracking-widest uppercase font-medium transition-colors hover:text-gold-leaf ${location.pathname === link.path ? "text-gold-leaf" : "text-gray-300"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/join" className="text-sm font-medium text-gold-leaf hover:text-white transition-colors border border-gold-leaf/30 px-3 py-1 rounded-full">Join as Artist</Link>

                    {isAuthenticated && user && dashboardLink ? (
                        <div className="flex items-center gap-6 pl-6 border-l border-white/10">
                            <Link to={dashboardLink.to} className="flex items-center gap-2 text-white hover:text-gold-leaf transition-colors">
                                {dashboardLink.icon}
                                <span className="font-bold text-sm tracking-wide">{dashboardLink.label}</span>
                            </Link>
                            <div className="flex items-center gap-4">
                                <span className="text-xs text-gray-500 font-mono hidden lg:block">Welcome, {user.name}</span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={logout}
                                    className="border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
                                >
                                    <LogOut className="w-4 h-4 mr-2" /> Logout
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-4 ml-8">
                            <Link to="/login">
                                <Button variant="ghost" className="text-white hover:text-gold-leaf">Log In</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-gold-leaf text-black font-bold hover:bg-white transition-colors shadow-[0_0_15px_-3px_rgba(212,175,55,0.4)]">
                                    Join Network
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-rich-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-6 py-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-playfair font-bold text-white hover:text-gold-leaf"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-px bg-white/10 my-2" />
                            {isAuthenticated && user && dashboardLink ? (
                                <>
                                    <Link to={dashboardLink.to} onClick={() => setIsOpen(false)} className="text-lg font-medium text-gold-leaf flex items-center gap-2">
                                        {dashboardLink.icon} {dashboardLink.label}
                                    </Link>
                                    <button onClick={logout} className="text-left text-red-400 font-medium">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="text-lg font-medium text-white">Log In</Link>
                                    <Link to="/signup" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gold-leaf">Join Network</Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
