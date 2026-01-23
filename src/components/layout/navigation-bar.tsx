"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ChevronDown, Globe, Menu, User } from "lucide-react";
import {NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function NavigationBar() {
    const t = useTranslations("Navigation");
    const tServices = useTranslations("Services");

    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);

    const menuLinkStyle = cn("font-lexend font-semibold text-sm block select-none rounded-md p-3 leading-none " +
        "no-underline outline-none transition-colors hover:bg-slate-100 hover:text-black focus:bg-slate-100 " +
        "focus:text-black cursor-pointer text-black");
    const dropdownToggleStyle = "font-lexend font-semibold text-sm flex items-center justify-between w-full px-3 py-2 " +
        "rounded-md transition-colors text-black hover:bg-slate-100 hover:text-black focus:bg-slate-100 cursor-pointer";

    return (
        <nav className="sticky top-0 z-40 w-full">
            <header
                className={cn(
                    "relative flex w-full items-center justify-between px-2 md:px-6 " +
                    "py-2 transition-colors bg-black/40 backdrop-blur-md"
                )}
            >
                {/* --- LEFT MENU --- */}
                <div className="flex justify-start shrink-0">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger
                                    className={cn(
                                        "bg-transparent cursor-pointer " +
                                        "px-3 md:px-14 py-2 rounded-md transition-colors",
                                        "text-white hover:bg-white/10 data-[state=open]:bg-white/10"
                                    )}
                                >
                                    <span className="flex items-center gap-2">
                                        <Menu className="h-5 w-5 md:h-6 md:w-6" />
                                        <span className="font-lexend font-semibold text-xs">{t("menu")}</span>
                                    </span>
                                </NavigationMenuTrigger>

                                <NavigationMenuContent
                                    className="p-2 shadow-xl border-t-0 min-w-[250px] bg-white border-zinc-800"
                                >
                                    <div className="space-y-1 p-1">

                                        {/* 1. SERVICES DROPDOWN */}
                                        <div className="py-1">
                                            <button
                                                onClick={() => setIsServicesOpen(!isServicesOpen)}
                                                className={dropdownToggleStyle}
                                            >
                                                <span>{t("ourServices")}</span>
                                                <ChevronDown
                                                    className={cn(
                                                        "h-4 w-4 transition-transform duration-200",
                                                        isServicesOpen && "rotate-180"
                                                    )}
                                                />
                                            </button>

                                            {isServicesOpen && (
                                                <div className="pl-2 mt-1 space-y-1 border-l-2 ml-3 border-zinc-200">
                                                    <Link href="/services" className={menuLinkStyle}>
                                                        {tServices("items.airportTransfers.title")}
                                                    </Link>
                                                    <Link href="/services" className={menuLinkStyle}>
                                                        {tServices("items.hourlyHire.title")}
                                                    </Link>
                                                    <Link href="/services" className={menuLinkStyle}>
                                                        {tServices("items.medicalTourism.title")}
                                                    </Link>
                                                    <Link href="/services" className={menuLinkStyle}>
                                                        {tServices("items.cityTour.title")}
                                                    </Link>
                                                </div>
                                            )}
                                        </div>

                                        {/* 2. STATIC LINKS */}
                                        <Link href="/contact" className={menuLinkStyle}>
                                            <span>{t("contact")}</span>
                                        </Link>
                                        <Link href="/our-affiliates" className={menuLinkStyle}>
                                            <span>{t("our affiliates")}</span>
                                        </Link>

                                        <div className="h-px my-2 mx-2 bg-zinc-200" />

                                        {/* 3. LANGUAGE DROPDOWN */}
                                        <div>
                                            <button
                                                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                                                className={dropdownToggleStyle}
                                            >
                                                <span className="flex items-center gap-2">
                                                    {t("MenuLanguages")}
                                                    <Globe className="h-4 w-4 text-gray-400"/>
                                                </span>
                                                <ChevronDown
                                                    className={cn(
                                                        "h-4 w-4 text-gray-500 ml-auto transition-transform duration-200",
                                                        isLanguageOpen && "rotate-180"
                                                    )}
                                                />
                                            </button>

                                            {isLanguageOpen && (
                                                <div className="pl-2 mt-1 space-y-1 border-l-2 ml-3 border-zinc-200">
                                                    <Link href="/en" className={menuLinkStyle}>{t("languages.en")}</Link>
                                                    <Link href="/de" className={menuLinkStyle}>{t("languages.de")}</Link>
                                                    <Link href="/ru" className={menuLinkStyle}>{t("languages.ru")}</Link>
                                                    <Link href="/tr" className={menuLinkStyle}>{t("languages.tr")}</Link>
                                                    <Link href="/es" className={menuLinkStyle}>{t("languages.es")}</Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* --- LOGO --- */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
                    <Link
                        href="/"
                        className="font-lexend font-bold text-lg md:text-2xl tracking-widest md:tracking-[0.2em]
                        whitespace-nowrap transition-opacity text-white hover:text-zinc-300"
                    >
                        VSTARS
                    </Link>
                </div>

                {/* --- SIGN IN --- */}
                <div className="flex justify-end shrink-0">
                    <Link
                        href="/login"
                        className="group flex font-lexend font-semibold text-xs items-center gap-2 px-3 md:px-5 py-2.5
                        rounded-full transition-colors text-white hover:bg-white/10"
                    >
                        <span>{t("signIn")}</span>
                        <div className="p-1.5 rounded-full transition-colors bg-white/20 group-hover:bg-white/30">
                            <User className="h-4 w-4 text-white" />
                        </div>
                    </Link>
                </div>
            </header>
        </nav>
    );
}