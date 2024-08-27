"use client"

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import { useAuth } from "@/hooks/auth"
import { fetchInvoiceOrder, fetchOrders } from "@/store/slices/orderSlice"
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function WaitingPayment() {
    const searchParams = useSearchParams()
    const currentPage = parseInt(searchParams.get("page")) || 1
    const { user } = useAuth()
    const router = useRouter()
    const dispatch = useDispatch()
    const orders = useSelector(state => state.orders.orders)
    const invoiceOrders = useSelector(state => state.orders.invoiceOrders)
    const [invoiceId, setInvoiceId] = useState("")

    useEffect(() => {
        if (user) {
            console.log("user:", user)
            dispatch(
                fetchOrders({
                    page: currentPage,
                    type: "waiting_payment",
                    perPage: "",
                    search: "",
                    date: "",
                    status: "",
                }),
            )
        }
    }, [dispatch, user])

    const handleGetInvoice = orderId => {
        dispatch(fetchInvoiceOrder(orderId))
    }

    useEffect(() => {
        if (invoiceOrders.length > 0) {
            setInvoiceId(invoiceOrders[0]?.id)
            router.push(`/payment-method/${invoiceOrders[0]?.id}`)
        }
    }, [invoiceOrders])

    console.log("====================================")
    console.log("invoiceId:", invoiceId)
    console.log("====================================")

    if (!orders) return <div>Loading ... </div>

    console.log("====================================")
    console.log("orders:", orders)
    console.log("====================================")

    return (
        <Suspense fallback={<div>Loading ... </div>}>
            <div>
                <div className="hidden lg:block">
                    <Navbar />
                </div>
                <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                    <ArrowLeftIcon className="h-6 w-6" />
                    <div className="ml-2 font-semibold">
                        Menunggu Pembayaran
                    </div>
                </div>
                <div className="mx-auto min-h-screen max-w-7xl lg:flex">
                    <div className="hidden w-1/5 p-7 lg:block">
                        <SidebarProfile />
                    </div>
                    <div className="w-5/5 py-4 lg:w-4/5 lg:p-7 lg:px-4">
                        <div className="hidden pb-1 text-2xl font-bold lg:block">
                            Menunggu Pembayaran
                        </div>
                        <div className="mt-4 flex items-center px-4 lg:mt-10 lg:px-0">
                            <div className="item-center mr-2 w-full lg:mb-0 lg:flex lg:w-8/12">
                                <input
                                    className="mr-4 w-full rounded-lg border py-2 pl-14 text-black bg-search focus:border-secondary focus:ring-0"
                                    placeholder="Cari pesananmu"
                                />
                            </div>
                            <div className="item-center hidden w-full lg:flex lg:w-4/12">
                                <input
                                    className="w-full rounded-lg border py-2 pl-14 text-black bg-calendar focus:border-secondary focus:ring-0"
                                    placeholder="Pilih Tanggal Transaksi"
                                />
                            </div>
                            <div className="item-center ml-2 w-full lg:hidden lg:w-4/12">
                                <div className="flex items-center justify-between rounded-full bg-[#F5F5F5] px-4 py-2 text-sm text-[#6D7588]">
                                    Semua Tanggal
                                    <ChevronDownIcon className="ml-2 h-6 w-6" />
                                </div>
                            </div>
                        </div>
                        {/* Start : View Website */}
                        {orders.map((order, index) => (
                            <div
                                key={index}
                                className="hidden items-center border-b border-[#F0F3F7] bg-white px-5 py-4 lg:flex">
                                <div className="w-1/2">
                                    <div className="flex items-center">
                                        <div>
                                            <Image
                                                src={
                                                    order.items_count > 0 &&
                                                    order.items[0].product
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
                                                {order.items_count > 0 &&
                                                    order.items[0].product.name}
                                            </div>
                                            <div className="text-md font-bold">
                                                {order.total_price.formatted}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <div className="flex items-center justify-end">
                                        <Link href={`/order/${order.id}`}>
                                            <div className="cursor-pointer items-center justify-center rounded-lg border bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#B1B1B1]">
                                                Detail Pesanan
                                            </div>
                                        </Link>
                                        {/* <Link href={`/payment-method/${order.id}`}> */}
                                        <div
                                            onClick={() =>
                                                handleGetInvoice(order.id)
                                            }
                                            className="ml-2 cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                            Bayar Sekarang
                                        </div>
                                        {/* </Link> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* End : View Website */}

                        {/* Start : View Mobile */}
                        {orders.map((order, index) => (
                            <div
                                key={index}
                                className="m-4 flex flex-col items-center rounded-xl bg-white px-5 py-4 shadow lg:hidden">
                                <div className="flex items-center">
                                    <div className="w-1/3">
                                        <Image
                                            src="/product.png"
                                            width={100}
                                            height={100}
                                            alt="cart-product"
                                            priority={false}
                                        />
                                    </div>
                                    <div className="ml-5 w-2/3 text-sm leading-6">
                                        <div className="text-md pb-1">
                                            Motul ATF VI Automatic Transmission
                                            Fluid 105774
                                        </div>
                                        <div className="text-md font-bold">
                                            {order.total_price.formatted}
                                        </div>
                                        <div className="mt-2 cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                            Bayar Sekarang
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* End : View Mobile */}
                    </div>
                </div>
                <Footer />
            </div>
        </Suspense>
    )
}

export default WaitingPayment
