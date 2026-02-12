// Define the shape of the value object
export interface PassengerValue {
    passengers: string;
    luggage: string;
}

export interface PassengerLuggageInputProps {
    value?: PassengerValue;
    onChange: (value: PassengerValue) => void;
    label: string;
    placeholder: string;
    error?: string;
    className: string;
}

// Pre-computed arrays to avoid recreation
export const PASSENGER_OPTIONS = [1, 2, 3, 4, 5];
export const LUGGAGE_OPTIONS = [0, 1, 2, 3, 4, 5, 6];