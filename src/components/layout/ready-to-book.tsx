"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function ReadyToBook() {
    const t = useTranslations("ReadyToBook");
    return (
        <div id="ready-to-book"  className="max-w-4xl mx-auto mt-15 mb-24 text-center font-sans ">
            <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white
               dark:bg-white/5 p-8 md:p-10 shadow-sm">
                <h2 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-white">
                    {t("title")}
                </h2>
                <p className="mt-3 text-gray-600 font-normal dark:text-gray-400">{t("desc")}</p>

                <div className="mt-6 flex items-center justify-center gap-4">
                    <Link href="/"
                          className="px-6 py-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors">
                        {t("bookNow")}
                    </Link>
                    <Link
                        href="/contact"
                        className="px-6 py-3 rounded-full border border-gray-300 dark:border-white/20
                        text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                        {t("contactUs")}
                    </Link>
                </div>

            </div>
        </div>
    );
}