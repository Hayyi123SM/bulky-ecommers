import dynamic from "next/dynamic"
import "../../styles/globals.css"

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
                <ClientProvider>{children}</ClientProvider>
            </body>
        </html>
    )
}
