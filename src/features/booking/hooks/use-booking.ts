"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingFormValues, SERVICE_TYPES } from "../schemas";
import { calculateTripPrice } from "@/features/booking/lib/utils";

export function useBookingForm() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // NEW: Separate state for pricing zones (e.g. "maltepe/istanbul")
    const [pricingData, setPricingData] = useState({
        pickup: "",
        dropoff: ""
    });

    const form = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
        mode: "onChange",
        defaultValues: {
            serviceType: SERVICE_TYPES.TRANSFER,
            passengers: 1,
            luggage: 0,
            hours: "4",
            date: new Date(),
            pickupAddress: "",
            dropoffAddress: "",
            time: "",
            fullName: "",
            email: "",
            phone: "",
            notes: ""
        },
    });

    const { watch, trigger, setValue, formState: { errors } } = form;

    const [serviceType, pickup, dropoff, hours, airport, direction] = watch([
        "serviceType",
        "pickupAddress",
        "dropoffAddress",
        "hours",
        "airport",
        "direction"
    ]);

    // NEW: Memoized Price Calculation uses pricingData
    const price = useMemo(() => {
        // Prefer the special pricing address if available, otherwise fallback to form value
        const p = pricingData.pickup || pickup;
        const d = pricingData.dropoff || dropoff;

        return calculateTripPrice(serviceType, p, d, hours, airport, direction);
    }, [serviceType, pickup, dropoff, hours, airport, direction, pricingData]);

    // --- Handlers ---

    // NEW: Helper to update both form (display) and state (pricing)
    const handlePickupSelect = (data: { display: string, pricing: string }) => {
        setValue("pickupAddress", data.display, { shouldValidate: true });
        setPricingData(prev => ({ ...prev, pickup: data.pricing }));
    };

    const handleDropoffSelect = (data: { display: string, pricing: string }) => {
        setValue("dropoffAddress", data.display, { shouldValidate: true });
        setPricingData(prev => ({ ...prev, dropoff: data.pricing }));
    };

    const onTabChange = (val: string) => {
        const newType = val as typeof SERVICE_TYPES[keyof typeof SERVICE_TYPES];
        setValue("serviceType", newType);

        if (newType === SERVICE_TYPES.HOURLY) {
            setValue("dropoffAddress", "");
            setPricingData(prev => ({ ...prev, dropoff: "" })); // Clear pricing too
            form.clearErrors("dropoffAddress");
        }
    };

    const next = async () => {
        let isValid = false;
        if (step === 1) {
            isValid = await trigger([
                "pickupAddress",
                "dropoffAddress",
                "hours",
                "date",
                "time",
                "passengers"
            ]);
        } else if (step === 2) {
            isValid = true;
        } else if (step === 3) {
            isValid = await trigger(["fullName", "email", "phone","flightNo","passport"]); // Removed optional fields check if needed
        }
        if (isValid) setStep((prev) => prev + 1);
    };

    const back = () => {
        setStep((prev) => Math.max(1, prev - 1));
    };

    return {
        form,
        step,
        price,
        onTabChange,
        handlePickupSelect, // <--- Return these new handlers
        handleDropoffSelect, // <---
        next,
        back,
        isSubmitting,
        setIsSubmitting
    };
}