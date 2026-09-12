import NavigationBar from "@/components/layout/navigation-bar";
import Footer from "@/components/layout/footer";
import { useTranslations } from "next-intl";
import React from "react";

export default function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
    const t = useTranslations("cookie-policy");

    return (
        <main className="min-h-screen bg-white">
            <nav className="fixed top-0 left-0 w-full z-50"><NavigationBar /></nav>

            <section className="pt-32 pb-20 px-6 max-w-3xl mx-auto">

                <h2 className="text-3xl md:text-5xl font-light tracking-tight text-zinc-900 mb-4 md:mb-6">
                    {t("title")}
                </h2>
                <div className="w-16 h-[3px] bg-linear-to-br from-orange-400 to-purple-700 mb-8" />
                <p className="text-sm text-gray-400 font-light mb-8">{t("lastUpdated")}</p>

                <p className="text-gray-600 font-light leading-relaxed mb-4 whitespace-pre-line">{t("desc")}</p>

                {/* 1. HANGİ TÜR ÇEREZLER KULLANILMAKTADIR? */}
                <div className="mt-12">
                    <h3 className="text-xl md:text-2xl font-medium text-zinc-900 mb-3">{t("1")}</h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">{t("1Desc")}</p>

                    {/* 1.1 */}
                    <div className="mt-8">
                        <h4 className="text-lg font-medium text-zinc-800 mb-2">{t("11")}</h4>
                        <p className="text-gray-600 font-light leading-relaxed mb-4">{t("11Desc")}</p>

                        {/* 1.1.1 Performans/Analitik */}
                        <div className="mt-6">
                            <h5 className="text-base font-medium text-zinc-800 mb-2">{t("111")}</h5>
                            <p className="text-gray-600 font-light leading-relaxed mb-4">{t("111Desc")}</p>

                            <div className="mb-4 pl-4 border-l-2 border-orange-300">
                                <p className="text-sm font-medium text-zinc-800 mb-1">{t("googleAnalytics")}</p>
                                <p className="text-sm text-gray-500 font-light leading-relaxed">{t("googleAnalyticsDesc")}</p>
                            </div>

                            {/* ANALYTICS COOKIES */}
                            <div className="overflow-x-auto my-6 rounded-lg border border-zinc-200">
                                <table className="w-full text-sm text-left border-collapse">
                                    <thead>
                                    <tr className="bg-zinc-50">
                                        <th className="px-4 py-3 font-medium text-zinc-700 border-b border-zinc-200">{t("cookieName")}</th>
                                        <th className="px-4 py-3 font-medium text-zinc-700 border-b border-zinc-200">{t("cookieProvider")}</th>
                                        <th className="px-4 py-3 font-medium text-zinc-700 border-b border-zinc-200">{t("cookieSide")}</th>
                                        <th className="px-4 py-3 font-medium text-zinc-700 border-b border-zinc-200">{t("cookieExpires")}</th>
                                        <th className="px-4 py-3 font-medium text-zinc-700 border-b border-zinc-200">{t("cookiePurpose")}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="px-4 py-3 text-zinc-800 border-b border-zinc-100 font-mono text-xs">_ga</td>
                                        <td className="px-4 py-3 text-zinc-600 border-b border-zinc-100">Google Ireland Ltd.</td>
                                        <td className="px-4 py-3 text-zinc-600 border-b border-zinc-100">{t("firstParty")}</td>
                                        <td className="px-4 py-3 text-zinc-600 border-b border-zinc-100">{t("twoYears")}</td>
                                        <td className="px-4 py-3 text-zinc-600 border-b border-zinc-100">{t("distinguishesGuest")}</td>
                                    </tr>
                                    <tr className="bg-zinc-50/50">
                                        <td className="px-4 py-3 text-zinc-800 border-b border-zinc-100 font-mono text-xs">_ga_*</td>
                                        <td className="px-4 py-3 text-zinc-600 border-b border-zinc-100">Google Ireland Ltd.</td>
                                        <td className="px-4 py-3 text-zinc-600 border-b border-zinc-100">{t("firstParty")}</td>
                                        <td className="px-4 py-3 text-zinc-600 border-b border-zinc-100">{t("twoYears")}</td>
                                        <td className="px-4 py-3 text-zinc-600 border-b border-zinc-100">{t("storeSession")}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-zinc-800 border-b border-zinc-100 font-mono text-xs">_gid</td>
                                        <td className="px-4 py-3 text-zinc-600 border-b border-zinc-100">Google Ireland Ltd.</td>
                                        <td className="px-4 py-3 text-zinc-600 border-b border-zinc-100">{t("firstParty")}</td>
                                        <td className="px-4 py-3 text-zinc-600 border-b border-zinc-100">{t("24hours")}</td>
                                        <td className="px-4 py-3 text-zinc-600 border-b border-zinc-100">{t("distinguish24")}</td>
                                    </tr>
                                    <tr className="bg-zinc-50/50">
                                        <td className="px-4 py-3 text-zinc-800 border-b border-zinc-100 font-mono text-xs">_gat</td>
                                        <td className="px-4 py-3 text-zinc-600 border-b border-zinc-100">Google Ireland Ltd.</td>
                                        <td className="px-4 py-3 text-zinc-600 border-b border-zinc-100">{t("firstParty")}</td>
                                        <td className="px-4 py-3 text-zinc-600 border-b border-zinc-100">{t("1minute")}</td>
                                        <td className="px-4 py-3 text-zinc-600 border-b border-zinc-100">{t("limitRequests")}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 1.1.2 İşlevsel */}
                        <div className="mt-6">
                            <h5 className="text-base font-medium text-zinc-800 mb-2">{t("112")}</h5>
                            <p className="text-gray-600 font-light leading-relaxed mb-4">{t("112Desc")}</p>

                            <div className="mb-4 pl-4 border-l-2 border-orange-300">
                                <p className="text-sm font-medium text-zinc-800 mb-1">{t("googleMaps")}</p>
                                <p className="text-sm text-gray-500 font-light leading-relaxed">{t("gooleMapsDesc")}</p>
                            </div>

                            {/* MAPS */}
                            <div className="overflow-x-auto my-6 rounded-lg border border-zinc-200">
                                <table className="w-full text-sm text-left border-collapse">
                                    <thead>
                                    <tr className="bg-zinc-50">
                                        <th className="px-4 py-3 font-medium text-zinc-700 border-b border-zinc-200">{t("cookieName")}</th>
                                        <th className="px-4 py-3 font-medium text-zinc-700 border-b border-zinc-200">{t("cookieProvider")}</th>
                                        <th className="px-4 py-3 font-medium text-zinc-700 border-b border-zinc-200">{t("cookieSide")}</th>
                                        <th className="px-4 py-3 font-medium text-zinc-700 border-b border-zinc-200">{t("cookieExpires")}</th>
                                        <th className="px-4 py-3 font-medium text-zinc-700 border-b border-zinc-200">{t("cookiePurpose")}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="px-4 py-3 text-zinc-800 border-b border-zinc-100 font-mono text-xs">NID</td>
                                        <td className="px-4 py-3 text-zinc-600 border-b border-zinc-100">Google Ireland Ltd.</td>
                                        <th className="px-4 py-3 font-medium text-zinc-700 border-b border-zinc-200">{t("thirdParty")}</th>
                                        <th className="px-4 py-3 font-medium text-zinc-700 border-b border-zinc-200">{t("6months")}</th>
                                        <th className="px-4 py-3 font-medium text-zinc-700 border-b border-zinc-200">{t("mapPref")}</th>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 1.1.3 Zorunlu */}
                        <div className="mt-6">
                            <h5 className="text-base font-medium text-zinc-800 mb-2">{t("113")}</h5>
                            <p className="text-gray-600 font-light leading-relaxed mb-4">{t("113Desc")}</p>

                            <div className="mb-4 pl-4 border-l-2 border-orange-300">
                                <p className="text-sm font-medium text-zinc-800 mb-1">{t("googleCaptcha")}</p>
                                <p className="text-sm text-gray-500 font-light leading-relaxed">{t("googleCaptchaDesc")}</p>
                            </div>

                            {/* reCAPTCHA */}
                            <div className="overflow-x-auto my-6 rounded-lg border border-zinc-200">
                                <table className="w-full text-sm text-left border-collapse">
                                    <thead>
                                    <tr className="bg-zinc-50">
                                        <th className="px-4 py-3 font-medium text-zinc-700 border-b border-zinc-200">{t("cookieName")}</th>
                                        <th className="px-4 py-3 font-medium text-zinc-700 border-b border-zinc-200">{t("cookieProvider")}</th>
                                        <th className="px-4 py-3 font-medium text-zinc-700 border-b border-zinc-200">{t("cookieSide")}</th>
                                        <th className="px-4 py-3 font-medium text-zinc-700 border-b border-zinc-200">{t("cookieExpires")}</th>
                                        <th className="px-4 py-3 font-medium text-zinc-700 border-b border-zinc-200">{t("cookiePurpose")}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="px-4 py-3 text-zinc-800 border-b border-zinc-100 font-mono text-xs">_GRECAPTCHA</td>
                                        <td className="px-4 py-3 text-zinc-600 border-b border-zinc-100">Google Ireland Ltd.</td>
                                        <th className="px-4 py-3 font-medium text-zinc-700 border-b border-zinc-200">{t("thirdParty")}</th>
                                        <th className="px-4 py-3 font-medium text-zinc-700 border-b border-zinc-200">{t("6months")}</th>
                                        <th className="px-4 py-3 font-medium text-zinc-700 border-b border-zinc-200">{t("6months")}</th>
                                        <th className="px-4 py-3 font-medium text-zinc-700 border-b border-zinc-200">{t("bot")}</th>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* 1.2 */}
                    <div className="mt-8">
                        <h4 className="text-lg font-medium text-zinc-800 mb-2">{t("12")}</h4>
                        <p className="text-gray-600 font-light leading-relaxed mb-4">{t("12Desc")}</p>

                        <div className="mt-6">
                            <h5 className="text-base font-medium text-zinc-800 mb-2">{t("121")}</h5>
                            <p className="text-gray-600 font-light leading-relaxed mb-4">{t("121Desc")}</p>
                        </div>
                    </div>

                    {/* 1.3 */}
                    <div className="mt-8">
                        <h4 className="text-lg font-medium text-zinc-800 mb-2">{t("13")}</h4>

                        <div className="mt-6">
                            <h5 className="text-base font-medium text-zinc-800 mb-2">{t("131")}</h5>
                            <p className="text-gray-600 font-light leading-relaxed mb-4">{t("131Desc")}</p>
                        </div>
                        <div className="mt-6">
                            <h5 className="text-base font-medium text-zinc-800 mb-2">{t("132")}</h5>
                            <p className="text-gray-600 font-light leading-relaxed mb-4">{t("132Desc")}</p>
                        </div>
                    </div>
                </div>

                {/* 2. Açık Rıza ve Rızanın Geri Alınması */}
                <div className="mt-12">
                    <h3 className="text-xl md:text-2xl font-medium text-zinc-900 mb-3">{t("2")}</h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">{t("2Desc1")}</p>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">{t("2Desc2")}</p>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">{t("2Desc3")}</p>
                </div>

                {/* 3. Kişisel Verilerin Yurt Dışına Aktarılması */}
                <div className="mt-12">
                    <h3 className="text-xl md:text-2xl font-medium text-zinc-900 mb-3">{t("3")}</h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">{t("3Desc")}</p>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">{t("d")}</p>
                </div>

                {/* 4. Aydınlatma Yükümlülüğü ve Saklama Süreleri */}
                <div className="mt-12">
                    <h3 className="text-xl md:text-2xl font-medium text-zinc-900 mb-3">{t("4")}</h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">{t("4Desc")}</p>
                </div>

                {/* 5. Hak ve talepleriniz için iletişim */}
                <div className="mt-12">
                    <h3 className="text-xl md:text-2xl font-medium text-zinc-900 mb-3">{t("5")}</h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">
                        {t("5Desc").split("vstarstransfer34@gmail.com")[0]}
                        <a href="mailto:vstarstransfer34@gmail.com" className="text-blue-500 hover:underline font-medium">
                            vstarstransfer34@gmail.com
                        </a>
                        {t("5Desc").split("vstarstransfer34@gmail.com")[1]}
                    </p>
                </div>

                {/* 6. Diğer Ülkelerdeki Ziyaretçiler */}
                <div className="mt-12">
                    <h3 className="text-xl md:text-2xl font-medium text-zinc-900 mb-3">{t("6")}</h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">{t("6Desc")}</p>
                </div>

                {/* 7. Tarayıcı üzerinden çerez Yönetimi */}
                <div className="mt-12">
                    <h3 className="text-xl md:text-2xl font-medium text-zinc-900 mb-3">{t("7")}</h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">{t("7Desc").split("\n")[0]}</p>
                    <ul className="space-y-2 mb-4">
                        <li>
                            <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-m text-blue-500 hover:underline font-normal">
                                - Chrome
                            </a>
                        </li>
                        <li>
                            <a href="https://support.mozilla.org/kb/clear-cookies-and-site-data-firefox" target="_blank" rel="noopener noreferrer" className="text-m text-blue-500 hover:underline font-normal">
                                - Firefox
                            </a>
                        </li>
                        <li>
                            <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-m text-blue-500 hover:underline font-normal">
                                - Safari
                            </a>
                        </li>
                        <li>
                            <a href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-m text-blue-500 hover:underline font-normal">
                                - Microsoft Edge
                            </a>
                        </li>
                        <li>
                            <a href="https://help.opera.com/en/latest/web-preferences/#cookies" target="_blank" rel="noopener noreferrer" className="text-m text-blue-500 hover:underline font-normal">
                                - Opera
                            </a>
                        </li>
                    </ul>
                </div>

                {/* AYDINLATMA METNİ HAKKINDA */}
                <div className="mt-12">
                    <h3 className="text-xl md:text-2xl font-medium text-zinc-900 mb-3">{t("Hakkinda")}</h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">{t("HakkindaDesc")}</p>
                </div>

            </section>

            <footer><Footer /></footer>
        </main>
    );
}