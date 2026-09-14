'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { logEvent } from 'firebase/analytics'
import { initAnalytics } from '@/lib/firebase'
import { useCookieConsent } from '@/features/cookie-consent/cookie-consent-context'

export default function FirebaseAnalytics() {
    const { consent, hasDecided } = useCookieConsent()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const startedRef = useRef(false)

    // Start analytics once, only after consent granted
    useEffect(() => {
        if (!hasDecided || !consent.analytics) return
        startedRef.current = true
    }, [hasDecided, consent.analytics])

    // Track pageviews on route change, only while consented
    useEffect(() => {
        if (!startedRef.current) return

        const qs = searchParams.toString()
        const page_path = qs ? `${pathname}?${qs}` : pathname

        initAnalytics().then(analytics => {
            if (!analytics) return
            logEvent(analytics, 'page_view', { page_path })
        })
    }, [pathname, searchParams])

    return null
}