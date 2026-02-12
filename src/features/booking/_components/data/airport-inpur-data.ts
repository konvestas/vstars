export interface AirportInputProps {
    value?: string;
    onChange: (val: string) => void;
    label: string;
    placeholder: string;
    error?: string;
    className?: string;
}

 export const AIRPORTS = [
    { value: "istanbul-airport", label: "Istanbul Airport", code: "IST" },
    { value: "sabiha-gokcen", label: "Sabiha Gökçen Airport", code: "SAW" }
];