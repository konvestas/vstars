import { PRICING_ZONES, GREETING_FEE, HOURLY_RATE } from "./pricing-data";
import { SERVICE_TYPES } from "../schemas";

// --- PRICING LOGIC ---

// Helper: Converts "Maltepe, Istanbul" -> "MALTEPE/ISTANBUL" for better matching
const normalizeAddress = (address: string): string => {
    if (!address) return "";
    return address
        .toUpperCase()
        .replace(/,\s*/g, "/") // Replace comma+space with slash
        .trim();
};

export const calculateTripPrice = (
    bookingType: string,
    from: string,            // Reverted to simple string
    to: string | undefined,  // Reverted to simple string
    duration: string | undefined
): number => {

    // 1. Hourly Calculation
    if (bookingType === SERVICE_TYPES.HOURLY && duration) {
        const hours = parseInt(duration, 10);
        return (hours * HOURLY_RATE) + GREETING_FEE;
    }

    // 2. Transfer (One Way) Calculation
    if (bookingType === SERVICE_TYPES.TRANSFER) {
        // We look at both Pickup and Dropoff
        // e.g., "KARTAL SK., BEYOGLU/ISTANBUL" and "ATASEHIR/ISTANBUL"
        const combinedAddress = normalizeAddress(from + " " + (to || ""));

        // Find matching zone
        // We iterate your PRICING_ZONES. If your data has "MALTEPE/ISTANBUL",
        // and the input is "Maltepe, Istanbul", our normalize function makes them match.
        const matchedZone = PRICING_ZONES.find(zone =>
            zone.regions.some(region =>
                combinedAddress.includes(region.toUpperCase())
            )
        );

        if (matchedZone) {
            return matchedZone.price + GREETING_FEE;
        }

        // Default Fallback
        return 2500 + GREETING_FEE;
    }

    return 0;
};

// --- IMAGE UTILS ---

export const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                const MAX_SIZE = 800;
                if (width > height && width > MAX_SIZE) {
                    height *= MAX_SIZE / width;
                    width = MAX_SIZE;
                } else if (height > MAX_SIZE) {
                    width *= MAX_SIZE / height;
                    height = MAX_SIZE;
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);
                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(new File([blob], file.name, { type: file.type, lastModified: Date.now() }));
                    } else reject(new Error('Compression failed'));
                }, file.type, 0.8);
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
};

export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};