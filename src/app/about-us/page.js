"use client"

import FloatingIcon from "@/components/FloatingIcon"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { fetchPages } from "@/store/slices/pageSlice"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTranslations } from "next-intl"
import Cookies from "js-cookie"

function AboutUs() {
    const t = useTranslations()
    const router = useRouter()
    const dispatch = useDispatch()
    const aboutUs = useSelector(state => state.pages.item)

    useEffect(() => {
        dispatch(fetchPages("tentang-kami"))
    }, [dispatch])

    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon
                    className="h-6 w-6"
                    onClick={() => router.back()}
                />
                <div className="ml-2 font-semibold">{t("page.aboutus")}</div>
            </div>
            <div className="min-h-screen">
                <div className="mx-auto hidden max-w-7xl lg:block">
                    <div className="px-7 pb-1 pt-12 text-2xl font-bold">
                        {t("page.aboutus")}
                    </div>
                    <div className="px-7 text-[#007185]">
                        <Link href="/profile" className="cursor-pointer">
                            Home
                        </Link>{" "}
                        / {t("page.aboutus")}
                    </div>
                </div>
                <div className="border-b border-[#F0F3F7] lg:mt-6"> </div>
                <div className="mx-auto flex max-w-7xl lg:px-[176px]">
                    <div className="p-7">
                        <div className="items-center rounded-xl bg-white px-12 py-10 shadow">
                            <div className="staticStyle">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            Cookies.get("locale") === "id"
                                                ? aboutUs?.content_trans?.id
                                                : aboutUs?.content_trans?.en,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <FloatingIcon />
        </div>
    )
}

export default AboutUs
