import { PRICING_ZONES, GREETING_FEE, HOURLY_RATE } from "./pricing-data";
import { SERVICE_TYPES } from "../schemas";

// --- PRICING LOGIC ---

// Helper: Normalizes Turkish characters for matching
const normalizeTurkish = (str: string): string => {
    if (!str) return "";
    return str
        .toUpperCase()
        .replace(/İ/g, "I")
        .replace(/I/g, "I")
        .replace(/Ş/g, "S")
        .replace(/Ğ/g, "G")
        .replace(/Ü/g, "U")
        .replace(/Ö/g, "O")
        .replace(/Ç/g, "C");
};

// Helper: Converts address to normalized format for matching
const normalizeAddress = (address: string): string => {
    if (!address) return "";

    // First normalize Turkish characters
    let normalized = normalizeTurkish(address);

    // Replace various separators with slash
    normalized = normalized
        .replace(/,\s*/g, "/")
        .replace(/\s+/g, " ")
        .trim();

    return normalized;
};

export const calculateTripPrice = (
    bookingType: string,
    from: string,
    to: string | undefined,
    duration: string | undefined,
    airport?: string,
    direction?: string
): number => {

    // 1. Hourly Calculation
    if (bookingType === SERVICE_TYPES.HOURLY && duration) {
        const hours = parseInt(duration, 10);
        return (hours * HOURLY_RATE) + GREETING_FEE;
    }

    // 2. Airport Transfer Calculation
    if (bookingType === SERVICE_TYPES.AIRPORT) {
        // For airport transfers, we need to look at the destination/origin (not the airport)
        // - from-airport: "from" contains the destination address
        // - to-airport: "from" contains the origin address
        const destinationAddress = normalizeAddress(from);

        // Find matching zone based on destination
        const matchedZone = PRICING_ZONES.find(zone =>
            zone.regions.some(region => {
                const normalizedRegion = normalizeTurkish(region);
                // Check if the destination contains the region district name
                // e.g., "MALTEPE/ISTANBUL" matches "MALTEPE/ISTANBUL" or just "MALTEPE"
                return destinationAddress.includes(normalizedRegion) ||
                    normalizedRegion.split("/")[0] === destinationAddress.split("/")[0];
            })
        );

        if (matchedZone) {
            return matchedZone.price + GREETING_FEE;
        }

        // Default Fallback for airport transfers
        return 2500 + GREETING_FEE;
    }

    // 3. Transfer (One Way) Calculation
    if (bookingType === SERVICE_TYPES.TRANSFER) {
        // We look at both Pickup and Dropoff
        const combinedAddress = normalizeAddress(from + " " + (to || ""));

        // Find matching zone
        const matchedZone = PRICING_ZONES.find(zone =>
            zone.regions.some(region => {
                const normalizedRegion = normalizeTurkish(region);
                return combinedAddress.includes(normalizedRegion) ||
                    normalizedRegion.split("/")[0] === combinedAddress.split("/")[0];
            })
        );

        if (matchedZone) {
            return matchedZone.price + GREETING_FEE;
        }

        // Default Fallback
        return 2500 + GREETING_FEE;
    }

    return 0;
};