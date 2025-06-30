"use client"

import dynamic from "next/dynamic"
import "../../styles/globals.css"
import "../../styles/static.css"
import "react-loading-skeleton/dist/skeleton.css"
import { Suspense } from "react"
import Script from "next/script"
import { NextIntlClientProvider } from "next-intl"
import Cookies from "js-cookie"

// Dynamically import the ClientProvider component
const ClientProvider = dynamic(() => import("@/components/ClientProvider"), {
    ssr: false,
})

export default function RootLayout({ children }) {
    const languageCookie = Cookies.get("locale")
    const locale = languageCookie || "id" // Default ke "en" jika tidak ada cookie

    let messages
    try {
        messages = require(`../locales/${locale}.json`)
    } catch (error) {
        console.warn(`No translations found for locale: ${locale}`)
        messages = {}
    }

    return (
        <html lang={locale}>
            <head>
            <Script
                id="gtm-head"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-5S7MDMBK');
                    `,
                }}
                />
                <link rel="icon" href="/new/favicon bulky-01.png" sizes="any" />
                <title>Bulky</title>
            </head>
            <body>
            <noscript>
                <iframe
                    src="https://www.googletagmanager.com/ns.html?id=GTM-5S7MDMBK"
                    height="0"
                    width="0"
                    style={{ display: 'none', visibility: 'hidden' }}
                    title="Google Tag Manager"
                />
                </noscript>
                <Suspense fallback={<div>Loading...</div>}>
                    <NextIntlClientProvider locale={locale} messages={messages}>
                        <ClientProvider>{children}</ClientProvider>
                    </NextIntlClientProvider>
                </Suspense>
            </body>
        </html>
    )
}
