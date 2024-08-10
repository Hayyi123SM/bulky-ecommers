"use client"

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import PopupMenuMobile from "@/components/PopupMenuMobile"
import ProductCard from "@/components/ProductCard"
import {
    AdjustmentsHorizontalIcon,
    ArchiveBoxIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from "@heroicons/react/24/outline"
import { ArrowLeftIcon, Bars3BottomRightIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useEffect, useState } from "react"

function Product() {
    const [showPopup, setShowPopup] = useState(false)
    const [showPopupMenu, setShowPopupMenu] = useState(false)

    const [showFilterGroup, setShowFilterGroup] = useState(true)

    const toggleShowGroup = () => {
        setShowFilterGroup(!showFilterGroup)
    }
    const togglePopup = () => {
        setShowPopup(!showPopup)
    }

    const togglePopupMenu = () => {
        setShowPopupMenu(!showPopupMenu)
    }

    useEffect(() => {
        if (showPopup) {
            document.body.classList.add("modal-open")
        } else {
            document.body.classList.remove("modal-open")
        }
        if (showPopupMenu) {
            document.body.classList.add("modal-open")
        } else {
            document.body.classList.remove("modal-open")
        }
    }, [showPopup, showPopupMenu])

    return (
        <div>
            <div className="hidden lg:block">
                <Navbar />
            </div>
            <div className="flex items-center justify-between border-b border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon className="h-6 w-6" />
                <div className="w-2/3">
                    <input
                        className="w-full rounded-3xl border py-2 pl-14 text-black bg-search focus:border-secondary focus:ring-0"
                        placeholder="Cari barang"
                    />
                </div>
                <ArchiveBoxIcon className="h-6 w-6" />
                <Bars3BottomRightIcon
                    className="h-6 w-6"
                    onClick={togglePopupMenu}
                />
            </div>
            <div className="flex items-center p-4 lg:hidden">
                <div className="flex items-center overflow-x-auto">
                    <div className="mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                        Elektronik
                    </div>
                    <div className="mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                        Fashion
                    </div>
                    <div className="mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                        Rumah Tangga
                    </div>
                    <div className="mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                        Olahraga
                    </div>
                    <div className="mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                        Kecantikan
                    </div>
                </div>
                <div
                    className="ml-4 mr-1 flex-shrink-0 rounded-full border border-[#BFC9D9] px-2 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]"
                    onClick={togglePopup}>
                    <AdjustmentsHorizontalIcon className="h-5 w-5 text-[#2E3137]" />
                </div>
            </div>
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 pt-5 shadow-lg">
                        <div className="my-4 flex items-center justify-between">
                            <h2 className="text-base font-semibold">Filter</h2>
                            <button
                                onClick={togglePopup}
                                className="text-gray-600 hover:text-gray-900">
                                &times;
                            </button>
                        </div>
                        <div className="mb-4">
                            <div className="mt-2 flex justify-between py-5">
                                <div className="text-sm font-bold">
                                    Kategori
                                </div>
                                <div className="text-sm font-semibold text-[#007185]">
                                    Lihat Semua
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center">
                                <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                    Elektronik
                                </div>
                                <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                    Fashion
                                </div>
                                <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                    Rumah Tangga
                                </div>
                                <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                    Olahraga
                                </div>
                                <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                    Kecantikan
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="mt-2 flex justify-between py-5">
                                <div className="text-sm font-bold">Lokasi</div>
                                <div className="text-sm font-semibold text-[#007185]">
                                    Lihat Semua
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center">
                                <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                    DKI Jakarta
                                </div>
                                <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                    Jabodetabek
                                </div>
                                <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                    Bandung
                                </div>
                                <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                    Medan
                                </div>
                                <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                    Surabaya
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="mt-2 flex justify-between py-5">
                                <div className="text-sm font-bold">Kondisi</div>
                                <div className="text-sm font-semibold text-[#007185]">
                                    Lihat Semua
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center">
                                <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                    Baru
                                </div>
                                <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                    Bekas 90-95%
                                </div>
                                <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                    Bekas 80-90%
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="mt-2 flex justify-between py-5">
                                <div className="text-sm font-bold">Brand</div>
                                <div className="text-sm font-semibold text-[#007185]">
                                    Lihat Semua
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center">
                                <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                    Brand Name
                                </div>
                                <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                    Brand Name
                                </div>
                            </div>
                        </div>

                        <div className="my-2 cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-3 text-center text-sm font-bold hover:bg-[#e8bc00]">
                            Gunakan Filter
                        </div>
                    </div>
                </div>
            )}
            {showPopupMenu && <PopupMenuMobile showPopupMenu={showPopupMenu} />}
            <div className="mx-auto flex min-h-screen max-w-7xl">
                <div className="hidden w-1/5 lg:block">
                    <div className="mb-2 p-4 font-bold">Filter</div>
                    <div className="pb-4">
                        <div
                            className="mx-2 flex cursor-pointer items-center justify-between p-2 hover:rounded-lg hover:bg-gray-100"
                            onClick={toggleShowGroup}>
                            <div className="font-bold">Group</div>
                            {showFilterGroup ? (
                                <ChevronUpIcon className="h-5 w-5" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5" />
                            )}
                        </div>
                        {/* {showFilterGroup && ( */}
                        <div
                            className={`transition-all duration-500 ease-in-out ${showFilterGroup ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                            <div className="flex px-4 py-1">
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 text-sm leading-6">
                                    <label className="font-xs">
                                        Individual
                                    </label>
                                </div>
                            </div>
                            <div className="flex px-4 py-1">
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 text-sm leading-6">
                                    <label className="font-xs">
                                        Part Group
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* )} */}
                    </div>
                    <div className="pb-4">
                        <div
                            className="mx-2 flex cursor-pointer items-center justify-between p-2 hover:rounded-lg hover:bg-gray-100"
                            onClick={toggleShowGroup}>
                            <div className="font-bold">Kondisi</div>
                            {showFilterGroup ? (
                                <ChevronUpIcon className="h-5 w-5" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5" />
                            )}
                        </div>
                        {/* {showFilterGroup && ( */}
                        <div
                            className={`transition-all duration-500 ease-in-out ${showFilterGroup ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                            <div className="flex px-4 py-1">
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 text-sm leading-6">
                                    <label className="font-xs">Baru</label>
                                </div>
                            </div>
                            <div className="flex px-4 py-1">
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 text-sm leading-6">
                                    <label className="font-xs">Bekas</label>
                                </div>
                            </div>
                        </div>
                        {/* )} */}
                    </div>
                    <div className="pb-4">
                        <div
                            className="mx-2 flex cursor-pointer items-center justify-between p-2 hover:rounded-lg hover:bg-gray-100"
                            onClick={toggleShowGroup}>
                            <div className="font-bold">Rating</div>
                            {showFilterGroup ? (
                                <ChevronUpIcon className="h-5 w-5" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5" />
                            )}
                        </div>
                        {/* {showFilterGroup && ( */}
                        <div
                            className={`transition-all duration-500 ease-in-out ${showFilterGroup ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                            <div className="flex px-4 py-1">
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 flex items-center text-sm leading-6">
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className="flex px-4 py-1">
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 flex items-center text-sm leading-6">
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className="flex px-4 py-1">
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 flex items-center text-sm leading-6">
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className="flex px-4 py-1">
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 flex items-center text-sm leading-6">
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className="flex px-4 py-1">
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 flex items-center text-sm leading-6">
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* )} */}
                    </div>
                </div>
                <div className="w-full p-4 lg:w-4/5">
                    <div className="pb-5 text-sm text-[#212121]">
                        Menampilkan 1 - 60 barang dari 100 barang
                    </div>
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
                        <ProductCard
                            image="/product.png"
                            location={"Jakarta"}
                            title="McGard Lug Nuts 64074"
                            price="Rp437.031"
                        />
                        <ProductCard
                            image="/product.png"
                            location={"Jakarta"}
                            title="McGard Lug Nuts 64074"
                            price="Rp437.031"
                            sale="true"
                        />
                        <ProductCard
                            image="/product.png"
                            location={"Jakarta"}
                            title="McGard Lug Nuts 64074"
                            price="Rp437.031"
                        />
                        <ProductCard
                            image="/product.png"
                            location={"Jakarta"}
                            title="McGard Lug Nuts 64074"
                            price="Rp437.031"
                            sale="true"
                        />
                        <ProductCard
                            image="/product.png"
                            location={"Jakarta"}
                            title="McGard Lug Nuts 64074"
                            price="Rp437.031"
                        />
                        <ProductCard
                            image="/product.png"
                            location={"Jakarta"}
                            title="McGard Lug Nuts 64074"
                            price="Rp437.031"
                            sale="true"
                        />
                        <ProductCard
                            image="/product.png"
                            location={"Jakarta"}
                            title="McGard Lug Nuts 64074"
                            price="Rp437.031"
                        />
                        <ProductCard
                            image="/product.png"
                            location={"Jakarta"}
                            title="McGard Lug Nuts 64074"
                            price="Rp437.031"
                            sale="true"
                        />
                        <ProductCard
                            image="/product.png"
                            location={"Jakarta"}
                            title="McGard Lug Nuts 64074"
                            price="Rp437.031"
                        />
                    </div>
                </div>
            </div>
            <div className="hidden lg:block">
                <Footer />
            </div>
        </div>
    )
}

export default Product
