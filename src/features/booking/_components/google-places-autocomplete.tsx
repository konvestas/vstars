"use client";

import { useState, useEffect, useCallback } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

interface Suggestion {
    placeId: string;
    text: string;
    place: google.maps.places.Place;
}

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

    // 3. Get Details & Refresh Token (Called when user clicks a suggestion)
    const onPlaceSelect = useCallback(
        async (place: google.maps.places.Place) => {
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

                        // Get district (administrative_area_level_2 or sublocality_level_1)
                        if (types.includes("administrative_area_level_2") ||
                            types.includes("sublocality_level_1") ||
                            types.includes("sublocality")) {
                            district = component.longText || component.shortText || "";
                        }
                        // Get province (administrative_area_level_1)
                        if (types.includes("administrative_area_level_1")) {
                            province = component.longText || component.shortText || "";
                        }
                    }
                }

                // Format address as "DISTRICT/PROVINCE" for pricing "MALTEPE/ISTANBUL" or "KADIKÖY/ISTANBUL"
                let structuredAddress = "";
                if (district && province) {
                    structuredAddress = `${district}/${province}`;
                } else if (district) {
                    structuredAddress = district;
                } else if (province) {
                    structuredAddress = province;
                }

                if (placesLib) {setSessionToken(new placesLib.AutocompleteSessionToken());}

                return {
                    address: structuredAddress || place.formattedAddress,
                    formattedAddress: place.formattedAddress,
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