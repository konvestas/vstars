import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { FormProvider } from "react-hook-form";
import { useTranslations } from "next-intl";
import { ArrowRight, ChevronLeft, Plane, Hourglass, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useBookingForm } from "@/features/booking/hooks/use-booking";
import { SERVICE_TYPES } from "../schemas";
import { StepSearch } from "@/features/booking/_components/booking-widget-pages/search-page";
import { StepVehicle } from "@/features/booking/_components/booking-widget-pages/vehicle-page";
import { StepGuestInfo } from "@/features/booking/_components/booking-widget-pages/guest-info-page";
import { StepSummary } from "@/features/booking/_components/booking-widget-pages/summary-page";
import { BookingWidgetStyles } from "@/features/booking/_components/booking-widget-pages/styles";

export default function BookingWidget() {
    const t = useTranslations('BookingWidget');
    const {
        form,
        step,
        price,
        onTabChange,
        next,
        back,
        handlePickupSelect,
        handleDropoffSelect,
        displayLocations,
        submitBooking,
        isSubmitting
    } = useBookingForm();

    const { watch } = form;

    return (
        <LazyMotion features={domAnimation}>
            <Card className="w-[95%] md:w-full max-w-4xl mt-6 md:mt-10 mx-auto border border-white/20 shadow-2xl overflow-hidden rounded-3xl md:rounded-[2.5rem] bg-black/20 backdrop-blur-xl animate-in fade-in duration-500 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-blue-400/20 blur-[60px] -z-10 pointer-events-none"/>

                <FormProvider {...form}>
                    {/* TABS */}
                    {step === 1 && (
                        <div className="pt-6 px-6">
                            <Tabs value={watch("serviceType")} onValueChange={onTabChange} className="w-full">
                                <TabsList className="grid w-full grid-cols-3 h-13 bg-black/35 rounded-full">
                                    <TabsTrigger value={SERVICE_TYPES.TRANSFER} className={BookingWidgetStyles.tabTrigger}><MapPinned/> {t("Tabs.oneWay")}</TabsTrigger>
                                    <TabsTrigger value={SERVICE_TYPES.HOURLY} className={BookingWidgetStyles.tabTrigger}><Hourglass/> {t("Tabs.hourly")}</TabsTrigger>
                                    <TabsTrigger value={SERVICE_TYPES.AIRPORT} className={BookingWidgetStyles.tabTrigger}><Plane/>{t("Tabs.airport")}</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    )}

                    {/* STEPS CONTENT */}
                    <div className="p-6 md:p-8 space-y-6">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <StepSearch
                                    handlePickupSelect={handlePickupSelect}
                                    handleDropoffSelect={handleDropoffSelect}
                                />
                            )}
                            {step === 2 && (
                                <StepVehicle
                                    displayLocations={displayLocations}
                                    date={watch("date")}
                                    time={watch("time")}
                                />
                            )}
                            {step === 3 && (
                                <StepGuestInfo price={price} />
                            )}
                            {step === 4 && (
                                <StepSummary
                                    price={price}
                                    displayLocations={displayLocations}
                                />
                            )}
                            {step === 5 && (
                                <div className="text-center py-12 space-y-6">
                                    <div className=" mx-auto flex items-center justify-center">
                                        <svg
                                            className="w-10 h-10"
                                            fill="none"
                                            stroke="#22c55e"
                                            strokeWidth="3"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                            {t("Confirmation.title")}
                                        </h2>
                                        <p className="text-white/70 text-sm md:text-base">
                                            {t("Confirmation.message")}
                                        </p>
                                    </div>
                                    <div className="bg-white/10 rounded-xl p-4 max-w-md mx-auto">
                                        <p className="text-white/80 text-sm">
                                            {t("Confirmation.details")}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* FOOTER ACTIONS */}
                    <div className="p-6 pt-1">
                        {step === 1 ? (
                            <Button onClick={next} className={BookingWidgetStyles.actionBtn}>
                                {t("Shared.continue")}
                            </Button>
                        ) : step === 4 ? (
                            <div className="flex gap-3 w-full">
                                <Button onClick={back} className={BookingWidgetStyles.backBtn} disabled={isSubmitting}>
                                    <ChevronLeft className="h-6 w-6 text-white"/>
                                </Button>
                                <Button onClick={submitBooking} disabled={isSubmitting} className={BookingWidgetStyles.actionBtn}>
                                    {isSubmitting ? t("Confirmation.sending") : t("GuestInfo.reserve")}
                                    {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5"/>}
                                </Button>
                            </div>
                        ) : step === 5 ? (
                            <Button onClick={() => window.location.reload()} className={BookingWidgetStyles.actionBtn}>
                                {t("Confirmation.newBooking")}
                            </Button>
                        ) : (
                            <div className="flex gap-3 w-full">
                                <Button onClick={back} className={BookingWidgetStyles.backBtn}>
                                    <ChevronLeft className="h-6 w-6 text-white"/>
                                </Button>
                                <Button onClick={next} className={BookingWidgetStyles.actionBtn}>
                                    {t("Shared.continue")}
                                </Button>
                            </div>
                        )}
                    </div>
                </FormProvider>
            </Card>
        </LazyMotion>
    );
}