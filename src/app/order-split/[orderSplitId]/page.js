"use client"

import FloatingIcon from "@/components/FloatingIcon"
import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import { fetchOrderDetail, getMyInvoice } from "@/store/slices/orderSlice"
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTranslations } from "next-intl"
import Cookies from "js-cookie"
import { useAuth } from "@/hooks/auth"

function OrderSplitDetail({ params }) {
    const { user, isValidating } = useAuth({ middleware: "auth" })
    const t = useTranslations()
    const orderSplitId = params.orderSplitId
    const dispatch = useDispatch()
    const router = useRouter()
    const order = useSelector(state => state.orders.orderDetail)
    const myInvoice = useSelector(state => state.orders.myInvoice)

    useEffect(() => {
        // Hanya jalankan efek jika user sudah tersedia
        if (user) {
            dispatch(fetchOrderDetail(orderSplitId))
            dispatch(getMyInvoice(orderSplitId))
        }
    }, [dispatch, orderSplitId, user])

    // Early return hanya untuk rendering, pastikan semua hooks sudah dipanggil sebelumnya
    if (isValidating) {
        return <div>Loading...</div>
    }

    if (!user) {
        return null
    }

    const handleToPayment = () => {
        if (myInvoice.payment_url) {
            // console.log("====================================")
            // console.log("myInvoice.payment_url:", myInvoice.payment_url)
            // console.log("====================================")
            window.location.href = myInvoice.payment_url
        } else {
            // console.log("====================================")
            // console.log("myInvoice:", myInvoice)
            // console.log("====================================")
            localStorage.setItem("order", JSON.stringify(order))
            router.push("/payment-nominal/")
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(myInvoice.payment_url)
    }

    // console.log("order:", order)
    // console.log("orderSplitId:", orderSplitId)
    // console.log("myInvoice:", myInvoice)
    // console.log("totalPaidAmount:", totalPaidAmount)

    if (order === null || myInvoice === null) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <div className="text-lg font-semibold">Loading...</div>
                    <div className="mt-2 text-gray-500">Please wait...</div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon
                    className="h-6 w-6"
                    onClick={() => router.back()}
                />
                <div className="ml-2 font-semibold">
                    {t("orderDetail.detailSplitPayment")}
                </div>
            </div>
            <div className="mx-auto min-h-screen max-w-7xl lg:flex">
                <div className="hidden w-1/5 p-7 lg:block">
                    <SidebarProfile />
                </div>
                <div className="w-5/5 py-4 lg:w-4/5 lg:p-7 lg:px-4">
                    <div className="hidden items-center lg:flex">
                        <Link href="/order">
                            <ArrowLeftIcon
                                className="mr-3 h-7 w-7 cursor-pointer"
                                onClick={() => router.back()}
                            />
                        </Link>
                        <div className="pb-1 text-2xl font-bold">
                            {t("orderDetail.detailSplitPayment")}
                        </div>
                    </div>
                    <div className="flex flex-col lg:my-7 lg:flex-row lg:gap-4">
                        <div className="lg:w-1/2">
                            <div className="mb-4 rounded-xl bg-white px-5 py-4 lg:shadow">
                                <div className="mb-4 text-sm font-extrabold">
                                    {t("orderDetail.productBuy")}
                                </div>
                                {order &&
                                    order.items &&
                                    order.items.length > 0 &&
                                    order.items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center py-2">
                                            <div>
                                                <Image
                                                    src={item.product.images[0]}
                                                    width={100}
                                                    height={100}
                                                    alt="cart-product"
                                                    priority={false}
                                                />
                                            </div>
                                            <div className="ml-5 text-sm leading-6">
                                                <div className="text-md pb-1">
                                                    {Cookies.get("locale") ===
                                                    "id"
                                                        ? item?.product
                                                              ?.name_trans?.id
                                                        : item?.product
                                                              ?.name_trans?.en}
                                                </div>
                                                <div className="text-md font-bold">
                                                    {item.price.formatted}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="rounded-xl bg-white px-5 py-4 text-sm lg:shadow">
                                <div className="mb-4 text-sm font-extrabold">
                                    {t("orderDetail.paymentMethodAndAddress")}
                                </div>
                                <div className="border-b py-2 text-sm">
                                    <div className="flex items-center p-1">
                                        <div className="w-1/2 text-[#6D7588]">
                                            {t("orderDetail.timeTransaction")}
                                        </div>
                                        <div className="w-1/2">
                                            {order && order?.order_date}
                                        </div>
                                    </div>
                                    <div className="flex items-center p-1">
                                        <div className="w-1/2 text-[#6D7588]">
                                            {t("orderDetail.orderNumber")}
                                        </div>
                                        <div className="w-1/2">
                                            {order && order?.order_number}
                                        </div>
                                    </div>
                                    <div className="flex items-center p-1">
                                        <div className="w-1/2 text-[#6D7588]">
                                            {t("orderDetail.paymentMethod")}
                                        </div>
                                        <div className="w-1/2">
                                            {order > 0
                                                ? order?.invoices[0]
                                                      ?.payment_method?.name ===
                                                  null
                                                    ? "-"
                                                    : order?.invoices[0]
                                                          ?.payment_method?.name
                                                : "-"}
                                        </div>
                                    </div>
                                    <div className="flex items-center p-1">
                                        <div className="w-1/2 text-[#6D7588]">
                                            {t("orderDetail.shippingMethod")}
                                        </div>
                                        <div className="w-1/2">
                                            {order &&
                                                order?.shipping_method?.label}
                                        </div>
                                    </div>
                                    <div className="my-2 mb-4 flex items-center justify-between p-1 text-sm">
                                        <div>
                                            <div className="text-[#6D7588] lg:w-1/2">
                                                Split Link
                                            </div>
                                            <div className="text-[#007185] lg:w-1/2">
                                                {myInvoice &&
                                                    myInvoice?.payment_url}
                                            </div>
                                        </div>
                                        <div
                                            className="ml-5 flex cursor-pointer items-center text-right text-sm"
                                            onClick={() =>
                                                copyToClipboard(
                                                    myInvoice?.payment_url,
                                                )
                                            }>
                                            <div className="mr-1 text-sm font-bold text-[#007185]">
                                                {t("orderDetail.copy")}
                                            </div>
                                            <ClipboardDocumentIcon className="h-5 w-5 font-bold text-[#007185]" />
                                        </div>
                                    </div>
                                </div>
                                <div className="my-2 mb-4 border-b p-1 text-sm">
                                    <div className="w-1/2 text-[#6D7588]">
                                        {t("orderDetail.address")}
                                    </div>
                                    <div className="w-1/2">
                                        {order && order?.shipping_address}
                                    </div>
                                </div>
                                <div
                                    onClick={() => handleToPayment()}
                                    className="my-2 cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-3 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                    {t("orderDetail.payNow")}
                                </div>
                            </div>
                        </div>
                        <div className="h-full lg:w-1/2">
                            <div className="h-full rounded-xl bg-white px-5 py-4 lg:shadow">
                                <div className="flex items-center">
                                    <div className="mb-5 text-sm leading-6">
                                        <div className="text-base font-bold">
                                            {t("orderDetail.summaryPayment")}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-sm leading-6">
                                        <label className="text-sm font-light">
                                            {t("orderDetail.totalPrice")}
                                        </label>
                                    </div>
                                    <div className="ml-5 text-right text-sm leading-6">
                                        <label className="text-md font-light">
                                            {order &&
                                                order?.total_price?.formatted}
                                        </label>
                                    </div>
                                </div>
                                {order && order?.shipping && (
                                    <div className="flex justify-between">
                                        <div className="text-sm leading-6">
                                            <label className="text-sm font-light">
                                                {t("orderDetail.shippingCost")}
                                            </label>
                                        </div>
                                        <div className="ml-5 text-right text-sm leading-6">
                                            <label className="text-md font-light">
                                                {order &&
                                                    order?.shipping
                                                        ?.shipping_cost}
                                            </label>
                                        </div>
                                    </div>
                                )}
                                <div className="my-3 border-b p-1" />
                                <div className="flex justify-between">
                                    <div className="text-sm leading-6">
                                        <label className="text-sm font-semibold">
                                            {t("orderDetail.totalInvoice")}
                                        </label>
                                    </div>
                                    <div className="ml-5 text-right text-sm leading-6">
                                        <label className="text-lg font-bold">
                                            {/*{order && order.total?.formatted}*/}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="my-2 rounded-xl bg-white px-5 py-4 shadow">
                                <div className="mb-2 font-extrabold">
                                    {t("orderDetail.statusPayment")}
                                </div>
                                {order &&
                                    order?.invoices &&
                                    order?.invoices.map(invoice => (
                                        <div key={invoice?.id} className="my-1">
                                            <div className="flex items-center justify-between p-2 text-sm">
                                                <div className="flex items-center">
                                                    <Image
                                                        src="https://dummyimage.com/400x400/b8b8b8/000105.png"
                                                        width={40}
                                                        height={40}
                                                        alt="single"
                                                        className="mr-4 rounded-full"
                                                        priority={false}
                                                    />
                                                    <div>
                                                        <div className="text-sm font-medium">
                                                            {
                                                                invoice?.user
                                                                    ?.name
                                                            }
                                                        </div>
                                                        <div
                                                            className={`w-fit rounded-lg bg-[${invoice?.status?.color}0D] px-4 py-1 text-[9px] font-semibold text-[${invoice?.status?.color}] lg:hidden`}>
                                                            {
                                                                invoice?.status
                                                                    ?.label
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`ml-14 hidden w-fit rounded-lg bg-[${invoice?.status?.color}0D] px-4 py-1 text-[9px] font-semibold text-[${invoice?.status?.color}] lg:block`}>
                                                    {invoice?.status?.label}
                                                </div>
                                                <div className="text-xs font-bold">
                                                    {invoice?.amount?.formatted}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="rounded-xl bg-white px-5 py-4 shadow">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm">
                                        {t("orderDetail.remainingPayment")}
                                    </div>
                                    <div className="font-extrabold">
                                        {/* {order && order.total_price?.formatted} */}
                                        {order &&
                                            order?.remaining_amount?.formatted}
                                    </div>
                                </div>
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

export default OrderSplitDetail
