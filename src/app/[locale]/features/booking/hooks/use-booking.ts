"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Make sure these paths match where you created schemas.ts and utils.ts
import { bookingSchema, type BookingFormValues } from "../schemas";
import { calculateTripPrice } from "../lib/utils";

export function useBookingForm() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
        mode: "onChange",
        defaultValues: {
            serviceType: "transfer",
            passengers: 1,
            luggage: 0,
            hours: "4",
            date: new Date(),
            // Initialize strings as empty to avoid uncontrolled input warnings
            pickupAddress: "",
            dropoffAddress: "",
            time: "",
            fullName: "",
            email: "",
            phone: "",
            notes: ""
        },
    });

    const { watch, trigger, setValue, setError, getValues } = form;

    // Watch fields to recalculate price in real-time
    const [serviceType, pickup, dropoff, hours] = watch([
        "serviceType",
        "pickupAddress",
        "dropoffAddress",
        "hours"
    ]);

    // Memoized Price Calculation
    const price = useMemo(() => {
        // We map "transfer" -> "One Way" and "hourly" -> "By the hour" to match your existing utils logic
        const utilType = serviceType === "transfer" ? "One Way" : "By the hour";
        return calculateTripPrice(utilType, pickup, dropoff, hours);
    }, [serviceType, pickup, dropoff, hours]);

    // --- Handlers ---

    const onTabChange = (val: string) => {
        const newType = val as "transfer" | "hourly";
        setValue("serviceType", newType);

        // Optional: clear dropoff if switching to hourly, as it's not strictly needed
        if (newType === "hourly") {
            setValue("dropoffAddress", "");
            form.clearErrors("dropoffAddress");
        }
    };

    const next = async () => {
        let isValid = false;

        if (step === 1) {
            // 1. Trigger Zod validation for Step 1 fields
            isValid = await trigger([
                "pickupAddress",
                "dropoffAddress",
                "date",
                "time",
                "passengers"
            ]);

            // 2. Custom Business Logic: One Way transfers MUST have a dropoff
            if (serviceType === "transfer" && !getValues("dropoffAddress")) {
                setError("dropoffAddress", {
                    type: "manual",
                    message: "Drop-off address is required for transfers"
                });
                isValid = false;
            }
        } else if (step === 2) {
            // Validate Step 2 fields
            isValid = await trigger(["fullName", "email", "phone"]);
        }

        if (isValid) {
            setStep((prev) => prev + 1);
        }
    };

    const back = () => {
        setStep((prev) => Math.max(1, prev - 1));
    };

    return {
        form,
        step,
        price,
        onTabChange,
        next,
        back,
        isSubmitting,
        setIsSubmitting
    };
}