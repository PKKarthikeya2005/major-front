import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "./ui/Button";

interface MapPlaceholderProps {
    city: string;
    locationName?: string;
}

export const MapPlaceholder = ({ city, locationName = "Studio / Main Location" }: MapPlaceholderProps) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(city + " photography studio")}`;

    return (
        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden group border border-white/10">
            {/* Background Image (Static Map Style) */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-40 transition-opacity duration-500 grayscale"
                style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/2275px-Google_Maps_Logo_2020.svg.png")' }} // Fallback/Abstract map feeling
            >
                <div className="absolute inset-0 bg-rich-black/60 mix-blend-multiply" />
            </div>

            {/* Interactive Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                <div className="w-16 h-16 rounded-full bg-gold-leaf/10 flex items-center justify-center border border-gold-leaf/30 shadow-[0_0_30px_-5px_rgba(212,175,55,0.3)] mb-4 animate-pulse-slow">
                    <MapPin className="w-8 h-8 text-gold-leaf" />
                </div>

                <h3 className="font-playfair text-2xl text-white mb-1">{city}</h3>
                <p className="text-gray-400 text-sm mb-6">{locationName}</p>

                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-all">
                        <ExternalLink className="w-4 h-4 mr-2" /> Open in Google Maps
                    </Button>
                </a>
            </div>

            {/* Cinematic Scanline/Grid Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,11,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_4px,6px_100%] pointer-events-none" />
        </div>
    );
};
