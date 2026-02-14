# Vstars Transfer - Premium Transfer Booking Platform

![Project Status](https://img.shields.io/badge/Status-Production-success)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind_CSS-38b2ac)
![Firebase](https://img.shields.io/badge/Hosting-Firebase-orange)

## 🚀 Introduction

**Vstars Transfer** is a live, production-grade transportation booking platform designed for high-end travel services. It provides a seamless booking experience for airport transfers, hourly hires, and inter-city travel. 

Built with the latest **Next.js 15 (App Router)**, the application focuses on performance, SEO, and user experience. It features a complex, multi-step booking engine that handles real-time price calculations, route validation, and automated email confirmations—all running in a serverless environment on Firebase.

## ✨ Key Features

* **Dynamic Booking Engine:** A multi-step wizard (Search -> Vehicle -> Guest Info -> Summary) built with React Hook Form and Zod validation.
* **Internationalization (i18n):** Native support for 5 languages (**English, German, Russian, Turkish, Spanish**) with automatic locale detection and routing.
* **Smart Location Services:** Integrated **Google Places API** for accurate address autocomplete and distance calculations.
* **Serverless Email System:** Secure, automated transactional emails (for booking confirmations and inquiries) using Next.js API Routes and Nodemailer.
* **Modern UI/UX:** Fully responsive design featuring **Shadcn/UI** components, Framer Motion animations, and a mobile-first approach.
* **Production Robustness:** Includes middleware for `www` redirection and locale management.

## 🛠️ Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS, Lucide Icons
* **UI Components:** Shadcn/ui (Radix UI)
* **Form Handling:** React Hook Form + Zod (Schema Validation)
* **Maps & Geocoding:** Google Maps Places API
* **Backend Logic:** Next.js API Routes (Serverless) + Nodemailer
* **Hosting:** Google Firebase

## ⚙️ Environment Variables

To run this project locally, you will need to create a `.env.local` file in the root directory with the following keys:

```bash
# Google Maps API (Restricted to specific domains in production)
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_api_key

# Email Configuration (Gmail SMTP)
EMAIL=your_email_address
PASS=your_app_password

## 📦 Installation & Setup
Clone the repository:

git clone [https://github.com/your-username/vstars-transfer.git](https://github.com/your-username/vstars-transfer.git)
cd vstars-transfer

Install dependencies:

npm install
# or
yarn install

Run the development server:
Bash
npm run dev
Open http://localhost:3000 with your browser to see the result.

## 📂 Project Structure
├── src/
│   ├── app/                 # Next.js App Router pages and API routes
│   │   ├── [locale]/        # Localized pages (e.g., /en/contact, /de/booking)
│   │   └── api/             # Serverless functions (Nodemailer logic)
│   ├── components/          # Reusable UI components (Shadcn/UI)
│   ├── features/            # Feature-based modules (Booking Widget logic)
│   ├── i18n/                # Translation JSONs and configuration
│   └── lib/                 # Utility functions and shared types
├── public/                  # Static assets (images, icons)
└── ...config files          # Tailwind, Next.js, ESLint configs

Built by Onur Akgülay. This project is live in production.
