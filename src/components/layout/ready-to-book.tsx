"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function ReadyToBook() {
    const t = useTranslations("ReadyToBook");
    return (
        <div id="ready-to-book"  className="max-w-4xl mx-auto mt-15 mb-24 text-center font-sans ">
            <div className="rounded-2xl border border-gray-200  bg-white
              p-8 md:p-10 shadow-sm">
                <h2 className="text-2xl md:text-3xl font-light text-gray-900 ">
                    {t("title")}
                </h2>
                <p className="mt-3 text-gray-600 font-normal ">{t("desc")}</p>

                <div className="mt-6 flex items-center justify-center gap-4">
                    <Link href="/"
                          className="px-6 py-3 rounded-full  bg-linear-to-br from-orange-400 to-purple-700
                           text-white transition-colors">
                        {t("bookNow")}
                    </Link>
                    <Link
                        href="/contact"
                        className="px-6 py-3 rounded-full border border-gray-300
                        text-gray-700 dark:text-gray-200 hover:bg-gray-100 transition-colors">
                        {t("contactUs")}
                    </Link>
                </div>

            </div>
        </div>
    );
}