"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MapPin, Loader2 } from "lucide-react";
import { usePlacesAutocomplete } from "./google-places-autocomplete";

interface LocationInputProps {
    value?: string;
    onChange: (val: string) => void;
    // NEW: Callback to return both formats
    onLocationSelect?: (details: { display: string; pricing: string }) => void;
    label: string;
    placeholder: string;
    error?: string;
    className?: string;
    icon?: React.ReactNode;
}

export function LocationInput({
                                  value,
                                  onChange,
                                  onLocationSelect, // <--- Destructure this
                                  label,
                                  placeholder,
                                  error,
                                  className,
                                  icon
                              }: LocationInputProps) {
    const [inputValue, setInputValue] = useState(value || "");
    const [isOpen, setIsOpen] = useState(false);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const { predictions, fetchPredictions, onPlaceSelect, clearSuggestions, isReady } = usePlacesAutocomplete();

    useEffect(() => {
        if (value !== undefined) setInputValue(value);
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);
        onChange(val); // Standard form update

        // If user types manually, we reset the specific pricing zone to null or raw text
        // This ensures we don't use a stale "maltepe/istanbul" if they delete it and type "Paris"
        if (onLocationSelect) {
            onLocationSelect({ display: val, pricing: val });
        }

        if (val.length > 2 && isReady) {
            fetchPredictions(val);
            setIsOpen(true);
        } else {
            setIsOpen(false);
            clearSuggestions();
        }
    };

    const handleSelect = async (place: google.maps.places.Place, text: string) => {
        setInputValue(text);
        setIsOpen(false);
        setIsLoadingDetails(true);

        const details = await onPlaceSelect(place);

        if (details) {
            // 1. UI shows the pretty address (Full Google Address)
            setInputValue(details.displayAddress);
            onChange(details.displayAddress);

            // 2. Logic receives the split data
            if (onLocationSelect) {
                onLocationSelect({
                    display: details.displayAddress,
                    pricing: details.pricingAddress // "maltepe/istanbul"
                });
            }
        } else {
            onChange(text);
            if (onLocationSelect) onLocationSelect({ display: text, pricing: text });
        }

        setIsLoadingDetails(false);
        clearSuggestions();
    };

    // ... (rest of the component: useEffect for click outside, return JSX) ...
    // Note: The rest of your JSX remains exactly the same
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
        <div ref={containerRef} className="relative group w-full">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white z-10 ">
                {isLoadingDetails ? (<Loader2 className="h-4 w-4 animate-spin"/>) : (icon || <MapPin className="h-4 w-4"/>)}
            </div>
            <div className="absolute left-10 top-2 text-xs text-white/80 font-medium transition-colors">
                {label}
            </div>
            <Input
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                autoComplete="off"
                className={cn("pt-6 pb-2 h-16 pl-10", className, error && "border-red-500/50 focus-visible:ring-red-500/50")}
            />
            {isOpen && predictions.length > 0 && (
                <ul className="absolute z-50 w-full mt-2 p-1 bg-white/90  backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-h-60 overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-200">
                    {predictions.map((pred) => (
                        <li key={pred.placeId} onClick={() => handleSelect(pred.place, pred.text)} className="px-4 py-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-colors flex items-center gap-3">
                            <div className="bg-gray-200/50 dark:bg-white/10 p-2 rounded-full shrink-0"><MapPin className="h-3.5 w-3.5 text-gray-600 dark:text-gray-300" /></div>
                            <div className="flex flex-col"><span className="text-sm font-medium text-foreground">{pred.text}</span></div>
                        </li>
                    ))}
                </ul>
            )}
            {error && (<span className="text-xs text-red-400 absolute -bottom-5 left-1 font-medium">{error}</span>)}
        </div>
    );
}