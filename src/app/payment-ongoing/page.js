"use client"

import Navbar from "@/components/Navbar"
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { Suspense, useState } from "react"

function PaymentOnGoing() {
    const [showFilterGroup, setShowFilterGroup] = useState(true)

    const toggleShowGroup = () => {
        setShowFilterGroup(!showFilterGroup)
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <div className="hidden lg:block">
                    <Navbar />
                </div>
                <div className="mx-auto min-h-screen max-w-7xl bg-white pb-10">
                    <div className="flex justify-center py-5">
                        <div className="mt-5 text-center lg:mt-20">
                            <div className="pb-1 text-lg font-bold">
                                Selesaikan pembayaran dalam
                            </div>
                            <div className="pb-2 text-lg font-bold text-[#007185]">
                                23:48:10
                            </div>
                            <div className="flex justify-center">
                                <div className="mb-2 cursor-pointer justify-center rounded-lg border border-[#BFC9D9] bg-white px-5 py-3 text-center text-sm font-bold hover:border-[#f5f5f5] hover:bg-[#f5f5f5]">
                                    Perpanjang Waktu
                                </div>
                            </div>
                            <div className="py-1 text-sm font-bold text-[#6D7588]">
                                Batas akhir pembayaran
                            </div>
                            <div className="text-base font-bold">
                                Selasa, 25 Juni 2024 01:34
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center px-4 py-2">
                        <div className="h-fit w-full max-w-xl rounded-t-2xl border border-[#BFC9D9] bg-white px-8 py-3">
                            <div className="flex items-center justify-between">
                                <div className="text-sm leading-6">
                                    <div className="text-base font-bold">
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
                                        Nomor Virtual Account
                                    </div>
                                    <div className="text-md font-bold">
                                        80001234567890001
                                    </div>
                                </div>
                                <div className="ml-5 flex items-center text-right text-sm">
                                    <div className="mr-1 text-sm font-bold text-[#007185]">
                                        Salin
                                    </div>
                                    <ClipboardDocumentIcon className="h-5 w-5 font-bold text-[#007185]" />
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
                                <div className="ml-5 flex items-center text-right text-sm">
                                    <div className="mr-1 text-sm font-bold text-[#007185]">
                                        Salin
                                    </div>
                                    <ClipboardDocumentIcon className="h-5 w-5 font-bold text-[#007185]" />
                                </div>
                            </div>
                        </div>
                        <div className="h-fit w-full max-w-xl rounded-b-2xl border border-[#BFC9D9] bg-white px-8 py-3">
                            <div className="flex justify-between">
                                <div className="text-sm leading-6">
                                    <div className="font-semiblightold text-sm">
                                        Total Tagihan
                                    </div>
                                    <div className="flex items-center">
                                        <div className="mr-2 text-lg font-bold">
                                            Rp429.260
                                        </div>
                                        <ClipboardDocumentIcon className="h-5 w-5 font-bold text-[#007185]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 h-fit w-full max-w-xl py-2">
                            <div className="flex items-center justify-between">
                                <div className="mr-8 w-1/2 cursor-pointer justify-center rounded-lg border border-[#BFC9D9] bg-white py-3 text-center text-sm font-bold hover:border-[#f5f5f5] hover:bg-[#f5f5f5]">
                                    Cek Order & Status
                                </div>
                                <div className="ml-8 w-1/2 cursor-pointer justify-center rounded-lg bg-secondary py-3 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                    Belanja Lagi
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center px-4 py-5">
                        <div className="w-full max-w-xl">
                            <div className="text-sm font-bold">
                                Cara Pembayaran
                            </div>
                            <div className="pb-4">
                                <div
                                    className="mx-2 flex cursor-pointer items-center justify-between p-2 hover:rounded-lg hover:bg-gray-100"
                                    onClick={toggleShowGroup}>
                                    <div className="text-xs font-bold">
                                        Aplikasi BCA Mobile
                                    </div>
                                    {showFilterGroup ? (
                                        <ChevronUpIcon className="h-5 w-5" />
                                    ) : (
                                        <ChevronDownIcon className="h-5 w-5" />
                                    )}
                                </div>
                                <div
                                    className={`transition-all duration-500 ease-in-out ${showFilterGroup ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                                    <div className="flex px-4 py-1">
                                        <ul className="list-decimal pl-5 text-xs text-[#6D7588]">
                                            <li className="py-1">
                                                Login ke BCA mobile
                                            </li>
                                            <li className="py-1">
                                                Pilih m-Transfer dan pilih BCA
                                                Virtual Account
                                            </li>
                                            <li className="py-1">
                                                Masukkan nomor BCA Virtual
                                                Account dari e-commerce dan klik
                                                Send
                                            </li>
                                            <li className="py-1">
                                                Masukkan nominal
                                            </li>
                                            <li className="py-1">
                                                Cek detail transaksi, klik OK
                                            </li>
                                            <li className="py-1">
                                                Masukkan PIN dan transaksi
                                                berhasil
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="pb-4">
                                <div
                                    className="mx-2 flex cursor-pointer items-center justify-between p-2 hover:rounded-lg hover:bg-gray-100"
                                    onClick={toggleShowGroup}>
                                    <div className="text-xs font-bold">
                                        Internet Banking
                                    </div>
                                    {showFilterGroup ? (
                                        <ChevronUpIcon className="h-5 w-5" />
                                    ) : (
                                        <ChevronDownIcon className="h-5 w-5" />
                                    )}
                                </div>
                                <div
                                    className={`transition-all duration-500 ease-in-out ${showFilterGroup ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                                    <div className="flex px-4 py-1">
                                        <ul className="list-decimal pl-5 text-xs text-[#6D7588]">
                                            <li className="py-1">
                                                Login ke BCA mobile
                                            </li>
                                            <li className="py-1">
                                                Pilih m-Transfer dan pilih BCA
                                                Virtual Account
                                            </li>
                                            <li className="py-1">
                                                Masukkan nomor BCA Virtual
                                                Account dari e-commerce dan klik
                                                Send
                                            </li>
                                            <li className="py-1">
                                                Masukkan nominal
                                            </li>
                                            <li className="py-1">
                                                Cek detail transaksi, klik OK
                                            </li>
                                            <li className="py-1">
                                                Masukkan PIN dan transaksi
                                                berhasil
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        </Suspense>
    )
}

export default PaymentOnGoing
