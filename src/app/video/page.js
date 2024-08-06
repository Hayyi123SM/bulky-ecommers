"use client"

// import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import VideoThumbnail from "@/components/VideoThumbnail"
import {
    BookmarkIcon,
    ChevronDownIcon,
    HeartIcon,
} from "@heroicons/react/24/outline"
import { ChevronRightIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useState } from "react"

function Video() {
    const [showFilterGroup, setShowFilterGroup] = useState(true)

    const toggleShowGroup = () => {
        setShowFilterGroup(!showFilterGroup)
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#0F0F0F] text-white">
            <Navbar />
            <div className="mx-auto flex max-w-7xl flex-1">
                {/* <div className="w-1/5"> */}
                <div className="fixed w-64 pt-6">
                    <div className="mb-2">
                        <div
                            className="flex cursor-pointer items-center justify-between rounded-t-lg bg-[#3C3C3C] px-4 py-2 hover:rounded-t-lg hover:bg-[#5a5a5a]"
                            onClick={toggleShowGroup}>
                            <div className="text-sm font-bold">Top Expert</div>
                            {showFilterGroup ? (
                                <ChevronRightIcon className="h-5 w-5" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5" />
                            )}
                        </div>
                        <div
                            className={`transition-all duration-500 ease-in-out ${showFilterGroup ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden rounded-b-lg bg-[#3C3C3C] pb-4`}>
                            <div className="flex cursor-pointer px-4 py-2 hover:rounded-lg hover:bg-[#5a5a5a]">
                                <div className="flex items-center">
                                    <Image
                                        src="/Rectangle 1-1.png"
                                        alt="Product"
                                        width={28}
                                        height={28}
                                        className="rounded-full"
                                    />
                                </div>
                                <div className="ml-2 text-sm leading-6">
                                    <label className="text-xs">
                                        Brooklyn Simmons
                                    </label>
                                </div>
                            </div>
                            <div className="flex cursor-pointer px-4 py-2 hover:rounded-lg hover:bg-[#5a5a5a]">
                                <div className="flex items-center">
                                    <Image
                                        src="/Rectangle 1-2.png"
                                        alt="Product"
                                        width={28}
                                        height={28}
                                        className="rounded-full"
                                    />
                                </div>
                                <div className="ml-2 text-sm leading-6">
                                    <label className="text-xs">
                                        Brooklyn Simmons
                                    </label>
                                </div>
                            </div>
                            <div className="flex cursor-pointer px-4 py-2 hover:rounded-lg hover:bg-[#5a5a5a]">
                                <div className="flex items-center">
                                    <Image
                                        src="/Rectangle 1-3.png"
                                        alt="Product"
                                        width={28}
                                        height={28}
                                        className="rounded-full"
                                    />
                                </div>
                                <div className="ml-2 text-sm leading-6">
                                    <label className="text-xs">
                                        Dianne Russell
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-2">
                        <div
                            className="flex cursor-pointer items-center justify-between rounded-t-lg bg-[#3C3C3C] px-4 py-2 hover:rounded-t-lg hover:bg-[#5a5a5a]"
                            onClick={toggleShowGroup}>
                            <div className="text-sm font-bold">Kategori</div>
                            {showFilterGroup ? (
                                <ChevronRightIcon className="h-5 w-5" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5" />
                            )}
                        </div>
                        <div
                            className={`transition-all duration-500 ease-in-out ${showFilterGroup ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden rounded-b-lg bg-[#3C3C3C] pb-4`}>
                            <div className="flex cursor-pointer px-4 py-2 hover:rounded-lg hover:bg-[#5a5a5a]">
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        className="border-3 h-5 w-5 rounded border-2 border-white bg-[#3C3C3C] checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 text-sm leading-6">
                                    <label className="text-xs">
                                        Pebisnis Umum
                                    </label>
                                </div>
                            </div>
                            <div className="flex cursor-pointer px-4 py-2 hover:rounded-lg hover:bg-[#5a5a5a]">
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        className="border-3 h-5 w-5 rounded border-2 border-white bg-[#3C3C3C] checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 text-sm leading-6">
                                    <label className="text-xs">
                                        Keuangan Bisnis
                                    </label>
                                </div>
                            </div>
                            <div className="flex cursor-pointer px-4 py-2 hover:rounded-lg hover:bg-[#5a5a5a]">
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        className="border-3 h-5 w-5 rounded border-2 border-white bg-[#3C3C3C] checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 text-sm leading-6">
                                    <label className="text-xs">Jual Beli</label>
                                </div>
                            </div>
                            <div className="flex cursor-pointer px-4 py-2 hover:rounded-lg hover:bg-[#5a5a5a]">
                                <div className="text-xs opacity-80">
                                    Lihat Selengkapnya
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-2">
                        <div
                            className="flex cursor-pointer items-center justify-between rounded-t-lg bg-[#3C3C3C] px-4 py-2 hover:rounded-t-lg hover:bg-[#5a5a5a]"
                            onClick={toggleShowGroup}>
                            <div className="text-sm font-bold">Anda</div>
                            {showFilterGroup ? (
                                <ChevronRightIcon className="h-5 w-5" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5" />
                            )}
                        </div>
                        <div
                            className={`transition-all duration-500 ease-in-out ${showFilterGroup ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden rounded-b-lg bg-[#3C3C3C] pb-4`}>
                            <div className="flex cursor-pointer px-4 py-2 hover:rounded-lg hover:bg-[#5a5a5a]">
                                <BookmarkIcon className="h-6 w-5" />
                                <div className="ml-2 text-sm leading-6">
                                    <label className="text-xs">
                                        Tonton Nanti
                                    </label>
                                </div>
                            </div>
                            <div className="flex cursor-pointer px-4 py-2 hover:rounded-lg hover:bg-[#5a5a5a]">
                                <HeartIcon className="h-6 w-5" />
                                <div className="ml-2 text-sm leading-6">
                                    <label className="text-xs">
                                        Video Yang Disukai
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="flex w-4/5 flex-col px-5"> */}
                <div className="ml-64 flex w-4/5 flex-col">
                    {/* Search bar */}
                    <div className="top-30 fixed z-10 w-[1200px] bg-[#0F0F0F] pb-4 pt-6">
                        <div className="flex w-full items-center justify-center">
                            <div className="w-3/5">
                                <input
                                    className="mr-14 w-full border-b border-[#3C3C3C] bg-[#0F0F0F] py-2 pl-14 text-white bg-search focus:border-secondary focus:ring-0"
                                    placeholder="Cari Video"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="pl-4 pt-20">
                        {/* video list */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="pb-4">
                                <div className="flex items-center justify-between pb-6">
                                    <div className="pl-7 text-xl font-bold">
                                        Elektronik
                                    </div>
                                    <div className="text-sm opacity-80">
                                        Lihat Semua
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <VideoThumbnail
                                        thumbnail="/Rectangle 1.png"
                                        title="CARA PIKIR KONGLOMERAT YANG KAYA.. MINDSET APA AJA.."
                                        user="/Rectangle 1-1.png"
                                        bgColor="bg-[#0F0F0F]"
                                        bgHover="bg-[#5a5a5a]"
                                    />
                                    <VideoThumbnail
                                        thumbnail="/Rectangle 1.png"
                                        title="CARA PIKIR KONGLOMERAT YANG KAYA.. MINDSET APA AJA.."
                                        user="/Rectangle 1-1.png"
                                        bgColor="bg-[#0F0F0F]"
                                        bgHover="bg-[#5a5a5a]"
                                    />
                                    <VideoThumbnail
                                        thumbnail="/Rectangle 1.png"
                                        title="CARA PIKIR KONGLOMERAT YANG KAYA.. MINDSET APA AJA.."
                                        user="/Rectangle 1-1.png"
                                        bgColor="bg-[#0F0F0F]"
                                        bgHover="bg-[#5a5a5a]"
                                    />
                                    <VideoThumbnail
                                        thumbnail="/Rectangle 1.png"
                                        title="CARA PIKIR KONGLOMERAT YANG KAYA.. MINDSET APA AJA.."
                                        user="/Rectangle 1-1.png"
                                        bgColor="bg-[#0F0F0F]"
                                        bgHover="bg-[#5a5a5a]"
                                    />
                                </div>
                            </div>
                            <div className="pb-4">
                                <div className="flex items-center justify-between pb-6">
                                    <div className="pl-7 text-xl font-bold">
                                        Elektronik
                                    </div>
                                    <div className="text-sm opacity-80">
                                        Lihat Semua
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <VideoThumbnail
                                        thumbnail="/Rectangle 1.png"
                                        title="CARA PIKIR KONGLOMERAT YANG KAYA.. MINDSET APA AJA.."
                                        user="/Rectangle 1-1.png"
                                        bgColor="bg-[#0F0F0F]"
                                        bgHover="bg-[#5a5a5a]"
                                    />
                                    <VideoThumbnail
                                        thumbnail="/Rectangle 1.png"
                                        title="CARA PIKIR KONGLOMERAT YANG KAYA.. MINDSET APA AJA.."
                                        user="/Rectangle 1-1.png"
                                        bgColor="bg-[#0F0F0F]"
                                        bgHover="bg-[#5a5a5a]"
                                    />
                                    <VideoThumbnail
                                        thumbnail="/Rectangle 1.png"
                                        title="CARA PIKIR KONGLOMERAT YANG KAYA.. MINDSET APA AJA.."
                                        user="/Rectangle 1-1.png"
                                        bgColor="bg-[#0F0F0F]"
                                        bgHover="bg-[#5a5a5a]"
                                    />
                                    <VideoThumbnail
                                        thumbnail="/Rectangle 1.png"
                                        title="CARA PIKIR KONGLOMERAT YANG KAYA.. MINDSET APA AJA.."
                                        user="/Rectangle 1-1.png"
                                        bgColor="bg-[#0F0F0F]"
                                        bgHover="bg-[#5a5a5a]"
                                    />
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

export default Video
