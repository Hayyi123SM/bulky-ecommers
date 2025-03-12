"use client"

import { useAuth } from "@/hooks/auth"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"

function SidebarProfile() {
    const t = useTranslations()
    const { user } = useAuth()

    if (!user) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <div className="text-lg font-semibold">Loading...</div>
                    <div className="mt-2 text-gray-500">Please wait...</div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex items-center">
                {user.data.profile_picture !== "https://back-office.bulky.id/storage/" ? (
                    // If user has a stored photo, show it
                    <Image src={user.data.profile_picture} width={56} height={56} alt="Profile" className="cursor-pointer" priority={false} />
                ) : (
                    // Otherwise, show the default image
                    <Image src="/bio.png" width={56} height={56} alt="Profile" className="cursor-pointer" priority={false} />
                )}
                <div className="ml-3">
                    <div className="pb-1 text-base font-bold">{user.data.name}</div>
                    <div className="text-sm">
                        <Link href="/update-profile">
                            <div className="cursor-pointer text-[#007185]">Edit Profile</div>
                        </Link>
                    </div>
                </div>
            </div>
            {/* <div className="mt-5 text-base font-bold">Kotak Masuk</div>
            <Link href="/review">
                <div className="mt-3 rounded-lg py-3 pl-4 text-base font-light hover:bg-[#F5F5F5]">
                    Ulasan
                </div>
            </Link> */}
            <div className="border-b pb-5" />
            <div className="mt-5 text-base font-bold">{t("mobileMenu.myorder")}</div>
            <Link href="/waiting-payment">
                <div className="mt-3 cursor-pointer rounded-lg py-3 pl-4 text-base font-light hover:bg-[#F5F5F5]">{t("mobileMenu.waitingPayment")}</div>
            </Link>
            <Link href="/order">
                <div className="cursor-pointer rounded-lg py-3 pl-4 text-base font-light hover:bg-[#F5F5F5]">{t("mobileMenu.orderStatus")}</div>
            </Link>
            <Link href="/order-split">
                <div className="cursor-pointer rounded-lg py-3 pl-4 text-base font-light hover:bg-[#F5F5F5]">{t("mobileMenu.splitPayment")}</div>
            </Link>
            {/* <div className="mt-5 text-base font-bold">Profile Pengguna</div>
            <Link href="/bank-account">
                <div className="mt-3 rounded-lg py-3 pl-4 text-base font-light hover:bg-[#F5F5F5]">
                    Nomor Rekening
                </div>
            </Link> */}
        </div>
    )
}

export default SidebarProfile
