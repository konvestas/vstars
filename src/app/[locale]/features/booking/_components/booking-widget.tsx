"use client";

import { useState } from "react";
import {motion, AnimatePresence, LazyMotion, domAnimation} from "framer-motion";
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
import {cn} from "@/lib/utils";

const styles = {
    glassInput:    "pl-10 text-white bg-white/10 hover:bg-white/30 focus:bg-white/20 border-white/20 " +
                   "placeholder:text-white/30 transition-all duration-300",
    glassTextArea: "pl-10 pt-3 text-white bg-white/10 hover:bg-white/30 focus:bg-white/20 border-white/20 " +
                   "placeholder:text-white/30 transition-all duration-300 min-h-[80px]",
    glassLabel:    "text-white/70 text-sm font-medium mb-1.5 block",
    tabTrigger:    "rounded-full text-m font-semibold data-[state=active]:bg-white data-[state=active]:text-black " +
                   "data-[state=active]:shadow-lg transition-all duration-300 h-11",
    actionBtn:     "w-full flex-1 h-10 cursor-pointer text-lg font-medium text-white rounded-xl bg-green-700 hover:bg-green-600 " +
                   "shadow-xl shadow-green-900/30 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-green-400",
    backBtn:       "h-10 mt-2 px-4 rounded-xl text-white bg-white/5 hover:bg-white/10 shrink-0",
    iconContainer: "absolute left-3 top-1/2 -translate-y-1/2 text-white/50 h-5 w-5 pointer-events-none",
    iconContainerTop: "absolute left-3 top-3 text-white/50 h-5 w-5 pointer-events-none"
};

// date dokundugumumz zaman hat veriyor luggage icinde gecerli

