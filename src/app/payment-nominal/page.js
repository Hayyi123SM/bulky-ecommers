"use client"

import Navbar from "@/components/Navbar"
import { ShieldCheckIcon } from "@heroicons/react/24/outline"
import {
    ArrowLeftIcon,
    CheckIcon,
    ChevronDownIcon,
    MinusCircleIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

function PaymentNominal() {
    const [selectedOption, setSelectedOption] = useState("Pilihan Cara Bayar")
    const [selectedIcon, setSelectedIcon] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenAddFriend, setIsOpenAddFriend] = useState(false)
    const [isOpenListFriend, setIsOpenListFriend] = useState(false)
    const [isSplitPayment, setIsSplitPayment] = useState(false)

    const handleOptionClick = (icon, option) => {
        setSelectedOption(option)
        setSelectedIcon(icon)
        setIsOpen(false)

        if (option === "Bayar Patungan dengan Teman") {
            setIsSplitPayment(true)
        } else {
            setIsSplitPayment(false)
        }
    }

    return (
        <div>
            <div className="hidden lg:block">
                <Navbar />
            </div>
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon className="h-6 w-6" />
                <div className="ml-2 font-semibold">Nominal</div>
            </div>
            <div className="min-h-screen bg-[#F5F5F5] pb-10">
                <div className="mx-auto max-w-7xl">
                    <div className="hidden justify-center py-5 lg:flex">
                        <div className="w-full text-2xl font-extrabold lg:max-w-xl">
                            Nominal
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center lg:py-2">
                        <div className="h-fit w-full bg-white p-8 lg:max-w-xl lg:rounded-xl">
                            <div className="py-2">
                                <div className="py-2 text-sm font-bold text-[#6D7588]">
                                    NOMINAL BAYAR
                                </div>
                                <div className="mb-1 text-sm">
                                    Masukkan Nominalmu
                                </div>
                                <div className="relative w-full lg:max-w-xl">
                                    <input
                                        type="number"
                                        className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-[#007185] focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                        placeholder="IDR. 0"
                                    />
                                </div>
                                <div className="mt-1 text-sm text-[#6D7588]">
                                    Sesuaikan nominal yang hendak kamu bayar
                                    secara patungan.
                                </div>
                            </div>
                        </div>
                        <div className="mb-0 mt-5 h-fit w-full rounded-t-xl bg-white p-8 lg:mb-0 lg:max-w-xl">
                            <div className="py-2">
                                <div className="py-2 text-base font-bold">
                                    Ringkasan Pembayaran
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-sm leading-6">
                                    <label className="text-sm font-light">
                                        Total Harga
                                    </label>
                                </div>
                                <div className="ml-5 text-right text-sm leading-6">
                                    <label className="text-md font-light">
                                        Rp428.260
                                    </label>
                                </div>
                            </div>
                            <div className="my-2 border-b p-1"> </div>
                            <div className="flex justify-between">
                                <div className="text-sm leading-6">
                                    <label className="text-sm">
                                        Total Belanja
                                    </label>
                                </div>
                                <div className="ml-5 text-right text-sm leading-6">
                                    <label className="text-lg font-bold">
                                        Rp429.260
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-10 mt-0.5 h-fit w-full bg-white p-8 lg:mb-0 lg:max-w-xl">
                            <div className="py-2">
                                <div className="py-2 text-base font-bold">
                                    Total Bayarmu
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-sm leading-6">
                                    <label className="text-sm font-light">
                                        Total Bayar
                                    </label>
                                </div>
                                <div className="ml-5 text-right text-sm leading-6">
                                    <label className="text-md font-light">
                                        Rp428.260
                                    </label>
                                </div>
                            </div>
                            <div className="my-2 border-b p-1"> </div>
                            <div className="flex justify-between">
                                <div className="text-sm leading-6">
                                    <label className="text-sm">
                                        Sisa Tagihan Belanja
                                    </label>
                                </div>
                                <div className="ml-5 text-right text-sm leading-6">
                                    <label className="text-lg font-bold">
                                        Rp429.260
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="mt-0.5 hidden h-fit w-full rounded-b-xl bg-white p-8 lg:block lg:max-w-xl">
                            <Link href="/payment">
                                <div className="flex cursor-pointer items-center justify-center rounded-lg bg-secondary py-3 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                    <ShieldCheckIcon className="mr-2 h-5 w-5 text-black" />
                                    Bayar
                                </div>
                            </Link>
                        </div>
                        <div className="fixed bottom-0 left-0 right-0 block w-full px-5 py-5 shadow-lg lg:hidden">
                            <Link href="/payment">
                                <div className="flex cursor-pointer items-center justify-center rounded-lg bg-secondary py-3 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                    <ShieldCheckIcon className="mr-2 h-5 w-5 text-black" />
                                    Bayar
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default PaymentNominal
