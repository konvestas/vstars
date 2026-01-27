"use client";

import React, { useEffect, useState, forwardRef } from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Luggage, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslations } from "next-intl";

// Define the shape of the value object
export interface PassengerValue {
    passengers: string;
    luggage: string;
}

interface PassengerLuggageInputProps {
    value?: PassengerValue;
    onChange: (value: PassengerValue) => void;
    label: string;
    placeholder: string;
    error?: string;
    className: string;
}

export const PassengerLuggageInput = forwardRef<HTMLButtonElement, PassengerLuggageInputProps>(
    ({ value = { passengers: "1", luggage: "0" }, onChange, label,placeholder, error, className, ...props }, ref) => {

        const t = useTranslations('BookingWidget');

        const [isOpen, setIsOpen] = useState(false);
        const [tempPassengers, setTempPassengers] = useState(value.passengers);
        const [tempLuggage, setTempLuggage] = useState(value.luggage);

        // Reset temp state when modal opens or parent value changes
        useEffect(() => {
            if (isOpen) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setTempPassengers(value.passengers);
                setTempLuggage(value.luggage);
            }
        }, [isOpen, value]);

        const handleConfirm = () => {
            onChange({ passengers: tempPassengers, luggage: tempLuggage });
            setIsOpen(false);
        };

        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <div className="relative w-full group text-white">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 "><Users className="h-4 w-4" /></div>
                        <div className="absolute left-11 top-2 text-xs font-normal transition-colors">{label}</div>

                        <button
                            type="button"
                            ref={ref}
                            className={cn(
                                "relative w-full text-left pl-9 pr-3 h-14 " +
                                "rounded-xl cursor-pointer outline-none transition-all duration-300",
                                "flex items-center justify-between",
                                error && "border-red-500/50 focus:border-red-500 ring-1 ring-red-500/50",
                                className
                            )}
                            {...props}
                        >
                            {/* Placeholder / Label logic */}
                            <div className="flex flex-col justify-center ml-2 h-full">
                                {(!value.passengers && label) && (
                                    <span className="text-white">{label}</span>
                                )}
                                <p className="text-sm text-white flex items-center mt-5 gap-2">
                                    {placeholder}
                                    <span className="font-semibold flex items-center gap-1">
                                        {tempPassengers}<Users size={14}/> •{tempLuggage}<Luggage size={14}/>
                                    </span>
                                </p>
                            </div>

                        </button>
                        {error && (
                            <span className="text-xs text-red-400 absolute -bottom-5 left-1 font-medium">
                                {error}
                            </span>
                        )}
                    </div>
                </DialogTrigger>

                {/* MODAL CONTENT */}
                <DialogContent className="sm:max-w-md bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border
                border-white/20 dark:border-white/10 rounded-2xl shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">{t("Form.PassLugTitle")}</DialogTitle>
                    </DialogHeader>

                    <div className="py-1 space-y-4">
                        {/* Grid for Selects */}
                        <div className="grid grid-cols-2 ">
                            {/* Passengers Select */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold ml-3">{t("Form.passengers")}</label>
                                <Select value={tempPassengers} onValueChange={setTempPassengers}>
                                    <SelectTrigger className="h-12 mt-1 bg-gray-300  border-0 font-semibold rounded-sm-">
                                    <div className="flex items-center gap-2">
                                            <Users size={16} className="text-muted-foreground" />
                                            <SelectValue />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[1, 2, 3, 4, 5].map(num => (
                                            <SelectItem key={num} value={num.toString()}>
                                                {num} {num === 8 ? "+" : ""}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Luggage Select */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold ml-3">{t("Form.luggage")}</label>
                                <Select value={tempLuggage} onValueChange={setTempLuggage}>
                                    <SelectTrigger className="h-12 mt-1 bg-gray-300  border-0 font-semibold rounded-sm-">
                                        <div className="flex items-center gap-2 ">
                                            <Briefcase size={16}/>
                                            <SelectValue />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[0, 1, 2, 3, 4, 5, 6].map(num => (
                                            <SelectItem key={num} value={num.toString()}>
                                                {num} {num === 8 ? "+" : ""}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Summary Box */}
                        <div className="p-4 bg-gray-300 rounded-xl border
                         border-gray-400 flex items-center justify-between">
                            <span className="text-m text-black ">{t("Form.SelectedConfiguration")}</span>
                            <div className="flex items-center gap-3">
                                 <span className="font-semibold text-black flex items-center gap-2">
                                        {tempPassengers} <Users size={14}/> • {tempLuggage} <Luggage size={14}/>
                                 </span>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0 ">
                        <DialogClose asChild>
                            <Button variant="ghost" className="rounded-xl h-10 cursor-pointer">
                                {t("Shared.cancel")}
                            </Button>
                        </DialogClose>
                        <Button
                            type="button"
                            onClick={handleConfirm}
                            className="bg-green-600/90 hover:bg-green-700 text-white
                            rounded-xl h-12 px-8 shadow-lg shadow-green-900/20"
                        >
                            {t("Shared.confirm")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }
);

PassengerLuggageInput.displayName = "PassengerLuggageInput";