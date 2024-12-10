import { NextResponse } from "next/server"

export function middleware(req) {
    const { pathname } = req.nextUrl

    // Default locale jika tidak ada di URL
    const defaultLocale = "id"
    const locale = req.nextUrl.locale || defaultLocale

    if (!pathname.startsWith(`/${locale}`)) {
        return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: "/:path*",
}
