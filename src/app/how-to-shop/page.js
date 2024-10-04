"use client"

import Navbar from "@/components/Navbar"
import { fetchPages } from "@/store/slices/pageSlice"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

function HowToShop() {
    const dispatch = useDispatch()
    const router = useRouter()
    const howToShop = useSelector(state => state.pages.item)

    useEffect(() => {
        dispatch(fetchPages("cara-belanja"))
    }, [dispatch])
    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon
                    className="h-6 w-6"
                    onClick={() => router.back()}
                />
                <div className="ml-2 font-semibold">Cara Membeli di Bulky</div>
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
                        <div className="items-center rounded-xl bg-white px-12 py-10 shadow">
                            <div className="staticStyle">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: howToShop.content,
                                    }}
                                />
                            </div>
                        </div>
                        {/* <div className="rounded-xl bg-white px-12 shadow">
                                <div className="border-b border-[#F0F3F7] py-12 lg:flex">
                                    <div className="">
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
                                        <div className="mt-4 flex justify-center">
                                            <Image
                                                src="/page/login.png"
                                                alt=""
                                                width={1000}
                                                height={1000}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="py-12 lg:flex">
                                    <div className="">
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
                            </div> */}
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default HowToShop
