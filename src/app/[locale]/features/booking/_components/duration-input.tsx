"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface DurationInputProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (val: string) => void;
    className?: string;
    error?: string;
}

export function DurationInput({
                                  label,
                                  placeholder,
                                  value,
                                  onChange,
                                  className,
                                  error,
                              }: DurationInputProps) {
    const t = useTranslations('BookingWidget');
    const [isOpen, setIsOpen] = useState(false);

    // Initialize with current value or default to "4"
    const [tempValue, setTempValue] = useState(value || "4");

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (open) {
            setTempValue(value || "4");
        }
    };

    const handleConfirm = () => {
        onChange(tempValue);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full">
            <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>
                    <div className="group relative text-white">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                            <Clock className="h-4 w-4" />
                        </div>
                        <div className="absolute left-10 top-2 text-xs font-medium transition-colors">
                            {label}
                        </div>

                        <button
                            type="button"
                            className={cn(
                                "relative w-full text-left pl-10 h-14  " +
                                "rounded-xl cursor-pointer outline-none transition-all duration-300",
                                error && "border-red-500/50 focus:border-red-500 ring-1 ring-red-500/50",
                                className
                            )}
                        >
                            <span className="font-normal text-base text-white/60 mt-4 block">
                                {value ? `${value} Hours` : placeholder}
                            </span>
                        </button>

                        {error && (
                            <span className="text-xs text-red-400 absolute -bottom-5 left-1 font-medium">
                                {error}
                            </span>
                        )}
                    </div>
                </DialogTrigger>

                {/* MODAL CONTENT */}
                <DialogContent className="sm:max-w-md bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">{t("Form.selectHours")}</DialogTitle>
                    </DialogHeader>

                    <div className="py-1 space-y-4">
                        <div className="grid grid-cols-2 gap-0">
                            <label className="text-s font-semibold ml-3 mt-2">{t("Form.hour")}</label>
                            {/* Controlled Select using tempValue */}
                            <Select value={tempValue} onValueChange={setTempValue}>
                                <SelectTrigger className="h-12 mt-1 bg-gray-300 border-0 font-semibold rounded-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} className="text-muted-foreground" />
                                        <SelectValue />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    {["4", "5", "6", "7", "8", "9", "10"].map(num => (
                                        <SelectItem key={num} value={num.toString()}>
                                            {num}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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
        </div>
    );
}