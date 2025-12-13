"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MapPin, Loader2 } from "lucide-react";
import {usePlacesAutocomplete} from "./google-places-autocomplete";


interface LocationInputProps {
    value?: string;
    onChange: (val: string) => void;
    placeholder: string;
    icon?: React.ReactNode;
    error?: string;
    className?: string;
}

export function LocationInput({
                                  value,
                                  onChange,
                                  placeholder,
                                  icon,
                                  error,
                                  className,
                              }: LocationInputProps) {
    const [inputValue, setInputValue] = useState(value || "");
    const [isOpen, setIsOpen] = useState(false);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const { predictions, fetchPredictions, onPlaceSelect, clearSuggestions, isReady } = usePlacesAutocomplete();

    // Sync state if parent changes value (e.g. from a preset)
    useEffect(() => {
        if (value !== undefined) setInputValue(value);
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);
        onChange(val); // Update parent immediately

        if (val.length > 2 && isReady) {
            fetchPredictions(val);
            setIsOpen(true);
        } else {
            setIsOpen(false);
            clearSuggestions();
        }
    };

    const handleSelect = async (place: google.maps.places.Place, text: string) => {
        // 1. UI feedback immediately
        setInputValue(text);
        setIsOpen(false);
        setIsLoadingDetails(true);

        // 2. Fetch official details (Formatted Address)
        const details = await onPlaceSelect(place);

        if (details?.address) {
            setInputValue(details.address);
            onChange(details.address); // Commit the full address to the form
        } else {
            onChange(text); // Fallback
        }

        setIsLoadingDetails(false);
        clearSuggestions();
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className={cn("relative group w-full", className)}>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10 pointer-events-none">
                {isLoadingDetails ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    icon || <MapPin className="h-4 w-4" />
                )}
            </div>

            <Input
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                autoComplete="off"
                className={cn(
                    "pl-9 h-12 bg-white/50 backdrop-blur-sm dark:bg-zinc-900/50",
                    error && "border-red-500 focus-visible:ring-red-500"
                )}
            />

            {isOpen && predictions.length > 0 && (
                <ul className="absolute z-50 w-full mt-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-xl max-h-60 overflow-y-auto no-scrollbar">
                    {predictions.map((pred) => (
                        <li
                            key={pred.placeId}
                            onClick={() => handleSelect(pred.place, pred.text)}
                            className="px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors border-b last:border-b-0 border-gray-100 dark:border-zinc-800 flex items-center gap-3"
                        >
                            <div className="bg-gray-100 dark:bg-zinc-800 p-2 rounded-full shrink-0">
                                <MapPin className="h-4 w-4 text-gray-500" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {pred.text}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {error && (
                <span className="text-xs text-red-500 absolute -bottom-5 left-1">
                    {error}
                </span>
            )}
        </div>
    );
}