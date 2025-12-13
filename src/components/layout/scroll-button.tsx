"use client";
import { ChevronDown } from "lucide-react";

interface ScrollButtonProps {
    title: string;
    scrollTo: string;
}

export default function ScrollButton({ title, scrollTo }: ScrollButtonProps){
    const scroll = () => {
        const element = document.getElementById(scrollTo);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div className="absolute bottom-2 md:bottom-8 left-1/2 -translate-x-1/2 z-20">
            <button
                onClick={scroll}
                className="flex flex-col items-center text-white/80
                            hover:text-white transition-colors cursor-pointer group"
                aria-label="Scroll down to services"
            >
                <span className="text-xs font-medium mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {title}
                </span>
                <ChevronDown
                    size={40}
                    className="animate-bounce drop-shadow-lg"
                    strokeWidth={1.5}
                />
            </button>
        </div>
    );
}