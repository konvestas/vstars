'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useMessages } from 'next-intl';
import NavigationBar from "@/components/layout/navigation-bar";
import Footer from "@/components/layout/footer";
import ReadyToBook from "@/components/layout/ready-to-book";

// --- Types ---
type QuestionItem = {
    q: string;
    a: string;
};

type CategoryData = {
    title: string;
    questions: Record<string, QuestionItem>;
};

// --- Components ---

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
    return (
        <details className="group border-b border-gray-200 dark:border-white/10 last:border-0">
            <summary className="flex cursor-pointer items-center justify-between py-6 text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors list-none">
                {question}
                <span className="ml-6 flex h-7 w-7 items-center justify-center rounded-full border border-gray-400/30 bg-transparent transition-all group-open:rotate-180">
                    <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </summary>
            <div className="pb-6 text-base leading-relaxed text-gray-600 dark:text-gray-300 animate-in slide-in-from-top-2 fade-in duration-200">
                {answer}
            </div>
        </details>
    );
};

export default function FAQPage() {
    const t = useTranslations('FAQPage');

    const messages = useMessages() as any;
    const faqData = messages.FAQPage?.items as Record<string, CategoryData>;

    const [searchQuery, setSearchQuery] = useState('');
    // State to track the active category (default to the first one)
    const [activeCategory, setActiveCategory] = useState<string>('general');

    // --- Search Logic ---
    const searchResults = useMemo(() => {
        if (!searchQuery) return null;

        const results: { category: string; q: string; a: string }[] = [];

        Object.keys(faqData).forEach((catKey) => {
            const category = faqData[catKey];
            Object.values(category.questions).forEach((item) => {
                if (
                    item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.a.toLowerCase().includes(searchQuery.toLowerCase())
                ) {
                    results.push({ category: category.title, ...item });
                }
            });
        });

        return results;
    }, [searchQuery, faqData]);

    // --- Scroll & Select Logic ---
    const handleCategoryClick = (catKey: string) => {
        setActiveCategory(catKey); // Set active state immediately

        const element = document.getElementById(`category-${catKey}`);
        if (element) {
            const offset = 120; // Slightly larger offset for better visibility
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <main className="min-h-screen bg-white dark:bg-black font-sans selection:bg-blue-100 selection:text-blue-900">
            <nav className="fixed top-0 left-0 w-full z-50">
                <NavigationBar />
            </nav>

            {/* Header Section */}
            <section className="pt-30 pb-16 px-6 bg-gray-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-white/5">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                        {t('title')}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        {t('desc')}
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-xl mx-auto mt-8 group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-11 pr-4 py-4 bg-white dark:bg-black border border-gray-200 dark:border-white/20 rounded-xl
                            text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                            transition-all shadow-sm"
                        />
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Sidebar: Categories */}
                        {!searchQuery && (
                            <div className="hidden lg:block lg:col-span-3 space-y-2 sticky top-32 h-fit">
                                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
                                    Categories
                                </h3>
                                {Object.entries(faqData).map(([key, data]) => (
                                    <button
                                        key={key}
                                        onClick={() => handleCategoryClick(key)}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-all font-medium cursor-pointer
                                            ${activeCategory === key
                                            // SELECTED STATE: Blue background, Blue Text
                                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm'
                                            // DEFAULT STATE: Gray Text, Hover turns Blue
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400'
                                        }
                                        `}
                                    >
                                        {data.title}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* FAQ List Area */}
                        <div className={searchQuery ? "col-span-12 max-w-3xl mx-auto" : "lg:col-span-9"}>

                            {/* VIEW 1: SEARCH RESULTS */}
                            {searchQuery && (
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-white/10">
                                        <h2 className="text-xl font-semibold">Search Results</h2>
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            Clear Search
                                        </button>
                                    </div>

                                    {searchResults && searchResults.length > 0 ? (
                                        <div className="bg-white dark:bg-black rounded-3xl">
                                            {searchResults.map((item, idx) => (
                                                <div key={idx} className="mb-2">
                                                     <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1 block">
                                                        {item.category}
                                                     </span>
                                                    <FAQItem question={item.q} answer={item.a} />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 text-gray-500">
                                            {t('noResults')} "{searchQuery}"
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* VIEW 2: CATEGORY LIST */}
                            {!searchQuery && Object.entries(faqData).map(([key, category]) => (
                                <div
                                    key={key}
                                    id={`category-${key}`}
                                    className="mb-16 scroll-mt-32"
                                >
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                        {category.title}
                                    </h2>
                                    <div className="bg-white dark:bg-black rounded-3xl">
                                        <div className="space-y-1">
                                            {Object.values(category.questions).map((item, idx) => (
                                                <FAQItem
                                                    key={idx}
                                                    question={item.q}
                                                    answer={item.a}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </section>

            <ReadyToBook />
            <footer className="border-t border-gray-200 dark:border-white/10">
                <Footer />
            </footer>
        </main>
    );
}