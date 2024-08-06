import ClientProvider from "@/components/ClientProvider"
import "../../styles/globals.css"

export const metadata = {
    title: "Octagon",
    description: "Liquidity",
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <link rel="icon" href="/logobulky.png" sizes="any" />
            <body>
                <div>
                    <ClientProvider>{children}</ClientProvider>
                </div>
            </body>
        </html>
    )
}
