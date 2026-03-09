import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "ghost" | "outline" | "link";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {

        const variants = {
            primary: "bg-gold-leaf text-rich-black hover:bg-yellow-400 hover:shadow-gold-leaf/30 shadow-lg shadow-gold-leaf/10 border border-transparent font-bold",
            secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-sm font-medium",
            ghost: "bg-transparent text-gray-300 hover:text-white hover:bg-white/5 font-medium",
            outline: "bg-transparent border border-gold-leaf text-gold-leaf hover:bg-gold-leaf/10 font-medium",
            link: "bg-transparent text-gold-leaf hover:underline p-0 h-auto font-medium",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "inline-flex items-center justify-center rounded-lg transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none gap-2 select-none",
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                {children}
            </motion.button>
        );
    }
);

Button.displayName = "Button";

export { Button };
