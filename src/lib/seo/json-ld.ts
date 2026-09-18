
export function buildJsonLd(locale?: string) {

    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://www.vstars.com.tr/#localbusiness",
        "name": "Vstars Transfer",
        "alternateName": "Vstars",
        "description": "Experience VIP transfer in Istanbul and all around Türkiye. VIP Airport transfers (IST & SAW), hourly chauffeur hire, and private tours.",
        "founder": {
            "@type": "Person",
            "name": "Can Duman",
            "sameAs": ["https://www.linkedin.com/in/can-duman-9bb66b5a/"]
        },
        "logo": {
            "@type": "ImageObject",
            "url": "https://www.vstars.com.tr/logo-icon-512x512.png",
            "width": 512,
            "height": 512,
            "caption": "Logo"
        },
        "image": "https://www.vstars.com.tr/vstars/vstars-fleet.webp",
        "url": "https://www.vstars.com.tr",
        "telephone": "+905385049857",
        "email": "vstarstransfer34@gmail.com",
        address: {
            "@type": "PostalAddress",
            "streetAddress": "Cevizli Mah,Zuhal Cad.Ritim İstanbul A5 Blok No:46E Istanbul, Turkey",
            "addressLocality": "Maltepe",
            "addressRegion": "İstanbul",
            "postalCode": "34846",
            "addressCountry": "TR"
        },
        "location": {
            "@type": "Place",
            "name": "Visitoria Group Headquarters",
            "hasMap": "https://maps.app.goo.gl/rXkpKhmiG2GHPu358",
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                        "https://schema.org/Monday",
                        "https://schema.org/Tuesday",
                        "https://schema.org/Wednesday",
                        "https://schema.org/Thursday",
                        "https://schema.org/Friday",
                        "https://schema.org/Saturday"
                    ],
                    "opens": "09:00",
                    "closes": "18:30"
                }
            ]
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "40.921630",
            "longitude": "29.157446"
        },
        numberOfEmployees: {
            "@type": "QuantitativeValue",
            "value": 20
        },
        knowsLanguage: ["tr", "en", "ru", "es"],
        knowsAbout: ["VIP Transporation"],
        "contactPoint": [
            {
                '@type': 'ContactPoint',
                contactType: 'general inquiries',
                email: 'vstarstransfer34@gmail.com',
                availableLanguage: ["tr", "en", "ru", "es"]
            },
            {
                "@type": "ContactPoint",
                contactType: "international inquiries",
                email: 'vstarstransfer34@gmail.com',
                availableLanguage: ["en", "tr", "ru", "es"]
            }
        ],
        "priceRange": "$$$",
        "currenciesAccepted": "TRY, USD, EUR",
        "paymentAccepted": "Cash, Credit Card, Bank Transfer",
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "09:00",
            "closes": "18:30"
        },
        "areaServed": [
            {
                "@type": "City",
                "name": "Istanbul"
                },
            {
                "@type": "City",
                "name": "Antalya"
            },
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
        "sameAs": [
            "https://www.instagram.com/vstarstransfer/",
            "https://www.facebook.com/vstarstransfer/"
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Vstars Transfer Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Hourly and full day hire services",
                        "description": "Choose hourly or full-day service and enjoy comfortable, on-demand transportation tailored to your schedule.",
                        "provider": {
                            "@id": "https://www.vstars.com.tr/#localbusiness"
                        },
                        "areaServed": [
                            {
                                "@type": "City",
                                "name": "Istanbul",
                                "iataCode": "IST"
                            },
                            {
                                "@type": "City",
                                "name": "Antalya",
                                "iataCode": "AYT"
                            }
                        ]
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Airport transfer services",
                        "description": "Reliable transfer service with on-time pick-ups, flight-tracking, and professional driver.",
                        "provider": {
                            "@id": "https://www.vstars.com.tr/#localbusiness"
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
                            },
                            {
                                "@type": "Airport",
                                "name": "Antalya Airport",
                                "iataCode": "AYT"
                            },
                        ]
                    }
                },
                {
                    "@type": "Offer",
                        "itemOffered": {
                        "@type": "Service", "name": "Medical tourism services",
                            "description": "Private, safe, and comfortable transport for medical tourism. Hospital visits and hotel transfers.",
                            "provider": {"@id": "https://www.vstars.com.tr/#localbusiness"},
                            "areaServed": [
                                {
                                    "@type": "City",
                                    "name": "Istanbul",
                                    "iataCode": "IST"
                                }
                            ]
                        }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "City tour services",
                        "description": "Explore the city with a guide and customize your tour. Visit top attractions and historic landmarks.",
                        "provider": {
                            "@id": "https://www.vstars.com.tr/#localbusiness"
                        },
                        "areaServed": [
                            {
                                "@type": "City",
                                "name": "Istanbul",
                                "iataCode": "IST"
                            },
                            {
                                "@type": "City",
                                "name": "Antalya",
                                "iataCode": "AYT"
                            }
                        ]
                    }
                }
            ]
        }
    }
}