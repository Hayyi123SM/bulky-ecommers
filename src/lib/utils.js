import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export function formatRupiah(rupiah) {
    const value = typeof rupiah === "string" ? parseFloat(rupiah.replace(/[^\d.-]/g, "")) : rupiah

    if (!value || isNaN(value)) return "Rp 0"

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(Math.ceil(value))
}

export const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL
