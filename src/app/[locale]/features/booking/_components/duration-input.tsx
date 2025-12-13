"use client";

import * as React from "react";
import { Clock, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface DurationInputProps {
    value: string;
    onChange: (val: string) => void;
    className?: string;
    error?: string;
}

export function DurationInput({
                                  value,
                                  onChange,
                                  className,
                                  error,
                              }: DurationInputProps) {
    return (
        <div className="relative w-full group">
            {/* Icon */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white z-10 pointer-events-none">
                <Clock className="h-4 w-4" />
            </div>

            {/* Label */}
            <div className="absolute left-10 top-2 text-xs text-white/70 font-medium transition-colors pointer-events-none">
                Duration
            </div>

            <Select value={value} onValueChange={onChange}>
                <SelectTrigger
                    className={cn(
                        "w-full pl-9 h-16 pt-5 pb-1 text-left bg-transparent border-0 ring-0 focus:ring-0 text-white font-medium",
                        className,
                        // Error state styling
                        error && "border-red-500/50 focus:border-red-500 ring-1 ring-red-500/50"
                    )}
                >
                    <SelectValue placeholder="Select hours" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 dark:bg-black/90 backdrop-blur-xl border-white/20 max-h-[200px]">
                    {Array.from({ length: 12 }, (_, i) => i + 4).map((hour) => (
                        <SelectItem key={hour} value={hour.toString()} className="cursor-pointer">
                            {hour} Hours
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