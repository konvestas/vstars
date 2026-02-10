"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Plane } from "lucide-react";

interface AirportInputProps {
    value?: string;
    onChange: (val: string) => void;
    label: string;
    placeholder: string;
    error?: string;
    className?: string;
}

const AIRPORTS = [
    { value: "istanbul-airport", label: "Istanbul Airport (IST)" },
    { value: "sabiha-gokcen", label: "Sabiha Gökçen Airport (SAW)" }
];

export function AirportInput({
                                 value,
                                 onChange,
                                 label,
                                 placeholder,
                                 error,
                                 className
                             }: AirportInputProps) {
    return (
        <div className="relative group w-full">
            {/* Icon */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white z-10 pointer-events-none">
                <Plane className="h-4 w-4" />
            </div>

            {/* Floating Label */}
            <div className="absolute left-10 top-2 text-xs text-white/80 font-medium transition-colors pointer-events-none">
                {label}
            </div>

            {/* Select */}
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger
                    className={cn(
                        "pt-6 pb-8 h-16 pl-10 cursor-pointer",
                        className,
                        error && "border-red-500/50 focus-visible:ring-red-500/50"
                    )}
                >
                    <SelectValue placeholder={placeholder}/>
                </SelectTrigger>
                <SelectContent className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl">
                    {AIRPORTS.map((airport) => (
                        <SelectItem
                            key={airport.value}
                            value={airport.value}
                            className="cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 rounded-xl"
                        >
                            <div className="flex items-center mt-6">
                                <span className="text-sm font-medium">{airport.label}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {error && (
                <span className="text-xs text-red-400 absolute -bottom-5 left-1 font-medium">
                    {error}
                </span>
            )}
        </div>
    );
}