"use client"

import FloatingIcon from "@/components/FloatingIcon"
import Navbar from "@/components/Navbar"
import { createPayment, fetchPaymentMethod, getMyInvoice } from "@/store/slices/orderSlice"
import { ShieldCheckIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTranslations } from "next-intl"
import Cookies from "js-cookie"

function Payment({ params }) {
    const t = useTranslations()
    const router = useRouter()
    const invoiceId = params.invoiceId // Access the dynamic parameter
    const [selectedOption, setSelectedOption] = useState("")
    const [defaultText, setDefaultText] = useState("")
    const [selectedOptionCredit, setSelectedOptionCredit] = useState("Pilihan Pembayaran")
    const [selectedIcon, setSelectedIcon] = useState(null)
    const [selectedId, setSelectedId] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenCredit, setIsOpenCredit] = useState(false)
    const [isCreditCard, setIsCreditCard] = useState(false)
    const dispatch = useDispatch()
    const paymentMethod = useSelector(state => state.orders.paymentMethod)
    const afterCreatePayment = useSelector(state => state.orders.afterCreatePayment)
    const [order, setOrder] = useState(null)
    const myInvoice = useSelector(state => state.orders.myInvoice)

    useEffect(() => {
        // Ambil bahasa dari Cookies
        const language = Cookies.get("locale") || "id" // Default ke 'id' jika cookie tidak ditemukan

        // Sesuaikan teks default berdasarkan bahasa
        const defaultText = language === "en" ? "Select Payment" : "Pilihan Pembayaran"

        setDefaultText(defaultText)
        setSelectedOption(defaultText) // Set nilai awal `selectedOption`
    }, [])

    useEffect(() => {
        const getOrder = JSON.parse(localStorage.getItem("order"))
        setOrder(getOrder)
        dispatch(getMyInvoice(getOrder.id))
    }, [])

    // console.log("====================================")
    // console.log("myInvoice:", myInvoice)
    console.log("order:", order)
    // console.log("invoiceId:", invoiceId)
    // console.log("====================================")
    const handleOptionClick = (icon, option, id) => {
        setSelectedOption(option)
        setSelectedIcon(icon)
        setSelectedId(id)
        setIsOpen(false)

        // if (option === "Kartu Kredit") {
        //     setIsCreditCard(true)
        // } else {
        setIsCreditCard(false)
        // }
    }

    const handleOptionClickCredit = (icon, option) => {
        setSelectedOptionCredit(option)
        setIsOpenCredit(false)
    }

    useEffect(() => {
        dispatch(fetchPaymentMethod())
    }, [dispatch])

    const handleCreatePayment = () => {
        dispatch(
            createPayment({
                invoice_id: invoiceId,
                payment_method: selectedId,
            }),
        )
    }

    useEffect(() => {
        if (afterCreatePayment?.payment_url) {
            window.history.replaceState(null, "", "/")
            window.location.href = afterCreatePayment.payment_url
        }
    }, [afterCreatePayment])

    // console.log("====================================")
    // console.log("afterCreatePayment:", afterCreatePayment)
    // console.log("====================================")
    // console.log("paymentMethod:", paymentMethod)
    // console.log("selectedId:", selectedId)
    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon className="h-6 w-6" onClick={() => router.back()} />
                <div className="ml-2 font-semibold">{t("payment.payment")}</div>
            </div>
            <div className="min-h-screen bg-[#F5F5F5] pb-10">
                <div className="mx-auto max-w-7xl">
                    <div className="hidden justify-center py-5 lg:flex">
                        <div className="w-full text-2xl font-extrabold lg:max-w-xl">{t("payment.payment")}</div>
                    </div>
                    <div className="flex flex-col items-center justify-center py-2">
                        <div className="h-fit w-full bg-white p-8 lg:max-w-xl lg:rounded-xl">
                            <div className="py-2">
                                <div className="py-2 text-sm font-bold text-[#6D7588]">{t("payment.paymentMethod")}</div>
                                <div className="relative w-full lg:max-w-xl">
                                    <div className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 p-2 font-bold focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]" onClick={() => setIsOpen(!isOpen)}>
                                        <div className="flex items-center">
                                            {selectedOption !== defaultText && <Image src={selectedIcon} width={24} height={24} alt="Gopay" className="mr-2" priority={false} />}
                                            {selectedOption}
                                        </div>
                                        <ChevronDownIcon className="inline-block h-5 w-5" />
                                    </div>
                                    <div className={`mt-1 w-full rounded-lg border border-[#F0F3F7] bg-white p-2 shadow-lg transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}>
                                        {paymentMethod.map(groups => (
                                            <div key={groups.id}>
                                                <div className="p-2 text-sm font-bold">{groups.group}</div>
                                                {groups.methods.map(method => (
                                                    <div key={method.id} className="flex cursor-pointer items-center border-b border-[#F0F3F7] p-2 text-xs hover:rounded-lg hover:bg-[#F5F5F5]" onClick={() => handleOptionClick(method.logo, method.name, method.id)}>
                                                        <Image src={method.logo} width={24} height={24} alt={method.name} className="mr-2" priority={false} />
                                                        {method.name}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`h-fit w-full rounded-xl bg-white transition-all duration-500 ease-in-out lg:max-w-xl ${isCreditCard ? "mt-5 max-h-screen p-8 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                            <div className="py-2">
                                <div className="text-lg font-bold text-[#6D7588]">{t("payment.creditCard")}</div>
                            </div>
                            <div className="py-2">
                                <div className="mb-2 text-sm font-light">{t("payment.cardNumber")}</div>
                                <input type="text" className="h-10 w-full rounded-lg border border-gray-300 p-2 text-xs font-light focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]" placeholder="Contoh: 1234 5678 9012 3456" />
                            </div>
                            <div className="flex py-2">
                                <div className="mr-5 w-1/2">
                                    <div className="mb-2 text-sm font-light">{t("payment.expired")}</div>
                                    <input type="text" className="h-10 w-full rounded-lg border border-gray-300 p-2 text-xs font-light focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]" placeholder="MM / YY" />
                                </div>
                                <div className="w-1/2">
                                    <div className="mb-2 text-sm font-light">CVV</div>
                                    <input type="text" className="h-10 w-full rounded-lg border border-gray-300 p-2 text-xs font-light focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]" placeholder="Contoh: 123" />
                                </div>
                            </div>
                            <div className="flex py-2">
                                <Image src="/mastercard.svg" width={30} height={20} alt="mastercard" priority={false} />
                                <Image src="/visa.svg" width={30} height={20} alt="visa" priority={false} />
                                <Image src="/jcb.svg" width={30} height={20} alt="jcb" priority={false} />
                                <Image src="/american.svg" width={30} height={20} alt="american" priority={false} />
                            </div>
                            <div className="py-2">
                                <div className="mb-2 text-sm font-light">{t("payment.selectPayment")}</div>
                                <div className="relative w-full max-w-xl">
                                    <div className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 p-2 text-xs font-light focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]" onClick={() => setIsOpenCredit(!isOpenCredit)}>
                                        {selectedOptionCredit}
                                        <ChevronDownIcon className="inline-block h-5 w-5" />
                                    </div>
                                    <div className={`w-full rounded-lg border border-[#F0F3F7] bg-white shadow-lg transition-all duration-300 ease-in-out ${isOpenCredit ? "max-h-screen opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}>
                                        <div className="cursor-pointer border-b border-[#F0F3F7] p-2 text-xs hover:rounded-lg hover:bg-[#F5F5F5]" onClick={() => handleOptionClickCredit("Bank Transfer")}>
                                            {t("payment.cash")}
                                        </div>
                                        <div className="cursor-pointer border-b border-[#F0F3F7] p-2 text-xs hover:rounded-lg hover:bg-[#F5F5F5]" onClick={() => handleOptionClickCredit("Bank Transfer")}>
                                            {t("payment.credit")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex py-2">
                                <div className="flex items-center">
                                    <input id="comments" aria-describedby="comments-description" name="comments" type="checkbox" className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0" />
                                </div>
                                <div className="ml-2 text-xs">
                                    <label className="font-light text-[#6D7588]">{t("payment.description")}</label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-10 mt-5 h-fit w-full rounded-t-xl bg-white p-8 lg:mb-0 lg:max-w-xl">
                            <div className="py-2">
                                <div className="py-2 text-base font-bold">{t("payment.summaryOrder")}</div>
                            </div>
                            {/*<div className="flex justify-between">*/}
                            {/*    <div className="text-sm leading-6">*/}
                            {/*        <label className="text-sm font-light">*/}
                            {/*            {t("payment.totalPrice")}*/}
                            {/*        </label>*/}
                            {/*    </div>*/}
                            {/*    <div className="ml-5 text-right text-sm leading-6">*/}
                            {/*        <label className="text-md font-light">*/}
                            {/*            {myInvoice &&*/}
                            {/*                myInvoice.amount?.formatted}*/}
                            {/*        </label>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {myInvoice.order &&
                                myInvoice.order.items.map((item, index) => (
                                    <>
                                        <div key={index} className="flex justify-between">
                                            <div className="text-sm leading-6">
                                                <label className="text-sm font-light">{Cookies.get("locale") === "en" ? (item.product?.name_trans?.en ? item.product.name_trans.en : item.product?.name_trans?.id) : item.product?.name_trans?.id}</label>
                                            </div>
                                            <div className="ml-5 text-right text-sm leading-6">
                                                <label className="text-md font-light">{item.product?.price.formatted}</label>
                                            </div>
                                        </div>

                                        {item.discount_amount.numeric > 0 && (
                                            <div className="flex justify-between">
                                                <div className="text-sm leading-6">
                                                    <label className="text-sm font-light">{t("paymentMethod.discount")}</label>
                                                </div>
                                                <div className="ml-5 text-right text-sm leading-6">
                                                    <label className="text-md font-light text-red-500">- {item.discount_amount.formatted}</label>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ))}
                            {/*{myInvoice?.order?.shipping_method === "courier_pickup" && (*/}
                            {/*    <div className="flex justify-between">*/}
                            {/*        <div className="text-sm leading-6">*/}
                            {/*            <label className="text-sm font-light">{t("paymentMethod.shippingCost")}</label>*/}
                            {/*        </div>*/}
                            {/*        <div className="ml-5 text-right text-sm leading-6">*/}
                            {/*            <label className="text-md font-light">{myInvoice.order.shipping_cost.formatted}</label>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*)}*/}
                            <div className="my-5 border-b p-1" />
                            {myInvoice?.order?.tax_enabled && (
                                <>
                                    <div className="flex justify-between">
                                        <div className="text-sm leading-6">
                                            <label className="text-sm font-light">PPN {myInvoice.order.tax_rate.formatted}</label>
                                        </div>
                                        <div className="ml-5 text-right text-sm leading-6">
                                            <label className="text-md font-light">{myInvoice.order.tax_amount.formatted}</label>
                                        </div>
                                    </div>
                                    <div className="my-5 border-b p-1" />
                                </>
                            )}
                            <div className="flex justify-between">
                                <div className="text-sm leading-6">
                                    <label className="text-sm font-semibold">{t("payment.total")}</label>
                                </div>
                                <div className="ml-5 text-right text-sm leading-6">
                                    <label className="text-lg font-bold">
                                        {/* {order && order.total_price?.formatted} */}
                                        {myInvoice && myInvoice.amount?.formatted}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="mt-0.5 hidden h-fit w-full rounded-b-xl bg-white p-8 lg:block lg:max-w-xl">
                            {/* <Link href="/payment"> */}
                            <div onClick={() => handleCreatePayment()} className="flex cursor-pointer items-center justify-center rounded-lg bg-secondary py-3 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                <ShieldCheckIcon className="mr-2 h-5 w-5 text-black" />
                                {t("payment.pay")}
                            </div>
                            {/* </Link> */}
                        </div>
                        <div onClick={() => handleCreatePayment()} className="fixed bottom-0 left-0 right-0 block w-full px-5 py-5 shadow-lg lg:hidden">
                            {/* <Link href="/payment"> */}
                            <div className="flex cursor-pointer items-center justify-center rounded-lg bg-secondary py-3 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                <ShieldCheckIcon className="mr-2 h-5 w-5 text-black" />
                                {t("payment.pay")}
                            </div>
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}

            <FloatingIcon />
        </div>
    )
}

export default Payment
