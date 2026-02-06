import { useState } from "react";
import {motion, AnimatePresence, LazyMotion, domAnimation} from "framer-motion";
import { FormProvider } from "react-hook-form";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import {ArrowRight, CheckCircle2, User, Phone, Mail, UploadCloud, X, ChevronLeft, Calendar, Info, Check, AlertCircle, Plane, Hourglass, MapPinned} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form";
import { Label } from "@/components/ui/label";

import { LocationInput } from "./location-input";
import { PassengerLuggageInput } from "./passenger-luggage-input";
import DateTimeInput from "@/features/booking/_components/date-time-input";
import { DurationInput } from "./duration-input";
import { useBookingForm } from "@/features/booking/hooks/use-booking";
import { SERVICE_TYPES } from "../schemas";
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils";
import { toast } from "sonner";

const styles = {
    tabTrigger:    "rounded-full text-m font-semibold data-[state=active]:bg-white data-[state=active]:text-black " +
        "data-[state=active]:shadow-lg transition-all duration-300 h-11",
    glassInput:    "pl-10 text-white bg-white/10 hover:bg-white/30 focus:bg-white/20 border-white/20 " +
        "placeholder:text-white/30 transition-all duration-300",
    glassLabel:    "text-white/70 text-sm font-medium mb-1.5 block",
    actionBtn:     "w-full flex-1 h-10 cursor-pointer text-lg font-medium text-white rounded-xl bg-green-700 hover:bg-green-600 " +
        "shadow-xl shadow-green-900/30 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-green-400",
    backBtn:       "h-10 mt-2 px-4 rounded-xl text-white bg-white/5 hover:bg-white/10 shrink-0",
    iconContainer: "absolute left-3 top-1/2 text-white/50 h-5 w-5 pointer-events-none -translate-y-1/2 "
};

