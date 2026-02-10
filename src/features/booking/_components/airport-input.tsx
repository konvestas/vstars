"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
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
    { value: "istanbul-airport", label: "Istanbul Airport", code: "IST" },
    { value: "sabiha-gokcen", label: "Sabiha Gökçen Airport", code: "SAW" }
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
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white z-10">
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
                        "pt-8 pb-8 h-16 pl-10 cursor-pointer",
                        className,
                        error && "border-red-500/50 focus-visible:ring-red-500/50"
                    )}
                >
                    <div className="pt-4">
                        <SelectValue placeholder={placeholder} />
                    </div>
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-2">
                    {AIRPORTS.map((airport, index) => (
                        <div key={airport.value}>
                            <SelectItem
                                value={airport.value}
                                className="cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 rounded-xl
                                focus:bg-black/5 dark:focus:bg-white/10 py-3 px-4 transition-colors"
                            >
                                <div className="flex items-center justify-between w-full gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-linear-to-br from-blue-100 to-blue-200 dark:from-blue-900/30
                                        dark:to-blue-800/30 p-2.5 rounded-full">
                                            <Plane className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                {airport.label}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-xs font-medium text-gray-600 dark:text-gray-500 bg-gray-100
                                    dark:bg-gray-800 px-2 py-1 rounded-md">
                                        {airport.code}
                                    </span>
                                </div>
                            </SelectItem>
                            {index < AIRPORTS.length - 1 && (
                                <Separator className="my-1.5 bg-gray-500/50 dark:bg-gray-700/50" />
                            )}
                        </div>
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