"use client";

import { useTranslations } from "next-intl";
import { useCookieConsent } from "./cookie-consent-context";
import {Link} from "@/i18n/routing";

export default function CookieConsentBanner() {
    const t = useTranslations("cookie-consent");

    const { hasDecided, acceptAll, rejectNonEssential } = useCookieConsent();

    if (hasDecided) return null;

    return (
        <div
            role="dialog"
            aria-live="polite"
            aria-label={t("title")}
            className="fixed bottom-0 left-0 right-0 z-100 p-4 md:p-6"
        >
            <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-1">
                    <h2 className="font-semibold text-zinc-900 dark:text-white mb-1">{t("title")}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {t("description")}{" "}
                        <Link href="/cookies" className="underline underline-offset-2">
                            {t("cookiePolicyLink")}
                        </Link>{" "}
                        {t("and")}{" "}
                        <Link href="/privacy" className="underline underline-offset-2">
                            {t("privacyPolicyLink")}
                        </Link>
                        .
                    </p>
                </div>
                <div className="flex gap-3 shrink-0 w-full md:w-auto">
                    <button
                        onClick={rejectNonEssential}
                        className="flex-1 md:flex-none px-5 py-2.5 rounded-full border border-gray-300 dark:border-zinc-700 text-sm font-medium text-zinc-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                        {t("reject")}
                    </button>
                    <button
                        onClick={acceptAll}
                        className="flex-1 md:flex-none px-5 py-2.5 rounded-full bg-linear-to-br from-orange-400 to-purple-700 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                        {t("accept")}
                    </button>
                </div>
            </div>
        </div>
    );
}