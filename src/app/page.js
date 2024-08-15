"use client"

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import PopupMenuMobile from "@/components/PopupMenuMobile"
import ProductCard from "@/components/ProductCard"
import TestimoniCard from "@/components/TestimoniCard"
import VideoThumbnail from "@/components/VideoThumbnail"
import {
    ClockIcon,
    CreditCardIcon,
    HandThumbUpIcon,
    TruckIcon,
} from "@heroicons/react/24/solid"
import Image from "next/image"
import { useEffect, useState } from "react"

function Home() {
    const [current, setCurrent] = useState(0)
    const [showPopupMenu, setShowPopupMenu] = useState(false)

    const banners = [
        { src: "/banner.png", alt: "Banner 1" },
        { src: "/banner.png", alt: "Banner 2" },
        { src: "/banner.png", alt: "Banner 3" },
    ]

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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev === banners.length - 1 ? 0 : prev + 1))
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div>
            <Navbar togglePopupMenu={togglePopupMenu} />
            <div className="">
                {showPopupMenu && (
                    <PopupMenuMobile
                        showPopupMenu={showPopupMenu}
                        closePopupMenu={closePopupMenu}
                    />
                )}
                <div className="mx-auto max-w-7xl p-0 lg:p-5">
                    <div className="relative mx-auto h-[120px] w-full overflow-hidden md:h-[224px] lg:h-[324px] lg:rounded-3xl">
                        {banners.map((banner, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-transform duration-1000 ${index === current ? "translate-x-0" : index < current ? "-translate-x-full" : "translate-x-full"}`}>
                                <Image src={banner.src} alt={banner.alt} fill />
                            </div>
                        ))}
                        <div className="absolute bottom-5 left-5 flex space-x-2">
                            {banners.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-2 w-2 cursor-pointer lg:rounded-full ${current === index ? "bg-white" : "bg-gray-400"}`}
                                    onClick={() => setCurrent(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl p-5">
                    <div className="mt-2 flex justify-between py-5">
                        <div className="text-xl font-bold">New Pallets</div>
                        <div className="text-base font-semibold text-[#007185]">
                            Lihat Semua
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <div className="flex gap-4 lg:grid lg:grid-cols-6">
                            <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                <ProductCard
                                    image="/product.png"
                                    location="Jakarta"
                                    title="McGard Lug Nuts 64074"
                                    price="Rp437.031"
                                    url="/product/1"
                                />
                            </div>
                            <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                <ProductCard
                                    image="/product.png"
                                    location="Jakarta"
                                    title="McGard Lug Nuts 64074"
                                    price="Rp437.031"
                                    url="/product/1"
                                />
                            </div>
                            <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                <ProductCard
                                    image="/product.png"
                                    location="Jakarta"
                                    title="McGard Lug Nuts 64074"
                                    price="Rp437.031"
                                    url="/product/1"
                                />
                            </div>
                            <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                <ProductCard
                                    image="/product.png"
                                    location="Jakarta"
                                    title="McGard Lug Nuts 64074"
                                    price="Rp437.031"
                                    url="/product/1"
                                />
                            </div>
                            <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                <ProductCard
                                    image="/product.png"
                                    location="Jakarta"
                                    title="McGard Lug Nuts 64074"
                                    price="Rp437.031"
                                    url="/product/1"
                                />
                            </div>
                            <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                <ProductCard
                                    image="/product.png"
                                    location="Jakarta"
                                    title="McGard Lug Nuts 64074"
                                    price="Rp437.031"
                                    url="/product/1"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="my-10 flex justify-center p-5 text-center text-3xl font-semibold leading-9">
                        The world's leading retailers work <br /> with Bulky
                    </div>

                    <div className="overflow-x-auto">
                        <div className="flex gap-4 lg:grid lg:grid-cols-4">
                            <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                <div className="text-left">
                                    <div className="mb-5 w-fit rounded-full bg-[#212121] p-3">
                                        <TruckIcon className="h-10 w-10 text-[#FFCF02]" />
                                    </div>
                                    <div className="pb-1 text-lg font-bold">
                                        Pengiriman Kargo
                                    </div>
                                    <div className="pr-10 text-base">
                                        Ambil Sendiri atau Layanan Pengiriman
                                    </div>
                                </div>
                            </div>
                            <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                <div className="text-left">
                                    <div className="mb-5 w-fit rounded-full bg-[#212121] p-3">
                                        <HandThumbUpIcon className="h-10 w-10 text-[#FFCF02]" />
                                    </div>
                                    <div className="pb-1 text-lg font-bold">
                                        Legit Seller
                                    </div>
                                    <div className="pr-10 text-base">
                                        Semua Produk Lulus QC & Tanpa Perantara
                                    </div>
                                </div>
                            </div>
                            <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                <div className="text-left">
                                    <div className="mb-5 w-fit rounded-full bg-[#212121] p-3">
                                        <CreditCardIcon className="h-10 w-10 text-[#FFCF02]" />
                                    </div>
                                    <div className="pb-1 text-lg font-bold">
                                        Pembayaran Terjamin
                                    </div>
                                    <div className="pr-10 text-base">
                                        <b>100%</b> Pembayaran Aman, dengan
                                        berbagai Metode
                                    </div>
                                </div>
                            </div>
                            <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                <div className="text-left">
                                    <div className="mb-5 w-fit rounded-full bg-[#212121] p-3">
                                        <ClockIcon className="h-10 w-10 text-[#FFCF02]" />
                                    </div>
                                    <div className="pb-1 text-lg font-bold">
                                        Dukungan 24 Jam
                                    </div>
                                    <div className="pr-10 text-base">
                                        Dukungan Khusus
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10 bg-[#FFF5EB] px-4 py-10">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex justify-center pt-10 text-center text-xs font-semibold text-[#007185]">
                            TIPS & TRICK IN WHOLESALE BUSINESS
                        </div>
                        <div className="my-2 flex justify-center text-center text-3xl font-semibold leading-9">
                            Wholesales Academy by Bulky <br /> Build your future
                        </div>
                        <div className="overflow-x-auto">
                            <div className="flex gap-4 lg:grid lg:grid-cols-4">
                                <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                    <VideoThumbnail
                                        thumbnail="/Rectangle 1.png"
                                        title="CARA PIKIR KONGLOMERAT YANG KAYA.. MINDSET APA AJA.."
                                        user="/Rectangle 1-1.png"
                                    />
                                </div>
                                <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                    <VideoThumbnail
                                        thumbnail="/Rectangle 1.png"
                                        title="CARA PIKIR KONGLOMERAT YANG KAYA.. MINDSET APA AJA.."
                                        user="/Rectangle 1-1.png"
                                    />
                                </div>
                                <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                    <VideoThumbnail
                                        thumbnail="/Rectangle 1.png"
                                        title="CARA PIKIR KONGLOMERAT YANG KAYA.. MINDSET APA AJA.."
                                        user="/Rectangle 1-1.png"
                                    />
                                </div>
                                <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                    <VideoThumbnail
                                        thumbnail="/Rectangle 1.png"
                                        title="CARA PIKIR KONGLOMERAT YANG KAYA.. MINDSET APA AJA.."
                                        user="/Rectangle 1-1.png"
                                    />
                                </div>
                                <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                    <VideoThumbnail
                                        thumbnail="/Rectangle 1.png"
                                        title="CARA PIKIR KONGLOMERAT YANG KAYA.. MINDSET APA AJA.."
                                        user="/Rectangle 1-1.png"
                                    />
                                </div>
                                <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                    <VideoThumbnail
                                        thumbnail="/Rectangle 1.png"
                                        title="CARA PIKIR KONGLOMERAT YANG KAYA.. MINDSET APA AJA.."
                                        user="/Rectangle 1-1.png"
                                    />
                                </div>
                                <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                    <VideoThumbnail
                                        thumbnail="/Rectangle 1.png"
                                        title="CARA PIKIR KONGLOMERAT YANG KAYA.. MINDSET APA AJA.."
                                        user="/Rectangle 1-1.png"
                                    />
                                </div>
                                <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                    <VideoThumbnail
                                        thumbnail="/Rectangle 1.png"
                                        title="CARA PIKIR KONGLOMERAT YANG KAYA.. MINDSET APA AJA.."
                                        user="/Rectangle 1-1.png"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center pt-10 text-center text-sm font-semibold text-[#007185] underline">
                            View All Comunity Video
                        </div>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl px-4 py-10">
                    <div className="flex justify-center pt-10 text-center text-xs font-semibold text-[#007185]">
                        BETTER THAN WHOLESALE
                    </div>
                    <div className="my-2 flex justify-center text-center text-3xl font-semibold leading-9">
                        Bulky empowers businesses all
                        <br />
                        around the world
                    </div>
                    <div className="overflow-x-auto">
                        <div className="flex gap-4 lg:grid lg:grid-cols-3">
                            <div className="min-w-[100%] md:min-w-[50%] lg:min-w-0">
                                <TestimoniCard
                                    name="Budi"
                                    image="/Rectangle 1-1.png"
                                    title="CEO Toko Elektronik Garazi"
                                    review="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor."
                                />
                            </div>
                            <div className="min-w-[100%] md:min-w-[50%] lg:min-w-0">
                                <TestimoniCard
                                    name="Budi"
                                    image="/Rectangle 1-2.png"
                                    title="CEO Toko Elektronik Garazi"
                                    review="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor."
                                />
                            </div>
                            <div className="min-w-[100%] md:min-w-[50%] lg:min-w-0">
                                <TestimoniCard
                                    name="Budi"
                                    image="/Rectangle 1-3.png"
                                    title="CEO Toko Elektronik Garazi"
                                    review="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home
