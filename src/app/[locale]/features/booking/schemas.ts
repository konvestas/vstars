import { z } from "zod";

export const bookingSchema = z.object({
    // Type
    serviceType: z.enum(["transfer", "hourly"]),

    // Locations
    pickupAddress: z.string().min(5, "Pickup address is required"),
    dropoffAddress: z.string().optional(), // Optional because "Hourly" might not have one immediately

    // Timing
    date: z.date(),
    time: z.string().min(1, "Time is required"),
    hours: z.string().optional(), // Only for hourly

    // Pax
    passengers: z.number().min(1).max(10),
    luggage: z.number().min(0).max(20),

    // Contact (Step 2)
    fullName: z.string().min(2, "Full name is required"),
    email: z.email("Invalid email address"),
    phone: z.string().min(6, "Phone number is required"),
    notes: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;