import NavigationBar from "@/components/layout/navigation-bar";
import Footer from "@/components/layout/footer";
import { useTranslations } from "next-intl";
import React from "react";

export default function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
    const t = useTranslations("privacy-policy");

    return (
        <main className="min-h-screen bg-white">
            <nav className="fixed top-0 left-0 w-full z-50"><NavigationBar /></nav>

            <section className="pt-32 pb-20 px-6 max-w-3xl mx-auto">

                <h2 className="text-3xl md:text-5xl font-light tracking-tight text-zinc-900 mb-4 md:mb-6">
                    {t("title")}
                </h2>
                <div className="w-16 h-[3px] bg-linear-to-br from-orange-400 to-purple-700 mb-8" />
                <p className="text-sm text-gray-500 font-normal mb-8">{t("lastUpdate")}</p>

                <p className="text-gray-600 font-light leading-relaxed mb-4">{t("desc1")}</p>
                <p className="text-gray-600 font-light leading-relaxed mb-4">{t("desc2")}</p>

                {/* 1. TOPLANAN KİŞİSEL VERİLERİNİZ */}
                <div className="mt-12">
                    <h3 className="text-xl md:text-2xl font-medium text-zinc-900 mb-3">{t("1")}</h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">{t("1Desc")}</p>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li className="text-gray-600 font-light leading-relaxed">{t("1sub1")}</li>
                        <li className="text-gray-600 font-light leading-relaxed">{t("1sub2")}</li>
                        <li className="text-gray-600 font-light leading-relaxed">{t("1sub3")}</li>
                        <li className="text-gray-600 font-light leading-relaxed">{t("1sub4")}</li>
                    </ul>
                </div>

                {/* 2. KİŞİSEL VERİLERİN TOPLANMA YÖNTEMLERİ */}
                <div className="mt-12">
                    <h3 className="text-xl md:text-2xl font-medium text-zinc-900 mb-3">{t("2")}</h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">{t("2Desc")}</p>
                </div>

                {/* 3. KİŞİSEL VERİLERİN İŞLENME AMAÇLARI */}
                <div className="mt-12">
                    <h3 className="text-xl md:text-2xl font-medium text-zinc-900 mb-3">{t("3")}</h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">{t("3Desc")}</p>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li className="text-gray-600 font-light leading-relaxed">{t("3sub1")}</li>
                        <li className="text-gray-600 font-light leading-relaxed">{t("3sub2")}</li>
                        <li className="text-gray-600 font-light leading-relaxed">{t("3sub3")}</li>
                        <li className="text-gray-600 font-light leading-relaxed">{t("3sub4")}</li>
                        <li className="text-gray-600 font-light leading-relaxed">{t("3sub5")}</li>
                    </ul>
                </div>

                {/* 4. KİŞİSEL VERİLERİN AKTARILMASI */}
                <div className="mt-12">
                    <h3 className="text-xl md:text-2xl font-medium text-zinc-900 mb-3">{t("4")}</h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">{t("4Desc")}</p>
                </div>

                {/* 5. ÇEREZ (COOKIE) KULLANIMI VE ÜÇÜNCÜ TARAF HİZMETLER */}
                <div className="mt-12">
                    <h3 className="text-xl md:text-2xl font-medium text-zinc-900 mb-3">{t("5")}</h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-4 whitespace-pre-line">{t("5Desc")}</p>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li className="text-gray-600 font-light leading-relaxed">{t("5sub1")}</li>
                        <li className="text-gray-600 font-light leading-relaxed">{t("5sub2")}</li>
                        <li className="text-gray-600 font-light leading-relaxed">{t("5sub3")}</li>
                    </ul>
                </div>

                {/* 6. VERİ SAHİBİNİN HAKLARI (KVKK MADDE 11) */}
                <div className="mt-12">
                    <h3 className="text-xl md:text-2xl font-medium text-zinc-900 mb-3">{t("6")}</h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">{t("6Desc")}</p>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li className="text-gray-600 font-light leading-relaxed">{t("6sub1")}</li>
                        <li className="text-gray-600 font-light leading-relaxed">{t("6sub2")}</li>
                        <li className="text-gray-600 font-light leading-relaxed">{t("6sub3")}</li>
                        <li className="text-gray-600 font-light leading-relaxed">{t("6sub4")}</li>
                        <li className="text-gray-600 font-light leading-relaxed">{t("6sub5")}</li>
                        <li className="text-gray-600 font-light leading-relaxed">{t("6sub6")}</li>
                        <li className="text-gray-600 font-light leading-relaxed">{t("6sub7")}</li>
                        <li className="text-gray-600 font-light leading-relaxed">{t("6sub8")}</li>
                    </ul>
                </div>

                {/* 7. VERİ GÜVENLİĞİ TEDBİRLERİ */}
                <div className="mt-12">
                    <h3 className="text-xl md:text-2xl font-medium text-zinc-900 mb-3">{t("7")}</h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">{t("7Desc")}</p>
                </div>

                {/* 8. KİŞİSEL VERİLERİN SAKLANMA SÜRESİ */}
                <div className="mt-12">
                    <h3 className="text-xl md:text-2xl font-medium text-zinc-900 mb-3">{t("8")}</h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">{t("8Desc")}</p>
                </div>

                {/* 9. İLETİŞİM VE BAŞVURU */}
                <div className="mt-12">
                    <h3 className="text-xl md:text-2xl font-medium text-zinc-900 mb-3">{t("9")}</h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">{t("9Desc")}</p>
                    <ul className="space-y-2 mb-4">
                        <li className="text-gray-600 font-light leading-relaxed">{t("9sub1")}</li>
                        <li className="text-gray-600 font-light leading-relaxed">{t("9sub2")}</li>
                        <li className="text-gray-600 font-light leading-relaxed">{t("9sub3")}</li>
                        <li className="text-gray-600 font-light leading-relaxed">
                            E-posta: <a href="mailto:vstarstransfer34@gmail.com" className="text-blue-500 hover:underline">{t("9sub4")}</a>
                        </li>
                    </ul>
                </div>

                {/* 10. AYDINLATMA METNİ HAKKINDA */}
                <div className="mt-12">
                    <h3 className="text-xl md:text-2xl font-medium text-zinc-900 mb-3">{t("10")}</h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">{t("10Desc")}</p>
                </div>

            </section>

            <footer><Footer /></footer>
        </main>
    );
}