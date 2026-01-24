"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {useTranslations} from "next-intl";

interface DateTimeInputProps {
    date: Date | undefined;
    time: string | undefined;
    onConfirm: (date: Date, time: string) => void;
    label: string;
    placeholder: string;
    className: string;
    error?: string;
}

export default function DateTimeInput({
                                          date,
                                          time,
                                          onConfirm,
                                          label,
                                          placeholder,
                                          className,
                                          error
                                      }: DateTimeInputProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [tempDate, setTempDate] = React.useState<Date | undefined>(date);
    const [tempTime, setTempTime] = React.useState<string | undefined>(time);
    const t = useTranslations('BookingWidget');

    React.useEffect(() => {
        if (isOpen) {
            setTempDate(date);
            setTempTime(time);
        }
    }, [isOpen, date, time]);

    const handleConfirm = () => {
        if (tempDate && tempTime) {
            onConfirm(tempDate, tempTime);
            setIsOpen(false);
        }
    };

    const timeSlots = React.useMemo(() => {
        return Array.from({ length: 48 }, (_, i) => {
            const totalMinutes = i * 30;
            const hour = Math.floor(totalMinutes / 60);
            const minute = totalMinutes % 60;
            return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        });
    }, []);

    const displayValue = React.useMemo(() => {
        if (!date || !time) return null;
        return (
            <div className="flex items-center gap-2 text-white/80">
                <span className="font-semibold ">{format(date, "dd MMM")}</span>
                <span className="">•</span>
                <span className="font-semibold">{time}</span>
            </div>
        );
    }, [date, time]);

    return (
        <div className="relative w-full ">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div className="group text-white/80">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white z-10">
                        <CalendarIcon className="h-4 w-4"/>
                    </div>
                    <div className="absolute left-10 top-2 text-xs font-normal transition-colors text-white ">{label}</div>
                    <button
                        type="button"
                        className={cn(
                            "relative w-full text-left pl-10 h-14  " +
                            "rounded-xl cursor-pointer outline-none transition-all duration-300",
                            error && "border-red-500/50 focus:border-red-500 ring-1 ring-red-500/50",
                            className
                        )}
                    >
                        <div className="flex flex-col justify-end pb-3 mt-1 h-full">
                            {!displayValue && (
                                <span className=" text-xs font-semibold text-white/60">{placeholder}</span>
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
            <DialogContent className="w-[75vw] max-w-162.5 p-0 overflow-hidden
            bg-white border-none rounded-2xl">
                <DialogHeader className="p-4 pb-0">
                    <DialogTitle className="text-xl font-bold">{t("Form.insideTitle")}</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col md:flex-row">
                    <div className="p-4 flex justify-center border-b md:border-b-0
                    md:border-r border-gray-100 ">
                        <Calendar
                            mode="single"
                            selected={tempDate}
                            onSelect={setTempDate}
                            captionLayout="dropdown-months"
                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                            className="bg-transparent p-0"
                        />
                    </div>
                    <div className="flex-1 min-h-50 md:h-auto bg-gray-50/50 ">
                        <div className="p-3 text-sm font-medium text-center text-muted-foreground
                        border-b border-gray-100 ">
                            {t("Form.availableTime")}
                        </div>
                        <ScrollArea className="h-62.5 md:h-80 p-3">
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                                {timeSlots.map((slot) => (
                                    <Button
                                        key={slot}
                                        variant={tempTime === slot ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setTempTime(slot)}
                                        className={cn(
                                            "w-full transition-all border-gray-300",
                                            tempTime === slot
                                                ? "bg-gray-500 text-white"
                                                : "hover:bg-gray-100 bg-white"
                                        )}
                                    >
                                        {slot}
                                    </Button>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
                <DialogFooter className="p-4 bg-gray-50 border-t flex-row gap-2 justify-between">
                    <div className="text-sm text-muted-foreground hidden sm:block">
                        {tempDate && tempTime ? `${format(tempDate, "EEE, MMM dd")} at ${tempTime}` : ""}
                    </div>
                    <Button onClick={handleConfirm} disabled={!tempDate || !tempTime}
                            className="bg-green-600 text-white">
                        {t("Shared.confirm")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </div>
    );
}