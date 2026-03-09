import * as React from "react";
import { cn } from "../../lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, helperText, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="text-sm font-medium text-gray-300 ml-1 block">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        type={type}
                        className={cn(
                            "flex h-12 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white transition-all placeholder:text-gray-500",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-leaf focus-visible:border-transparent",
                            "hover:border-white/40 hover:bg-white/10",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            error && "border-red-500 focus-visible:ring-red-500",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                </div>

                {helperText && !error && (
                    <p className="text-xs text-gray-500 ml-1">{helperText}</p>
                )}

                {error && <p className="text-xs text-red-500 ml-1 font-medium">{error}</p>}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
