"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface DurationInputProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (val: string) => void;
    className?: string;
    error?: string;
}

const HOURS = ["4", "5", "6", "7", "8", "9", "10"];

export function DurationInput({
                                  label,
                                  placeholder,
                                  value,
                                  onChange,
                                  className,
                                  error,
                              }: DurationInputProps) {
    return (
        <div className="relative group w-full">
            {/* Icon */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white z-10">
                <Clock className="h-4 w-4" />
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
                        <SelectValue placeholder={placeholder}>
                            {value ? `${value} Hours` : placeholder}
                        </SelectValue>
                    </div>
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-4 w-[200px]">
                    {/* Title */}
                    <div className="px-2 pb-3">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                            Select Duration:
                        </h3>
                    </div>

                    <Separator className="mb-2 bg-gray-300/50 dark:bg-gray-700/50" />

                    {/* Hours List */}
                    {HOURS.map((hour, index) => (
                        <div key={hour}>
                            <SelectItem
                                value={hour}
                                className="cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 rounded-xl
                                focus:bg-black/5 dark:focus:bg-white/10 py-3 px-4 transition-colors"
                            >
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {hour}
                                </span>
                            </SelectItem>
                            {index < HOURS.length - 1 && (
                                <Separator className="my-1 bg-gray-200/50 dark:bg-gray-700/50" />
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