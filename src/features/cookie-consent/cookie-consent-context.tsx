"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type ConsentStatus = "pending" | "accepted" | "rejected";

interface ConsentState {
    status: ConsentStatus;
    analytics: boolean;
    timestamp: string | null;
}

interface CookieConsentContextType {
    consent: ConsentState;
    acceptAll: () => void;
    rejectNonEssential: () => void;
    hasDecided: boolean;
}

const STORAGE_KEY = "cookie-consent-v1";

const defaultConsent: ConsentState = {
    status: "pending",
    analytics: false,
    timestamp: null,
};

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
    const [consent, setConsent] = useState<ConsentState>(defaultConsent);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setConsent(JSON.parse(stored));
            }
        } catch {
            // ignore malformed storage
        }
        setHydrated(true);
    }, []);

    const persist = (next: ConsentState) => {
        setConsent(next);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
            // storage unavailable, consent still works for this session
        }
    };

    const acceptAll = () => {
        persist({ status: "accepted", analytics: true, timestamp: new Date().toISOString() });
    };

    const deleteGaCookies = () => {
        if (typeof document === "undefined") return;
        const names = document.cookie
            .split(";")
            .map(c => c.trim().split("=")[0])
            .filter(name => name === "_ga" || name.startsWith("_ga_") || name === "_gid" || name === "_gat");

        names.forEach(name => {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
        });
    };

    const rejectNonEssential = () => {
        deleteGaCookies();
        persist({ status: "rejected", analytics: false, timestamp: new Date().toISOString() });
    };

    return (
        <CookieConsentContext.Provider
            value={{
                consent,
                acceptAll,
                rejectNonEssential,
                // don't show banner / gate scripts until we've checked localStorage
                hasDecided: hydrated ? consent.status !== "pending" : true,
            }}
        >
            {children}
        </CookieConsentContext.Provider>
    );
}

export function useCookieConsent() {
    const ctx = useContext(CookieConsentContext);
    if (!ctx) {
        throw new Error("useCookieConsent must be used within CookieConsentProvider");
    }
    return ctx;
}