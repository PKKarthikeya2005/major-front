import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { photographers } from "../../data/photographers";

const GROQ_API_KEY = "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"; // Ideally in .env, but hardcoded for demo speed

// Construct System Prompt with Data
const SYSTEM_PROMPT = `
You are the Official Concierge for "ChitraSetu", a premium photographer booking platform.
Your role is to help users find the perfect photographer based on their needs.

**YOUR KNOWLEDGE BASE (Available Photographers):**
${photographers.map(p =>
    `- Name: ${p.name} (${p.city})
     - Specialty: ${p.role}
     - Price: ${p.price}
     - Rating: ${p.rating}★
     - Description: ${p.description}`
).join('\n')}

**STRICT BEHAVIORAL RULES:**
1. **Responsible & Conventional:** Speak professionally and politely. Avoid slang or overly dramatic language. Be helpful and direct.
2. **Fact-Based:** ONLY recommend photographers from the list above. Do NOT invent names. If no one matches, say so politely.
3. **Concise:** Keep answers under 3 sentences unless asked for details.
4. **Goal:** Encourage them to "Book Now" or "View Profile".
`;

export const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
        { role: 'assistant', content: "Greetings. I am the ChitraSetu AI. How may I assist you in finding your perfect visual artist today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setInput("");
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        try {
            const response = await fetch("/api/groq/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile", // Updated to valid model
                    messages: [
                        {
                            role: "system",
                            content: SYSTEM_PROMPT
                        },
                        ...messages.map(m => ({ role: m.role, content: m.content })),
                        { role: "user", content: userMsg }
                    ],
                    temperature: 0.5 // Lower temperature for more conventional/predictable responses
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Groq API Error:", errorData);
                throw new Error(errorData.error?.message || `API Error: ${response.status}`);
            }

            const data = await response.json();
            console.log("Groq Success:", data);

            const aiMsg = data.choices?.[0]?.message?.content || "No response content.";
            setMessages(prev => [...prev, { role: 'assistant', content: aiMsg }]);

        } catch (error: any) {
            console.error("Chatbot Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 font-manrope">
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-[350px] h-[500px] bg-rich-black/90 backdrop-blur-xl border border-gold-leaf/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gold-leaf/10 border-b border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-gold-leaf/20 rounded-full border border-gold-leaf/30">
                                    <Bot className="w-4 h-4 text-gold-leaf" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm font-playfair">ChitraSetu AI</h3>
                                    <p className="text-xs text-green-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Online
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10" ref={scrollRef}>
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`max-w-[80%] p-3 text-sm rounded-2xl ${m.role === 'user'
                                            ? 'bg-gold-leaf text-black font-medium rounded-tr-none'
                                            : 'bg-white/10 text-gray-200 border border-white/5 rounded-tl-none'
                                            }`}
                                    >
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none flex gap-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/10 bg-black/20">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask anything..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-gold-leaf/50 transition-colors placeholder:text-gray-600"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="p-2 bg-gold-leaf text-black rounded-full hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-gold-leaf rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center border-2 border-white/20 text-black z-[100] relative group overflow-hidden"
            >
                <div className="absolute inset-0 bg-white/30 skew-x-12 -translate-x-20 group-hover:translate-x-20 transition-transform duration-700 pointer-events-none" />
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </motion.button>
        </div>
    );
};
