"use client"

import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import { formatCurrency } from "@/lib/helper"
import { fetchOrderDetail, getMyInvoice } from "@/store/slices/orderSlice"
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

function OrderSplitDetail({ params }) {
    const orderSplitId = params.orderSplitId
    const dispatch = useDispatch()
    const router = useRouter()
    const order = useSelector(state => state.orders.orderDetail)
    const myInvoice = useSelector(state => state.orders.myInvoice)

    // const calculateTotalPaidAmount = (invoices = []) => {
    //     return invoices
    //         .filter(invoice => invoice.status.value === "pending")
    //         .reduce((acc, invoice) => acc + invoice.amount.numeric, 0)
    // }

    // const totalPaidAmount = calculateTotalPaidAmount(order.invoices)

    useEffect(() => {
        dispatch(fetchOrderDetail(orderSplitId))
        dispatch(getMyInvoice(orderSplitId))
    }, [dispatch, orderSplitId])

    const totalPaidAmount = order.paid_amount?.numeric
    const remainingAmount = order.total_price?.numeric - totalPaidAmount

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

    // console.log("order:", order)
    // console.log("orderSplitId:", orderSplitId)
    // console.log("myInvoice:", myInvoice)
    // console.log("totalPaidAmount:", totalPaidAmount)

    if (order === null || myInvoice === null) return <div>Loading...</div>

    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon
                    className="h-6 w-6"
                    onClick={() => router.back()}
                />
                <div className="ml-2 font-semibold">
                    Detail Pembayaran Patungan
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
                            Detail Pembayaran Patungan
                        </div>
                    </div>
                    <div className="flex flex-col lg:my-7 lg:flex-row lg:gap-4">
                        <div className="lg:w-1/2">
                            <div className="mb-4 rounded-xl bg-white px-5 py-4 lg:shadow">
                                <div className="mb-4 text-sm font-extrabold">
                                    Produk yang dibeli
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
                                                    {item.product.name}
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
                                    Metode Bayar & Alamat
                                </div>
                                <div className="border-b py-2 text-sm">
                                    <div className="flex items-center p-1">
                                        <div className="w-1/2 text-[#6D7588]">
                                            Waktu Transaksi
                                        </div>
                                        <div className="w-1/2">
                                            {order && order.order_date}
                                        </div>
                                    </div>
                                    <div className="flex items-center p-1">
                                        <div className="w-1/2 text-[#6D7588]">
                                            Nomor Pesanan
                                        </div>
                                        <div className="w-1/2">
                                            {order && order.order_number}
                                        </div>
                                    </div>
                                    <div className="flex items-center p-1">
                                        <div className="w-1/2 text-[#6D7588]">
                                            Metode Pembayaran
                                        </div>
                                        <div className="w-1/2">
                                            {order > 0
                                                ? order.invoices[0]
                                                      ?.payment_method?.name ===
                                                  null
                                                    ? "-"
                                                    : order.invoices[0]
                                                          ?.payment_method?.name
                                                : "-"}
                                        </div>
                                    </div>
                                    <div className="flex items-center p-1">
                                        <div className="w-1/2 text-[#6D7588]">
                                            Metode Pengiriman
                                        </div>
                                        <div className="w-1/2">Deliveree</div>
                                    </div>
                                    <div className="my-2 mb-4 flex items-center justify-between p-1 text-sm">
                                        <div>
                                            <div className="text-[#6D7588] lg:w-1/2">
                                                Split Link
                                            </div>
                                            <div className="text-[#007185] lg:w-1/2">
                                                https://g.co/gemini/share/44ff9809b4ed
                                            </div>
                                        </div>
                                        <div className="ml-5 flex items-center text-right text-sm">
                                            <div className="mr-1 text-sm font-bold text-[#007185]">
                                                Salin
                                            </div>
                                            <ClipboardDocumentIcon className="h-5 w-5 font-bold text-[#007185]" />
                                        </div>
                                    </div>
                                </div>
                                <div className="my-2 mb-4 border-b p-1 text-sm">
                                    <div className="w-1/2 text-[#6D7588]">
                                        Alamat
                                    </div>
                                    <div className="w-1/2">Alamat</div>
                                </div>
                                <div
                                    onClick={() => handleToPayment()}
                                    className="my-2 cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-3 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                    Bayar Sekarang
                                </div>
                            </div>
                        </div>
                        <div className="h-full lg:w-1/2">
                            <div className="h-full rounded-xl bg-white px-5 py-4 lg:shadow">
                                <div className="flex items-center">
                                    <div className="mb-5 text-sm leading-6">
                                        <div className="text-base font-bold">
                                            Ringkasan Pembayaran
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-sm leading-6">
                                        <label className="text-sm font-light">
                                            Total Harga Barang
                                        </label>
                                    </div>
                                    <div className="ml-5 text-right text-sm leading-6">
                                        <label className="text-md font-light">
                                            {order &&
                                                order.total_price?.formatted}
                                        </label>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-sm leading-6">
                                        <label className="text-sm font-light">
                                            Total Ongkos Kirim
                                        </label>
                                    </div>
                                    <div className="ml-5 text-right text-sm leading-6">
                                        <label className="text-md font-light">
                                            {order &&
                                                order.total_price?.formatted}
                                        </label>
                                    </div>
                                </div>
                                <div className="my-3 border-b p-1"> </div>
                                <div className="flex justify-between">
                                    <div className="text-sm leading-6">
                                        <label className="text-sm font-semibold">
                                            Total Tagihan
                                        </label>
                                    </div>
                                    <div className="ml-5 text-right text-sm leading-6">
                                        <label className="text-lg font-bold">
                                            {order &&
                                                order.total_price?.formatted}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="my-2 rounded-xl bg-white px-5 py-4 shadow">
                                <div className="mb-2 font-extrabold">
                                    Status Pembayaran
                                </div>
                                {order &&
                                    order.invoices &&
                                    order.invoices.map(invoice => (
                                        <div key={invoice.id} className="my-1">
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
                                                            {invoice.user.name}
                                                        </div>
                                                        <div
                                                            className={`w-fit rounded-lg bg-[${invoice.status?.color}0D] px-4 py-1 text-[9px] font-semibold text-[${invoice.status?.color}] lg:hidden`}>
                                                            {
                                                                invoice.status
                                                                    ?.label
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`ml-14 hidden w-fit rounded-lg bg-[${invoice.status?.color}0D] px-4 py-1 text-[9px] font-semibold text-[${invoice.status?.color}] lg:block`}>
                                                    {invoice.status?.label}
                                                </div>
                                                <div className="text-xs font-bold">
                                                    {invoice.amount?.formatted}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="rounded-xl bg-white px-5 py-4 shadow">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm">
                                        Sisa Total Tagihan
                                    </div>
                                    <div className="font-extrabold">
                                        {/* {order && order.total_price?.formatted} */}
                                        {formatCurrency(remainingAmount)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default OrderSplitDetail
