"use client"

import FloatingIcon from "@/components/FloatingIcon"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Pagination from "@/components/Pagination"
import SidebarProfile from "@/components/SidebarProfile"
import { useAuth } from "@/hooks/auth"
import { fetchOrders } from "@/store/slices/orderSlice"
import {
    ArrowLeftIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function Order() {
    const { user } = useAuth({ middleware: "auth" })
    const dispatch = useDispatch()
    const router = useRouter()
    const orders = useSelector(state => state.orders.orders)
    const currentPage = useSelector(state => state.orders.currentPage || 1)
    const totalPages = useSelector(state => state.orders.totalPages)
    const [isOpenLiveStatus, setIsOpenLiveStatus] = useState(false)
    const [status, setStatus] = useState(null)
    const [search, setSearch] = useState("")
    const [descStatus, setDescStatus] = useState("")
    const [isOpenStatusMobile, setIsOpenStatusMobile] = useState(false)

    useEffect(() => {
        if (currentPage) {
            dispatch(
                fetchOrders({
                    currentPage,
                    filters: { type: "orders" },
                }),
            ) // pastikan currentPage tidak undefined
        }
    }, [currentPage, dispatch])

    const handlePageChange = page => {
        if (page) {
            router.push(`?page=${page}`)
            dispatch(
                fetchOrders({
                    currentPage: page,
                    filters: { type: "orders" },
                }),
            )
        }
    }

    const handleStatusChange = (status, desc) => {
        setDescStatus(desc)
        setStatus(status)
        setIsOpenStatusMobile(false) // Close dropdown after selecting a status
        setStatus(status)
        console.log("====================================")
        console.log("status:", status)
        console.log("====================================")
        dispatch(
            fetchOrders({
                currentPage: 1,
                filters: { type: "orders", status: status },
            }),
        )
    }

    const handleSearchChange = e => {
        setSearch(e.target.value)
        dispatch(
            fetchOrders({
                currentPage: 1,
                filters: { type: "orders", search: e.target.value },
            }),
        )
    }

    const handleDateChange = e => {
        dispatch(
            fetchOrders({
                currentPage: 1,
                filters: { type: "orders", date: e.target.value },
            }),
        )
    }

    const handleClearFilter = () => {
        setSearch("")
        setStatus(null)
        setDescStatus("")
        dispatch(
            fetchOrders({
                currentPage: 1,
                filters: { type: "orders" },
            }),
        )
    }

    if (!orders) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <div className="text-lg font-semibold">Loading...</div>
                    <div className="mt-2 text-gray-500">Please wait...</div>
                </div>
            </div>
        )
    }

    console.log("====================================")
    console.log("user:", user)
    console.log("orders:", orders)
    console.log("search:", search)
    console.log("status:", status)
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
                    </div>
                    <div className="mt-8 hidden items-center lg:flex">
                        <div className="mr-5 text-base font-bold">Status</div>
                        <div
                            onClick={() => handleStatusChange(null)}
                            className={`mx-2 cursor-pointer rounded-lg border px-6 py-2 text-base hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185] ${status === null ? "border-[#007185] bg-[#0071850D] text-[#007185]" : "border-[#BFC9D9] text-[#6D7588]"}}`}>
                            Semua
                        </div>
                        <div
                            onClick={() =>
                                setIsOpenLiveStatus(!isOpenLiveStatus)
                            }
                            className={`mx-2 cursor-pointer rounded-lg border px-6 py-2 text-base hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185] ${status === null ? "border-[#007185] bg-[#0071850D] text-[#007185]" : "border-[#BFC9D9] text-[#6D7588]"}}`}>
                            Berlangsung
                        </div>
                        <div
                            onClick={() => handleStatusChange(null)}
                            className={`mx-2 cursor-pointer rounded-lg border px-6 py-2 text-base hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185] ${status === null ? "border-[#007185] bg-[#0071850D] text-[#007185]" : "border-[#BFC9D9] text-[#6D7588]"}}`}>
                            Berhasil
                        </div>
                        <div
                            onClick={() => handleStatusChange(null)}
                            className={`mx-2 cursor-pointer rounded-lg border px-6 py-2 text-base hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185] ${status === null ? "border-[#007185] bg-[#0071850D] text-[#007185]" : "border-[#BFC9D9] text-[#6D7588]"}}`}>
                            Tidak Berhasil
                        </div>
                    </div>
                    {isOpenLiveStatus && (
                        <div className="my-2 hidden items-center lg:flex">
                            <div
                                onClick={() =>
                                    handleStatusChange("waiting_confirmation")
                                }
                                className={`mr-2 cursor-pointer rounded-lg border px-6 py-2 text-base hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185] ${status === "waiting_confirmation" ? "border-[#007185] bg-[#0071850D] text-[#007185]" : "border-[#BFC9D9] text-[#6D7588]"}}`}>
                                Menunggu Konfirmasi
                            </div>
                            <div
                                onClick={() => handleStatusChange("processing")}
                                className={`mx-2 cursor-pointer rounded-lg border px-6 py-2 text-base hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185] ${status === "processing" ? "border-[#007185] bg-[#0071850D] text-[#007185]" : "border-[#BFC9D9] text-[#6D7588]"}}`}>
                                Diproses
                            </div>
                            <div
                                onClick={() => handleStatusChange("shipped")}
                                className={`mx-2 cursor-pointer rounded-lg border px-6 py-2 text-base hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185] ${status === "shipped" ? "border-[#007185] bg-[#0071850D] text-[#007185]" : "border-[#BFC9D9] text-[#6D7588]"}}`}>
                                Dikirim
                            </div>
                            <div
                                onClick={() => handleStatusChange("delivered")}
                                className={`mx-2 cursor-pointer rounded-lg border px-6 py-2 text-base hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185] ${status === "delivered" ? "border-[#007185] bg-[#0071850D] text-[#007185]" : "border-[#BFC9D9] text-[#6D7588]"}}`}>
                                Tiba di Tujuan
                            </div>
                            <div
                                onClick={() => handleStatusChange("canceled")}
                                className={`mx-2 cursor-pointer rounded-lg border px-6 py-2 text-base hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185] ${status === "canceled" ? "border-[#007185] bg-[#0071850D] text-[#007185]" : "border-[#BFC9D9] text-[#6D7588]"}}`}>
                                Dibatalkan
                            </div>
                        </div>
                    )}
                    {/* Mobile View */}
                    {/* <div className="mt-4 flex items-center justify-between overflow-x-auto whitespace-nowrap px-4 lg:hidden">
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
                    </div> */}
                    {/* Mobile View */}
                    <div className="mt-4 flex items-center justify-between overflow-x-auto whitespace-nowrap px-4 lg:hidden">
                        <div
                            className="rounded-full bg-[#F5F5F5] p-2 text-[#6D7588]"
                            onClick={handleClearFilter}>
                            <XMarkIcon className="h-6 w-6" />
                        </div>

                        <div
                            onClick={() =>
                                setIsOpenStatusMobile(!isOpenStatusMobile)
                            }
                            className="mx-2 flex cursor-pointer items-center rounded-full border border-[#007185] bg-[#F4FDFF] px-4 py-2 text-sm font-semibold text-[#007185]">
                            {descStatus || "Pilih Status"}
                            {isOpenStatusMobile ? (
                                <ChevronUpIcon className="ml-2 h-6 w-6" />
                            ) : (
                                <ChevronDownIcon className="ml-2 h-6 w-6" />
                            )}
                        </div>

                        <input
                            className="w-full rounded-full border border-[#BFBFBF] py-2 text-black focus:border-secondary focus:ring-0"
                            placeholder="Pilih Tanggal Transaksi"
                            type="date"
                            onChange={handleDateChange}
                        />
                    </div>

                    {/* Mobile Status Dropdown */}
                    {isOpenStatusMobile && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="w-full max-w-md rounded-lg bg-white p-4">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="text-lg font-semibold">
                                        Pilih Status
                                    </div>
                                    <XMarkIcon
                                        className="h-6 w-6 cursor-pointer"
                                        onClick={() =>
                                            setIsOpenStatusMobile(false)
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div
                                        onClick={() =>
                                            handleStatusChange(null, "Semua")
                                        }
                                        className={`cursor-pointer rounded-lg border px-6 py-2 text-base hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185] ${status === null ? "border-[#007185] bg-[#0071850D] text-[#007185]" : "border-[#BFC9D9] text-[#6D7588]"}`}>
                                        Semua
                                    </div>
                                    <div
                                        onClick={() =>
                                            handleStatusChange(
                                                "waiting_confirmation",
                                                "Menunggu Konfirmasi",
                                            )
                                        }
                                        className={`cursor-pointer rounded-lg border px-6 py-2 text-base hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185] ${status === "waiting_confirmation" ? "border-[#007185] bg-[#0071850D] text-[#007185]" : "border-[#BFC9D9] text-[#6D7588]"}`}>
                                        Menunggu Konfirmasi
                                    </div>
                                    <div
                                        onClick={() =>
                                            handleStatusChange(
                                                "processing",
                                                "Diproses",
                                            )
                                        }
                                        className={`cursor-pointer rounded-lg border px-6 py-2 text-base hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185] ${status === "processing" ? "border-[#007185] bg-[#0071850D] text-[#007185]" : "border-[#BFC9D9] text-[#6D7588]"}`}>
                                        Diproses
                                    </div>
                                    <div
                                        onClick={() =>
                                            handleStatusChange(
                                                "shipped",
                                                "Dikirim",
                                            )
                                        }
                                        className={`cursor-pointer rounded-lg border px-6 py-2 text-base hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185] ${status === "shipped" ? "border-[#007185] bg-[#0071850D] text-[#007185]" : "border-[#BFC9D9] text-[#6D7588]"}`}>
                                        Dikirim
                                    </div>
                                    <div
                                        onClick={() =>
                                            handleStatusChange(
                                                "delivered",
                                                "Tiba di Tujuan",
                                            )
                                        }
                                        className={`cursor-pointer rounded-lg border px-6 py-2 text-base hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185] ${status === "delivered" ? "border-[#007185] bg-[#0071850D] text-[#007185]" : "border-[#BFC9D9] text-[#6D7588]"}`}>
                                        Tiba di Tujuan
                                    </div>
                                    <div
                                        onClick={() =>
                                            handleStatusChange(
                                                "canceled",
                                                "Dibatalkan",
                                            )
                                        }
                                        className={`cursor-pointer rounded-lg border px-6 py-2 text-base hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185] ${status === "canceled" ? "border-[#007185] bg-[#0071850D] text-[#007185]" : "border-[#BFC9D9] text-[#6D7588]"}`}>
                                        Dibatalkan
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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
                            className="m-4 flex flex-col items-center rounded-xl bg-white px-5 py-4 shadow lg:hidden"
                            onClick={() => router.push(`/order/${order.id}`)}>
                            <div className="flex w-full items-center">
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

            {orders && orders.length > 15 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
            <Footer />

            <FloatingIcon />
        </div>
    )
}

export default Order