export default function BookingWidget() {
    const t = useTranslations('BookingWidget');
    const { form, step, price, onTabChange, next, back } = useBookingForm();
    const { watch, setValue, register } = form;

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Convert File to base64
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    // SEND BOOKING EMAIL
    const sendBookingEmail = async () => {
        try {
            setIsSubmitting(true);

            const formValues = form.getValues();

            // Handle passport photo if exists
            let passportPhoto = null;
            if (formValues.passport && formValues.passport.length > 0) {
                const file = formValues.passport[0];
                const base64Data = await fileToBase64(file);
                passportPhoto = {
                    data: base64Data,
                    filename: file.name,
                    mimeType: file.type
                };
            }

            const payload = {
                fullName: formValues.fullName,
                phone: formValues.phone,
                email: formValues.email,
                flightNumber: formValues.flightNo || "",
                notes: formValues.notes || "",
                bookingType: formValues.serviceType,
                duration: formValues.hours || "",
                fromLocation: formValues.pickupAddress,
                toLocation: formValues.dropoffAddress || "",
                dateInfo: {
                    date: formValues.date.toISOString(),
                    time: formValues.time
                },
                passengers: formValues.passengers,
                luggage: formValues.luggage,
                passportPhoto: passportPhoto,
                calculatedPrice: price
            };

            const res = await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                toast.success("Booking request submitted successfully!");
                // Optionally reset form or redirect
                // form.reset();
            } else {
                const error = await res.json();
                toast.error(error.error || "Failed to send booking request");
            }
        } catch (err) {
            console.error("Booking submission error:", err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

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
        <LazyMotion features={domAnimation}>
            <Card className="w-full max-w-xl mt-5 mx-auto border border-white/20 shadow-2xl overflow-hidden
        rounded-[2rem] bg-black/20 backdrop-blur-xl animate-in fade-in duration-500 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-blue-400/20 blur-[60px] -z-10 pointer-events-none"/>

                <FormProvider {...form}>

                    {/* --- HEADER  TABS ) --- */}
                    {step === 1 && (
                        <div className="pt-6 px-6">
                            <Tabs value={serviceType} onValueChange={onTabChange} className="w-full">
                                <TabsList className="grid w-full grid-cols-3 h-13 bg-black/35 rounded-full">
                                    <TabsTrigger value={SERVICE_TYPES.TRANSFER} className={styles.tabTrigger}>
                                      <MapPinned/>  {t("Tabs.oneWay")}
                                    </TabsTrigger>
                                    <TabsTrigger value={SERVICE_TYPES.HOURLY} className={styles.tabTrigger}>
                                       <Hourglass/> {t("Tabs.hourly")}
                                    </TabsTrigger>
                                    <TabsTrigger value={SERVICE_TYPES.AIRPORT} className={styles.tabTrigger}>
                                        <Plane/> Airport Transfer
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
                                                label={t("Form.pickUpLocation")}
                                                placeholder={t("Form.pickUpLocationPlaceHolder")}
                                                value={field.value}
                                                onChange={field.onChange}
                                                error={form.formState.errors.pickupAddress?.message}
                                                className={styles.glassInput}
                                            />
                                        )}
                                    />

                                    {serviceType !== SERVICE_TYPES.HOURLY ? (
                                        <FormField
                                            control={form.control}
                                            name="dropoffAddress"
                                            render={({ field }) => (
                                                <LocationInput
                                                    label={t("Form.dropOffLocation")}
                                                    placeholder={t("Form.dropOffLocationPlaceHolder")}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    error={form.formState.errors.dropoffAddress?.message}
                                                    className={styles.glassInput}
                                                />
                                            )}
                                        />
                                    ) : (
                                        // HOURLY TAB DURATION
                                        <FormField
                                            control={form.control}
                                            name="hours"
                                            render={({ field }) => (
                                                <DurationInput
                                                    label={t("Form.duration")}
                                                    placeholder={t("Form.durationPlaceHolder")}
                                                    value={field.value || ""}
                                                    onChange={field.onChange}
                                                    error={form.formState.errors.hours?.message}
                                                    className={styles.glassInput}
                                                />
                                            )}
                                        />
                                    )}
                                    <div className="grid grid-cols-2 gap-2 ">
                                        <DateTimeInput
                                            label={t("Form.date")}
                                            placeholder={t("Form.datePlaceHolder")}
                                            date={watchedDate}
                                            time={watchedTime}
                                            onConfirm={(date, time) => {
                                                setValue("date", date, { shouldValidate: true });
                                                setValue("time", time, { shouldValidate: true });
                                            }}
                                            className={styles.glassInput}
                                            error={form.formState.errors.date?.message || form.formState.errors.time?.message}
                                        />
                                        <PassengerLuggageInput
                                            label={t("Form.PassengerLuggage")}
                                            placeholder={t("Form.selected")}
                                            value={{
                                                passengers: watchedPassengers?.toString() || "1",
                                                luggage: watchedLuggage?.toString() || "0"
                                            }}
                                            onChange={(val) => {
                                                setValue("passengers", parseInt(val.passengers), { shouldValidate: true });
                                                setValue("luggage", parseInt(val.luggage), { shouldValidate: true });
                                            }}
                                            className={styles.glassInput}
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
                                            {watchedDate ? format(watchedDate, "EEEE, dd MMMM yyyy") : "Date"} • {watchedTime}
                                        </span>
                                        </div>
                                        <div className="flex flex-col gap-3 relative">
                                            <div className="absolute left-1.75 top-2 bottom-5 w-0.5 bg-white/20" />
                                            <div className="flex items-start gap-3 z-10">
                                                <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-black/50 shrink-0 mt-0.5" />
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-white/50 uppercase">{t("Form.pickUpLocation")}</span>
                                                    <span className="text-sm text-white font-medium line-clamp-1">{pickupAddr}</span>
                                                </div>
                                            </div>
                                            {dropoffAddr && (
                                                <div className="flex items-start gap-3 z-10">
                                                    <div className="w-4 h-4 rounded-full bg-red-400 border-2 border-black/50 shrink-0 mt-0.5" />
                                                    <div className="flex flex-col">
                                                        <span className="text-xs text-white/50 uppercase">{t("Form.dropOffLocation")}</span>
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
                                                src="/vstars/vstars-transfer-vehicle-vip-interior.webp"
                                                alt="Mercedes Vito"
                                                className="w-full h-full object-cover opacity-90"
                                            />
                                        </div>
                                        <div className="p-4 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-lg font-bold text-white">Mercedes-Benz Maybach Vito</h4>
                                            </div>
                                            <p className="text-sm text-white/70">VIP Series</p>
                                        </div>
                                    </div>

                                {/* 3. PACKAGE PERKS & TERMS */}
                                <div className="bg-white/5 rounded-2xl p-5 border border-white/10 space-y-4">
                                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb- flex items-center gap-2">
                                        <Info className="h-4 w-4 text-green-400"/> {t("PackageDetail.title")}
                                    </h4>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3 text-sm text-white/80">
                                            <Check className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                                            <span>{t("PackageDetail.waitTime")}</span>
                                            <Check className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                                            <span>{t("PackageDetail.greet")}</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-xs text-yellow-200/90
                                        bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">
                                            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                                            <span>{t("PackageDetail.alert")}</span>
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>
                        )}

                            {/* --- STEP 3: GUEST Info & CHECKOUT --- */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold text-white tracking-tight">{t("GuestInfo.title")}</h3>
                                        <p className="text-sm text-white/60 mt-1">{t("GuestInfo.desc")}</p>
                                    </div>

                                    <div className="space-y-4">
                                        {/* ROW 1: Name & Phone */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="relative group">
                                                <Label className={styles.glassLabel}>{t("GuestInfo.fullname")}</Label>
                                                <div className="relative">
                                                    <User className={styles.iconContainer} />
                                                    <Input
                                                        placeholder="John Doe"
                                                        {...register("fullName")}
                                                        className={cn(
                                                            styles.glassInput,
                                                            form.formState.errors.fullName && "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <div className="relative group">
                                                <Label className={styles.glassLabel}>{t("GuestInfo.phone")}</Label>
                                                <div className="relative">
                                                    <Phone className={styles.iconContainer} />
                                                    <Input
                                                        placeholder="+1 234 567 890"
                                                        {...register("phone")}
                                                        className={cn(
                                                            styles.glassInput,
                                                            form.formState.errors.phone && "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* ROW 2: Email & Flight No */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="relative group">
                                                <Label className={styles.glassLabel}>{t("GuestInfo.email")}</Label>
                                                <div className="relative">
                                                    <Mail className={styles.iconContainer} />
                                                    <Input
                                                        placeholder="john@example.com"
                                                        {...register("email")}
                                                        className={cn(
                                                            styles.glassInput,
                                                            form.formState.errors.email && "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <div className="relative group">
                                                <div className="flex justify-between items-center">
                                                    <Label className={styles.glassLabel}>{t("GuestInfo.flightNumber")}</Label>
                                                    <span className="text-[10px] sm:text-xs text-white/40 tracking-wider">{t("GuestInfo.optional")}</span>
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
                                                <Label className={styles.glassLabel}>{t("GuestInfo.driverNote")}</Label>
                                                <span className="text-xs text-white/40 tracking-wider">{t("GuestInfo.optional")}</span>
                                            </div>
                                            <div className="relative">
                                                <Textarea
                                                    placeholder={t("GuestInfo.driverNotePlaceHolder")}
                                                    className={styles.glassInput}
                                                    {...register("notes")}
                                                />
                                            </div>
                                        </div>

                                        {/* ROW 4: Passport Upload */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <Label className={styles.glassLabel}>{t("GuestInfo.passportPhoto")}</Label>
                                                <span className="text-xs text-white/40  tracking-wider">{t("GuestInfo.optional")}</span>
                                            </div>

                                            {!previewUrl ? (
                                                <div className="relative">
                                                    <Input type="file" accept="image/*" className="hidden" id="passport-upload" onChange={handleFileChange} />
                                                    <label htmlFor="passport-upload" className="flex flex-col items-center
                                                justify-center w-full h-20 border-2 border-dashed border-white/20 rounded-xl
                                                bg-white/5 hover:bg-white/10 cursor-pointer transition-all hover:border-white/40 group">
                                                        <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                                                            <UploadCloud className="h-5 w-5" />
                                                            <span className="text-sm font-medium">{t("GuestInfo.click")}</span>
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
                                                        <Button size="icon" variant="ghost" type="button"
                                                                className="h-8 w-8 text-white hover:bg-red-500/20
                                                            hover:text-red-400 rounded-full" onClick={clearFile}>
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* ROW 5: Price Total */}
                                        <div className="flex justify-between items-center px-4 py-3 bg-white/10 rounded-xl
                                     border border-white/10">
                                            <span className="text-sm text-white/80">{t("GuestInfo.summaryEstimated")}</span>
                                            <span className="text-xl font-bold text-green-400">{price} TL</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* --- STEP 4: SUMMARY & PAYMENT --- */}
                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold text-white tracking-tight">{t("Summary.title")}</h3>
                                        <p className="text-sm text-white/60 mt-1">{t("Summary.desc")}</p>
                                    </div>

                                    <div className="space-y-8">
                                        {/* 1. SUMMARY CARD */}
                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                                            <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider border-b border-white/10 pb-3">
                                                {t("Summary.bookingSummary")}
                                            </h4>

                                            {/* DETAILS */}
                                            <div className="space-y-5 text-sm">
                                                {/* Basic Info */}
                                                <div className="space-y-2 text-white/50">
                                                    <div>
                                                        {t("Summary.serviceType")}
                                                        <span className="text-white font-medium pl-1">{watch("serviceType")}</span>
                                                    </div>

                                                    <div>
                                                        {t("Summary.guest")}
                                                        <span className="text-white font-medium pl-1">{watch("fullName")}</span>
                                                    </div>

                                                    <div>
                                                        {t("Summary.phone")}
                                                        <span className="text-white font-medium pl-1">{watch("phone")}</span>
                                                    </div>

                                                    <div>
                                                        {t("Summary.date")}
                                                        <span className="text-white pl-1 font-medium">{watchedDate ? format(watchedDate, "dd MMM yyyy") : "-"} • {watchedTime}</span>
                                                    </div>
                                                </div>

                                                {/* Route */}
                                                <div className="space-y-2 text-white/50">
                                                    <div className="text-white/70 font-semibold">
                                                        {t("Summary.route")}
                                                    </div>

                                                    <div>
                                                        {t("Summary.pickUpAddress")}
                                                        <span className="text-white font-medium pl-1 block">{watch("pickupAddress")}</span>
                                                    </div>

                                                    <div>
                                                        {t("Summary.dropOffAddress")}
                                                        <span className="text-white font-medium pl-1 block">{watch("dropoffAddress")}</span>
                                                    </div>
                                                </div>

                                                {/* Passengers */}
                                                <div className="space-y-2 text-white/50">
                                                    <div>
                                                        {t("Summary.passengers")}
                                                        <span className="text-white font-medium pl-1">{watch("passengers")}</span>
                                                    </div>

                                                    <div>
                                                        {t("Summary.bag")}
                                                        <span className="text-white font-medium pl-1">{watch("luggage")}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="flex justify-between items-center pt-4 border-t border-white/10"><span className="text-white/80">{t("Summary.total")}</span>
                                                <span className="text-2xl font-bold text-green-400">{price} TL</span>
                                            </div>
                                        </div>

                                        {/* Terms */}
                                        <div className="text-center pt-2">
                                            <button
                                                type="button"
                                                className="text-xs text-white/40 hover:text-white/80 underline underline-offset-4 transition-colors">
                                                {t("Summary.terms")}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* --- FOOTER BUTTONS --- */}
                    <div className="p-6 pt-1">
                        {step === 1 ? (
                            <Button
                                onClick={next}
                                className={`${styles.actionBtn}`}
                            >
                                {t("Shared.continue")}
                            </Button>
                        ) : step === 2 || step === 3 ? (
                            // STEP 2 & 3 ACTIONS
                            <div className="space-y-3">
                                <div className="flex gap-3 w-full">
                                    <Button  onClick={back} className={`${styles.backBtn}`}>
                                        <ChevronLeft className="h-6 w-6 text-white"/>
                                    </Button>
                                    <Button
                                        onClick={next}
                                        className={`${styles.actionBtn}`}
                                    >
                                        {t("Shared.continue")}
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            // STEP 4 ACTIONS - Submit booking
                            <div className="flex gap-3 w-full">
                                <Button  onClick={back} className={`${styles.backBtn}`} disabled={isSubmitting}>
                                    <ChevronLeft className="h-6 w-6 text-white"/>
                                </Button>
                                <Button
                                    onClick={sendBookingEmail}
                                    disabled={isSubmitting}
                                    className={`${styles.actionBtn}`}
                                >
                                    {isSubmitting ? "Sending..." : t("GuestInfo.reserve")}
                                    {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5"/>}
                                </Button>
                            </div>
                        )}
                    </div>
                </FormProvider>
            </Card>
        </LazyMotion>
    );
}