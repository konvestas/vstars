import { z } from "zod";
import { formSchema } from "../schemas";

// Infer the form values from the Zod schema
export type FormValues = z.infer<typeof formSchema>;

export interface PassportPhotoData {
    filename: string;
    data: string;
    mimeType: string;
}

export interface BookingPayload extends FormValues {
    bookingType: string;
    passportPhoto?: PassportPhotoData;
    calculatedPrice?: number;
}

export interface PricingRule {
    regions: string[];
    price: number;
}