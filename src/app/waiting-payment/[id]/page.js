"use client"

import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import { fetchOrderDetail, getMyInvoice } from "@/store/slices/orderSlice"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { Suspense, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

function OrderDetail({ params }) {
    const { id } = params
    const dispatch = useDispatch()
    const order = useSelector(state => state.orders.orderDetail)
    const myInvoice = useSelector(state => state.orders.myInvoice)

    useEffect(() => {
        dispatch(fetchOrderDetail(id))
        dispatch(getMyInvoice(id))
    }, [dispatch, id])

    console.log("order:", order)
    if (!order) return <div>Loading...</div>

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <div className="hidden lg:block">
                    <Navbar />
                </div>
                <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                    <ArrowLeftIcon className="h-6 w-6" />
                    <div className="ml-2 font-semibold">Detail Pembayaran</div>
                </div>
                <div className="mx-auto min-h-screen max-w-7xl lg:flex">
                    <div className="hidden w-1/5 p-7 lg:block">
                        <SidebarProfile />
                    </div>
                    <div className="w-5/5 py-4 lg:w-4/5 lg:p-7 lg:px-4">
                        <div className="hidden items-center lg:flex">
                            <Link href="/order">
                                <ArrowLeftIcon className="mr-3 h-7 w-7 cursor-pointer" />
                            </Link>
                            <div className="pb-1 text-2xl font-bold">
                                Detail Pembayaran
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 lg:my-7 lg:flex-row">
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
                                                        src={
                                                            item.product
                                                                .images[0]
                                                        }
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
                                                {order &&
                                                    order.invoice &&
                                                    order.invoices[0]
                                                        .payment_method}
                                            </div>
                                        </div>
                                        <div className="flex items-center p-1">
                                            <div className="w-1/2 text-[#6D7588]">
                                                Metode Pengiriman
                                            </div>
                                            <div className="w-1/2">
                                                Deliveree
                                            </div>
                                        </div>
                                    </div>
                                    <div className="my-2 mb-4 border-b p-1 text-sm">
                                        <div className="w-1/2 text-[#6D7588]">
                                            Alamat
                                        </div>
                                        <div className="w-1/2">Alamat</div>
                                    </div>
                                    {myInvoice && myInvoice.payment_url && (
                                        <Link href={myInvoice.payment_url}>
                                            <div className="my-2 cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-3 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                                Bayar Sekarang
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <div className="h-full rounded-xl bg-white px-5 py-4 lg:w-1/2 lg:shadow">
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
                                        <label className="text-base font-bold">
                                            {order &&
                                                order.total_price?.formatted}
                                        </label>
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

export default OrderDetail
