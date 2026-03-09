import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="bg-rich-black border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="font-playfair text-2xl font-bold text-gold-leaf tracking-wider block mb-4">
                            ChitraSetu
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Connecting you with the world's most talented photographers through the power of AI.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/photographers" className="hover:text-gold-leaf transition-colors">Browse Photographers</Link></li>
                            <li><Link to="/how-it-works" className="hover:text-gold-leaf transition-colors">How it Works</Link></li>
                            <li><Link to="/pricing" className="hover:text-gold-leaf transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/help" className="hover:text-gold-leaf transition-colors">Help Center</Link></li>
                            <li><Link to="/terms" className="hover:text-gold-leaf transition-colors">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="hover:text-gold-leaf transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>sohammanjrekar200@gmail.com</li>
                            <li>+91 123 456 7890</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} ChitraSetu. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
