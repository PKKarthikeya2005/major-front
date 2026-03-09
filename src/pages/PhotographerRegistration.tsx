import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { Camera, Upload, CheckCircle } from "lucide-react";

export const PhotographerRegistration = () => {
    return (
        <div className="min-h-screen bg-rich-black flex items-center justify-center p-6 relative overflow-hidden pt-24">
            <div className="absolute inset-0 z-0 opacity-20">
                <img
                    src="https://images.unsplash.com/photo-1542038784456-1ea0e93ca37b?q=80&w=2000&auto=format&fit=crop"
                    alt="Camera Background"
                    className="w-full h-full object-cover grayscale"
                />
            </div>

            <div className="max-w-4xl w-full z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

                {/* Info Side */}
                <div className="bg-gold-leaf/10 backdrop-blur-3xl p-10 rounded-3xl border border-gold-leaf/20 flex flex-col justify-between">
                    <div className="space-y-6">
                        <Camera className="w-12 h-12 text-gold-leaf" />
                        <h1 className="font-playfair text-4xl font-bold text-white leading-tight">
                            Join the Elite <br /> Roster.
                        </h1>
                        <p className="text-gray-300 font-light text-lg">
                            Showcase your work to a curated audience of clients who value true artistry.
                        </p>
                    </div>

                    <div className="space-y-4 mt-12">
                        {[
                            "Access to premium clients",
                            "Guaranteed payments",
                            "Portfolio management tools",
                            "Marketing support"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-gold-leaf" />
                                <span className="text-white/80">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Side */}
                <Card className="bg-rich-black/80 border-white/10 p-8 backdrop-blur-xl">
                    <h2 className="font-playfair text-2xl text-white mb-6">Photographer Application</h2>
                    <form className="space-y-4" onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const newPhotographer = {
                            id: `custom-${Date.now()}`,
                            name: `${formData.get('firstName')} ${formData.get('lastName')}`,
                            role: "Professional Photographer",
                            image: "https://images.unsplash.com/photo-1554048612-387768052bf7?q=80&w=1000&auto=format&fit=crop", // Default placeholder
                            specialties: ["Wedding", "Portrait"],
                            price: "₹50,000 / day",
                            location: "Mumbai, India", // Default
                            rating: "New",
                            reviews: 0,
                            city: "Mumbai"
                        };

                        localStorage.setItem('custom_photographer', JSON.stringify(newPhotographer));
                        window.location.href = '/success'; // Reuse success page for demo
                    }}>
                        <div className="grid grid-cols-2 gap-4">
                            <Input name="firstName" label="First Name" placeholder="Arjun" className="bg-white/5 border-white/10" required />
                            <Input name="lastName" label="Last Name" placeholder="Reddy" className="bg-white/5 border-white/10" required />
                        </div>
                        <Input name="email" label="Email" type="email" placeholder="studio@example.com" className="bg-white/5 border-white/10" required />
                        <Input name="phone" label="Phone" type="tel" placeholder="+91" className="bg-white/5 border-white/10" required />
                        <Input name="portfolio" label="Portfolio URL" placeholder="instagram.com/yourhandle" className="bg-white/5 border-white/10" />

                        <div className="p-6 border-2 border-dashed border-white/10 rounded-lg text-center cursor-pointer hover:border-gold-leaf/50 transition-colors bg-white/[0.02]">
                            <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                            <p className="text-sm text-gray-400">Upload 3 Best Shots</p>
                        </div>

                        <Button size="lg" className="w-full bg-white text-black hover:bg-gold-leaf hover:text-white font-bold py-6 mt-4 uppercase tracking-widest">
                            Official Registration
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};
