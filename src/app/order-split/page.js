"use client"

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Pagination from "@/components/Pagination"
import SidebarProfile from "@/components/SidebarProfile"
import { useAuth } from "@/hooks/auth"
import {
    fetchInvoiceOrder,
    fetchOrders,
    getMyInvoice,
} from "@/store/slices/orderSlice"
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function OrderSplit() {
    // const searchParams = useSearchParams()
    // const currentPage = parseInt(searchParams.get("page")) || 1
    const { user } = useAuth({ middleware: "auth" })
    const router = useRouter()
    const dispatch = useDispatch()
    const orders = useSelector(state => state.orders.orders)
    const myInvoice = useSelector(state => state.orders.myInvoice)
    const currentPage = useSelector(state => state.orders.currentPage || 1)
    const totalPages = useSelector(state => state.orders.totalPages)
    const [isRedirectTo, setIsRedirectTo] = useState(false)

    useEffect(() => {
        if (currentPage) {
            dispatch(
                fetchOrders({
                    currentPage,
                    filters: { type: "split_payment" },
                }),
            ) // pastikan currentPage tidak undefined
        }
    }, [currentPage, dispatch])

    const handleGetInvoice = orderId => {
        dispatch(fetchInvoiceOrder(orderId))
        dispatch(getMyInvoice(orderId))
        setIsRedirectTo(true)
    }

    // console.log("====================================")
    // console.log("myInvoice:", myInvoice)
    // console.log("====================================")

    useEffect(() => {
        if (myInvoice && isRedirectTo) {
            if (myInvoice.payment_url) {
                // console.log("====================================")
                // console.log("myInvoice.payment_url:", myInvoice.payment_url)
                // console.log("====================================")
                window.location.href = myInvoice.payment_url
            } else {
                // console.log("====================================")
                // console.log("myInvoice:", myInvoice)
                // console.log("====================================")
                router.push("/payment-nominal/")
            }
        }
    }, [myInvoice])

    const handlePageChange = page => {
        if (page) {
            router.push(`?page=${page}`)
            dispatch(
                fetchOrders({
                    currentPage: page,
                    filters: { type: "split_payment" },
                }),
            )
        }
    }

    const handleSearchChange = e => {
        dispatch(
            fetchOrders({
                currentPage: 1,
                filters: { type: "split_payment", search: e.target.value },
            }),
        )
    }

    const handleDateChange = e => {
        dispatch(
            fetchOrders({
                currentPage: 1,
                filters: { type: "split_payment", date: e.target.value },
            }),
        )
    }

    if (!orders) return <div>Loading ... </div>

    console.log("====================================")
    console.log("orders:", orders)
    console.log("user:", user)

    console.log("====================================")

    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <Link href="/">
                    <ArrowLeftIcon
                        className="h-6 w-6"
                        onClick={() => router.back()}
                    />
                </Link>
                <div className="ml-2 font-semibold">Pembayaran Patungan</div>
            </div>
            <div className="mx-auto min-h-screen max-w-7xl lg:flex">
                <div className="hidden w-1/5 p-7 lg:block">
                    <SidebarProfile />
                </div>
                <div className="w-5/5 py-4 lg:w-4/5 lg:p-7 lg:px-4">
                    <div className="hidden pb-1 text-2xl font-bold lg:block">
                        Pembayaran Patungan
                    </div>
                    <div className="mt-4 flex items-center px-4 lg:mt-10 lg:px-0">
                        <div className="item-center mr-2 w-full lg:mb-0 lg:flex lg:w-8/12">
                            <input
                                className="mr-4 w-full rounded-lg border border-[#BFBFBF] py-2 pl-14 text-black bg-search focus:border-secondary focus:ring-0"
                                placeholder="Cari pesananmu"
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div className="item-center hidden w-full lg:flex lg:w-4/12">
                            <input
                                className="w-full rounded-lg border border-[#BFBFBF] py-2 text-black focus:border-secondary focus:ring-0"
                                placeholder="Pilih Tanggal Transaksi"
                                type="date"
                                onChange={handleDateChange}
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
                            className="hidden border-b border-[#F0F3F7] px-5 py-4 lg:block">
                            <div className="flex items-center">
                                <div className="mr-4 text-sm font-bold">
                                    Tanggal Transaksi
                                </div>
                                <div className="text-sm">
                                    {order.order_date}
                                </div>
                            </div>
                            <div className="hidden items-center bg-white lg:flex">
                                <div className="w-4/12">
                                    <div className="flex items-center">
                                        <div>
                                            <Image
                                                src="/order.svg"
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
                                <div className="w-2/12 text-sm leading-6">
                                    <div className="text-md pb-1">
                                        Metode Pembayaran
                                    </div>
                                    <div className="text-md font-bold">
                                        {order.invoices_count > 0 &&
                                        order.invoices &&
                                        order.invoices[0]?.payment_method
                                            ? order.invoices[0]?.payment_method
                                                  .name || "-"
                                            : "-"}
                                    </div>
                                </div>
                                <div className="w-2/12 text-sm leading-6">
                                    <div className="text-md pb-1">
                                        Total Tagihan
                                    </div>
                                    <div className="text-md font-bold">
                                        {order.total_price.formatted}
                                    </div>
                                </div>
                                <div className="w-4/12">
                                    <div className="flex items-center justify-end">
                                        <Link href={`/order-split/${order.id}`}>
                                            <div className="cursor-pointer items-center justify-center rounded-lg border bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#B1B1B1]">
                                                Detail Pesanan
                                            </div>
                                        </Link>
                                        <div
                                            onClick={() =>
                                                handleGetInvoice(order.id)
                                            }
                                            className="ml-2 cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                            Bayar Sekarang
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* End : View Website */}

                    {/* Start : View Mobile */}
                    {orders.map((order, index) => (
                        <div
                            key={index}
                            className="m-4 flex items-center rounded-xl bg-white px-5 py-4 shadow lg:hidden">
                            <div className="flex items-center">
                                <div className="w-1/3">
                                    <Image
                                        src="/order.svg"
                                        width={100}
                                        height={100}
                                        alt="cart-product"
                                        priority={false}
                                    />
                                </div>
                                <div className="ml-5 w-2/3 text-sm leading-6">
                                    <div className="text-md pb-1">
                                        {order.items_count > 0 &&
                                            order.items[0].product.name}
                                    </div>
                                    <div className="text-md font-bold">
                                        {order.total_price.formatted}
                                    </div>
                                    <div
                                        onClick={() =>
                                            handleGetInvoice(order.id)
                                        }
                                        className="mt-2 cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                        Bayar Sekarang
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* End : View Mobile */}
                </div>
            </div>
            {orders && orders.length > 15 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
            <Footer />
        </div>
    )
}

export default OrderSplit
