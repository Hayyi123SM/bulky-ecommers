"use client"

import FloatingIcon from "@/components/FloatingIcon"
import Navbar from "@/components/Navbar"
import { applyCoupon, clearCoupon, fetchCheckout, placeOrders, searchFriends } from "@/store/slices/cartSlice"
import { getMyInvoice } from "@/store/slices/orderSlice"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon, CheckIcon, ChevronDownIcon, MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTranslations } from "next-intl"
import Cookies from "js-cookie"
import WarehouseInformation from "@/components/WarehouseInformation"

function PaymentMethod() {
    const t = useTranslations()
    const router = useRouter()
    const [selectedOption, setSelectedOption] = useState("")
    const [defaultText, setDefaultText] = useState("")
    const [singlePaymentText, setSinglePaymentText] = useState("")
    const [splitPaymentText, setSplitPaymentText] = useState("")
    const [selectedIcon, setSelectedIcon] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenAddFriend, setIsOpenAddFriend] = useState(false)
    const [isOpenListFriend, setIsOpenListFriend] = useState(false)
    const [isSplitPayment, setIsSplitPayment] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [selectedFriend, setSelectedFriend] = useState([])
    const dispatch = useDispatch()
    const cart = useSelector(state => state.carts.checkout)
    const order = useSelector(state => state.carts.order)
    const friendList = useSelector(state => state.carts.friends)
    const myInvoice = useSelector(state => state.orders.myInvoice)
    const coupon = useSelector(state => state.carts.coupon)
    const [activeCoupon, setActiveCoupon] = useState(null)

    // console.log("====================================")
    console.log("coupon", coupon)
    // console.log("====================================")

    useEffect(() => {
        // Ambil bahasa dari Cookies
        const language = Cookies.get("locale") || "id" // Default ke 'id' jika cookie tidak ditemukan

        // Sesuaikan teks default berdasarkan bahasa
        const defaultText = language === "en" ? "Select Payment Method" : "Pilihan Cara Bayar"

        setSinglePaymentText(language === "en" ? "Direct Payment" : "Bayar Langsung")
        setSplitPaymentText(language === "en" ? "Split Payment with Friends" : "Bayar Patungan dengan Teman")
        setDefaultText(defaultText)
        setSelectedOption(defaultText) // Set nilai awal `selectedOption`
    }, [])

    const handleOptionClick = (icon, option) => {
        setSelectedIcon(icon)
        setIsOpen(false)

        if (option === "Bayar Patungan dengan Teman") {
            setPaymentMethod("split_payment")
            setIsSplitPayment(true)
            setSelectedOption(splitPaymentText)
        } else {
            setPaymentMethod("single_payment")
            setIsSplitPayment(false)
            setSelectedOption(singlePaymentText)
        }
    }

    useEffect(() => {
        dispatch(fetchCheckout())
        // dispatch(fetchCarts())
    }, [dispatch])

    useEffect(() => {
        if (cart) {
            setActiveCoupon(cart.coupon_code)
        }
    }, [cart])
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
        // console.log("friendList:", friendList)
    }

    const handleSelectedFriend = friend => {
        setSelectedFriend([...selectedFriend, friend])
    }

    const handleRemoveFriend = friend => {
        setSelectedFriend(selectedFriend.filter(f => f.id !== friend.id))
    }

    const handleCoupon = coupon => {
        if (coupon === null || coupon === "") {
            dispatch(clearCoupon({ coupon_code: "" }))
        } else {
            dispatch(applyCoupon({ coupon_code: coupon }))
        }
    }

    useEffect(() => {
        if (coupon) {
            dispatch(applyCoupon({ coupon_code: coupon }))
        }
    }, [coupon])

    useEffect(() => {
        // console.log("====================================")
        // console.log("order:", order)
        // console.log("====================================")
        if (order && order.invoices.length > 0) {
            dispatch(getMyInvoice(order.id))
            localStorage.setItem("order", JSON.stringify(order))
        }
    }, [dispatch, order])

    useEffect(() => {
        // console.log("====================================")
        // console.log("order:", order)
        // console.log("myInvoice:", myInvoice)
        // console.log("====================================")
        if (order && myInvoice.need_input_amount === true) {
            router.push("/payment-nominal/")
        }
        if (order && myInvoice.need_input_amount === false) {
            router.push("/payment-method/" + myInvoice.id)
        }
    }, [myInvoice, router])

    if (!cart) {
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
                <ArrowLeftIcon className="h-6 w-6" onClick={() => router.back()} />
                <div className="ml-2 font-semibold">{t("paymentMethod.paymentMethod")}</div>
            </div>
            <div className="min-h-screen bg-[#F5F5F5] pb-10">
                <div className="mx-auto max-w-7xl">
                    <div className="hidden justify-center py-5 lg:flex">
                        <div className="w-full text-2xl font-extrabold lg:max-w-xl">{t("paymentMethod.paymentMethod")}</div>
                    </div>
                    <div className="flex flex-col items-center justify-center lg:py-2">
                        <div className="h-fit w-full bg-white p-8 lg:max-w-xl lg:rounded-xl">
                            <div className="py-2">
                                <div className="py-2 text-sm font-bold text-[#6D7588]">{t("paymentMethod.selectPayment")}</div>
                                <div className="relative w-full lg:max-w-xl">
                                    <div
                                        className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 p-2 font-bold focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33] ${paymentMethod === "none" && "border-red-500"}`}
                                        onClick={() => setIsOpen(!isOpen)}>
                                        <div className="flex items-center">
                                            {selectedOption !== defaultText && <Image src={selectedIcon} width={24} height={24} alt="Gopay" className="mr-2" priority={false} />}
                                            {selectedOption}
                                        </div>
                                        <div className="flex items-center">
                                            <ChevronDownIcon className="inline-block h-5 w-5" />
                                            {paymentMethod === "none" && <InformationCircleIcon className="inline-block h-5 w-5 text-red-500" />}
                                        </div>
                                    </div>
                                    <div className={`mt-1 w-full rounded-lg border border-[#F0F3F7] bg-white p-2 shadow-lg transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}>
                                        <div className="flex cursor-pointer items-center border-b border-[#F0F3F7] p-2 text-sm hover:rounded-lg hover:bg-[#F5F5F5]" onClick={() => handleOptionClick("/single.svg", "Bayar Langsung")}>
                                            <Image src="/single.svg" width={24} height={24} alt="single" className="mr-2" priority={false} />
                                            {t("paymentMethod.directPayment")}
                                        </div>
                                        <div className="flex cursor-pointer items-center border-b border-[#F0F3F7] p-2 text-sm hover:rounded-lg hover:bg-[#F5F5F5]" onClick={() => handleOptionClick("/split.svg", "Bayar Patungan dengan Teman")}>
                                            <Image src="/split.svg" width={24} height={24} alt="split" className="mr-2" priority={false} />
                                            {t("paymentMethod.splitPayment")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`h-fit w-full transition-all duration-500 ease-in-out lg:max-w-xl ${isSplitPayment ? "mt-5 max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                            <div className="h-fit w-full rounded-t-xl bg-white p-8 lg:max-w-xl">
                                <div className="py-2">
                                    <div className="py-2 text-sm font-bold text-[#6D7588]">{t("paymentMethod.addFriend")}</div>
                                    <div className="relative w-full lg:max-w-xl">
                                        {selectedFriend.map(friend => (
                                            <div key={friend.id} className="mb-1 flex items-center justify-between">
                                                <div className="flex items-center py-1">
                                                    <div className="flex items-center">
                                                        <Image src="https://dummyimage.com/400x400/b8b8b8/000105.png" alt="Product" width={40} height={40} className="rounded-full" priority={false} />
                                                    </div>
                                                    <div className="ml-4 text-sm leading-4">
                                                        <label className="text-sm">{friend.name}</label>
                                                    </div>
                                                </div>
                                                <div className="p-3">
                                                    <MinusCircleIcon className="h-6 w-6 cursor-pointer text-[#FF3838] hover:text-[#c84b4b]" onClick={() => handleRemoveFriend(friend)} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-0.5 flex h-fit w-full items-center justify-center rounded-b-xl bg-white px-4 py-2 lg:max-w-xl">
                                <div className="flex w-fit cursor-pointer items-center justify-center p-2 hover:rounded-lg hover:bg-[#F5F5F5]" onClick={() => setIsOpenAddFriend(!isOpenAddFriend)}>
                                    <PlusCircleIcon className="h-5 w-5 cursor-pointer text-[#007185] hover:text-[#00D5FB]" />
                                    <div className="ml-1 text-sm font-semibold text-[#007185]">{t("paymentMethod.inviteFriend")}</div>
                                </div>
                            </div>
                        </div>
                        <div className={`h-fit w-full rounded-xl bg-white transition-all duration-500 ease-in-out lg:max-w-xl ${isOpenAddFriend ? "mt-5 max-h-screen p-8 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                            <div className="py-2">
                                <div className="relative w-full lg:max-w-xl">
                                    <div className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 p-2 font-bold focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]" onClick={() => setIsOpenListFriend(!isOpenListFriend)}>
                                        <div className="flex items-center">{t("paymentMethod.selectFriend")}</div>
                                        <ChevronDownIcon className="inline-block h-5 w-5" />
                                    </div>
                                    <div className={`mt-1 w-full rounded-lg border border-[#F0F3F7] bg-white p-2 shadow-lg transition-all duration-300 ease-in-out ${isOpenListFriend ? "max-h-screen opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}>
                                        <div className="flex cursor-pointer items-center border-b border-[#F0F3F7] p-2 text-sm hover:rounded-lg hover:bg-[#F5F5F5]">
                                            <input className="w-full rounded-lg border py-2 pl-14 text-black bg-search focus:border-secondary focus:ring-0" placeholder={t("other.searchYourFriend")} type="text" onChange={e => handleSearchFriend(e.target.value)} />
                                        </div>
                                        <div className="max-h-60 overflow-auto">
                                            {friendList.length > 0 ? (
                                                friendList.map(item => (
                                                    <div key={item.id} className="flex cursor-pointer items-center justify-between border-b border-[#F0F3F7] p-2 text-xs hover:rounded-lg hover:bg-[#F5F5F5]" onClick={() => handleSelectedFriend(item)}>
                                                        <div className="flex items-center">
                                                            <Image src="https://dummyimage.com/400x400/b8b8b8/000105.png" width={32} height={32} alt="single" className="mr-4 rounded-full" priority={false} />
                                                            {item.name}
                                                        </div>
                                                        {selectedFriend.some(friend => friend.id === item.id) && <CheckIcon className="ml-auto h-5 w-5 text-[#007185]" />}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="flex items-center justify-center border-b border-[#F0F3F7] p-2 text-xs hover:rounded-lg hover:bg-[#F5F5F5]">
                                                    <div className="flex items-center">{t("other.notFound")}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 h-fit w-full bg-white p-8 lg:max-w-xl lg:rounded-xl">
                            <div className="py-2">
                                <div className="py-2 text-sm font-bold text-[#6D7588]">{t("paymentMethod.coupon")}</div>
                                <div className="relative w-full lg:max-w-xl">
                                    <input className="w-full rounded-lg border px-2 py-2 text-black focus:border-secondary focus:outline-none" placeholder={t("other.inputCoupon")} onChange={e => handleCoupon(e.target.value)} type="text" defaultValue={activeCoupon} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 h-fit w-full lg:max-w-xl lg:rounded-xl">
                            <WarehouseInformation type={"Self Pickup"} />
                        </div>
                        <div className="mb-10 mt-5 h-fit w-full rounded-t-xl bg-white p-8 lg:mb-0 lg:max-w-xl">
                            <div className="py-2">
                                <div className="py-2 text-base font-bold">{t("paymentMethod.summaryOrder")}</div>
                            </div>
                            {cart.items &&
                                cart.items.map((item, index) => (
                                    <>
                                        <div key={index} className="flex justify-between">
                                            <div className="text-sm leading-6">
                                                <label className="text-sm font-light">{Cookies.get("locale") === "en" ? (item.product?.name_trans?.en ? item.product.name_trans.en : item.product?.name_trans?.id) : item.product?.name_trans?.id}</label>
                                            </div>
                                            <div className="ml-5 text-right text-sm leading-6">
                                                <label className="text-md font-light">{item.product?.price.formatted}</label>
                                            </div>
                                        </div>
                                        {item.discount_amount.numeric > 0 && (
                                            <div className="flex justify-between">
                                                <div className="text-sm leading-6">
                                                    <label className="text-sm font-light">{t("paymentMethod.discount")}</label>
                                                </div>
                                                <div className="ml-5 text-right text-sm leading-6">
                                                    <label className="text-md font-light text-red-500">- {item.discount_amount.formatted}</label>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ))}
                            {/*<div className="flex justify-between">*/}
                            {/*    <div className="text-sm leading-6">*/}
                            {/*        <label className="text-sm font-light">{t("paymentMethod.totalPrice")}</label>*/}
                            {/*    </div>*/}
                            {/*    <div className="ml-5 text-right text-sm leading-6">*/}
                            {/*        <label className="text-md font-light">{cart.total_price.formatted}</label>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {cart.shipping_method === "courier_pickup" && (
                                <div className="flex justify-between">
                                    <div className="text-sm leading-6">
                                        <label className="text-sm font-light">{t("paymentMethod.shippingCost")}</label>
                                    </div>
                                    <div className="ml-5 text-right text-sm leading-6">
                                        <label className="text-md font-light">{cart.shipping_cost.formatted}</label>
                                    </div>
                                </div>
                            )}
                            <div className="my-5 border-b p-1" />
                            {/*<div className="flex justify-between">
                                <div className="text-sm leading-6">
                                    <label className="text-sm font-light">Sub Total</label>
                                </div>
                                <div className="ml-5 text-right text-sm leading-6">
                                    <label className="text-md font-light">{cart.total_price.formatted}</label>
                                </div>
                            </div>*/}
                            {cart.tax_enabled && (
                                <>
                                    <div className="flex justify-between">
                                        <div className="text-sm leading-6">
                                            <label className="text-sm font-light">PPN {cart.tax_rate.formatted}</label>
                                        </div>
                                        <div className="ml-5 text-right text-sm leading-6">
                                            <label className="text-md font-light">{cart.tax_amount.formatted}</label>
                                        </div>
                                    </div>
                                    <div className="my-5 border-b p-1" />
                                </>
                            )}
                            <div className="flex justify-between">
                                <div className="text-sm leading-6">
                                    <label className="text-sm font-semibold">{t("paymentMethod.totalShopping")}</label>
                                </div>
                                <div className="ml-5 text-right text-sm leading-6">
                                    <label className="text-lg font-bold">{cart.total.formatted}</label>
                                </div>
                            </div>
                        </div>
                        <div className="mt-0.5 hidden h-fit w-full rounded-b-xl bg-white p-8 lg:block lg:max-w-xl">
                            {/* <Link href="/payment"> */}
                            <div className="flex cursor-pointer items-center justify-center rounded-lg bg-secondary py-3 text-center text-sm font-bold hover:bg-[#e8bc00]" onClick={handlePlaceOrder}>
                                {/* <ShieldCheckIcon className="mr-2 h-5 w-5 text-black" /> */}
                                {t("paymentMethod.placeOrder")}
                            </div>
                            {/* </Link> */}
                        </div>
                        <div className="fixed bottom-0 left-0 right-0 block w-full px-5 py-5 shadow-lg lg:hidden">
                            {/* <Link href="/payment"> */}
                            <div className="flex cursor-pointer items-center justify-center rounded-lg bg-secondary py-3 text-center text-sm font-bold hover:bg-[#e8bc00]" onClick={handlePlaceOrder}>
                                {/* <ShieldCheckIcon className="mr-2 h-5 w-5 text-black" /> */}
                                {t("paymentMethod.placeOrder")}
                            </div>
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}

            <FloatingIcon />
        </div>
    )
}

export default PaymentMethod
