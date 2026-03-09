import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

const STEPS = [
    {
        id: 1,
        title: "What's your role?",
        options: ["Client (Looking for Photographer)", "Photographer (Looking for Work)"]
    },
    {
        id: 2,
        title: "What type of photography do you need?",
        options: ["Wedding", "Fashion", "Portrait", "Event", "Product", "Nature"]
    },
    {
        id: 3,
        title: "What is your budget range?",
        options: ["< ₹10,000", "₹10,000 - ₹50,000", "₹50,000 - ₹1 Lakh", "> ₹1 Lakh"]
    }
];

export const Onboarding = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [selections, setSelections] = useState<Record<number, string>>({});

    const handleSelect = (option: string) => {
        setSelections({ ...selections, [currentStep]: option });
    };

    const nextStep = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            navigate("/photographers");
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-2xl">
                <div className="mb-8">
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                            className="h-full bg-gold-leaf transition-all duration-300"
                        />
                    </div>
                    <p className="text-right text-sm text-gray-400 mt-2 font-medium">Step {currentStep + 1} of {STEPS.length}</p>
                </div>

                <Card className="p-10 min-h-[400px] flex flex-col justify-between relative overflow-hidden backdrop-blur-xl bg-rich-black/50 border-white/10 shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold-leaf/5 blur-[100px] rounded-full pointer-events-none" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="font-playfair text-3xl font-bold text-white mb-8 leading-tight">
                                {STEPS[currentStep].title}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {STEPS[currentStep].options.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleSelect(option)}
                                        className={`p-4 rounded-lg border text-left transition-all flex justify-between items-center group font-medium ${selections[currentStep] === option
                                                ? "border-gold-leaf bg-gold-leaf/10 text-white ring-1 ring-gold-leaf/50"
                                                : "border-white/10 bg-white/5 text-gray-400 hover:border-white/30 hover:bg-white/10 hover:text-white"
                                            }`}
                                    >
                                        <span>{option}</span>
                                        {selections[currentStep] === option && <Check className="w-5 h-5 text-gold-leaf" />}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-between mt-12 pt-6 border-t border-white/5 z-10">
                        <Button
                            variant="ghost"
                            onClick={prevStep}
                            disabled={currentStep === 0}
                            className={currentStep === 0 ? "invisible" : "hover:bg-white/5"}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </Button>

                        <Button
                            onClick={nextStep}
                            disabled={!selections[currentStep]}
                            className="px-8"
                            size="lg"
                        >
                            {currentStep === STEPS.length - 1 ? "Finish" : "Next"} <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};
