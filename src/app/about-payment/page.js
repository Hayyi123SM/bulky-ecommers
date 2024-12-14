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

function AboutPayment() {
    const t = useTranslations()
    const router = useRouter()
    const dispatch = useDispatch()
    const aboutPayment = useSelector(state => state.pages.item)

    // const [showFaq, setShowFaq] = useState(true)
    // const [showFaq2, setShowFaq2] = useState(false)
    // const [showFaq3, setShowFaq3] = useState(false)

    // const toggleShowFaq = () => {
    //     setShowFaq(!showFaq)
    // }
    // const toggleShowFaq2 = () => {
    //     setShowFaq2(!showFaq2)
    // }
    // const toggleShowFaq3 = () => {
    //     setShowFaq3(!showFaq3)
    // }

    // const payments = []

    // for (let i = 1; i < 20; i++) {
    //     payments.push(i)
    // }
    useEffect(() => {
        dispatch(fetchPages("cara-pembayaran"))
    }, [dispatch])

    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon
                    className="h-6 w-6"
                    onClick={() => router.back()}
                />
                <div className="ml-2 font-semibold">
                    {t("page.aboutpayment")}
                </div>
            </div>
            <div className="min-h-screen">
                <div className="mx-auto hidden max-w-7xl lg:block">
                    <div className="px-7 pb-1 pt-12 text-2xl font-bold">
                        {t("page.aboutpayment")}
                    </div>
                    <div className="px-7 text-[#007185]">
                        <Link href="/profile" className="cursor-pointer">
                            Home
                        </Link>{" "}
                        / {t("page.aboutpayment")}
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
                                                ? aboutPayment?.content_trans
                                                      ?.id
                                                : aboutPayment?.content_trans
                                                      ?.en,
                                    }}
                                />
                            </div>
                        </div>
                        {/* <div className="mb-4 rounded-xl bg-white shadow">
                                <div
                                    className="flex items-center justify-between px-10 pb-4 pt-6 hover:rounded-xl hover:bg-[#F5F5F5]"
                                    onClick={toggleShowFaq}>
                                    <div className="w-11/12 text-2xl font-bold">
                                        Virtual Accounts (Transfer Bank)
                                    </div>
                                    {showFaq ? (
                                        <ChevronUpIcon className="h-5 w-5" />
                                    ) : (
                                        <ChevronDownIcon className="h-5 w-5" />
                                    )}
                                </div>

                                <div
                                    className={`transition-all duration-500 ease-in-out ${showFaq ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                                    <div className="px-10 pb-8 leading-6">
                                        <div className="mt-4 text-sm font-normal">
                                            Pembayaran dari berbagai bank dapat
                                            dikenali dan diterima secara
                                            otomatis dan mudah hanya dengan satu
                                            Virtual Account, tanpa harus
                                            menggunakan rekening dari berbagai
                                            bank.
                                        </div>
                                        <div className="mt-8 grid grid-cols-6 gap-3 text-sm">
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
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4 rounded-xl bg-white shadow">
                                <div
                                    className="flex items-center justify-between px-10 pb-4 pt-6 hover:rounded-xl hover:bg-[#F5F5F5]"
                                    onClick={toggleShowFaq2}>
                                    <div className="line-clamp-2 w-11/12 text-2xl font-bold">
                                        Kartu Kredit
                                    </div>
                                    {showFaq2 ? (
                                        <ChevronUpIcon className="h-5 w-5" />
                                    ) : (
                                        <ChevronDownIcon className="h-5 w-5" />
                                    )}
                                </div>

                                <div
                                    className={`transition-all duration-500 ease-in-out ${showFaq2 ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                                    <div className="px-10 pb-8 leading-6 opacity-80">
                                        <div className="py-2 text-sm font-normal">
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
                                        <div className="py-2 text-sm font-normal">
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
                            <div className="mb-4 rounded-xl bg-white shadow">
                                <div
                                    className="flex items-center justify-between px-10 pb-4 pt-6 hover:rounded-xl hover:bg-[#F5F5F5]"
                                    onClick={toggleShowFaq3}>
                                    <div className="w-11/12 text-2xl font-bold">
                                        E-Wallet
                                    </div>
                                    {showFaq3 ? (
                                        <ChevronUpIcon className="h-5 w-5" />
                                    ) : (
                                        <ChevronDownIcon className="h-5 w-5" />
                                    )}
                                </div>

                                <div
                                    className={`transition-all duration-500 ease-in-out ${showFaq3 ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                                    <div className="px-10 pb-8 leading-6 opacity-80">
                                        <div className="py-2 text-sm font-normal">
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
                                        <div className="py-2 text-sm font-normal">
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
            <Footer />
            <FloatingIcon />
        </div>
    )
}

export default AboutPayment
