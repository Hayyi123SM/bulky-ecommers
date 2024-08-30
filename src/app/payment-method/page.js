"use client"

import Navbar from "@/components/Navbar"
import {
    fetchCarts,
    placeOrders,
    searchFriends,
} from "@/store/slices/cartSlice"
import { getMyInvoice } from "@/store/slices/orderSlice"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import {
    ArrowLeftIcon,
    CheckIcon,
    ChevronDownIcon,
    MinusCircleIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/solid"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function PaymentMethod() {
    const router = useRouter()
    const [selectedOption, setSelectedOption] = useState("Pilihan Cara Bayar")
    const [selectedIcon, setSelectedIcon] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenAddFriend, setIsOpenAddFriend] = useState(false)
    const [isOpenListFriend, setIsOpenListFriend] = useState(false)
    const [isSplitPayment, setIsSplitPayment] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [selectedFriend, setSelectedFriend] = useState([])
    const dispatch = useDispatch()
    const cart = useSelector(state => state.carts.cart)
    const order = useSelector(state => state.carts.order)
    const friendList = useSelector(state => state.carts.friends)
    const myInvoice = useSelector(state => state.orders.myInvoice)

    const handleOptionClick = (icon, option) => {
        setSelectedOption(option)
        setSelectedIcon(icon)
        setIsOpen(false)

        if (option === "Bayar Patungan dengan Teman") {
            setPaymentMethod("split_payment")
            setIsSplitPayment(true)
        } else {
            setPaymentMethod("single_payment")
            setIsSplitPayment(false)
        }
    }

    useEffect(() => {
        dispatch(fetchCarts())
    }, [dispatch])
    // "single_payment/split_payment"
    const handlePlaceOrder = () => {
        if (paymentMethod === "split_payment") {
            const payment_type = "split_payment"
            const friend_ids = []
            for (let i = 0; i < selectedFriend.length; i++) {
                friend_ids.push(selectedFriend[i].id)
            }
            dispatch(placeOrders({ payment_type, friend_ids }))
        } else if (paymentMethod === "single_payment") {
            const payment_type = "single_payment"
            const friend_ids = []
            dispatch(placeOrders({ payment_type, friend_ids }))
        } else {
            setPaymentMethod("none")
        }
    }

    const handleSearchFriend = username => {
        dispatch(searchFriends(username))
        console.log("friendList:", friendList)
    }

    const handleSelectedFriend = friend => {
        setSelectedFriend([...selectedFriend, friend])
    }

    const handleRemoveFriend = friend => {
        setSelectedFriend(selectedFriend.filter(f => f.id !== friend.id))
    }

    useEffect(() => {
        console.log("====================================")
        console.log("order:", order)
        console.log("====================================")
        if (order && order.invoices.length > 0) {
            dispatch(getMyInvoice(order.id))
            localStorage.setItem("order", JSON.stringify(order))
        }
    }, [dispatch, order])

    useEffect(() => {
        console.log("====================================")
        console.log("order:", order)
        console.log("myInvoice:", myInvoice)
        console.log("====================================")
        if (order && myInvoice.need_input_amount === true) {
            router.push("/payment-nominal/")
        }
        if (order && myInvoice.need_input_amount === false) {
            router.push("/payment-method/" + myInvoice.id)
        }
    }, [myInvoice, router])

    if (!cart) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className="hidden lg:block">
                <Navbar />
            </div>
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon className="h-6 w-6" />
                <div className="ml-2 font-semibold">Pembayaran</div>
            </div>
            <div className="min-h-screen bg-[#F5F5F5] pb-10">
                <div className="mx-auto max-w-7xl">
                    <div className="hidden justify-center py-5 lg:flex">
                        <div className="w-full text-2xl font-extrabold lg:max-w-xl">
                            Pembayaran
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center lg:py-2">
                        <div className="h-fit w-full bg-white p-8 lg:max-w-xl lg:rounded-xl">
                            <div className="py-2">
                                <div className="py-2 text-sm font-bold text-[#6D7588]">
                                    PILIH CARA BAYAR
                                </div>
                                <div className="relative w-full lg:max-w-xl">
                                    <div
                                        className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 p-2 font-bold focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33] ${paymentMethod === "none" && "border-red-500"}`}
                                        onClick={() => setIsOpen(!isOpen)}>
                                        <div className="flex items-center">
                                            {selectedOption !==
                                                "Pilihan Cara Bayar" && (
                                                <Image
                                                    src={selectedIcon}
                                                    width={24}
                                                    height={24}
                                                    alt="Gopay"
                                                    className="mr-2"
                                                    priority={false}
                                                />
                                            )}
                                            {selectedOption}
                                        </div>
                                        <div className="flex items-center">
                                            <ChevronDownIcon className="inline-block h-5 w-5" />
                                            {paymentMethod === "none" && (
                                                <InformationCircleIcon className="inline-block h-5 w-5 text-red-500" />
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className={`mt-1 w-full rounded-lg border border-[#F0F3F7] bg-white p-2 shadow-lg transition-all duration-300 ease-in-out ${
                                            isOpen
                                                ? "max-h-screen opacity-100"
                                                : "max-h-0 overflow-hidden opacity-0"
                                        }`}>
                                        <div
                                            className="flex cursor-pointer items-center border-b border-[#F0F3F7] p-2 text-sm hover:rounded-lg hover:bg-[#F5F5F5]"
                                            onClick={() =>
                                                handleOptionClick(
                                                    "/single.svg",
                                                    "Bayar Langsung",
                                                )
                                            }>
                                            <Image
                                                src="/single.svg"
                                                width={24}
                                                height={24}
                                                alt="single"
                                                className="mr-2"
                                                priority={false}
                                            />
                                            Bayar Langsung
                                        </div>
                                        <div
                                            className="flex cursor-pointer items-center border-b border-[#F0F3F7] p-2 text-sm hover:rounded-lg hover:bg-[#F5F5F5]"
                                            onClick={() =>
                                                handleOptionClick(
                                                    "/split.svg",
                                                    "Bayar Patungan dengan Teman",
                                                )
                                            }>
                                            <Image
                                                src="/split.svg"
                                                width={24}
                                                height={24}
                                                alt="split"
                                                className="mr-2"
                                                priority={false}
                                            />
                                            Bayar Patungan dengan Teman
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`h-fit w-full transition-all duration-500 ease-in-out lg:max-w-xl ${isSplitPayment ? "mt-5 max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                            <div className="h-fit w-full rounded-t-xl bg-white p-8 lg:max-w-xl">
                                <div className="py-2">
                                    <div className="py-2 text-sm font-bold text-[#6D7588]">
                                        ADD YOUR FRIEND
                                    </div>
                                    <div className="relative w-full lg:max-w-xl">
                                        {selectedFriend.map(friend => (
                                            <div
                                                key={friend.id}
                                                className="mb-1 flex items-center justify-between">
                                                <div className="flex items-center py-1">
                                                    <div className="flex items-center">
                                                        <Image
                                                            src="https://dummyimage.com/400x400/b8b8b8/000105.png"
                                                            alt="Product"
                                                            width={40}
                                                            height={40}
                                                            className="rounded-full"
                                                            priority={false}
                                                        />
                                                    </div>
                                                    <div className="ml-4 text-sm leading-4">
                                                        <label className="text-sm">
                                                            {friend.name}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="p-3">
                                                    <MinusCircleIcon
                                                        className="h-6 w-6 cursor-pointer text-[#FF3838] hover:text-[#c84b4b]"
                                                        onClick={() =>
                                                            handleRemoveFriend(
                                                                friend,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-0.5 flex h-fit w-full items-center justify-center rounded-b-xl bg-white px-4 py-2 lg:max-w-xl">
                                <div
                                    className="flex w-fit cursor-pointer items-center justify-center p-2 hover:rounded-lg hover:bg-[#F5F5F5]"
                                    onClick={() =>
                                        setIsOpenAddFriend(!isOpenAddFriend)
                                    }>
                                    <PlusCircleIcon className="h-5 w-5 cursor-pointer text-[#007185] hover:text-[#00D5FB]" />
                                    <div className="ml-1 text-sm font-semibold text-[#007185]">
                                        Invite your friends
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`h-fit w-full rounded-xl bg-white transition-all duration-500 ease-in-out lg:max-w-xl ${isOpenAddFriend ? "mt-5 max-h-screen p-8 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                            <div className="py-2">
                                <div className="relative w-full lg:max-w-xl">
                                    <div
                                        className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 p-2 font-bold focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                        onClick={() =>
                                            setIsOpenListFriend(
                                                !isOpenListFriend,
                                            )
                                        }>
                                        <div className="flex items-center">
                                            Pilih Teman
                                        </div>
                                        <ChevronDownIcon className="inline-block h-5 w-5" />
                                    </div>
                                    <div
                                        className={`mt-1 w-full rounded-lg border border-[#F0F3F7] bg-white p-2 shadow-lg transition-all duration-300 ease-in-out ${
                                            isOpenListFriend
                                                ? "max-h-screen opacity-100"
                                                : "max-h-0 overflow-hidden opacity-0"
                                        }`}>
                                        <div className="flex cursor-pointer items-center border-b border-[#F0F3F7] p-2 text-sm hover:rounded-lg hover:bg-[#F5F5F5]">
                                            <input
                                                className="w-full rounded-lg border py-2 pl-14 text-black bg-search focus:border-secondary focus:ring-0"
                                                placeholder="Cari temanmu disini..."
                                                type="text"
                                                onChange={e =>
                                                    handleSearchFriend(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="max-h-60 overflow-auto">
                                            {friendList &&
                                                friendList.map(item => (
                                                    <div
                                                        key={item.id}
                                                        className="flex cursor-pointer items-center justify-between border-b border-[#F0F3F7] p-2 text-xs hover:rounded-lg hover:bg-[#F5F5F5]"
                                                        onClick={() =>
                                                            handleSelectedFriend(
                                                                item,
                                                            )
                                                        }>
                                                        <div className="flex items-center">
                                                            <Image
                                                                src="https://dummyimage.com/400x400/b8b8b8/000105.png"
                                                                width={32}
                                                                height={32}
                                                                alt="single"
                                                                className="mr-4 rounded-full"
                                                                priority={false}
                                                            />
                                                            {item.name}
                                                        </div>
                                                        {selectedFriend.some(
                                                            friend =>
                                                                friend.id ===
                                                                item.id,
                                                        ) && (
                                                            <CheckIcon className="ml-auto h-5 w-5 text-[#007185]" />
                                                        )}
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-10 mt-5 h-fit w-full rounded-t-xl bg-white p-8 lg:mb-0 lg:max-w-xl">
                            <div className="py-2">
                                <div className="py-2 text-base font-bold">
                                    Ringkasan Pembayaran
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-sm leading-6">
                                    <label className="text-sm font-light">
                                        Total Harga
                                    </label>
                                </div>
                                <div className="ml-5 text-right text-sm leading-6">
                                    <label className="text-md font-light">
                                        {cart.total_price.formatted}
                                    </label>
                                </div>
                            </div>
                            <div className="my-5 border-b p-1"> </div>
                            <div className="flex justify-between">
                                <div className="text-sm leading-6">
                                    <label className="text-sm font-semibold">
                                        Total Belanja
                                    </label>
                                </div>
                                <div className="ml-5 text-right text-sm leading-6">
                                    <label className="text-lg font-bold">
                                        {cart.total_price.formatted}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="mt-0.5 hidden h-fit w-full rounded-b-xl bg-white p-8 lg:block lg:max-w-xl">
                            {/* <Link href="/payment"> */}
                            <div
                                className="flex cursor-pointer items-center justify-center rounded-lg bg-secondary py-3 text-center text-sm font-bold hover:bg-[#e8bc00]"
                                onClick={handlePlaceOrder}>
                                {/* <ShieldCheckIcon className="mr-2 h-5 w-5 text-black" /> */}
                                Buat Pesanan
                            </div>
                            {/* </Link> */}
                        </div>
                        <div className="fixed bottom-0 left-0 right-0 block w-full px-5 py-5 shadow-lg lg:hidden">
                            {/* <Link href="/payment"> */}
                            <div
                                className="flex cursor-pointer items-center justify-center rounded-lg bg-secondary py-3 text-center text-sm font-bold hover:bg-[#e8bc00]"
                                onClick={handlePlaceOrder}>
                                {/* <ShieldCheckIcon className="mr-2 h-5 w-5 text-black" /> */}
                                Buat Pesanan
                            </div>
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default PaymentMethod
