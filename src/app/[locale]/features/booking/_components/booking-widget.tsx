"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FormProvider } from "react-hook-form";
import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form";

import { LocationInput } from "./location-input";
import { PassengerLuggageInput } from "./passenger-luggage-input";
import DateTimeInput from "@/app/[locale]/features/booking/_components/date-time-input";
import { DurationInput } from "./duration-input"; // Make sure to import this!
import { useBookingForm } from "../hooks/use-booking";
import { SERVICE_TYPES } from "../schemas";

// --- STYLES CONFIG ---
const styles = {
    glassInput: " bg-white/10 border-white/20 hover:bg-white/60 focus:bg-white/80 " +
        "transition-all duration-300 backdrop-blur-md text-foreground placeholder:text-muted-foreground/70",
    tabTrigger: "rounded-full text-m font-semibold data-[state=active]:bg-white " +
        "data-[state=active]:text-black data-[state=active]:shadow-lg transition-all duration-300 h-11",
    actionBtn: "w-full h-14 text-lg font-medium rounded-xl transition-all duration-300 shadow-xl"
};

export default function BookingWidget() {
    const t = useTranslations('Booking');
    const { form, step, price, onTabChange, next, back } = useBookingForm();
    const { watch, setValue } = form;

    // Watched values
    const serviceType = watch("serviceType");
    const [watchedDate, watchedTime, watchedPassengers, watchedLuggage, watchedHours] = watch([
        "date", "time", "passengers", "luggage", "hours"
    ]);

    return (
        <Card className="w-full max-w-xl mx-auto border border-white/20 shadow-2xl overflow-hidden
        rounded-[2rem] bg-black/20 backdrop-blur-xl animate-in fade-in duration-500 relative">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-blue-400/20 blur-[60px] -z-10 pointer-events-none"/>

            <FormProvider {...form}>
                {/* --- HEADER TABS --- */}
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

                {/* --- FORM BODY --- */}
                <div className="p-6 md:p-8 space-y-6">
                    <AnimatePresence mode="wait">
                        {/* STEP 1: RIDE DETAILS */}
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
                                                label="Drop-off location"
                                                placeholder="Enter drop-off location"
                                                value={field.value}
                                                onChange={field.onChange}
                                                error={form.formState.errors.dropoffAddress?.message}
                                                className={styles.glassInput}
                                            />
                                        )}
                                    />
                                ) : (
                                    // SHOW DURATION SELECTOR IF HOURLY
                                    <FormField
                                        control={form.control}
                                        name="hours"
                                        render={({ field }) => (
                                            <DurationInput
                                                value={field.value || ""}
                                                onChange={field.onChange}
                                                error={form.formState.errors.hours?.message}
                                                className={styles.glassInput}
                                            />
                                        )}
                                    />
                                )}

                                <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                                    <DateTimeInput
                                        label="Date"
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
                                        label="Passengers & Luggage"
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

                        {/* STEP 2: CONTACT DETAILS */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-bold text-foreground">Final Details</h3>
                                    <p className="text-sm text-muted-foreground/80">Where should we send the confirmation?</p>
                                </div>

                                <Input placeholder="Full Name" className={styles.glassInput} {...form.register("fullName")} />
                                <Input placeholder="Phone Number" className={styles.glassInput} {...form.register("phone")} />
                                <Input placeholder="Email Address" className={styles.glassInput} {...form.register("email")} />

                                <div className="bg-white/40 dark:bg-black/40 p-4 rounded-xl border border-white/20 dark:border-white/5 mt-2 backdrop-blur-md">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-muted-foreground">Estimated Total</span>
                                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                                            {price > 0 ? `${price} TL` : "--"}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* --- FOOTER --- */}
                <div className="p-6 pt-0">
                    {step === 1 ? (
                        <Button
                            onClick={next}
                            className={`${styles.actionBtn} bg-green-700 hover:bg-green-700 text-white hover:scale-[1.02] active:scale-[0.98]`}
                        >
                            Continue <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    ) : (
                        <div className="flex gap-3">
                            <Button variant="ghost" onClick={back} className="h-14 px-6 rounded-xl hover:bg-white/20">
                                Back
                            </Button>
                            <Button onClick={next} className={`${styles.actionBtn} bg-green-600 hover:bg-green-500 text-white shadow-green-900/20`}>
                                Confirm Booking <CheckCircle2 className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    )}
                </div>

            </FormProvider>
        </Card>
    );
}