"use client"

import Navbar from "@/components/Navbar"
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

function PaymentSuccess() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <Navbar visibleOn="desktop" />
                <div className="mx-auto min-h-screen max-w-7xl bg-white pb-10">
                    <div className="flex justify-center py-5">
                        <div className="mt-20 flex items-center justify-center">
                            <Link href="/">
                                <Image
                                    src="/bulky-black.svg"
                                    width={180}
                                    height={60}
                                    alt="Logo"
                                    className="h-auto w-auto cursor-pointer"
                                    priority={false}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center px-4 py-2">
                        <div className="mt-5 h-fit w-full max-w-xl rounded-t-xl border border-[#BFC9D9] bg-white px-8 py-4">
                            <div className="py-2">
                                <div className="py-2 text-lg font-bold">
                                    Pembayaran Berhasil
                                </div>
                            </div>
                        </div>
                        <div className="h-fit w-full max-w-xl border border-[#BFC9D9] bg-white px-8 py-3">
                            <div className="flex items-center justify-between">
                                <div className="text-sm leading-6">
                                    <div className="text-sm font-bold">
                                        BCA Virtual Account
                                    </div>
                                </div>
                                <div className="ml-5 text-right text-sm leading-6">
                                    <Image
                                        src="/bca.svg"
                                        width={50}
                                        height={50}
                                        alt="BCA"
                                        priority={false}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="h-fit w-full max-w-xl border border-[#BFC9D9] bg-white px-8 py-3">
                            <div className="flex justify-between">
                                <div className="text-sm leading-6">
                                    <div className="text-sm font-light">
                                        Waktu Transaksi
                                    </div>
                                    <div className="text-md font-bold">
                                        11 Juni 2024 06.09
                                    </div>
                                </div>
                                <div className="ml-5 text-right text-sm leading-6">
                                    <div className="text-sm font-light">
                                        Order ID
                                    </div>
                                    <div className="text-md font-bold">
                                        AB123456
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-fit w-full max-w-xl border border-[#BFC9D9] bg-white px-8 py-3">
                            <div className="flex justify-between">
                                <div className="text-sm leading-6">
                                    <div className="text-sm font-light">
                                        Split Link
                                    </div>
                                    <div className="text-md text-[#007185]">
                                        https://g.co/gemini/share/44ff9809b4ed
                                    </div>
                                </div>
                                <div className="ml-5 flex items-center text-right text-sm leading-6 text-[#007185]">
                                    <div className="text-md font-bold">
                                        Salin
                                    </div>
                                    <ClipboardDocumentIcon className="ml-2 h-5 w-5" />
                                </div>
                            </div>
                        </div>
                        <div className="h-fit w-full max-w-xl border border-[#BFC9D9] bg-white px-8 py-3">
                            <div className="flex justify-between">
                                <div className="text-sm leading-6">
                                    <div className="font-semiblightold text-sm">
                                        Nomor Transaksi
                                    </div>
                                    <div className="text-md font-bold">
                                        AB123456GGWP
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-fit w-full max-w-xl rounded-b-xl border border-[#BFC9D9] bg-white px-8 py-3">
                            <div className="flex justify-between">
                                <div className="text-sm leading-6">
                                    <div className="font-semiblightold text-sm">
                                        Total Tagihan
                                    </div>
                                    <div className="text-lg font-bold">
                                        Rp429.260
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 h-fit w-full max-w-xl py-2">
                            <div className="flex cursor-pointer items-center justify-center rounded-lg bg-secondary py-3 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                Cek Order & Status
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        </Suspense>
    )
}

export default PaymentSuccess
