"use client";

import { useState, useEffect, useCallback } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

interface Suggestion {
    placeId: string;
    text: string;
    place: google.maps.places.Place;
}
interface PlaceDetails {
    displayAddress: string;
    pricingAddress: string;
    formattedAddress: string;
    location?: google.maps.LatLng | null;
}
// Import the normalizer or copy it here to avoid circular deps if needed
// For simplicity, I'll include the helper function here locally
const normalizeToEnglish = (text: string): string => {
    let normalized = text.toLowerCase();
    const turkishMap: { [key: string]: string } = {
        'ç': 'c', 'ğ': 'g', 'ı': 'i', 'i': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
        'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'I': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u'
    };
    normalized = normalized.replace(/[çğıiöşüÇĞİIÖŞÜ]/g, (match) => turkishMap[match] || match);
    return normalized.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
};

export function usePlacesAutocomplete() {
    const placesLib = useMapsLibrary("places");
    const [sessionToken, setSessionToken] = useState<google.maps.places.AutocompleteSessionToken | null>(null);
    const [predictions, setPredictions] = useState<Suggestion[]>([]);

    // 1. Initialize Session Token when library loads
    useEffect(() => {
        if (placesLib && !sessionToken) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSessionToken(new placesLib.AutocompleteSessionToken());
        }
    }, [placesLib, sessionToken]);

    // 2. Fetch Predictions (Debouncing should be handled in the UI component)
    const fetchPredictions = useCallback(
        async (inputValue: string) => {
            if (!placesLib || !sessionToken || !inputValue) {
                setPredictions([]);
                return;
            }
            const { AutocompleteSuggestion } = placesLib;
            try {
                const request: google.maps.places.AutocompleteRequest = {
                    input: inputValue,
                    sessionToken: sessionToken,
                    includedRegionCodes: ["tr"],
                    language: "tr"
                };
                const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
                // Format suggestions for the UI
                const formatted = suggestions
                    .filter((s) => s.placePrediction)
                    .map((s) => ({
                        placeId: s.placePrediction!.placeId,
                        text: s.placePrediction!.text.toString(),
                        place: s.placePrediction!.toPlace(),
                    }));
                setPredictions(formatted);
            } catch (e) {
                console.error("Autocomplete fetch error:", e);
                setPredictions([]);
            }
        },
        [placesLib, sessionToken]
    );

    const onPlaceSelect = useCallback(
        async (place: google.maps.places.Place): Promise<PlaceDetails | null> => {
            try {
                // Fetch address components to extract district and province
                await place.fetchFields({
                    fields: ["displayName", "formattedAddress", "location", "addressComponents"],
                });

                let district = "";
                let province = "";

                if (place.addressComponents) {
                    for (const component of place.addressComponents) {
                        const types = component.types;
                        const text = component.longText || component.shortText || "";

                        if (types.includes("administrative_area_level_1")) {
                            province = text;
                        }
                        if (types.includes("administrative_area_level_2")) {
                            district = text;
                        }
                    }
                    if (!district) {
                        const locality = place.addressComponents.find(c =>
                            c.types.includes("locality") || c.types.includes("sublocality_level_1")
                        );
                        if (locality) {
                            district = locality.longText || locality.shortText || "";
                        }
                    }
                }

                let structuredAddress = "";
                if (district && province) {
                    structuredAddress = `${district}/${province}`;
                } else if (district) {
                    structuredAddress = district;
                } else if (province) {
                    structuredAddress = province;
                } else {
                    structuredAddress = place.formattedAddress || "";
                }

                // NORMALIZE HERE: "Beyoğlu/İstanbul" -> "beyoglu/istanbul"
                const finalPricingAddress = normalizeToEnglish(structuredAddress);

                console.log("📍 Parsed & Normalized for Pricing:", finalPricingAddress);

                if (placesLib) {
                    setSessionToken(new placesLib.AutocompleteSessionToken());
                }

                return {
                    displayAddress: place.formattedAddress || finalPricingAddress,
                    pricingAddress: finalPricingAddress,
                    formattedAddress: place.formattedAddress || "",
                    location: place.location
                };
            } catch (e) {
                console.error("Place details error:", e);
                return null;
            }
        },
        [placesLib]
    );

    const clearSuggestions = useCallback(() => setPredictions([]), []);

    return {
        predictions,
        fetchPredictions,
        onPlaceSelect,
        clearSuggestions,
        isReady: !!placesLib
    };
}