"use client"

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import ProductCard from "@/components/ProductCard"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import React, { useState } from "react"

function ProductDetail() {
    const [mainImage, setMainImage] = useState("/image 4.png")

    const productImages = [
        "/image 4.png",
        "/image 6.png",
        "/image 7.png",
        "/image 8.png",
    ]
    return (
        <div>
            <Navbar />
            <div className="mx-auto max-w-7xl p-8 px-44">
                <div className="flex">
                    <div className="flex flex-col">
                        {productImages.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                alt={`product-${index}`}
                                width={80}
                                height={80}
                                className={`mb-3 cursor-pointer border-2 hover:border-[#007185] ${mainImage === image ? "border-[#007185]" : "border-[#BFC9D9]"}`}
                                onClick={() => setMainImage(image)}
                            />
                        ))}
                    </div>
                    <div className="w-1/2">
                        <div className="flex items-center justify-center">
                            <Image
                                src={mainImage}
                                alt="main product"
                                width={500}
                                height={400}
                            />
                        </div>
                    </div>
                    <div className="w-1/2 p-8">
                        <h1 className="mb-4 text-2xl font-bold">
                            Est. 1 Pallet of Luxury Skincare, 1,453 Units, Used
                            - Good Condition.
                        </h1>
                        <div className="mb-4 flex items-center">
                            <div className="mr-2 w-3/12 text-sm text-[#6D7588]">
                                ID Palet
                            </div>
                            <div className="w-10/12 text-sm font-bold">
                                TYT-104150
                            </div>
                        </div>
                        <div className="mb-4 text-xl font-bold text-[#007185]">
                            Rp8.126.777
                        </div>
                        <div className="mb-4 flex items-center">
                            <div className="mr-2 w-3/12 text-sm text-[#6D7588]">
                                Quantity
                            </div>
                            <div className="w-10/12 text-sm font-bold">
                                64 pcs
                            </div>
                        </div>
                        <div className="mb-4 flex items-center">
                            <div className="mr-2 w-3/12 text-sm text-[#6D7588]">
                                Location
                            </div>
                            <div className="w-10/12 text-sm font-bold">
                                Yogyakarta
                            </div>
                        </div>
                        <div className="mb-4 flex items-center">
                            <div className="mr-2 w-3/12 text-sm text-[#6D7588]">
                                Total Berat
                            </div>
                            <div className="w-10/12 text-sm font-bold">
                                5.00 lbs per lot / 0.77 pounds per lot
                                dimensional weight
                                <span className="ml-1 text-[#007185] underline">
                                    (Package Details)
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center py-3">
                            <Image
                                src="/package.svg"
                                alt="package"
                                width={56}
                                height={56}
                            />
                            <div className="ml-2 text-xs">
                                Saat ini barang sedang dalam proses pembayaran
                                salah satu pengguna Bulky{" "}
                                <span className="inline-flex items-center text-xs font-bold text-[#F20B0B]">
                                    01:30:59
                                    <QuestionMarkCircleIcon
                                        className="ml-1 h-4 w-4 text-[#007185]"
                                        style={{ strokeWidth: "2.5" }}
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="rounded-lg bg-[#F5F5F5] py-3 text-center text-lg font-bold text-[#BFC9D9]">
                            Masukkan Keranjang
                        </div>
                        <div className="cursor-pointer rounded-lg bg-secondary py-3 text-center text-lg font-bold hover:bg-[#e8bc00]">
                            Masukkan Keranjang
                        </div>
                        <div className="flex py-3">
                            <Image
                                src="/mandiri.svg"
                                alt="mandiri"
                                width={50}
                                height={50}
                            />
                            <Image
                                src="/mandiri.svg"
                                alt="mandiri"
                                width={50}
                                height={50}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-20">
                    <div className="mb-4 text-2xl font-bold">Deskripsi</div>
                    <div className="flex border-b border-[#BFC9D9] py-2">
                        <div className="w-1/6 text-sm font-semibold">
                            Kondisi :
                        </div>
                        <div className="w-5/6 text-sm">Baru 90-95%</div>
                    </div>
                    <div className="flex border-b border-[#BFC9D9] py-2">
                        <div className="w-1/6 text-sm font-semibold">
                            Brand :
                        </div>
                        <div className="w-5/6 text-sm">
                            Samsung, Lenovo, Dell
                        </div>
                    </div>
                    <div className="flex border-b border-[#BFC9D9] py-2">
                        <div className="w-1/6 text-sm font-semibold">
                            Status Produk :
                        </div>
                        <div className="w-5/6 text-sm">
                            Failed Delivery Items
                        </div>
                    </div>
                    <div className="flex border-b border-[#BFC9D9] py-2">
                        <div className="w-1/6 text-sm font-semibold">
                            Min Pesanan :
                        </div>
                        <div className="w-5/6 text-sm">1 Palet</div>
                    </div>
                    <div className="flex border-b border-[#BFC9D9] py-2">
                        <div className="w-1/6 text-sm font-semibold">
                            Kategori :
                        </div>
                        <div className="w-5/6 text-sm font-semibold text-[#007185]">
                            Books
                        </div>
                    </div>
                    <div className="py-10">
                        <p className="text-sm">
                            ETAWALIN EXP. 02.26 NUTRI FLAKES EXP 12.25 WEIGHT
                            HERBA EXP. (04,10,12).25 FRESHMAG EXP. 01.26 ZYMUNO
                            EXP. 01.26
                        </p>
                        <div className="py-8 text-sm font-bold text-[#007185]">
                            Lihat Lebih Sedikit
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="mb-4 text-2xl font-bold">
                        Produk Lainnya
                    </div>
                    <div className="grid grid-cols-5 gap-4">
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
            <Footer />
        </div>
    )
}

export default ProductDetail
