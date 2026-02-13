export const getContactPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "LocalBusiness",
            "@id": "https://www.vstarstransfer.com/",
            "name": "Vstars Transfer",
            "url": "https://www.vstarstransfer.com",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.vstarstransfer.com/favicon.ico"
            },
            "image": "https://www.vstarstransfer.com/vstars/vstars-fleet.webp",
            "description": "Premium chauffeur and transfer services in Istanbul. Professional airport transfers, hourly hire, and city tours.",
            "telephone": "+905326432234",
            "email": "info@candumandanismanlik.com",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Kordonboyu Mh Ankara cad İSTMARİNA S2 kule B blok kat:24 no 147/B-300",
                "addressLocality": "Istanbul",
                "addressCountry": "TR",
                "postalCode": "34860"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "40.884600538194476",
                "longitude": "29.20526621261032"
            },
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
                "opens": "00:00",
                "closes": "23:59"
            },
            "priceRange": "$$$",
            "currenciesAccepted": "TRY, USD, EUR",
            "paymentAccepted": "Cash, Credit Card, Bank Transfer",
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
            "contactPoint": [
                {
                    "@type": "ContactPoint",
                    "contactType": "Customer Service",
                    "telephone": "+905326432234",
                    "email": "info@candumandanismanlik.com",
                    "availableLanguage": ["en", "tr"],
                    "areaServed": "TR"
                },
                {
                    "@type": "ContactPoint",
                    "contactType": "Reservations",
                    "telephone": "+905326432234",
                    "email": "info@candumandanismanlik.com",
                    "availableLanguage": ["en", "tr"],
                    "areaServed": "TR"
                }
            ],
        },
        {
            "@type": "ContactPage",
            "@id": "https://www.vstarstransfer.com/contact",
            "name": "Contact Vstars Transfer",
            "description": "Get in touch with Vstars Transfer for premium chauffeur and transfer services in Istanbul. Available 24/7 for bookings and inquiries.",
            "url": "https://www.vstarstransfer.com/contact",
            "mainEntity": {
                "@id": "https://www.vstarstransfer.com/#localbusiness"
            }
        },
        {
            "@type": "WebPage",
            "@id": "https://www.vstarstransfer.com/contact#webpage",
            "url": "https://www.vstarstransfer.com/contact",
            "name": "Contact Us - Vstars Transfer",
            "description": "Contact Vstars Transfer for premium transfer services in Istanbul. Phone: +90 532 643 22 34, Email: info@candumandanismanlik.com",
            "inLanguage": "en",
            "isPartOf": {
                "@type": "WebSite",
                "@id": "https://www.vstarstransfer.com/#website"
            },
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://www.vstarstransfer.com"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Contact",
                        "item": "https://www.vstarstransfer.com/contact"
                    }
                ]
            }
        }
    ]
};