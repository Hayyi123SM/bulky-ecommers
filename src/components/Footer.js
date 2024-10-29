"use client"

import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline"
import { PhoneIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"

function Footer() {
    const payments = []

    for (let i = 1; i < 16; i++) {
        payments.push(i)
    }

    return (
        <div className="bg-[#F5F5F5] lg:p-14">
            <div className="flex flex-wrap font-normal text-[#212121]">
                <div className="w-full p-5 md:w-2/5 lg:w-3/12 xl:w-3/12">
                    <Link href="/">
                        <Image
                            src="/bulky-black.svg"
                            width={94}
                            height={32}
                            alt="Logo"
                            className="cursor-pointer"
                            priority={false}
                        />
                    </Link>
                    <div className="mt-3 text-sm">
                        Kami adalah perusahaan likuidasi Ritel online pertama di
                        Indonesia yang berfokus dalam membantu bisnis Ritel
                    </div>
                    <div className="mt-3 flex text-sm">
                        <MapPinIcon className="h-auto w-6 md:w-9" />
                        <div className="ml-2">
                            Jl. Cilodong Raya No.89, Cilodong, Kec. Cilodong,
                            Kota Depok, Jawa Barat 16414
                        </div>
                    </div>
                    <div className="mt-3 flex text-sm">
                        <PhoneIcon className="h-auto w-4" />
                        <div
                            className="ml-2 cursor-pointer font-semibold text-[#007185] underline"
                            onClick={() =>
                                window.open(
                                    "https://wa.me/62811858834",
                                    "_blank",
                                )
                            }>
                            0811 858 834
                        </div>
                    </div>
                    <div className="mt-3 flex text-sm">
                        <EnvelopeIcon className="h-auto w-4" />
                        <div className="ml-2 font-semibold text-[#007185] underline">
                            admin@bulky.id
                        </div>
                    </div>
                </div>
                <div className="w-1/3 p-5 md:w-1/5 lg:w-2/12 xl:w-2/12">
                    <div className="text-base font-bold">Lokasi Gudang</div>
                    <div className="mt-3 text-sm">Depok</div>
                </div>
                <div className="w-1/3 p-5 md:w-1/5 lg:w-2/12 xl:w-2/12">
                    <div className="text-base font-bold">Perusahaan</div>
                    <div className="mt-3 text-sm">
                        <Link href="/about-us">Tentang Kami</Link>
                    </div>
                    <div className="mt-3 text-sm">
                        <Link href="/how-to-shop">Cara Pembelian</Link>
                    </div>
                    <div className="mt-3 text-sm">
                        <Link href="/about-payment">Pembayaran</Link>
                    </div>
                    <div className="mt-3 text-sm">
                        <Link href="/contact-us">Kontak</Link>
                    </div>
                    <div className="mt-3 text-sm">
                        <Link href="/faq">FAQ</Link>
                    </div>
                    <div className="mt-3 text-sm">
                        <Link href="/terms-and-conditions">
                            Syarat & Ketentuan
                        </Link>
                    </div>
                    <div className="mt-3 text-sm">
                        <Link href="/privacy-policy">Kebijakan Privasi</Link>
                    </div>
                </div>
                <div className="w-1/3 p-5 md:w-1/5 lg:w-2/12 xl:w-2/12">
                    <div className="text-base font-bold">Layanan</div>
                    <div className="mt-3 text-sm">
                        <Link href="/product">Produk Lainnya</Link>
                    </div>
                    <div className="mt-3 text-sm">
                        <Link href="/order">Order & Status Return</Link>
                    </div>
                    <div className="mt-3 text-sm">
                        <Link href="/profile">Profil Pengguna</Link>
                    </div>
                    <div className="mt-3 flex text-sm">
                        <Link
                            href="https://www.instagram.com/liquid8wholesale/"
                            target="_blank">
                            <Image
                                src="/instagram 1.svg"
                                width={17}
                                height={20}
                                alt="Logo"
                                className="mr-2 cursor-pointer"
                                priority={false}
                            />
                        </Link>
                        <Link
                            href="https://www.facebook.com/liquid8wholesale"
                            target="_blank">
                            <Image
                                src="/facebook.svg"
                                width={17}
                                height={20}
                                alt="Logo"
                                className="mr-2 cursor-pointer"
                                priority={false}
                            />
                        </Link>
                        <Link
                            href="https://www.tiktok.com/@liquid8wholesale"
                            target="_blank">
                            <Image
                                src="/tiktok.svg"
                                width={17}
                                height={20}
                                alt="Logo"
                                className="mr-2 cursor-pointer"
                                priority={false}
                            />
                        </Link>
                    </div>
                </div>
                <div className="w-full p-5 md:w-full lg:w-3/12 xl:w-3/12">
                    <div className="text-base font-bold">Metode Pembayaran</div>
                    <div className="mt-3 grid grid-cols-6 gap-3 text-sm">
                        {payments.map((payment, index) => (
                            <Image
                                key={index}
                                src={`/payment/image ${payment}.svg`}
                                width={100}
                                height={100}
                                alt="Logo"
                                priority={false}
                            />
                        ))}
                    </div>

                    <div className="mt-10 text-base font-bold">
                        Akses Melalui Aplikasi
                    </div>
                    <div className="mt-3 flex items-center text-sm">
                        <Image
                            src={`/payment_method/apple.svg`}
                            width={100}
                            height={100}
                            alt="Logo"
                            priority={false}
                        />
                        <Image
                            src={`/payment_method/gplay.svg`}
                            width={120}
                            height={100}
                            alt="Logo"
                            priority={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
