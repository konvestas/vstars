"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingFormValues, SERVICE_TYPES } from "../schemas";
import { calculateTripPrice } from "@/features/booking/lib/utils";

export function useBookingForm() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Memoized Price Calculation
    const price = useMemo(() => {
        return calculateTripPrice(serviceType, pickup, dropoff, hours, airport, direction);
    }, [serviceType, pickup, dropoff, hours, airport, direction]);

    // --- Handlers ---
    const onTabChange = (val: string) => {
        const newType = val as typeof SERVICE_TYPES[keyof typeof SERVICE_TYPES];
        setValue("serviceType", newType);

        if (newType === SERVICE_TYPES.HOURLY) {
            setValue("dropoffAddress", "");
            form.clearErrors("dropoffAddress");
        }
    };

    const next = async () => {
        let isValid = false;

        if (step === 1) {
            // Validate Search Criteria
            isValid = await trigger([
                "pickupAddress",
                "dropoffAddress",
                "hours",
                "date",
                "time",
                "passengers"
            ]);
        } else if (step === 2) {
            // Step 2 is just "Select Vehicle", so it's always valid
            isValid = true;
        } else if (step === 3) {
            // Validate Contact Details
            isValid = await trigger(["fullName", "email", "phone","flightNo","passport"]);
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