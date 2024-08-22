"use client"

import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"

function ForgotPassword() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-cover bg-center lg:bg-[url('/bg-login.png')]">
            <div className="flex-1">
                <div className="flex items-center justify-center">
                    <Link href="/">
                        <Image
                            src="/bulky-black.svg"
                            width={180}
                            height={60}
                            alt="Logo"
                            className="h-auto w-auto cursor-pointer"
                        />
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-center py-5">
                    <div className="h-fit w-full max-w-md rounded-xl border-[#BFC9D9] bg-white p-8 lg:border">
                        <div className="flex items-center py-6">
                            <Link href="/login">
                                <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
                            </Link>
                            <div className="pl-3 text-2xl font-bold">
                                Lupa kata sandi
                            </div>
                        </div>
                        <div className="py-2">
                            <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                Masukan Email
                            </div>
                            <input
                                type="email"
                                className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                placeholder="Email"
                            />
                            <div className="mb-2 py-2 text-sm text-[#6D7588]">
                                Cek email untuk mendapatkan konfirmasi
                                pengaturan ulang kata sandi
                            </div>
                        </div>
                        <div className="cursor-pointer rounded-xl bg-secondary py-3 text-center text-lg font-bold hover:bg-[#e8bc00]">
                            Kirim
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
