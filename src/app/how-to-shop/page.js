import Navbar from "@/components/Navbar"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

function HowToShop() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <div className="hidden lg:block">
                    <Navbar />
                </div>
                <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                    <ArrowLeftIcon className="h-6 w-6" />
                    <div className="ml-2 font-semibold">
                        Cara Membeli di Bulky
                    </div>
                </div>
                <div className="min-h-screen">
                    <div className="mx-auto hidden max-w-7xl lg:block">
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
                    <div className="border-b border-[#F0F3F7] lg:mt-6"> </div>
                    <div className="mx-auto flex max-w-7xl lg:px-[176px]">
                        <div className="p-7">
                            <div className="rounded-xl bg-white px-12 shadow">
                                <div className="border-b border-[#F0F3F7] py-12 lg:flex">
                                    <div className="lg:w-1/5">
                                        <Image
                                            src="/image 43.png"
                                            width={120}
                                            height={120}
                                            alt="Logo"
                                        />
                                    </div>
                                    <div className="lg:w-4/5">
                                        <div className="text-2xl font-bold">
                                            Buat Akun
                                        </div>
                                        <div className="mt-4 text-sm font-normal leading-6">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat.
                                            Duis aute irure dolor in
                                            reprehenderit in voluptate velit
                                            esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat
                                            cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit
                                            anim id est laborum.
                                        </div>
                                    </div>
                                </div>
                                <div className="py-12 lg:flex">
                                    <div className="lg:w-1/5">
                                        <Image
                                            src="/image 43-1.png"
                                            width={120}
                                            height={120}
                                            alt="Logo"
                                        />
                                    </div>
                                    <div className="lg:w-4/5">
                                        <div className="text-2xl font-bold">
                                            Masuk ke halaman produk
                                        </div>
                                        <div className="mt-4 text-sm font-normal leading-6">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat.
                                            Duis aute irure dolor in
                                            reprehenderit in voluptate velit
                                            esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat
                                            cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit
                                            anim id est laborum.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        </Suspense>
    )
}

export default HowToShop
