export interface Suggestion {
    placeId: string;
    text: string;
    place: google.maps.places.Place;
}

export interface PlaceDetails {
    displayAddress: string;
    pricingAddress: string;
    formattedAddress: string;
    location?: google.maps.LatLng | null;
}