"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FormProvider } from "react-hook-form";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import {
    ArrowRight,
    CheckCircle2,
    User,
    Phone,
    Mail,
    UploadCloud,
    X,
    ChevronLeft,
    Calendar,
    Info,
    Check,
    AlertCircle,
    Plane,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form";
import { Label } from "@/components/ui/label";

import { LocationInput } from "./location-input";
import { PassengerLuggageInput } from "./passenger-luggage-input";
import DateTimeInput from "@/app/[locale]/features/booking/_components/date-time-input";
import { DurationInput } from "./duration-input";
import { useBookingForm } from "../hooks/use-booking";
import { SERVICE_TYPES } from "../schemas";
import {Textarea} from "@/components/ui/textarea";

const styles = {
    glassInput: "pl-10 text-white bg-white/10 hover:bg-white/30 focus:bg-white/20 border-white/20 placeholder:text-white/30 transition-all duration-300",
    glassTextArea: "pl-10 pt-3 text-white bg-white/10 hover:bg-white/30 focus:bg-white/20 border-white/20 placeholder:text-white/30 transition-all duration-300 min-h-[80px]",
    glassLabel: "text-white/70 text-sm font-medium mb-1.5 block",
    tabTrigger: "rounded-full text-m font-semibold data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg transition-all duration-300 h-11",
    actionBtn: "w-full text-lg font-medium rounded-xl transition-all duration-300 shadow-xl", // Added w-full here
    iconContainer: "absolute left-3 top-1/2 -translate-y-1/2 text-white/50 h-5 w-5 pointer-events-none",
    iconContainerTop: "absolute left-3 top-3 text-white/50 h-5 w-5 pointer-events-none" // For Textarea
};

