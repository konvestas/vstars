export const getContactPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "LocalBusiness",
            "@id": "https://www.vstars.com.tr",
            "name": "Vstars Transfer",
            "url": "https://www.vstars.com.tr",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.vstars.com.tr/favicon.ico"
            },
            "image": "https://www.vstars.com.tr/vstars/vstars-fleet.webp",
            "description": "Premium chauffeur and transfer services in Istanbul. Professional airport transfers, hourly hire, and city tours.",
            "telephone": "+905326432234",
            "email": "vstarstransfer34@gmail.com",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Cevizli Mah,Zuhal Cad.Ritim İstanbul A5 Blok No:46E Istanbul, Turkey",
                "addressLocality": "Istanbul",
                "addressCountry": "TR",
                "postalCode": "34860"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "40.921630",
                "longitude": "29.157446"
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
                    "email": "vstarstransfer34@gmail.com",
                    "availableLanguage": ["en", "tr"],
                    "areaServed": "TR"
                },
                {
                    "@type": "ContactPoint",
                    "contactType": "Reservations",
                    "telephone": "+905326432234",
                    "email": "vstarstransfer34@gmail.com",
                    "availableLanguage": ["en", "tr"],
                    "areaServed": "TR"
                }
            ],
        },
        {
            "@type": "ContactPage",
            "@id": "https://www.vstars.com.tr/contact",
            "name": "Contact Vstars Transfer",
            "description": "Get in touch with Vstars Transfer for premium chauffeur and transfer services in Istanbul. Available 24/7 for bookings and inquiries.",
            "url": "https://www.vstars.com.tr/contact",
            "mainEntity": {
                "@id": "https://www.vstars.com.tr/#localbusiness"
            }
        },
        {
            "@type": "WebPage",
            "@id": "https://www.vstars.com.tr/contact#webpage",
            "url": "https://www.vstars.com.tr/contact",
            "name": "Contact Us - Vstars Transfer",
            "email": "vstarstransfer34@gmail.com",
            "description": "Contact Vstars Transfer for premium transfer services in Istanbul. Phone: +90 532 643 22 34, Email: vstarstransfer34@gmail.com",
            "inLanguage": "en",
            "isPartOf": {
                "@type": "WebSite",
                "@id": "https://www.vstars.com.tr/#website"
            },
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://www.vstars.com.tr"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Contact",
                        "item": "https://www.vstars.com.tr/contact"
                    }
                ]
            }
        }
    ]
};