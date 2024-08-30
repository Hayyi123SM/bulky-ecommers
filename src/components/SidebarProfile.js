"use client"

import { useAuth } from "@/hooks/auth"
import Image from "next/image"
import Link from "next/link"

function SidebarProfile() {
    const { user } = useAuth()

    if (!user) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <div className="flex items-center">
                <Image
                    src="/profile.png"
                    width={56}
                    height={56}
                    alt="Profile"
                    className="cursor-pointer"
                    priority={false}
                />
                <div className="ml-3">
                    <div className="pb-1 text-sm font-bold">
                        {user.data.name}
                    </div>
                    <div className="text-xs">
                        <Link href="/profile">
                            <div className="cursor-pointer text-[#007185]">
                                Edit Profile
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="mt-5 text-sm font-bold">Kotak Masuk</div>
            <div className="mt-3 rounded-lg py-3 pl-5 text-xs font-light hover:bg-[#F5F5F5]">
                Ulasan
            </div>
            <div className="border-b pb-5"> </div>
            <div className="mt-5 text-sm font-bold">Pembelian</div>
            <Link href="/waiting-payment">
                <div className="mt-3 rounded-lg py-3 pl-5 text-xs font-light hover:bg-[#F5F5F5]">
                    Menunggu Pembayaran
                </div>
            </Link>
            <Link href="/order">
                <div className="rounded-lg py-3 pl-5 text-xs font-light hover:bg-[#F5F5F5]">
                    Status Pesanan
                </div>
            </Link>
            <Link href="/order-split">
                <div className="rounded-lg py-3 pl-5 text-xs font-light hover:bg-[#F5F5F5]">
                    Pembayaran Patungan
                </div>
            </Link>
        </div>
    )
}

export default SidebarProfile
