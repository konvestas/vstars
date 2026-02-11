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
            zone.regions.some(region =>
                destinationAddress.includes(region.toUpperCase())
            )
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