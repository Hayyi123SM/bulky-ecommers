"use client"

import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import { fetchOrderDetail } from "@/store/slices/orderSlice"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

function OrderDetail({ params }) {
    const router = useRouter()
    const orderId = params.orderId
    const dispatch = useDispatch()
    const order = useSelector(state => state.orders.orderDetail)
    // const trackingData = [
    //     {
    //         location: "Jakarta",
    //         timestamp: "2024-07-12 10:00",
    //         status: "Delivered",
    //     },
    //     {
    //         location: "Bandung",
    //         timestamp: "2024-07-11 08:00",
    //         status: "In Transit",
    //     },
    //     {
    //         location: "Surabaya",
    //         timestamp: "2024-07-10 12:00",
    //         status: "Dispatched",
    //     },
    // ]

    useEffect(() => {
        dispatch(fetchOrderDetail(orderId))
    }, [dispatch, orderId])

    // console.log("order:", order)
    // console.log("orderId:", orderId)
    // console.log("params:", params)
    if (order === null) return <div>Loading...</div>

    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon
                    className="h-6 w-6"
                    onClick={() => router.back()}
                />
                <div className="ml-2 font-semibold">Detail Status Pesanan</div>
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
                            Detail Status Pesanan
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
                                            Cara Bayar
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
                                            {order &&
                                                order.invoices &&
                                                order.invoices[0]
                                                    ?.payment_method?.name}
                                        </div>
                                    </div>
                                    <div className="flex items-center p-1">
                                        <div className="w-1/2 text-[#6D7588]">
                                            Metode Pengiriman
                                        </div>
                                        <div className="w-1/2">
                                            {order &&
                                                order.shipping_method.label}
                                        </div>
                                    </div>
                                    <div className="flex items-center p-1">
                                        <div className="w-1/2 text-[#6D7588]">
                                            Status
                                        </div>
                                        <div
                                            className={`bg-[${order && order.order_status?.color}0D] w-fit rounded px-4 py-1 text-[9px] font-semibold text-[${order && order.order_status?.color}]`}>
                                            {order && order.order_status?.label}
                                        </div>
                                    </div>
                                </div>
                                <div className="my-2 mb-4 border-b p-1 text-sm">
                                    <div className="w-1/2 text-[#6D7588]">
                                        Alamat
                                    </div>
                                    <div className="w-1/2">Alamat</div>
                                </div>
                                {/* <div className="my-2 cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-3 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                    Bayar Sekarang
                                </div> */}
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
                            {/* <div className="mt-4 h-full rounded-xl bg-white px-5 py-4 lg:shadow">
                                <div className="flex items-center">
                                    <div className="mb-5 ml-5 text-sm leading-6">
                                        <div className="text-base font-bold">
                                            Status Pesanan
                                        </div>
                                    </div>
                                </div>
                                <div className="relative ml-5 border-l-2 border-dashed border-gray-300 pl-[10px]">
                                    {trackingData.map((item, index) => (
                                        <div
                                            key={index}
                                            className="relative mb-6 flex items-center">
                                            {index === 0 ? (
                                                <Image
                                                    src="/bullet-active.svg"
                                                    width={18}
                                                    height={18}
                                                    alt="check-circle"
                                                    className="absolute -left-5"
                                                />
                                            ) : (
                                                <Image
                                                    src="/bullet-inactive.svg"
                                                    width={18}
                                                    height={18}
                                                    alt="check-circle"
                                                    className="absolute -left-5"
                                                />
                                            )}
                                            <div className="ml-2 flex-grow">
                                                <div
                                                    className={`text-sm ${index === 0 ? "font-semibold text-black" : "text-[#6D7588]"}`}>
                                                    {item.location}
                                                </div>
                                                <div className="text-sm text-[#6D7588]">
                                                    {item.timestamp}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default OrderDetail