export default function BookingWidget() {
    const t = useTranslations('Booking');
    const { form, step, price, onTabChange, next, back } = useBookingForm();
    const { watch, setValue, register } = form;

    const serviceType = watch("serviceType");
    const [watchedDate, watchedTime, watchedPassengers, watchedLuggage, pickupAddr, dropoffAddr] = watch([
        "date", "time", "passengers", "luggage", "pickupAddress", "dropoffAddress"
    ]);

    // Local state for file preview
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setFileName(file.name);
            setValue("passport", e.target.files, { shouldValidate: true });
        }
    };

    const clearFile = () => {
        setPreviewUrl(null);
        setFileName(null);
        setValue("passport", null);
    };

    return (
        <Card className="w-full max-w-xl mx-auto border border-white/20 shadow-2xl overflow-hidden
        rounded-[2rem] bg-black/20 backdrop-blur-xl animate-in fade-in duration-500 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-blue-400/20 blur-[60px] -z-10 pointer-events-none"/>

            <FormProvider {...form}>

                {/* --- HEADER (Only show tabs on Step 1) --- */}
                {step === 1 && (
                    <div className="pt-6 px-6 pb-2">
                        <Tabs value={serviceType} onValueChange={onTabChange} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 h-11 bg-black/35 rounded-full">
                                <TabsTrigger value={SERVICE_TYPES.TRANSFER} className={styles.tabTrigger}>
                                    {t("Tabs.oneWay")}
                                </TabsTrigger>
                                <TabsTrigger value={SERVICE_TYPES.HOURLY} className={styles.tabTrigger}>
                                    Hourly
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                )}

                {/* --- FORM BODY --- */}
                <div className="p-6 md:p-8 space-y-6">
                    <AnimatePresence mode="wait">

                        {/* --- STEP 1: SEARCH --- */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="pickupAddress"
                                    render={({ field }) => (
                                        <LocationInput
                                            label="Pick-up location"
                                            placeholder="Enter pick-up location"
                                            value={field.value}
                                            onChange={field.onChange}
                                            error={form.formState.errors.pickupAddress?.message}
                                            className="text-white bg-white/10 hover:bg-white/30 focus:bg-white/20 border-white/20 placeholder:text-white/30 transition-all duration-300"
                                        />
                                    )}
                                />
                                {serviceType === SERVICE_TYPES.TRANSFER ? (
                                    <FormField
                                        control={form.control}
                                        name="dropoffAddress"
                                        render={({ field }) => (
                                            <LocationInput
                                                label="Drop-off location"
                                                placeholder="Enter drop-off location"
                                                value={field.value}
                                                onChange={field.onChange}
                                                error={form.formState.errors.dropoffAddress?.message}
                                                className="text-white bg-white/10 hover:bg-white/30 focus:bg-white/20 border-white/20 placeholder:text-white/30 transition-all duration-300"
                                            />
                                        )}
                                    />
                                ) : (
                                    <FormField
                                        control={form.control}
                                        name="hours"
                                        render={({ field }) => (
                                            <DurationInput
                                                label="Duration"
                                                placeholder="Selected hour"
                                                value={field.value || ""}
                                                onChange={field.onChange}
                                                error={form.formState.errors.hours?.message}
                                                className="text-white bg-white/10 hover:bg-white/30 focus:bg-white/20 border-white/20 placeholder:text-white/30 transition-all duration-300"
                                            />
                                        )}
                                    />
                                )}
                                <div className="grid grid-cols-2 gap-2">
                                    <DateTimeInput
                                        label="Date"
                                        date={watchedDate}
                                        time={watchedTime}
                                        onConfirm={(date, time) => {
                                            setValue("date", date, { shouldValidate: true });
                                            setValue("time", time, { shouldValidate: true });
                                        }}
                                        className="text-white bg-white/10 hover:bg-white/30 focus:bg-white/20 border-white/20 placeholder:text-white/30 transition-all duration-300"
                                        error={form.formState.errors.date?.message || form.formState.errors.time?.message}
                                    />
                                    <PassengerLuggageInput
                                        label="Pass & Luggage"
                                        value={{
                                            passengers: watchedPassengers?.toString() || "1",
                                            luggage: watchedLuggage?.toString() || "0"
                                        }}
                                        onChange={(val) => {
                                            setValue("passengers", parseInt(val.passengers), { shouldValidate: true });
                                            setValue("luggage", parseInt(val.luggage), { shouldValidate: true });
                                        }}
                                        className="text-white bg-white/10 hover:bg-white/30 focus:bg-white/20 border-white/20 placeholder:text-white/30 transition-all duration-300"
                                        error={form.formState.errors.passengers?.message}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* --- STEP 2: VEHICLE & TRIP INFO --- */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                {/* 1. TRIP INFORMATION BOX */}
                                <div className="bg-white/10 border border-white/10 rounded-2xl p-4 space-y-3">
                                    <div className="flex items-center gap-3 text-white/90">
                                        <Calendar className="h-4 w-4 text-green-400 shrink-0" />
                                        <span className="text-sm font-medium">
                                            {watchedDate ? format(watchedDate, "EEEE, dd MMMM yyyy") : "Date"} • {watchedTime || "Time"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-3 relative">
                                        <div className="absolute left-1.75 top-2 bottom-2 w-0.5 bg-white/20" />
                                        <div className="flex items-start gap-3 z-10">
                                            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-black/50 shrink-0 mt-0.5" />
                                            <div className="flex flex-col">
                                                <span className="text-xs text-white/50 uppercase">Pick-up</span>
                                                <span className="text-sm text-white font-medium line-clamp-1">{pickupAddr}</span>
                                            </div>
                                        </div>
                                        {dropoffAddr && (
                                            <div className="flex items-start gap-3 z-10">
                                                <div className="w-4 h-4 rounded-full bg-red-400 border-2 border-black/50 shrink-0 mt-0.5" />
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-white/50 uppercase">Drop-off</span>
                                                    <span className="text-sm text-white font-medium line-clamp-1">{dropoffAddr}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* 2. VEHICLE INFO CARD */}
                                <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
                                    <div className="relative h-48 w-full bg-linear-to-b from-white/10 to-transparent">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src="/images/d2.png"
                                            alt="Mercedes Maybach Vito"
                                            className="w-full h-full object-cover object-center"
                                        />
                                        <div className="absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black via-black/80 to-transparent">
                                            <h3 className="text-xl font-bold text-white">Mercedes-Benz Maybach Vito</h3>
                                            <p className="text-sm text-white/70">Ultra Luxury VIP Series</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. PACKAGE PERKS & TERMS */}
                                <div className="bg-white/5 rounded-2xl p-5 border border-white/10 space-y-4">
                                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <Info className="h-4 w-4 text-green-400"/> Package Details
                                    </h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-3 text-sm text-white/80">
                                            <Check className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                                            <span>Free 30 minutes of wait time.</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-sm text-white/80">
                                            <Check className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                                            <span>Includes Meet & Greet service.</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-xs text-yellow-200/90 bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">
                                            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                                            <span>
                                                Guest/luggage capacities must be abided by. If unsure, select a larger class as service may be refused.
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>
                        )}

                        {/* --- STEP 3: GUEST DETAILS & CHECKOUT --- */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-white tracking-tight">Final Details</h3>
                                    <p className="text-sm text-white/60 mt-1">Please provide your contact information</p>
                                </div>

                                <div className="space-y-4">
                                    {/* ROW 1: Name & Phone - FORCED SIDE BY SIDE */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative group">
                                            <Label className={styles.glassLabel}>Full Name</Label>
                                            <div className="relative">
                                                <User className={styles.iconContainer} />
                                                <Input
                                                    placeholder="John Doe"
                                                    className={styles.glassInput}
                                                    {...register("fullName")}
                                                />
                                            </div>
                                        </div>
                                        <div className="relative group">
                                            <Label className={styles.glassLabel}>Phone Number</Label>
                                            <div className="relative">
                                                <Phone className={styles.iconContainer} />
                                                <Input
                                                    placeholder="+1 234 567 890"
                                                    className={styles.glassInput}
                                                    {...register("phone")}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* ROW 2: Email & Flight No - FORCED SIDE BY SIDE */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative group">
                                            <Label className={styles.glassLabel}>Email Address</Label>
                                            <div className="relative">
                                                <Mail className={styles.iconContainer} />
                                                <Input
                                                    placeholder="john@example.com"
                                                    className={styles.glassInput}
                                                    {...register("email")}
                                                />
                                            </div>
                                        </div>
                                        <div className="relative group">
                                            <div className="flex justify-between items-center">
                                                <Label className={styles.glassLabel}>Flight No</Label>
                                            </div>
                                            <div className="relative">
                                                <Plane className={styles.iconContainer} />
                                                <Input
                                                    placeholder="TK 1234"
                                                    className={styles.glassInput}
                                                    {...register("flightNo")}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* ROW 3: Driver Notes */}
                                    <div className="relative group">
                                        <div className="flex justify-between items-center">
                                            <Label className={styles.glassLabel}>Note to driver</Label>
                                            <span className="text-xs text-white/40 uppercase tracking-wider">(Optional)</span>
                                        </div>
                                        <div className="relative">
                                            <Textarea
                                                placeholder="Child seat required etc..."
                                                className={styles.glassTextArea}
                                                {...register("notes")}
                                            />
                                        </div>
                                    </div>

                                    {/* ROW 4: Passport Upload */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <Label className={styles.glassLabel}>Passport Photo</Label>
                                        </div>

                                        {!previewUrl ? (
                                            <div className="relative">
                                                <Input type="file" accept="image/*" className="hidden" id="passport-upload" onChange={handleFileChange} />
                                                <label htmlFor="passport-upload" className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-white/20 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-all hover:border-white/40 group">
                                                    <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                                                        <UploadCloud className="h-5 w-5" />
                                                        <span className="text-sm font-medium">Click to upload</span>
                                                    </div>
                                                </label>
                                            </div>
                                        ) : (
                                            <div className="relative w-full h-20 rounded-xl overflow-hidden border border-white/20 group bg-black/40">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={previewUrl} alt="Passport Preview" className="w-full h-full object-cover opacity-60" />
                                                <div className="absolute inset-0 flex items-center justify-between px-4">
                                                    <div className="flex items-center gap-3">
                                                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                                                        <span className="text-sm font-medium text-white truncate max-w-37.5">{fileName}</span>
                                                    </div>
                                                    <Button size="icon" variant="ghost" type="button" className="h-8 w-8 text-white
                                                    hover:bg-red-500/20 hover:text-red-400 rounded-full" onClick={clearFile}>
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* ROW 5: Price Total */}
                                    <div className="flex justify-between items-center px-4 py-3 bg-white/10 rounded-xl border border-white/10">
                                        <span className="text-sm text-white/80">Estimated Total</span>
                                        <span className="text-xl font-bold text-green-400">{price} TL</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* --- FOOTER BUTTONS --- */}
                <div className="p-6 pt-0">
                    {step === 1 ? (
                        <Button
                            onClick={next}
                            className={`${styles.actionBtn} bg-white text-black hover:bg-white/90`}
                        >
                            View Prices <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    ) : step === 2 ? (
                        // STEP 2 ACTIONS (Fixed Alignment)
                        <div className="space-y-3">
                            <div className="flex gap-3 w-full">
                                <Button
                                    onClick={back}
                                    className="h-14 px-4 rounded-xl text-white hover:bg-white/10 shrink-0"
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </Button>
                                <Button
                                    onClick={next}
                                    className={`${styles.actionBtn} bg-green-600 hover:bg-green-500 
                                    text-white shadow-green-900/20 flex-1 mt-2 h-10 cursor-pointer`}
                                >
                                    Continue
                                </Button>
                            </div>
                            <div className="text-center">
                                <button type="button" className="text-xs text-white/40 hover:text-white/80 underline underline-offset-4 transition-colors">
                                    View Terms & Conditions
                                </button>
                            </div>
                        </div>
                    ) : (
                        // STEP 3 ACTIONS
                        <div className="flex gap-3 w-full">
                            <Button  onClick={back} className="h-14 px-4 rounded-xl text-white hover:bg-white/10 shrink-0">
                                <ChevronLeft className="h-6 w-6 text-white" />
                            </Button>
                            <Button onClick={next} className={`${styles.actionBtn} bg-green-600 hover:bg-green-500 
                            text-white shadow-green-900/20 flex-1 mt-2 h-10`}>
                                Confirm Booking <CheckCircle2 className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    )}
                </div>

            </FormProvider>
        </Card>
    );
}