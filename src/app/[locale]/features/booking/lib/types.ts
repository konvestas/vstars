import { bookingSchema, type BookingFormValues } from "../schemas";

// FIX: Use the imported type. Alias it to FormValues if you want to keep compatibility.
export type FormValues = BookingFormValues;

export interface PassportPhotoData {
    filename: string;
    data: string;
    mimeType: string;
}

// FIX: Extend 'BookingFormValues' instead of the undefined schema inference
export interface BookingPayload extends BookingFormValues {
    bookingType: string;
    passportPhoto?: PassportPhotoData;
    calculatedPrice?: number;
}

export interface PricingRule {
    regions: string[];
    price: number;
}