import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Safe to init eagerly — no cookies/network until getAnalytics() is called.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

let analyticsInstance: Analytics | null = null
let initPromise: Promise<Analytics | null> | null = null

/**
 * Lazily starts Firebase Analytics. Call this ONLY after the user
 * has granted analytics consent — this is the point cookies get set.
 * Safe to call multiple times; only initializes once.
 */
export function initAnalytics(): Promise<Analytics | null> {
    if (typeof window === 'undefined') return Promise.resolve(null)
    if (analyticsInstance) return Promise.resolve(analyticsInstance)
    if (initPromise) return initPromise

    initPromise = isSupported().then(supported => {
        if (!supported) return null
        analyticsInstance = getAnalytics(app)
        return analyticsInstance
    })

    return initPromise
}

/** Returns current analytics instance if already initialized, else null. Does not start it. */
export function getAnalyticsIfReady(): Analytics | null {
    return analyticsInstance
}