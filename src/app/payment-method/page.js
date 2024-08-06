"use client"

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { ShieldCheckIcon } from "@heroicons/react/24/outline"
import {
    CheckIcon,
    ChevronDownIcon,
    MinusCircleIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/solid"
import Image from "next/image"
import { useState } from "react"

function PaymentMethod() {
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

        if (option === "Split Payment") {
            setIsSplitPayment(true)
        } else {
            setIsSplitPayment(false)
        }
    }

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-[#F5F5F5] pb-10">
                <div className="mx-auto max-w-7xl">
                    <div className="flex justify-center py-5">
                        <div className="w-full max-w-xl text-2xl font-extrabold">
                            Pembayaran
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center py-2">
                        <div className="h-fit w-full max-w-xl rounded-xl bg-white p-8">
                            <div className="py-2">
                                <div className="py-2 text-sm font-bold text-[#6D7588]">
                                    PILIH CARA BAYAR
                                </div>
                                <div className="relative w-full max-w-xl">
                                    <div
                                        className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 p-2 font-bold focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                        onClick={() => setIsOpen(!isOpen)}>
                                        <div className="flex items-center">
                                            {selectedOption !==
                                                "Pilihan Cara Bayar" && (
                                                <Image
                                                    src={selectedIcon}
                                                    width={24}
                                                    height={24}
                                                    alt="Gopay"
                                                    className="mr-2"
                                                />
                                            )}
                                            {selectedOption}
                                        </div>
                                        <ChevronDownIcon className="inline-block h-5 w-5" />
                                    </div>
                                    <div
                                        className={`mt-1 w-full rounded-lg border border-[#F0F3F7] bg-white p-2 shadow-lg transition-all duration-300 ease-in-out ${
                                            isOpen
                                                ? "max-h-screen opacity-100"
                                                : "max-h-0 overflow-hidden opacity-0"
                                        }`}>
                                        <div
                                            className="flex cursor-pointer items-center border-b border-[#F0F3F7] p-2 text-sm hover:rounded-lg hover:bg-[#F5F5F5]"
                                            onClick={() =>
                                                handleOptionClick(
                                                    "/single.svg",
                                                    "Single Payment",
                                                )
                                            }>
                                            <Image
                                                src="/single.svg"
                                                width={24}
                                                height={24}
                                                alt="single"
                                                className="mr-2"
                                            />
                                            Single Payment
                                        </div>
                                        <div
                                            className="flex cursor-pointer items-center border-b border-[#F0F3F7] p-2 text-sm hover:rounded-lg hover:bg-[#F5F5F5]"
                                            onClick={() =>
                                                handleOptionClick(
                                                    "/split.svg",
                                                    "Split Payment",
                                                )
                                            }>
                                            <Image
                                                src="/split.svg"
                                                width={24}
                                                height={24}
                                                alt="split"
                                                className="mr-2"
                                            />
                                            Split Payment
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`h-fit w-full max-w-xl transition-all duration-500 ease-in-out ${isSplitPayment ? "mt-5 max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                            <div className="h-fit w-full max-w-xl rounded-t-xl bg-white p-8">
                                <div className="py-2">
                                    <div className="py-2 text-sm font-bold text-[#6D7588]">
                                        ADD YOUR FRIEND
                                    </div>
                                    <div className="relative w-full max-w-xl">
                                        <div className="mb-1 flex items-center justify-between">
                                            <div className="flex items-center py-1">
                                                <div className="flex items-center">
                                                    <Image
                                                        src="/Rectangle 1-1.png"
                                                        alt="Product"
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full"
                                                    />
                                                </div>
                                                <div className="ml-4 text-sm leading-4">
                                                    <label className="text-sm">
                                                        Brooklyn Simmons
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="p-3">
                                                <MinusCircleIcon className="h-6 w-6 cursor-pointer text-[#FF3838] hover:text-[#c84b4b]" />
                                            </div>
                                        </div>
                                        <div className="mb-1 flex items-center justify-between">
                                            <div className="flex items-center py-1">
                                                <div className="flex items-center">
                                                    <Image
                                                        src="/Rectangle 1-3.png"
                                                        alt="Product"
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full"
                                                    />
                                                </div>
                                                <div className="ml-4 text-sm leading-4">
                                                    <label className="text-sm">
                                                        Brooklyn Simmons
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="p-3">
                                                <MinusCircleIcon className="h-6 w-6 cursor-pointer text-[#FF3838] hover:text-[#c84b4b]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-0.5 flex h-fit w-full max-w-xl items-center justify-center rounded-b-xl bg-white px-4 py-2">
                                <div
                                    className="flex w-fit cursor-pointer items-center justify-center p-2 hover:rounded-lg hover:bg-[#F5F5F5]"
                                    onClick={() =>
                                        setIsOpenAddFriend(!isOpenAddFriend)
                                    }>
                                    <PlusCircleIcon className="h-5 w-5 cursor-pointer text-[#007185] hover:text-[#00D5FB]" />
                                    <div className="ml-1 text-sm font-semibold text-[#007185]">
                                        Invite your friends
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`h-fit w-full max-w-xl rounded-xl bg-white transition-all duration-500 ease-in-out ${isOpenAddFriend ? "mt-5 max-h-screen p-8 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                            <div className="py-2">
                                <div className="relative w-full max-w-xl">
                                    <div
                                        className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 p-2 font-bold focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                        onClick={() =>
                                            setIsOpenListFriend(
                                                !isOpenListFriend,
                                            )
                                        }>
                                        <div className="flex items-center">
                                            Pilih Teman
                                        </div>
                                        <ChevronDownIcon className="inline-block h-5 w-5" />
                                    </div>
                                    <div
                                        className={`mt-1 w-full rounded-lg border border-[#F0F3F7] bg-white p-2 shadow-lg transition-all duration-300 ease-in-out ${
                                            isOpenListFriend
                                                ? "max-h-screen opacity-100"
                                                : "max-h-0 overflow-hidden opacity-0"
                                        }`}>
                                        <div className="flex cursor-pointer items-center border-b border-[#F0F3F7] p-2 text-sm hover:rounded-lg hover:bg-[#F5F5F5]">
                                            <input
                                                className="w-full rounded-lg border py-2 pl-14 text-black bg-search focus:border-secondary focus:ring-0"
                                                placeholder="Cari temanmu disini..."
                                            />
                                        </div>
                                        <div className="max-h-60 overflow-auto">
                                            <div
                                                className="flex cursor-pointer items-center justify-between border-b border-[#F0F3F7] p-2 text-xs hover:rounded-lg hover:bg-[#F5F5F5]"
                                                onClick={() =>
                                                    handleOptionClick(
                                                        "/single.svg",
                                                        "Single Payment",
                                                    )
                                                }>
                                                <div className="flex items-center">
                                                    <Image
                                                        src="/Rectangle 1-2.png"
                                                        width={32}
                                                        height={32}
                                                        alt="single"
                                                        className="mr-4"
                                                    />
                                                    Brooklyn Simmons
                                                </div>
                                            </div>

                                            <div
                                                className="flex cursor-pointer items-center justify-between border-b border-[#F0F3F7] p-2 text-xs hover:rounded-lg hover:bg-[#F5F5F5]"
                                                onClick={() =>
                                                    handleOptionClick(
                                                        "/single.svg",
                                                        "Single Payment",
                                                    )
                                                }>
                                                <div className="flex items-center">
                                                    <Image
                                                        src="/Rectangle 1-2.png"
                                                        width={32}
                                                        height={32}
                                                        alt="single"
                                                        className="mr-4"
                                                    />
                                                    Brooklyn Simmons
                                                </div>
                                            </div>
                                            <div
                                                className="flex cursor-pointer items-center justify-between border-b border-[#F0F3F7] p-2 text-xs hover:rounded-lg hover:bg-[#F5F5F5]"
                                                onClick={() =>
                                                    handleOptionClick(
                                                        "/single.svg",
                                                        "Single Payment",
                                                    )
                                                }>
                                                <div className="flex items-center">
                                                    <Image
                                                        src="/Rectangle 1-2.png"
                                                        width={32}
                                                        height={32}
                                                        alt="single"
                                                        className="mr-4"
                                                    />
                                                    Brooklyn Simmons
                                                </div>
                                                <CheckIcon className="ml-auto h-5 w-5 text-[#007185]" />
                                            </div>
                                            <div
                                                className="flex cursor-pointer items-center justify-between border-b border-[#F0F3F7] p-2 text-xs hover:rounded-lg hover:bg-[#F5F5F5]"
                                                onClick={() =>
                                                    handleOptionClick(
                                                        "/single.svg",
                                                        "Single Payment",
                                                    )
                                                }>
                                                <div className="flex items-center">
                                                    <Image
                                                        src="/Rectangle 1-2.png"
                                                        width={32}
                                                        height={32}
                                                        alt="single"
                                                        className="mr-4"
                                                    />
                                                    Brooklyn Simmons
                                                </div>
                                                <CheckIcon className="ml-auto h-5 w-5 text-[#007185]" />
                                            </div>
                                            <div
                                                className="flex cursor-pointer items-center justify-between border-b border-[#F0F3F7] p-2 text-xs hover:rounded-lg hover:bg-[#F5F5F5]"
                                                onClick={() =>
                                                    handleOptionClick(
                                                        "/single.svg",
                                                        "Single Payment",
                                                    )
                                                }>
                                                <div className="flex items-center">
                                                    <Image
                                                        src="/Rectangle 1-2.png"
                                                        width={32}
                                                        height={32}
                                                        alt="single"
                                                        className="mr-4"
                                                    />
                                                    Brooklyn Simmons
                                                </div>
                                                <CheckIcon className="ml-auto h-5 w-5 text-[#007185]" />
                                            </div>
                                            <div
                                                className="flex cursor-pointer items-center justify-between border-b border-[#F0F3F7] p-2 text-xs hover:rounded-lg hover:bg-[#F5F5F5]"
                                                onClick={() =>
                                                    handleOptionClick(
                                                        "/single.svg",
                                                        "Single Payment",
                                                    )
                                                }>
                                                <div className="flex items-center">
                                                    <Image
                                                        src="/Rectangle 1-2.png"
                                                        width={32}
                                                        height={32}
                                                        alt="single"
                                                        className="mr-4"
                                                    />
                                                    Brooklyn Simmons
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 h-fit w-full max-w-xl rounded-t-xl bg-white p-8">
                            <div className="py-2">
                                <div className="py-2 text-base font-bold">
                                    Ringkasan Pembayaran
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-sm leading-6">
                                    <label className="text-sm font-light">
                                        Total Harga (2 Barang)
                                    </label>
                                </div>
                                <div className="ml-5 text-right text-sm leading-6">
                                    <label className="text-md font-light">
                                        Rp428.260
                                    </label>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-sm leading-6">
                                    <label className="text-sm font-light">
                                        Biaya Layanan
                                    </label>
                                </div>
                                <div className="ml-5 text-right text-sm leading-6">
                                    <label className="text-md font-light text-[#007185]">
                                        Rp1.000
                                    </label>
                                </div>
                            </div>
                            <div className="my-5 border-b p-1"> </div>
                            <div className="flex justify-between">
                                <div className="text-sm leading-6">
                                    <label className="text-sm font-semibold">
                                        Total
                                    </label>
                                </div>
                                <div className="ml-5 text-right text-sm leading-6">
                                    <label className="text-lg font-bold">
                                        Rp429.260
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="mt-0.5 h-fit w-full max-w-xl rounded-b-xl bg-white p-8">
                            <div className="flex cursor-pointer items-center justify-center rounded-lg bg-secondary py-3 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                <ShieldCheckIcon className="mr-2 h-5 w-5 text-black" />
                                Bayar
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PaymentMethod
