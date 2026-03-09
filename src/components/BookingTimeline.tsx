import { motion } from "framer-motion";
import { CheckCircle, Clock, Camera, Check } from "lucide-react";

interface BookingTimelineProps {
    status: string; // "Confirmed", "In Progress", "Completed"
    date: string;
}

export const BookingTimeline = ({ status, date }: BookingTimelineProps) => {
    const steps = [
        { id: 1, label: "Booked", icon: CheckCircle },
        { id: 2, label: "Shoot Day", icon: Camera },
        { id: 3, label: "Editing", icon: Clock },
        { id: 4, label: "Delivered", icon: Check }
    ];

    // Determine current step index based on status (Mock logic)
    let currentStepIndex = 0;
    if (status === "Confirmed") currentStepIndex = 1;
    if (status === "In Progress") currentStepIndex = 2; // Mocking 'Shoot Day' to 'Editing'
    if (status === "Completed") currentStepIndex = 4;

    return (
        <div className="w-full py-6">
            <div className="relative flex items-center justify-between">
                {/* Connecting Line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white/10 -z-10" />
                <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-gold-leaf -z-10"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {steps.map((step, index) => {
                    const isCompleted = index < currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    const Icon = step.icon;

                    return (
                        <div key={step.id} className="flex flex-col items-center gap-3">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: index * 0.2 }}
                                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 bg-rich-black
                                    ${isCompleted || isCurrent
                                        ? "border-gold-leaf text-gold-leaf shadow-[0_0_15px_-3px_rgba(212,175,55,0.4)]"
                                        : "border-white/10 text-gray-600"
                                    }
                                `}
                            >
                                <Icon className="w-5 h-5" />
                            </motion.div>
                            <span className={`text-xs font-medium uppercase tracking-wider ${isCompleted || isCurrent ? "text-white" : "text-gray-600"}`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
            <div className="text-center mt-6">
                {status === "Confirmed" && <p className="text-sm text-gold-leaf">Upcoming Shoot on {date}</p>}
                {status === "Completed" && <p className="text-sm text-green-400">Memories Delivered</p>}
            </div>
        </div>
    );
};
