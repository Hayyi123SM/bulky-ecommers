import dynamic from "next/dynamic"
import "../../styles/globals.css"
import "../../styles/static.css"
import "react-loading-skeleton/dist/skeleton.css"
import { Suspense } from "react"
import Script from "next/script"

export const metadata = {
    title: "Bulky",
    description: "Bulky",
}

const ClientProvider = dynamic(() => import("@/components/ClientProvider"), {
    ssr: false,
})

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                {/* Google Tag Manager */}
                <Script
                    id="google-tag-manager"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','GTM-5S7MDMBK');`,
                    }}
                />
                {/* End Google Tag Manager */}

                {/* Google Tag Manager */}
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-E0RBRJ4G64"
                />
                <Script
                    id="google-analytics"
                    dangerouslySetInnerHTML={{
                        __html: `window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-E0RBRJ4G64');`,
                    }}
                />

                <link rel="icon" href="/new/favicon bulky-01.png" sizes="any" />
            </head>
            <body>
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-5S7MDMBK"
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    />
                </noscript>
                {/* End Google Tag Manager (noscript) */}

                <Suspense fallback={<div>Loading...</div>}>
                    <ClientProvider>{children}</ClientProvider>
                </Suspense>
            </body>
        </html>
    )
}
