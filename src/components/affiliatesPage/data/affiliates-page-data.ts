export const getAffiliatesInfo = (t: any) => [
    {
        title: t("items.medical.title"),
        description: t("items.medical.desc"),
        image: "/affiliates/can-duman-medical-tourism.webp",
        alt: "One of the affiliates of Vstars Transfer for medical tourism in Istanbul",
        width: 800,
        height: 600,
        type:"webp",
        id: "affiliates-information-can-duman-medical-tourism",
    },
    {
        title: t("items.travelAgency.title"),
        description: t("items.travelAgency.desc"),
        image: "/affiliates/can-duman-travel-agency.webp",
        alt: "One of the affiliates of Vstars Transfer for travel agency in Istanbul. Logo image of Can Duman Travel Agency.",
        width: 800,
        height: 600,
        type:"webp",
        id: "affiliates-information-can-duamn-Travel-Agency",
    },
    {
        title: t("items.visitoria.title"),
        description: t("items.visitoria.desc"),
        image: "/affiliates/visitoria-sigorta.webp",
        alt: "One of the affiliates of Vstars Transfer for insurance in Türkiye. Logo image of Visitoria Sigorta.",
        width: 800,
        height: 600,
        type:"webp",
        id: "affiliates-information-visitoria",
    },
    {
        title: t("items.danismanlik.title"),
        description: t("items.danismanlik.desc"),
        image: "/affiliates/can-duman-danismanlik.webp",
        alt: "One of the affiliates of Vstars Transfer for consultancy service in Türkiye. Logo image of Can Duman Danışmanlık",
        width: 800,
        height: 600,
        type:"webp",
        id: "affiliates-information-can-duman-danismanlik",
    },
    {
        title: t("items.agon.title"),
        description: t("items.agon.desc"),
        image: "/affiliates/agon.webp",
        alt: "One of the affiliates of Vstars Transfer for fan club. Logo image of Agon.",
        width: 800,
        height: 600,
        type:"webp",
        id: "affiliates-information-agon",
    },
    {
        title: t("items.akademi.title"),
        description: t("items.akademi.desc"),
        image: "/affiliates/can-duman-akademi.webp",
        alt: "One of the affiliates of Vstars Transfer for learning courses. Logo image of Can Duman Akademi.",
        width: 800,
        height: 600,
        type:"webp",
        id: "affiliates-information-can-duman-akademi",
    },
];

export const getAffiliatesInfoSchema = {
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
            "description": "Vstars Transfer's partnerships and affiliated organizations providing comprehensive services in Istanbul and Turkey.",
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Partnership Inquiries",
                "email": "info@candumandanismanlik.com",
                "telephone": "+905326432234"
            },
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Istanbul",
                "addressCountry": "TR"
            },
            "partner": [
                {
                    "@type": "Organization",
                    "@id": "https://www.vstarstransfer.com/affiliates#can-duman-medical-tourism",
                    "name": "Can Duman Medical Tourism",
                    "image": {
                        "@type": "ImageObject",
                        "url": "https://www.vstarstransfer.com/affiliates/can-duman-medical-tourism.webp",
                        "width": 800,
                        "height": 600
                    },
                    "description": "Medical tourism services including aesthetic surgery, dental care, hair transplants, and advanced medical procedures in Istanbul.",
                    "areaServed": {
                        "@type": "Country",
                        "name": "Turkey"
                    },
                    "serviceType": "Medical Tourism"
                },
                {
                    "@type": "Organization",
                    "@id": "https://www.vstarstransfer.com/affiliates#can-duman-travel-agency",
                    "name": "Can Duman Travel Agency",
                    "image": {
                        "@type": "ImageObject",
                        "url": "https://www.vstarstransfer.com/affiliates/can-duman-travel-agency.webp",
                        "width": 800,
                        "height": 600
                    },
                    "description": "Travel agency services providing comprehensive travel solutions and tourism packages in Turkey.",
                    "areaServed": {
                        "@type": "Country",
                        "name": "Turkey"
                    },
                    "serviceType": "Travel Agency"
                },
                {
                    "@type": "Organization",
                    "@id": "https://www.vstarstransfer.com/affiliates#visitoria-sigorta",
                    "name": "Visitoria Sigorta",
                    "image": {
                        "@type": "ImageObject",
                        "url": "https://www.vstarstransfer.com/affiliates/visitoria-sigorta.webp",
                        "width": 800,
                        "height": 600
                    },
                    "description": "Insurance services for visitors and residents in Turkey.",
                    "areaServed": {
                        "@type": "Country",
                        "name": "Turkey"
                    },
                    "serviceType": "Insurance"
                },
                {
                    "@type": "Organization",
                    "@id": "https://www.vstarstransfer.com/affiliates#can-duman-danismanlik",
                    "name": "Can Duman Danışmanlık",
                    "image": {
                        "@type": "ImageObject",
                        "url": "https://www.vstarstransfer.com/affiliates/can-duman-danismanlik.webp",
                        "width": 800,
                        "height": 600
                    },
                    "description": "Professional consultancy services in Turkey.",
                    "areaServed": {
                        "@type": "Country",
                        "name": "Turkey"
                    },
                    "serviceType": "Consultancy"
                },
                {
                    "@type": "Organization",
                    "@id": "https://www.vstarstransfer.com/affiliates#agon",
                    "name": "Agon",
                    "image": {
                        "@type": "ImageObject",
                        "url": "https://www.vstarstransfer.com/affiliates/agon.webp",
                        "width": 800,
                        "height": 600
                    },
                    "description": "Fan club and community organization.",
                    "serviceType": "Fan Club"
                },
                {
                    "@type": "Organization",
                    "@id": "https://www.vstarstransfer.com/affiliates#can-duman-akademi",
                    "name": "Can Duman Akademi",
                    "image": {
                        "@type": "ImageObject",
                        "url": "https://www.vstarstransfer.com/affiliates/can-duman-akademi.webp",
                        "width": 800,
                        "height": 600
                    },
                    "description": "Educational academy providing learning courses and professional development programs.",
                    "serviceType": "Educational Services"
                }
            ]
        },
        {
            "@type": "CollectionPage",
            "@id": "https://www.vstarstransfer.com/affiliates",
            "name": "Vstars Transfer Affiliates",
            "description": "Our network of trusted partner organizations providing comprehensive services in Turkey.",
            "mainEntity": {
                "@type": "ItemList",
                "numberOfItems": 6,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "item": {
                            "@id": "https://www.vstarstransfer.com/affiliates#can-duman-medical-tourism"
                        }
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "item": {
                            "@id": "https://www.vstarstransfer.com/affiliates#can-duman-travel-agency"
                        }
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "item": {
                            "@id": "https://www.vstarstransfer.com/affiliates#visitoria-sigorta"
                        }
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "item": {
                            "@id": "https://www.vstarstransfer.com/affiliates#can-duman-danismanlik"
                        }
                    },
                    {
                        "@type": "ListItem",
                        "position": 5,
                        "item": {
                            "@id": "https://www.vstarstransfer.com/affiliates#agon"
                        }
                    },
                    {
                        "@type": "ListItem",
                        "position": 6,
                        "item": {
                            "@id": "https://www.vstarstransfer.com/affiliates#can-duman-akademi"
                        }
                    }
                ]
            }
        }
    ]
} as const;