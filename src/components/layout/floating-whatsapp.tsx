import Link from "next/link";
import { MessagesSquare } from "lucide-react";

export default function FloatingWhatsApp() {
    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Link
                href="https://wa.me/+905326432234"
                target="_blank"
                aria-label="Contact us on WhatsApp"
                className="inline-flex h-14 w-14
                    items-center justify-center
                    rounded-full bg-[#EBE5E0]/90 text-black shadow-lg
                    transition-all duration-300 ease-in-out
                    hover:bg-[#DED6CF] hover:scale-110 hover:shadow-xl
                    active:scale-95 border border-white/20 backdrop-blur-sm"
            >
                <MessagesSquare className="h-7 w-7" />
            </Link>
        </div>
    );
}