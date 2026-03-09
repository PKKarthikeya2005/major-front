import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { ArrowLeft, CreditCard, ShieldCheck, Phone, Lock } from "lucide-react";
import { usePhotographers } from "../context/PhotographerContext";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export const Booking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const { photographers } = usePhotographers();

    // 1. Fetch Real Context Data
    const photographer = photographers.find(p => p.id === id);

    const [date, setDate] = useState("");
    const [step, setStep] = useState(1); // 1: Details, 2: Payment
    const [isProcessing, setIsProcessing] = useState(false);
    const [phone, setPhone] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card");

    // 2. Redirect if not logged in
    if (!isAuthenticated) {
        setTimeout(() => navigate('/login'), 0);
        return null;
    }

    if (!photographer) return <div>Not found</div>;

    // Price Logic (Simple parsing)
    const basePrice = parseInt(photographer.price.replace(/[^\d]/g, "") || "0");
    const serviceFee = Math.round(basePrice * 0.05);
    const platformFee = 500;
    const taxes = Math.round((basePrice + serviceFee + platformFee) * 0.18);
    const total = basePrice + serviceFee + platformFee + taxes;

    const handleConfirm = () => {
        setIsProcessing(true);
        setTimeout(() => {
            // 3. Save to "chitrasetu_bookings"
            const newBooking = {
                id: `bk-${Date.now()}`,
                userId: user?.id || "unknown",
                clientName: user?.name || "Valued Client",
                photographerId: photographer.id,
                photographerName: photographer.name,
                photographerImage: photographer.image,
                photographerCity: photographer.city,
                date: date,
                totalAmount: total,
                status: "Confirmed",
                createdAt: new Date().toISOString()
            };

            const existing = JSON.parse(localStorage.getItem("chitrasetu_bookings") || "[]");
            localStorage.setItem("chitrasetu_bookings", JSON.stringify([...existing, newBooking]));

            setIsProcessing(false);
            navigate("/success");
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-rich-black text-white pt-24 pb-20 px-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-leaf/5 blur-[150px] pointer-events-none" />

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
                {/* Left: Form */}
                <div className="lg:col-span-2 space-y-8">
                    <Link to={`/photographers/${id}`} className="inline-flex items-center text-gray-400 hover:text-white transition-colors gap-2 mb-4">
                        <ArrowLeft className="w-4 h-4" /> Back to Profile
                    </Link>

                    <div className="space-y-2">
                        <h1 className="font-playfair text-4xl font-bold">Secure Your Artist</h1>
                        <p className="text-gray-400">Complete your reservation with {photographer.name}.</p>
                    </div>

                    <div className="relative">
                        {/* Progress */}
                        <div className="flex items-center gap-4 mb-8 text-sm font-medium border-b border-white/10 pb-4">
                            <span className={step === 1 ? "text-gold-leaf" : "text-gray-500"}>1. Details</span>
                            <span className="text-gray-600">/</span>
                            <span className={step === 2 ? "text-gold-leaf" : "text-gray-500"}>2. Payment</span>
                        </div>

                        <AnimatePresence mode="wait">
                            {step === 1 ? (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input label="Check-in Date" type="date" value={date} onChange={e => setDate(e.target.value)} className="bg-white/5 border-white/10" required />
                                        <Input label="Venue Location" placeholder="e.g. Ramoji Film City" className="bg-white/5 border-white/10" required />
                                    </div>
                                    <Input label="Phone Number" type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="bg-white/5 border-white/10" placeholder="+91..." required />

                                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-200 text-sm flex items-start gap-3">
                                        <Lock className="w-5 h-5 flex-shrink-0" />
                                        <p>Your date is held for 15 minutes. No payment is charged until the photographer confirms availability.</p>
                                    </div>
                                    <Button onClick={() => date && setStep(2)} className="w-full bg-white text-black font-bold h-12 hover:bg-gray-200" disabled={!date}>
                                        Continue to Payment
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    {/* Mock Payment Options */}
                                    <div className="space-y-4">
                                        <label className="text-sm font-medium text-gray-400">Select Payment Method</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div
                                                onClick={() => setPaymentMethod('card')}
                                                className={`border p-4 rounded-xl flex items-center gap-4 cursor-pointer relative overflow-hidden transition-all ${paymentMethod === 'card' ? 'border-gold-leaf bg-gold-leaf/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                                            >
                                                <CreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-gold-leaf' : 'text-gray-400'}`} />
                                                <div className="text-sm font-bold text-white">Credit / Debit Card</div>
                                            </div>
                                            <div
                                                onClick={() => setPaymentMethod('upi')}
                                                className={`border p-4 rounded-xl flex items-center gap-4 cursor-pointer relative overflow-hidden transition-all ${paymentMethod === 'upi' ? 'border-gold-leaf bg-gold-leaf/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                                            >
                                                <Phone className={`w-6 h-6 ${paymentMethod === 'upi' ? 'text-gold-leaf' : 'text-gray-400'}`} />
                                                <div className="text-sm font-bold text-white">UPI (GPay/PhonePe)</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Credit Card UI */}
                                    {paymentMethod === 'card' && (
                                        <div className="max-w-sm mx-auto bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 aspect-[1.586] shadow-2xl relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-noise opacity-[0.1]" />
                                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-gold-leaf/20 transition-colors duration-700" />

                                            <div className="relative z-10 flex flex-col justify-between h-full">
                                                <div className="flex justify-between items-start">
                                                    <div className="w-12 h-8 bg-gold-leaf/80 rounded" />
                                                    <span className="font-mono text-white/50 text-xl tracking-widest">VISA</span>
                                                </div>
                                                <div className="font-mono text-white text-xl tracking-[0.2em] shadow-black drop-shadow-md">
                                                    •••• •••• •••• 4242
                                                </div>
                                                <div className="flex justify-between text-xs text-gray-400 uppercase tracking-wider">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px]">Card Holder</span>
                                                        <span className="text-white font-medium">{user?.name}</span>
                                                    </div>
                                                    <div className="flex flex-col text-right">
                                                        <span className="text-[10px]">Expires</span>
                                                        <span className="text-white font-medium">12/28</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* UPI UI */}
                                    {paymentMethod === 'upi' && (
                                        <div className="p-8 bg-white/[0.02] border border-white/10 rounded-2xl space-y-6">
                                            <Input placeholder="username@oksbi" label="UPI ID" className="bg-white/5 border-white/10" />
                                            <div className="grid grid-cols-3 gap-4">
                                                {['GPay', 'PhonePe', 'Paytm'].map(p => (
                                                    <button key={p} className="p-3 border border-white/10 rounded-lg hover:bg-white/10 text-xs text-gray-400 font-bold">{p}</button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-4">
                                        <Button variant="outline" onClick={() => setStep(1)} className="flex-1 border-white/10 text-white hover:bg-white hover:text-black">
                                            Back
                                        </Button>
                                        <Button onClick={handleConfirm} className="flex-[2] bg-gold-leaf text-black font-bold h-12 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-gold-leaf/60" disabled={isProcessing}>
                                            {isProcessing ? "Processing..." : `Pay ₹${total.toLocaleString()}`}
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right: Summary */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-24 p-6 bg-white/[0.03] border-white/10 backdrop-blur-xl space-y-6">
                        <div className="flex gap-4 items-center">
                            <img src={photographer.image} alt="Photographer" className="w-20 h-20 rounded-lg object-cover" />
                            <div>
                                <h3 className="font-playfair font-bold text-lg">{photographer.name}</h3>
                                <p className="text-sm text-gray-400">{photographer.city}</p>
                            </div>
                        </div>
                        <div className="h-px bg-white/10" />
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Base Rate</span>
                                <span className="text-white">₹{basePrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Service Fee (5%)</span>
                                <span className="text-white">₹{serviceFee.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Platform Fee</span>
                                <span className="text-white">₹{platformFee.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">GST (18%)</span>
                                <span className="text-white">₹{taxes.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gold-leaf font-bold text-lg pt-4 border-t border-white/10">
                                <span>Total</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-green-400 justify-center bg-green-900/10 py-3 rounded border border-green-500/10">
                            <ShieldCheck className="w-4 h-4" /> 100% Satisfaction Guarantee
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
