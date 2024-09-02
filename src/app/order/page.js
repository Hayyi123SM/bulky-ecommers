"use client"

import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import { useAuth } from "@/hooks/auth"
import SearchParamsHandler from "@/lib/searchParams"
import { fetchOrders } from "@/store/slices/orderSlice"
import {
    ArrowLeftIcon,
    ChevronDownIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { Suspense, useMemo } from "react"
import { useSelector } from "react-redux"

function Order() {
    const { user } = useAuth()
    const orders = useSelector(state => state.orders.orders)

    const memoizedActions = useMemo(
        () => [
            page =>
                fetchOrders({
                    page: page,
                    type: "orders",
                    perPage: "",
                    search: "",
                    date: "",
                    status: "",
                }),
        ],
        [user],
    )

    if (!orders) return <div>Loading ... </div>

    // console.log("====================================")
    // console.log("user:", user)
    // console.log("orders:", orders)
    // console.log("====================================")

    return (
        <div>
            <Suspense fallback={<div>Loading ... </div>}>
                <SearchParamsHandler
                    actions={memoizedActions}
                    // onPageChange={setCurrentPage}
                />
            </Suspense>
            <div className="hidden lg:block">
                <Navbar />
            </div>
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon className="h-6 w-6" />
                <div className="ml-2 font-semibold">Status Pesanan</div>
            </div>
            <div className="mx-auto min-h-screen max-w-7xl lg:flex">
                <div className="hidden w-1/5 p-7 lg:block">
                    <SidebarProfile />
                </div>
                <div className="w-5/5 py-4 lg:w-4/5 lg:p-7 lg:px-4">
                    <div className="hidden pb-1 text-2xl font-bold lg:block">
                        Status Pesanan
                    </div>
                    <div className="mt-4 flex flex-col items-center px-4 lg:mt-10 lg:flex-row lg:px-0">
                        <div className="item-center mb-4 w-full lg:mb-0 lg:flex lg:w-8/12">
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
                    </div>
                    <div className="mt-8 hidden items-center lg:flex">
                        <div className="mr-5 text-base font-bold">Status</div>
                        <div className="mx-2 rounded-lg border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                            Semua
                        </div>
                        <div className="mx-2 rounded-lg border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                            Berlangsung
                        </div>
                        <div className="mx-2 rounded-lg border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                            Berhasil
                        </div>
                        <div className="mx-2 rounded-lg border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                            Tidak Berhasil
                        </div>
                    </div>
                    <div className="my-2 hidden items-center lg:flex">
                        <div className="mr-2 rounded-lg border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                            Menunggu Konfirmasi
                        </div>
                        <div className="mx-2 rounded-lg border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                            Diproses
                        </div>
                        <div className="mx-2 rounded-lg border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                            Dikirim
                        </div>
                        <div className="mx-2 rounded-lg border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                            Tiba di Tujuan
                        </div>
                        <div className="mx-2 rounded-lg border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                            Dikomplain
                        </div>
                    </div>
                    <div className="flex items-center justify-between overflow-x-auto whitespace-nowrap px-4 lg:hidden">
                        <div className="rounded-full bg-[#F5F5F5] p-2 text-[#6D7588]">
                            <XMarkIcon className="h-6 w-6" />
                        </div>
                        <div className="mx-2 flex items-center rounded-full border border-[#007185] bg-[#F4FDFF] px-4 py-2 text-sm font-semibold text-[#007185]">
                            Semua Status
                            <ChevronDownIcon className="ml-2 h-6 w-6" />
                        </div>
                        <div className="flex items-center rounded-full bg-[#F5F5F5] px-4 py-2 text-sm text-[#6D7588]">
                            Semua Tanggal
                            <ChevronDownIcon className="ml-2 h-6 w-6" />
                        </div>
                    </div>
                    {/* Start : View Website */}
                    {orders.map((order, index) => (
                        <div
                            key={index}
                            className="hidden items-center border-b border-[#F0F3F7] bg-white px-5 py-4 lg:flex">
                            <div className="w-1/2 border-r">
                                <div className="flex items-center">
                                    <div>
                                        <Image
                                            src={
                                                order.items_count > 0 &&
                                                order.items[0].product.images[0]
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
                                <div className="flex items-center justify-between">
                                    <div className="ml-5 text-sm leading-6">
                                        <div className="text-md pb-1">
                                            Status Pesanan:
                                        </div>
                                        <div
                                            className={`w-fit rounded-lg bg-[${order.order_status.color}] px-2 py-1 text-xs font-semibold text-[#007185]`}>
                                            {order.order_status.label}
                                        </div>
                                    </div>
                                    <Link href={`/order/${order.id}`}>
                                        <div className="cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                            Lacak Pesanan
                                        </div>
                                    </Link>
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
                                        src={
                                            order.items_count > 0 &&
                                            order.items[0].product.images[0]
                                        }
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
                                        className={`mt-2 w-fit rounded-xl bg-[${order.order_status.color}] px-2 py-1 text-xs font-semibold text-[#007185]`}>
                                        {order.order_status.label}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* End : View Mobile */}
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default Order