export default function BookingWidget() {
    const t = useTranslations('BookingWidget');
    const { form, step, price, onTabChange, next, back } = useBookingForm();
    const { watch, setValue, register } = form;

    // SEND EMAIL
    // const handleGetQuoteClick = useCallback(async () => {
    //     const newErrors = {
    //         name: !formData.name,
    //         contact: !formData.contact,
    //         from: !formData.from,
    //         to: !formData.to,
    //         date: !formData.date,
    //         passengers: !formData.passengers,
    //         suitcase: !formData.suitcase,
    //     };
    //     setErrors(newErrors);
    //
    //     const hasError = Object.values(newErrors).some(Boolean);
    //     if (hasError) {
    //         toast.error("Please fill in all required fields");
    //         return;
    //     }
    //
    //     try {
    //         const res = await fetch("/api/sendQuote", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(formData),
    //         });
    //
    //         if (res.ok) {
    //             toast.success("Quote request submitted!");
    //             setIsDialogOpen(true);
    //             setFormData({
    //                 name: "",
    //                 contact: "",
    //                 from: "",
    //                 to: "",
    //                 date: "",
    //                 passengers: "",
    //                 suitcase: "",
    //             });
    //             setErrors({
    //                 name: false,
    //                 contact: false,
    //                 from: false,
    //                 to: false,
    //                 date: false,
    //                 passengers: false,
    //                 suitcase: false,
    //             });
    //         } else {
    //             toast.error("Failed to send request");
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         toast.error("Something went wrong");
    //     }
    // }, [formData]);

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
                    <div className="pt-6 px-6 pb-2">
                        <Tabs value={serviceType} onValueChange={onTabChange} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 h-11 bg-black/35 rounded-full">
                                <TabsTrigger value={SERVICE_TYPES.TRANSFER} className={styles.tabTrigger}>
                                    {t("Tabs.oneWay")}
                                </TabsTrigger>
                                <TabsTrigger value={SERVICE_TYPES.HOURLY} className={styles.tabTrigger}>
                                    {t("Tabs.hourly")}
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
                                {serviceType === SERVICE_TYPES.TRANSFER ? (
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
                                            {watchedDate ? format(watchedDate, "EEEE, dd MMMM yyyy") : "Date"} • {watchedTime || "Time"}
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
                                            src="/images/vstarsTransferVehicle.webp"
                                            alt="Mercedes Maybach Vito"
                                            className="w-full h-full object-cover object-center"
                                        />
                                        <div className="absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black via-black/80 to-transparent">
                                            <h3 className="text-xl font-bold text-white">Mercedes-Benz Maybach Vito</h3>
                                            <p className="text-sm text-white/70">VIP Series</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. PACKAGE PERKS & TERMS */}
                                <div className="bg-white/5 rounded-2xl p-5 border border-white/10 space-y-4">
                                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <Info className="h-4 w-4 text-green-400"/> {t("PackagePerks.details")}
                                    </h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-3 text-sm text-white/80">
                                            <Check className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                                            <span>{t("PackagePerks.waitTime")}</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-sm text-white/80">
                                            <Check className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                                            <span>{t("PackagePerks.greet")}</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-xs text-yellow-200/90 bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">
                                            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                                            <span>
                                                {t("PackagePerks.alert")}
                                            </span>
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
                                    <h3 className="text-2xl font-bold text-white tracking-tight">{t("Guestinfo.title")}</h3>
                                    <p className="text-sm text-white/60 mt-1">Please provide your contact information</p>
                                </div>

                                <div className="space-y-4">
                                    {/* ROW 1: Name & Phone */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative group">
                                            <Label className={styles.glassLabel}>{t("Guestinfo.fullname")}</Label>
                                            <div className="relative">
                                                <User className={styles.iconContainer} />
                                                <Input
                                                    placeholder="John Doe"
                                                    {...register("fullName")}
                                                    // FIX: Conditionally add red border if error exists
                                                    className={cn(
                                                        styles.glassInput,
                                                        form.formState.errors.fullName && "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="relative group">
                                            <Label className={styles.glassLabel}>{t("Guestinfo.phone")}</Label>
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
                                            <Label className={styles.glassLabel}>{t("Guestinfo.email")}</Label>
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
                                                <Label className={styles.glassLabel}>{t("Guestinfo.flightnumber")}</Label>
                                                <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">{t("Guestinfo.optional")}</span>
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
                                            <Label className={styles.glassLabel}>{t("Guestinfo.drivernote")}</Label>
                                            <span className="text-xs text-white/40 uppercase tracking-wider">{t("Guestinfo.optional")}</span>
                                        </div>
                                        <div className="relative">
                                            <Textarea
                                                placeholder={t("Guestinfo.drivernotePlaceHolder")}
                                                className={styles.glassTextArea}
                                                {...register("notes")}
                                            />
                                        </div>
                                    </div>

                                    {/* ROW 4: Passport Upload */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">passportphoto
                                            <Label className={styles.glassLabel}>{t("Guestinfo.passportphoto")}</Label>
                                            <span className="text-xs text-white/40 uppercase tracking-wider">{t("Guestinfo.optional")}</span>
                                        </div>

                                        {!previewUrl ? (
                                            <div className="relative">
                                                <Input type="file" accept="image/*" className="hidden" id="passport-upload" onChange={handleFileChange} />
                                                <label htmlFor="passport-upload" className="flex flex-col items-center
                                                justify-center w-full h-20 border-2 border-dashed border-white/20 rounded-xl
                                                bg-white/5 hover:bg-white/10 cursor-pointer transition-all hover:border-white/40 group">
                                                    <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                                                        <UploadCloud className="h-5 w-5" />
                                                        <span className="text-sm font-medium">{t("Guestinfo.click")}</span>
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
                                        <span className="text-sm text-white/80">{t("Summary.totalEstimated")}</span>
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
                                    <h3 className="text-2xl font-bold text-white tracking-tight">{t("Summary.review")}</h3>
                                    <p className="text-sm text-white/60 mt-1">{t("Summary.finalize")}</p>
                                </div>

                                <div className="space-y-4">
                                    {/* 1. SUMMARY CARD */}
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                                        <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider border-b border-white/10 pb-2">
                                            {t("Summary.summary")}
                                        </h4>

                                        {/* Route & Date */}
                                        <div className="grid grid-cols-[auto_1fr] gap-3 text-sm">
                                            <div className="flex flex-col gap-1 text-white/50">
                                                <div>{t("Summary.date")} <span className="text-white  font-medium">{watchedDate ? format(watchedDate, "dd MMM yyyy") : "-"} • {watchedTime} </span> </div>
                                                <br/>
                                                <div>{t("Summary.route")} <span className=" max-w-50 text-white font-medium text-left">
                                                    {serviceType === "hourly" ? "Hourly Rental" : pickupAddr } <br/> {dropoffAddr}</span> </div>
                                                <br/>
                                                <div>{t("Summary.guest")}  <span className="text-white font-medium">{watch("fullName")}</span></div>
                                            </div>
                                            <div className="flex flex-col gap-1 text-white font-medium text-left">

                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="flex justify-between items-center pt-3 border-t border-white/10">
                                            <span className="text-white/80">{t("Summary.total")}</span>
                                            <span className="text-2xl font-bold text-green-400">{price} TL</span>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <button type="button" className="text-xs text-white/40
                                        hover:text-white/80 underline underline-offset-4 transition-colors">
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
                            {t("Success.continue")}
                        </Button>
                    ) : step === 2 && 3 ? (
                        // STEP 2 ACTIONS (Fixed Alignment)
                        <div className="space-y-3">
                            <div className="flex gap-3 w-full">
                                <Button  onClick={back} className={`${styles.backBtn}`}>
                                    <ChevronLeft className="h-6 w-6 text-white"/>
                                </Button>
                                <Button
                                    onClick={next}
                                    className={`${styles.actionBtn}`}
                                >
                                    {t("Success.continue")}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        // STEP 4 ACTIONS
                        <div className="flex gap-3 w-full">
                            <Button  onClick={back} className={`${styles.backBtn}`}>
                                <ChevronLeft className="h-6 w-6 text-white"/>
                            </Button>
                            <Button
                                onClick={next}
                                className={`${styles.actionBtn}`}
                            >
                                {t("payreserve")} <ArrowRight className="ml-2 h-5 w-5"/>
                            </Button>
                        </div>
                    )}
                </div>

            </FormProvider>
        </Card>
        </LazyMotion>
    );
}