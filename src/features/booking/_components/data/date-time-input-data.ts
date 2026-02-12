export interface DateTimeInputProps {
    date: Date | undefined;
    time: string | undefined;
    onConfirm: (date: Date, time: string) => void;
    label: string;
    placeholder: string;
    className: string;
    error?: string;
}

export const TIME_SLOTS = Array.from({ length: 48 }, (_, i) => {
    const totalMinutes = i * 30;
    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
});