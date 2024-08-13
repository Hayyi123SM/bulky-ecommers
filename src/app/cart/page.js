"use client"

import Navbar from "@/components/Navbar"
import PopupMenuMobile from "@/components/PopupMenuMobile"
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

function Cart() {
    const [showPopupMenu, setShowPopupMenu] = useState(false)

    const togglePopupMenu = () => {
        setShowPopupMenu(!showPopupMenu)
    }

    const closePopupMenu = () => {
        setShowPopupMenu(false)
    }

    useEffect(() => {
        if (showPopupMenu) {
            document.body.classList.add("modal-open")
        } else {
            document.body.classList.remove("modal-open")
        }
    }, [showPopupMenu])

    return (
        <div>
            <div className="hidden lg:block">
                <Navbar />
            </div>
            <div className="flex items-center justify-between border-[#F0F3F7] px-4 py-3 lg:hidden">
                <div className="flex items-center">
                    <Link href="/product">
                        <ArrowLeftIcon className="h-6 w-6" />
                    </Link>
                    <div className="ml-2 font-semibold">Keranjang</div>
                </div>
                <Bars3BottomRightIcon
                    className="h-6 w-6"
                    onClick={togglePopupMenu}
                />
            </div>
            {showPopupMenu && (
                <PopupMenuMobile
                    showPopupMenu={showPopupMenu}
                    closePopupMenu={closePopupMenu}
                />
            )}
            <div className="min-h-screen bg-[#F5F5F5] lg:p-10">
                <div className="mx-auto max-w-7xl">
                    <div className="hidden text-2xl font-extrabold lg:block">
                        Keranjang
                    </div>
                    <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-8 lg:py-10">
                        <div className="w-full lg:col-span-2">
                            <div className="mb-2 flex bg-white px-5 py-4 lg:mb-4 lg:rounded-t-lg">
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        className="h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 text-sm leading-6">
                                    <label className="font-bold">
                                        Pilih Semua
                                    </label>
                                </div>
                            </div>
                            <div className="mb-2 flex items-center bg-white px-5 py-4 lg:mb-4">
                                <div className="flex w-1/5 items-center">
                                    <div className="mr-3">
                                        <input
                                            id="comments1"
                                            aria-describedby="comments1-description"
                                            name="comments1"
                                            type="checkbox"
                                            className="h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                        />
                                    </div>
                                    <Image
                                        src="/product.png"
                                        width={100}
                                        height={100}
                                        alt="cart-product"
                                        className="w-2/3"
                                    />
                                </div>
                                <div className="ml-5 w-3/5 text-sm leading-6">
                                    <label className="text-md">
                                        Toyo Proxes R888R Tires 104150
                                    </label>
                                </div>
                                <div className="ml-5 w-1/5 text-right text-sm leading-6">
                                    <label className="text-md font-bold">
                                        Rp8.126.777
                                    </label>
                                </div>
                            </div>
                            <div className="mb-2 flex items-center bg-white px-5 py-4 lg:mb-4">
                                <div className="flex w-1/5 items-center">
                                    <div className="mr-3">
                                        <input
                                            id="comments2"
                                            aria-describedby="comments2-description"
                                            name="comments2"
                                            type="checkbox"
                                            className="h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                        />
                                    </div>
                                    <Image
                                        src="/product.png"
                                        width={100}
                                        height={100}
                                        alt="cart-product"
                                        className="w-2/3"
                                    />
                                </div>
                                <div className="ml-5 w-3/5 text-sm leading-6">
                                    <label className="text-md">
                                        Royal Purple Extended Life Oil Filters
                                        10-2867
                                    </label>
                                </div>
                                <div className="ml-5 w-1/5 text-right text-sm leading-6">
                                    <label className="text-md font-bold">
                                        Rp210.339
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="hidden w-full lg:block">
                            <div className="mb-0.5 rounded-t-lg bg-white px-5 py-4">
                                <div className="text-md font-bold">
                                    Ringkasan Belanja
                                </div>
                                <div className="flex justify-between py-5">
                                    <div className="text-sm leading-6">
                                        <label className="text-sm">Total</label>
                                    </div>
                                    <div className="ml-5 text-right text-sm leading-6">
                                        <label className="text-md font-bold">
                                            Rp8.126.777
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-b-lg bg-white px-5 py-5">
                                <Link href="/payment-method">
                                    <div className="cursor-pointer rounded-lg bg-secondary py-2 text-center text-lg font-bold hover:bg-[#e8bc00]">
                                        Beli
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="fixed bottom-0 left-0 right-0 block w-full bg-white px-5 py-5 shadow-lg lg:hidden">
                            <div className="flex items-center justify-between">
                                <div className="w-1/2 text-sm leading-6">
                                    <label className="text-sm">Total</label>
                                    <div className="text-base font-bold">
                                        Rp197.061
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <Link href="/payment-method">
                                        <div className="cursor-pointer rounded-lg bg-secondary px-10 py-2 text-center text-base font-bold hover:bg-[#e8bc00]">
                                            Beli
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default Cart
