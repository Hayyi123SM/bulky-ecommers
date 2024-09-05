import dynamic from "next/dynamic"
import "../../styles/globals.css"
import "../../styles/static.css"
import "react-loading-skeleton/dist/skeleton.css"
import { Suspense } from "react"

export const metadata = {
    title: "Octagon",
    description: "Liquidity",
}

const ClientProvider = dynamic(() => import("@/components/ClientProvider"), {
    ssr: false,
})

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/logobulky.png" sizes="any" />
            </head>
            <body>
                <Suspense fallback={<div>Loading...</div>}>
                    <ClientProvider>{children}</ClientProvider>
                </Suspense>
            </body>
        </html>
    )
}
