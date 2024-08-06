import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Image from "next/image"
import Link from "next/link"

function HowToShop() {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen">
                <div className="mx-auto max-w-7xl">
                    <div className="px-7 pb-1 pt-12 text-2xl font-bold">
                        Cara Membeli di Bulky
                    </div>
                    <div className="px-7 text-[#007185]">
                        <Link href="/profile" className="cursor-pointer">
                            Home
                        </Link>{" "}
                        / Cara Membeli di Bulky
                    </div>
                </div>
                <div className="mt-6 border-b border-[#F0F3F7]"> </div>
                <div className="mx-auto flex max-w-7xl px-[176px]">
                    <div className="p-7">
                        <div className="rounded-xl bg-white px-12 shadow">
                            <div className="flex border-b border-[#F0F3F7] py-12">
                                <div className="w-1/5">
                                    <Image
                                        src="/image 43.png"
                                        width={120}
                                        height={120}
                                        alt="Logo"
                                    />
                                </div>
                                <div className="w-4/5">
                                    <div className="text-2xl font-bold">
                                        Buat Akun
                                    </div>
                                    <div className="mt-4 text-sm font-normal leading-6">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit
                                        in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim
                                        id est laborum.
                                    </div>
                                </div>
                            </div>
                            <div className="flex py-12">
                                <div className="w-1/5">
                                    <Image
                                        src="/image 43-1.png"
                                        width={120}
                                        height={120}
                                        alt="Logo"
                                    />
                                </div>
                                <div className="w-4/5">
                                    <div className="text-2xl font-bold">
                                        Masuk ke halaman produk
                                    </div>
                                    <div className="mt-4 text-sm font-normal leading-6">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit
                                        in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim
                                        id est laborum.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default HowToShop
