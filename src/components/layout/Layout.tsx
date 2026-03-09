import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Chatbot } from "../ui/Chatbot";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col bg-rich-black text-white font-manrope">
            <Navbar />
            <main className="flex-grow pt-20">
                {children}
            </main>
            <Footer />
            <Chatbot />
        </div>
    );
};
