
export const getServices = (t: any) => [
    {
        title: t("items.airportTransfers.title"),
        description: t("items.airportTransfers.desc"),
        image: "/images/istanbul-airport-private-chauffeur-transfer.webp",
        alt: "Airport private chauffeur transfer with Mercedes-Benz Maybach van",
        width: 1500,
        height: 1500,
        type:"webp",
        id: "airport-transfers",
        faqs: [
            { q: t("FAQS.items.q1"), a: t("FAQS.items.a1") },
            { q: t("FAQS.items.q2"), a: t("FAQS.items.a2") },
            { q: t("FAQS.items.q3"), a: t("FAQS.items.a3") },
            { q: t("FAQS.items.q4"), a: t("FAQS.items.a4") },
            { q: t("FAQS.items.q5"), a: t("FAQS.items.a5") },
            { q: t("FAQS.items.q6"), a: t("FAQS.items.a6") },
        ],
    },
    {
        title: t("items.hourlyHire.title"),
        description: t("items.hourlyHire.desc"),
        image: "/images/private-chauffeur-hire-istanbul-transfer-mercedes-vito.webp",
        alt: "Private chauffeur hire for Vstars transfers in Istanbul",
        width: 1500,
        height: 1500,
        type:"webp",
        id: "hourly-hire",
        faqs: [
            { q: t("FAQS.items.q7"), a: t("FAQS.items.a7") },
            { q: t("FAQS.items.q8"), a: t("FAQS.items.a8") },
            { q: t("FAQS.items.q9"), a: t("FAQS.items.a9") },
        ],
    },
    {
        title: t("items.medicalTourism.title"),
        description: t("items.medicalTourism.desc"),
        image: "/affiliates/can-duman-medical-tourism.webp",
        alt: "One of the affiliates of Vstars Transfer for medical tourism in Istanbul",
        width: 800,
        height: 600,
        type:"webp",
        id: "medical-tourism",
        faqs: [
            { q: t("FAQS.items.q10"), a: t("FAQS.items.a10") },
            { q: t("FAQS.items.q11"), a: t("FAQS.items.a11") },
            { q: t("FAQS.items.q12"), a: t("FAQS.items.a12") },
        ],
    },
    {
        title: t("items.cityTour.title"),
        description: t("items.cityTour.desc"),
        image: "/images/istanbul-city-tour-private-driver-galata-tower.webp",
        alt: "City tour with private driver in Istanbul with a view to galata tower",
        width: 1200,
        height: 800,
        type:"webp",
        id: "city-tour",
        faqs: [
            { q: t("FAQS.items.q13"), a: t("FAQS.items.a13") },
            { q: t("FAQS.items.q14"), a: t("FAQS.items.a14") },
            { q: t("FAQS.items.q15"), a: t("FAQS.items.a15") },
        ],
    },
];
export const getServicesSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://www.vstarstransfer.com/#organization",
            "name": "Vstars Transfer",
            "url": "https://www.vstarstransfer.com",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.vstarstransfer.com/favicon.ico"
            },
            "image": "https://www.vstarstransfer.com/vstars/vstars-fleet.webp",
            "description": "Premium chauffeur and transfer services in Istanbul, offering airport transfers, hourly hire, city tours, and medical tourism coordination.",
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "email": "info@candumandanismanlik.com",
                "telephone": "+905326432234",
                "availableLanguage": ["en", "tr"]
            },
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Istanbul",
                "addressCountry": "TR"
            },
            "areaServed": {
                "@type": "City",
                "name": "Istanbul"
            },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Transfer Services",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "@id": "https://www.vstarstransfer.com/services#airport-transfers",
                            "name": "Airport Transfers",
                            "description": "Professional airport transfer service between Istanbul Airport (IST), Sabiha Gökçen Airport (SAW), and your destination. Flight tracking, luxury vehicles, and door-to-door service.",
                            "provider": {
                                "@id": "https://www.vstarstransfer.com/#organization"
                            },
                            "areaServed": [
                                {
                                    "@type": "Airport",
                                    "name": "Istanbul Airport",
                                    "iataCode": "IST"
                                },
                                {
                                    "@type": "Airport",
                                    "name": "Sabiha Gökçen International Airport",
                                    "iataCode": "SAW"
                                }
                            ],
                            "serviceType": "Airport Transfer"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "@id": "https://www.vstarstransfer.com/services#hourly-hire",
                            "name": "Hourly Chauffeur Hire",
                            "description": "Flexible hourly chauffeur service for multi-stop travel within Istanbul. Professional driver, premium vehicle, and transparent pricing with no hidden fees.",
                            "provider": {
                                "@id": "https://www.vstarstransfer.com/#organization"
                            },
                            "serviceType": "Chauffeur Service"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "@id": "https://www.vstarstransfer.com/services#city-tour",
                            "name": "City Tour",
                            "description": "Private city tours of Istanbul with professional driver. Explore iconic landmarks and hidden gems at your own pace with door-to-door service.",
                            "provider": {
                                "@id": "https://www.vstarstransfer.com/#organization"
                            },
                            "serviceType": "City Tour"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "@id": "https://www.vstarstransfer.com/services#medical-tourism",
                            "name": "Medical Tourism Coordination",
                            "description": "Coordination of medical and wellness services through our affiliate Can Duman Medical Tourism, including aesthetic surgery, dental care, and hair transplants.",
                            "provider": {
                                "@id": "https://www.vstarstransfer.com/#organization"
                            },
                            "serviceType": "Medical Tourism"
                        }
                    }
                ]
            }
        }
    ]
};
