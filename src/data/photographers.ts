export interface Photographer {
    id: string;
    name: string;
    role: string;
    city: string;
    price: string;
    description: string;
    image: string;
    rating: number;
    reviews: number;
    portfolio: string[];
    specialty: string; // e.g. "Wedding", "Wildlife"
    whyChosen: string;
    mapQuery: string;
}

export const photographers: Photographer[] = [
    {
        id: "pavan",
        name: "Pavan Kumar",
        role: "Cinematic Travel & Landscape",
        city: "Hyderabad",
        price: "₹15,000/day",
        description: "Capturing the soul of travel through cinematic composition and natural light. Pavan turns journeys into visual legacies.",
        image: "/images/pavan.jpg",
        rating: 4.9,
        reviews: 142,
        specialty: "Travel",
        portfolio: [
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop"
        ],
        whyChosen: "Pavan's ability to frame vast landscapes while maintaining intimacy makes him our top travel choice.",
        mapQuery: "Charminar, Hyderabad, Telangana"
    },
    {
        id: "sreenath",
        name: "Sreenath Reddy",
        role: "Fashion & Editorial",
        city: "Warangal",
        price: "₹25,000/day",
        description: "Bold, edgy, and unapologetically stylish. Sreenath brings magazine-quality aesthetics to personal portfolios.",
        image: "/images/sreenath.jpg",
        rating: 4.8,
        reviews: 98,
        specialty: "Fashion",
        portfolio: [
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop"
        ],
        whyChosen: "His lighting techniques are industry-standard, offering a distinct 'Vogue' look to his subjects.",
        mapQuery: "Warangal Fort, Warangal, Telangana"
    },
    {
        id: "jaya",
        name: "Jaya Vardhan",
        role: "Street & Portrait",
        city: "Visakhapatnam",
        price: "₹18,000/day",
        description: "Finding the extraordinary in the ordinary. Jaya's street photography reveals the hidden stories of the city.",
        image: "/images/jaya.jpg",
        rating: 5.0,
        reviews: 215,
        specialty: "Portrait",
        portfolio: [
            "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2000&auto=format&fit=crop"
        ],
        whyChosen: "Jaya merges documentary style with fine art, ensuring every portrait feels authentic.",
        mapQuery: "RK Beach, Visakhapatnam, Andhra Pradesh"
    },
    {
        id: "shashank",
        name: "Shashank Reddy",
        role: "Wildlife & Adventure",
        city: "Adilabad",
        price: "₹22,000/day",
        description: "Patience is his virtue. Shashank waits days for the perfect shot of nature's raw beauty.",
        image: "/images/shashank.jpg",
        rating: 4.9,
        reviews: 86,
        specialty: "Wildlife",
        portfolio: [
            "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&auto=format&fit=crop"
        ],
        whyChosen: "Recognized by National Geographic for his work in the Telangana forest reserves.",
        mapQuery: "Kuntala Waterfalls, Adilabad"
    },
    {
        id: "kashyap",
        name: "Kashyap Karthikeya",
        role: "Conceptual & Fine Art",
        city: "Hyderabad",
        price: "₹30,000/day",
        description: "Abstract, surreal, and thought-provoking. Kashyap creates visual poetry.",
        image: "/images/kashyap.jpg",
        rating: 4.7,
        reviews: 64,
        specialty: "Art",
        portfolio: [
            "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2000&auto=format&fit=crop"
        ],
        whyChosen: "His work is perfect for high-end brands looking for a unique visual identity.",
        mapQuery: "Jubilee Hills, Hyderabad"
    },
    {
        id: "karthikeya",
        name: "Karthikeya",
        role: "Mood, Monochrome & Storytelling",
        city: "Khammam",
        price: "₹20,000/day",
        description: "Master of shadows and light. Karthikeya's monochrome work brings a timeless gravity to every frame.",
        image: "/images/karthikeya.jpg",
        rating: 4.8,
        reviews: 72,
        specialty: "Monochrome",
        portfolio: [
            "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1470114716159-2796bbba03b4?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1440589486450-77a769f39008?q=80&w=2000&auto=format&fit=crop"
        ],
        whyChosen: "He turns simple moments into dramatic, cinematic stills.",
        mapQuery: "Khammam Fort, Khammam"
    }
];
