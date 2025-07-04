"use client"

import FloatingIcon from "@/components/FloatingIcon"
import LoadingSpinner from "@/components/LoadingSpinner"
import Navbar from "@/components/Navbar"
import { formatCurrency } from "@/lib/helper"
import { getMyInvoice, setInvoiceAmount } from "@/store/slices/orderSlice"
import { ShieldCheckIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"
// import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTranslations } from "next-intl"
import Cookies from "js-cookie"

// import { useState } from "react"

function PaymentNominal() {
    const t = useTranslations()
    const router = useRouter()
    const dispatch = useDispatch()
    const [order, setOrder] = useState({})
    const [amount, setAmount] = useState(0)
    const [numericAmount, setNumericAmount] = useState(null)
    const afterSetInvoiceAmount = useSelector(state => state.orders.afterSetInvoiceAmount)
    const myInvoice = useSelector(state => state.orders.myInvoice)
    const [isError, setIsError] = useState(false)

    const formatToIDR = number => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            currencyDisplay: "narrowSymbol",
        })
            .format(number)
            .replace("Rp", "")
            .trim() // Remove "Rp" prefix
    }

    useEffect(() => {
        const getOrder = JSON.parse(localStorage.getItem("order"))
        // console.log("getOrder", getOrder)
        setOrder(getOrder)
        dispatch(getMyInvoice(getOrder.id))
    }, [])

    const totalPaidAmount = myInvoice?.order?.paid_amount?.numeric

    const remainingAmount = order.total?.numeric - totalPaidAmount

    // console.log("====================================")
    // console.log("myInvoice", myInvoice)
    // console.log("====================================")

    const handleCreatePayment = () => {
        if (amount <= 0 || amount > remainingAmount) {
            setIsError(true)
            return
        }
        dispatch(
            setInvoiceAmount({
                invoice_id: myInvoice.id,
                amount: amount,
            }),
        )

        if (afterSetInvoiceAmount !== null) {
            router.push("/payment-method/" + myInvoice.id)
        }
    }

    const handleSetAmount = e => {
        const rawValue = e.target.value.replace(/[^\d]/g, "")
        const numericValue = rawValue ? parseInt(rawValue, 10) : null
        const formattedValue = rawValue ? formatToIDR(numericValue) : ""

        setAmount(numericValue)
        setNumericAmount(formattedValue)

        if (numericValue <= 0 || numericValue > remainingAmount) {
            setIsError(true)
        } else {
            setIsError(false)
        }
    }

    // console.log("====================================")
    // console.log(order)
    // console.log("====================================")

    // useEffect(() => {
    //     console.log("====================================")
    //     console.log("afterSetInvoiceAmount", afterSetInvoiceAmount)
    //     console.log("====================================")
    // }, [afterSetInvoiceAmount])

    if (!order) {
        return <LoadingSpinner />
    }

    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon className="h-6 w-6" onClick={() => router.back()} />
                <div className="ml-2 font-semibold">Nominal</div>
            </div>
            <div className="min-h-screen bg-[#F5F5F5] pb-10">
                <div className="mx-auto max-w-7xl">
                    <div className="hidden justify-center py-5 lg:flex">
                        <div className="w-full text-2xl font-extrabold lg:max-w-xl">Nominal</div>
                    </div>
                    <div className="flex flex-col items-center justify-center lg:py-2">
                        <div className="h-fit w-full bg-white p-8 lg:max-w-xl lg:rounded-xl">
                            <div className="py-2">
                                <div className="py-2 text-sm font-bold text-[#6D7588]">{t("paymentNominal.paymentNominal")}</div>
                                <div className="mb-1 text-sm">{t("paymentNominal.entryNominal")}</div>
                                <div className="relative w-full lg:max-w-xl">
                                    <input type="text" className={`h-10 w-full rounded-lg border ${isError ? "border-[#D0021B]" : "border-[#6D7588]"} p-2 focus:border-[#007185] focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]`} placeholder="IDR. 0" value={numericAmount} onChange={handleSetAmount} />
                                </div>
                                {isError && <div className="mt-1 text-sm text-[#D0021B]">{t("paymentNominal.error")}</div>}
                                <div className="mt-1 text-sm text-[#6D7588]">{t("paymentNominal.description")}</div>
                            </div>
                        </div>
                        <div className="mb-0 mt-5 h-fit w-full rounded-t-xl bg-white p-8 lg:mb-0 lg:max-w-xl">
                            <div className="py-2">
                                <div className="py-2 text-base font-bold">{t("paymentNominal.summaryOrder")}</div>
                            </div>
                            {/*<div className="flex justify-between">*/}
                            {/*    <div className="text-sm leading-6">*/}
                            {/*        <label className="text-sm font-light">{t("paymentNominal.totalPrice")}</label>*/}
                            {/*    </div>*/}
                            {/*    <div className="ml-5 text-right text-sm leading-6">*/}
                            {/*        <label className="text-md font-light">{order.total_price?.formatted}</label>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {order?.items &&
                                order?.items.map((item, index) => (
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
                            <div className="flex justify-between">
                                <div className="text-sm leading-6">
                                    <label className="text-sm font-light">{t("paymentNominal.shippingCost")}</label>
                                </div>
                                <div className="ml-5 text-right text-sm leading-6">
                                    <label className="text-md font-light">{order && order.shipping?.shipping_cost}</label>
                                </div>
                            </div>
                            <div className="my-2 border-b p-1" />
                            {/*<div className="flex justify-between">
                                <div className="text-sm leading-6">
                                    <label className="text-sm font-light">Sub Total</label>
                                </div>
                                <div className="ml-5 text-right text-sm leading-6">
                                    <label className="text-md font-light">{order.tax_amount.formatted}</label>
                                </div>
                            </div>*/}
                            {order?.tax_enabled && (
                                <>
                                    <div className="flex justify-between">
                                        <div className="text-sm leading-6">
                                            <label className="text-sm font-light">PPN {order.tax_rate.formatted}</label>
                                        </div>
                                        <div className="ml-5 text-right text-sm leading-6">
                                            <label className="text-md font-light">{order.tax_amount.formatted}</label>
                                        </div>
                                    </div>
                                    <div className="my-2 border-b p-1" />
                                </>
                            )}
                            <div className="flex justify-between">
                                <div className="text-sm leading-6">
                                    <label className="text-sm">{t("paymentNominal.totalShopping")}</label>
                                </div>
                                <div className="ml-5 text-right text-sm leading-6">
                                    <label className="text-lg font-bold">{order.total?.formatted}</label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-10 mt-0.5 h-fit w-full bg-white p-8 lg:mb-0 lg:max-w-xl">
                            <div className="py-2">
                                <div className="py-2 text-base font-bold">{t("paymentNominal.totalPayment")}</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-sm leading-6">
                                    <label className="text-sm font-light">{t("paymentNominal.totalDibayarkan")}</label>
                                </div>
                                <div className="ml-5 text-right text-sm leading-6">
                                    <label className="text-md font-light">{myInvoice?.order?.paid_amount?.formatted}</label>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-sm leading-6">
                                    <label className="text-sm font-light">{t("paymentNominal.totalPayment")}</label>
                                </div>
                                <div className="ml-5 text-right text-sm leading-6">
                                    <label className="text-md font-light">{formatCurrency(amount)}</label>
                                </div>
                            </div>
                            <div className="my-2 border-b p-1" />
                            <div className="flex justify-between">
                                <div className="text-sm leading-6">
                                    <label className="text-sm">{t("paymentNominal.sisaTagihan")}</label>
                                </div>
                                <div className="ml-5 text-right text-sm leading-6">
                                    <label className="text-lg font-bold">{formatCurrency(remainingAmount - amount)}</label>
                                </div>
                            </div>
                        </div>
                        <div className="mt-0.5 hidden h-fit w-full rounded-b-xl bg-white p-8 lg:block lg:max-w-xl">
                            <div onClick={handleCreatePayment} className="flex cursor-pointer items-center justify-center rounded-lg bg-secondary py-3 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                <ShieldCheckIcon className="mr-2 h-5 w-5 text-black" />
                                {t("paymentNominal.payment")}
                            </div>
                        </div>
                        <div className="fixed bottom-0 left-0 right-0 block w-full px-5 py-5 shadow-lg lg:hidden">
                            <div onClick={handleCreatePayment} className="flex cursor-pointer items-center justify-center rounded-lg bg-secondary py-3 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                <ShieldCheckIcon className="mr-2 h-5 w-5 text-black" />
                                {t("paymentNominal.payment")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}

            <FloatingIcon />
        </div>
    )
}

export default PaymentNominal
