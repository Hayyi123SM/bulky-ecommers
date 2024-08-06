"use client"

import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"

function Otp() {
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
                            className="cursor-pointer"
                        />
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-center py-5">
                    <div className="h-fit w-full max-w-md rounded-xl border-[#BFC9D9] bg-white p-8 lg:border">
                        <div className="flex items-center py-6">
                            <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
                            <div className="pl-3 text-2xl font-bold">OTP</div>
                        </div>
                        <div className="py-2">
                            <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                Masukan OTP
                            </div>
                            <input
                                type="text"
                                className="h-10 w-full border-0 border-b-2 border-gray-300 p-2 text-center text-2xl font-semibold tracking-widest focus:border-[#007185] focus:ring-0"
                                placeholder="*   *   *   *   *   *"
                            />
                            <div className="mb-3 py-2 text-sm text-[#6D7588]">
                                Cek email untuk mendapatkan konfirmasi OTP dari
                                kami.
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

export default Otp
