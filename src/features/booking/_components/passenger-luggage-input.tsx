"use client";

import React, { useEffect, useState, forwardRef, useCallback, useMemo } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Luggage, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslations } from "next-intl";
import {LUGGAGE_OPTIONS, PASSENGER_OPTIONS, PassengerLuggageInputProps
} from "@/features/booking/_components/data/passenger-luggage-input-data";

const PassengerSelect = React.memo(({
                                        value,
                                        onChange,
                                        label
                                    }: {
    value: string;
    onChange: (value: string) => void;
    label: string;
}) => (
    <div className="space-y-2">
        <label className="text-xs font-semibold ml-3">{label}</label>
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="h-12 mt-1 bg-gray-300 border-0 font-semibold rounded-sm-">
                <div className="flex items-center gap-2">
                    <Users size={16} className="text-muted-foreground" />
                    <SelectValue />
                </div>
            </SelectTrigger>
            <SelectContent>
                {PASSENGER_OPTIONS.map(num => (
                    <SelectItem key={num} value={num.toString()}>
                        {num}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
));

PassengerSelect.displayName = "PassengerSelect";

const LuggageSelect = React.memo(({
                                      value,
                                      onChange,
                                      label
                                  }: {
    value: string;
    onChange: (value: string) => void;
    label: string;
}) => (
    <div className="space-y-2">
        <label className="text-xs font-semibold ml-3">{label}</label>
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="h-12 mt-1 bg-gray-300 border-0 font-semibold rounded-sm-">
                <div className="flex items-center gap-2">
                    <Briefcase size={16} />
                    <SelectValue />
                </div>
            </SelectTrigger>
            <SelectContent>
                {LUGGAGE_OPTIONS.map(num => (
                    <SelectItem key={num} value={num.toString()}>
                        {num}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
));

LuggageSelect.displayName = "LuggageSelect";

export const PassengerLuggageInput = forwardRef<HTMLButtonElement, PassengerLuggageInputProps>(
    ({ value = { passengers: "1", luggage: "0" }, onChange, label, placeholder, error, className, ...props }, ref) => {

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

        const handleConfirm = useCallback(() => {
            onChange({ passengers: tempPassengers, luggage: tempLuggage });
            setIsOpen(false);
        }, [tempPassengers, tempLuggage, onChange]);

        // Memoize handlers to prevent recreation
        const handlePassengersChange = useCallback((val: string) => {
            React.startTransition(() => {
                setTempPassengers(val);
            });
        }, []);

        const handleLuggageChange = useCallback((val: string) => {
            React.startTransition(() => {
                setTempLuggage(val);
            });
        }, []);

        // Memoize display values
        const displayValue = useMemo(() => (
            <p className="text-sm text-white flex items-center mt-5 gap-2">
                {placeholder}
                <span className="font-semibold flex items-center gap-1">
                    {tempPassengers}<Users size={14}/>•{tempLuggage}<Luggage size={14}/>
                </span>
            </p>
        ), [placeholder, tempPassengers, tempLuggage]);

        const summaryValue = useMemo(() => (
            <span className="font-semibold text-black flex items-center gap-2">
                {tempPassengers} <Users size={14}/> • {tempLuggage} <Luggage size={14}/>
            </span>
        ), [tempPassengers, tempLuggage]);

        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <div className="relative w-full group text-white">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                            <Users className="h-4 w-4" />
                        </div>
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
                            <div className="flex flex-col justify-center ml-2 h-full">
                                {(!value.passengers && label) && (
                                    <span className="text-white">{label}</span>
                                )}
                                {displayValue}
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
                        {/* Fix accessibility warning */}
                        <DialogDescription className="sr-only">
                            Select the number of passengers and luggage for your booking
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-1 space-y-4">
                        {/* Grid for Selects */}
                        <div className="grid grid-cols-2">
                            <PassengerSelect
                                value={tempPassengers}
                                onChange={handlePassengersChange}
                                label={t("Form.passengers")}
                            />

                            <LuggageSelect
                                value={tempLuggage}
                                onChange={handleLuggageChange}
                                label={t("Form.luggage")}
                            />
                        </div>

                        {/* Summary Box */}
                        <div className="p-4 bg-gray-300 rounded-xl border border-gray-400 flex items-center justify-between">
                            <span className="text-m text-black">{t("Form.SelectedConfiguration")}</span>
                            <div className="flex items-center gap-3">
                                {summaryValue}
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <DialogClose asChild>
                            <Button variant="ghost" className="rounded-xl h-10 cursor-pointer">
                                {t("Shared.cancel")}
                            </Button>
                        </DialogClose>
                        <Button
                            type="button"
                            onClick={handleConfirm}
                            className="bg-green-600/90 hover:bg-green-700 text-white rounded-xl h-12 px-8 shadow-lg shadow-green-900/20"
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