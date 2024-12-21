"use client"

import FloatingIcon from "@/components/FloatingIcon"
import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import { getStatusColor } from "@/lib/helper"
import { fetchOrderDetail, getMyInvoice } from "@/store/slices/orderSlice"
import { ClockIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Suspense, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTranslations } from "next-intl"
import Cookies from "js-cookie"
import { useAuth } from "@/hooks/auth"

function OrderDetail({ params }) {
    const { user } = useAuth({ middleware: "auth" })
    const t = useTranslations()
    const { id } = params
    const router = useRouter()
    const dispatch = useDispatch()
    const order = useSelector(state => state.orders.orderDetail)
    const myInvoice = useSelector(state => state.orders.myInvoice)

    if (!user) {
        return null // Hindari menampilkan konten jika sedang redirect
    }

    useEffect(() => {
        dispatch(fetchOrderDetail(id))
        dispatch(getMyInvoice(id))
    }, [dispatch, id])

    // console.log("order:", order)
    if (!order) {
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
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <Navbar visibleOn="desktop" />
                <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                    <ArrowLeftIcon
                        className="h-6 w-6"
                        onClick={() => router.back()}
                    />
                    <div className="ml-2 font-semibold">
                        {t("orderDetail.detailPayment")}
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
                                {t("orderDetail.detailPayment")}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 lg:my-7 lg:flex-row">
                            <div className="lg:w-1/2">
                                <div className="mb-4 rounded-xl bg-white px-5 py-4 lg:shadow">
                                    <div className="mb-4 text-sm font-extrabold">
                                        {t("orderDetail.productBuy")}
                                    </div>
                                    {order &&
                                        order?.items &&
                                        order?.items.length > 0 &&
                                        order?.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center py-2">
                                                <div>
                                                    <Image
                                                        src={
                                                            item?.product
                                                                ?.images[0]
                                                        }
                                                        width={100}
                                                        height={100}
                                                        alt="cart-product"
                                                        priority={false}
                                                    />
                                                </div>
                                                <div className="ml-5 text-sm leading-6">
                                                    <div className="text-md pb-1">
                                                        {Cookies.get(
                                                            "locale",
                                                        ) === "id"
                                                            ? item?.product
                                                                  ?.name_trans
                                                                  ?.id
                                                            : item?.product
                                                                  ?.name_trans
                                                                  ?.en}
                                                    </div>
                                                    <div className="text-md font-bold">
                                                        {item?.price?.formatted}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                                <div className="rounded-xl bg-white px-5 py-4 text-sm lg:shadow">
                                    <div className="mb-4 text-sm font-extrabold">
                                        {t(
                                            "orderDetail.paymentMethodAndAddress",
                                        )}
                                    </div>
                                    <div className="border-b py-2 text-sm">
                                        <div className="flex items-center p-1">
                                            <div className="w-1/2 text-[#6D7588]">
                                                {t(
                                                    "orderDetail.timeTransaction",
                                                )}
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
                                                {order &&
                                                    order?.invoices &&
                                                    order?.invoices[0]
                                                        ?.payment_method?.name}
                                            </div>
                                        </div>
                                        <div className="flex items-center p-1">
                                            <div className="w-1/2 text-[#6D7588]">
                                                {t(
                                                    "orderDetail.shippingMethod",
                                                )}
                                            </div>
                                            <div className="w-1/2">
                                                {order &&
                                                    order?.shipping_method
                                                        ?.label}
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
                                    {myInvoice && myInvoice?.payment_url && (
                                        <Link href={myInvoice?.payment_url}>
                                            <div className="my-2 cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-3 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                                {t("orderDetail.payNow")}
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <div className="lg:w-1/2">
                                <div className="mb-4 rounded-xl bg-white px-5 py-4 lg:shadow">
                                    <div className="flex items-center">
                                        <div className="mb-5 text-sm leading-6">
                                            <div className="text-base font-bold">
                                                {t(
                                                    "orderDetail.summaryPayment",
                                                )}
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
                                                    order?.total_price
                                                        ?.formatted}
                                            </label>
                                        </div>
                                    </div>
                                    {order && order?.shipping && (
                                        <div className="flex justify-between">
                                            <div className="text-sm leading-6">
                                                <label className="text-sm font-light">
                                                    {t(
                                                        "orderDetail.shippingCost",
                                                    )}
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
                                            <label className="text-base font-bold">
                                                {order &&
                                                    order?.total?.formatted}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {order &&
                                    order?.shipping_method?.label ===
                                        "Self Pickup" && (
                                        <div className="rounded-xl bg-secondary px-5 py-4 text-sm lg:shadow">
                                            <div className="flex items-center">
                                                <div className="mb-5 text-sm leading-6">
                                                    <div className="text-sm font-bold">
                                                        {t(
                                                            "orderDetail.infoPickup",
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="py-2 text-sm">
                                                {t("orderDetail.description")} :
                                            </div>
                                            <div className="py-2 text-sm font-bold">
                                                Jl. Cilodong Raya No. 89,
                                                Colodong, Kec. Cilodong, Kota
                                                Depok, Jawa Barat 16414
                                            </div>
                                            <div className="pt-2 text-sm">
                                                {t(
                                                    "orderDetail.timeOperational",
                                                )}
                                            </div>
                                            <div className="flex items-center pb-2 text-sm font-bold">
                                                Senin - Sabtu Pukul 09.00 -
                                                18.00 WIB
                                                <div
                                                    className={`ml-2 flex w-fit items-center gap-1 rounded-lg bg-white px-2 py-1 ${getStatusColor()}`}>
                                                    <ClockIcon className="h-4 w-4" />
                                                    {getStatusColor() ===
                                                    "text-green-500"
                                                        ? "Gudang Buka"
                                                        : "Gudang Tutup"}
                                                </div>
                                            </div>
                                            <div className="py-2 text-sm font-bold">
                                                {t("orderDetail.descriptionWa")}{" "}
                                                <Link
                                                    href="/contact-us"
                                                    className="text-[#2E84F6] underline">
                                                    WA ADMIN
                                                </Link>{" "}
                                                {t("orderDetail.forPickup")}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>

            <FloatingIcon />
        </Suspense>
    )
}

export default OrderDetail
