export interface DurationInputProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (val: string) => void;
    className?: string;
    error?: string;
}
export const HOURS = ["4", "5", "6", "7", "8", "9", "10"];