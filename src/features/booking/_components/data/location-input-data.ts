export interface LocationInputProps {
    value?: string;
    onChange: (val: string) => void;
    // NEW: Callback to return both formats
    onLocationSelect?: (details: { display: string; pricing: string }) => void;
    label: string;
    placeholder: string;
    error?: string;
    className?: string;
    icon?: React.ReactNode;
}
