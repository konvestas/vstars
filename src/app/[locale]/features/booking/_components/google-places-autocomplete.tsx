"use client";

import { useState, useEffect, useCallback } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

interface Suggestion {
    placeId: string;
    text: string;
    place: google.maps.places.Place; // We keep the official Place object
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
                    // Optional: Restrict to 'airport' or 'locality' if needed
                    // includedPrimaryTypes: ['airport', 'locality'],
                };

                const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);

                // Format suggestions for the UI
                const formatted = suggestions
                    .filter((s) => s.placePrediction)
                    .map((s) => ({
                        placeId: s.placePrediction!.placeId,
                        text: s.placePrediction!.text.toString(),
                        place: s.placePrediction!.toPlace(), // Crucial: Convert to Place object
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
                // Fetch only the fields we need
                await place.fetchFields({
                    fields: ["displayName", "formattedAddress", "location"],
                });

                // REFRESH TOKEN: As per Google Docs, start a new session after selection
                if (placesLib) {
                    setSessionToken(new placesLib.AutocompleteSessionToken());
                }

                return {
                    address: place.formattedAddress, // The clean address string
                    lat: place.location?.lat(),
                    lng: place.location?.lng(),
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