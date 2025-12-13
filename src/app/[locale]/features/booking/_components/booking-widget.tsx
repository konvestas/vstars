"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Clock, Users, ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { FormField } from "@/components/ui/form";

import {LocationInput} from "@/app/[locale]/features/booking/_components/location-input";
import {useBookingForm} from "@/app/[locale]/features/booking/hooks/use-booking";
import {useTranslations} from "next-intl";

export default function BookingWidget() {
    const t = useTranslations('Booking');
    const { form, step, price, onTabChange, next, back } = useBookingForm();
    const { watch } = form;
    const serviceType = watch("serviceType");

    return (
        <Card className="w-full max-w-xl mx-auto border-0 shadow-2xl bg-white/90
        dark:bg-zinc-900/80 backdrop-blur-md overflow-hidden rounded-3xl">
            <FormProvider {...form}>

                {/* --- HEADER TABS --- */}
                <div className="p-2 bg-gray-100/50 dark:bg-black/20">
                    <Tabs value={serviceType} onValueChange={onTabChange} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 h-12 bg-gray-200
                        dark:bg-zinc-800 rounded-2xl p-1 shadow-sm">
                            <TabsTrigger value="transfer" className="rounded-xl text-base
                            data-[state=active]:bg-black data-[state=active]:text-white
                            dark:data-[state=active]:bg-white dark:data-[state=active]:text-black transition-all">
                                {t("Tabs.oneWay")}
                            </TabsTrigger>
                            <TabsTrigger value="hourly" className="rounded-xl text-base
                            data-[state=active]:bg-black data-[state=active]:text-white
                             dark:data-[state=active]:bg-white dark:data-[state=active]:text-black transition-all">
                                Hourly
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* --- FORM BODY --- */}
                <div className="p-6 md:p-8">
                    <AnimatePresence mode="wait">

                        {/* STEP 1: RIDE DETAILS */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-4"
                            >
                                {/* Pick Up */}
                                <FormField
                                    control={form.control}
                                    name="pickupAddress"
                                    render={({ field }) => (
                                        <LocationInput
                                            placeholder="Pick-up Location (Airport, Hotel...)"
                                            value={field.value}
                                            onChange={field.onChange}
                                            error={form.formState.errors.pickupAddress?.message}
                                        />
                                    )}
                                />

                                {/* Drop Off (Hidden for Hourly if you prefer, or Optional) */}
                                {serviceType === "transfer" && (
                                    <FormField
                                        control={form.control}
                                        name="dropoffAddress"
                                        render={({ field }) => (
                                            <LocationInput
                                                placeholder="Drop-off Location"
                                                icon={<MapPin className="text-red-500 h-4 w-4"/>}
                                                value={field.value}
                                                onChange={field.onChange}
                                                error={form.formState.errors.dropoffAddress?.message}
                                            />
                                        )}
                                    />
                                )}

                                {/* Date & Time Row */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input type="date" className="pl-9 h-12 bg-white/50 dark:bg-zinc-900/50" {...form.register("date")} />
                                    </div>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input type="time" className="pl-9 h-12 bg-white/50 dark:bg-zinc-900/50" {...form.register("time")} />
                                    </div>
                                </div>

                                {/* Passengers */}
                                <div className="relative">
                                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="number"
                                        placeholder="Passengers"
                                        className="pl-9 h-12 bg-white/50 dark:bg-zinc-900/50"
                                        {...form.register("passengers", { valueAsNumber: true })}
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
                                    <h3 className="text-xl font-bold dark:text-white">Guest Details</h3>
                                    <p className="text-sm text-muted-foreground">Who are we picking up?</p>
                                </div>

                                <Input placeholder="Full Name" className="h-12" {...form.register("fullName")} />
                                <Input placeholder="Phone Number" className="h-12" {...form.register("phone")} />
                                <Input placeholder="Email Address" className="h-12" {...form.register("email")} />

                                <div className="bg-green-50 dark:bg-green-900/20 p-4
                                rounded-xl border border-green-100 dark:border-green-800 mt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-green-800
                                        dark:text-green-300">Estimated Total</span>
                                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                                            {price > 0 ? `${price} TL` : "Calculating..."}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>

                {/* --- FOOTER ACTIONS --- */}
                <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20">
                    {step === 1 ? (
                        <Button onClick={next}
                                className="w-full h-14 text-lg rounded-xl bg-black dark:bg-white
                                text-white dark:text-black hover:opacity-90 transition-all shadow-lg">
                            See Prices & Continue <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    ) : (
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={back}
                                    className="h-14 px-6 rounded-xl border-gray-300 dark:border-zinc-700">
                                Back
                            </Button>
                            <Button className="flex-1 h-14 text-lg rounded-xl bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20">
                                Confirm Booking <CheckCircle2 className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    )}
                </div>

            </FormProvider>
        </Card>
    );
}