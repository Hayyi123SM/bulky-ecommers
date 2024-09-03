"use client"

import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline"
import { PhoneIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"

function Footer() {
    const payments = []

    for (let i = 1; i < 20; i++) {
        payments.push(i)
    }

    return (
        <div className="bg-[#F5F5F5] lg:p-14">
            <div className="font-normal text-[#212121] md:grid md:grid-cols-3 lg:grid-cols-5">
                <div className="w-full p-5">
                    <Link href="/">
                        <Image
                            src="/bulky-black.svg"
                            width={94}
                            height={32}
                            alt="Logo"
                            className="h-auto w-auto cursor-pointer"
                            priority={false}
                        />
                    </Link>
                    <div className="mt-3 text-sm">
                        Kami adalah perusahaan likuidasi Ritel online pertama di
                        Indonesia yang berfokus dalam membantu bisnis Ritel
                    </div>
                    <div className="mt-3 flex text-sm">
                        <MapPinIcon className="h-7 w-7" />
                        <div className="ml-2">
                            Jl. Cilodong Raya No.89, Cilodong, Kec. Cilodong,
                            Kota Depok, Jawa Barat 16414
                        </div>
                    </div>
                    <div className="mt-3 flex text-sm">
                        <PhoneIcon className="h-6 w-6" />
                        <div className="ml-2 font-semibold text-[#007185] underline">
                            0811 803 157
                        </div>
                    </div>
                    <div className="mt-3 flex text-sm">
                        <EnvelopeIcon className="h-6 w-6" />
                        <div className="ml-2 font-semibold text-[#007185] underline">
                            admin@bulky.com
                        </div>
                    </div>
                </div>
                <div className="w-full p-5">
                    <div className="text-base font-bold">Lokasi Gudang</div>
                    <div className="mt-3 text-sm">
                        <Link href="/">Jakarta</Link>
                    </div>
                    <div className="mt-3 text-sm">
                        <Link href="/">Bandung</Link>
                    </div>
                    <div className="mt-3 text-sm">
                        <Link href="/">Surabaya</Link>
                    </div>
                    <div className="mt-3 text-sm">
                        <Link href="/">Medan</Link>
                    </div>
                    <div className="mt-3 text-sm">
                        <Link href="/">Solo</Link>
                    </div>
                </div>
                <div className="w-full p-5">
                    <div className="text-base font-bold">Perusahaan</div>
                    <div className="mt-3 text-sm">
                        <Link href="/about-us">Tentang Kami</Link>
                    </div>
                    <div className="mt-3 text-sm">
                        <Link href="/about-us">Wholesaler</Link>
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
                <div className="w-full p-5">
                    <div className="text-base font-bold">Layanan</div>
                    <div className="mt-3 text-sm">
                        <Link href="/about-us">Produk Lainnya</Link>
                    </div>
                    <div className="mt-3 text-sm">
                        <Link href="/about-us">Order & Status Return</Link>
                    </div>
                    <div className="mt-3 text-sm">
                        <Link href="/about-us">Profil Pengguna</Link>
                    </div>
                    <div className="mt-3 flex text-sm">
                        <Image
                            src="/instagram 1.svg"
                            width={17}
                            height={20}
                            alt="Logo"
                            className="mr-2 cursor-pointer"
                            priority={false}
                        />
                        <Image
                            src="/facebook.svg"
                            width={17}
                            height={20}
                            alt="Logo"
                            className="mr-2 cursor-pointer"
                            priority={false}
                        />
                        <Image
                            src="/tiktok.svg"
                            width={17}
                            height={20}
                            alt="Logo"
                            className="mr-2 cursor-pointer"
                            priority={false}
                        />
                    </div>
                </div>
                <div className="w-full p-5">
                    <div className="text-base font-bold">Metode Pembayaran</div>
                    <div className="mt-3 grid grid-cols-6 gap-3 text-sm">
                        {payments.map((payment, index) => (
                            <Image
                                key={index}
                                src={`/payment_method/image ${payment}.svg`}
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
