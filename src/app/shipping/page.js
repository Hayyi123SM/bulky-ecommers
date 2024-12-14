"use client"

import FloatingIcon from "@/components/FloatingIcon"
import Navbar from "@/components/Navbar"
import PopupChangeAddress from "@/components/PopupChangeAddress"
import PopupMenuMobile from "@/components/PopupMenuMobile"
import PopupModal from "@/components/PopupModal"
import { useAuth } from "@/hooks/auth"
import { fetchCheckout, getShippingCost } from "@/store/slices/cartSlice"
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon, MapPinIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTranslations } from "next-intl"
import Cookies from "js-cookie"

function Shipping() {
    const t = useTranslations()
    const { user } = useAuth({ middleware: "auth" })
    const router = useRouter()
    const [showPopupMenu, setShowPopupMenu] = useState(false)
    const dispatch = useDispatch()
    const cart = useSelector(state => state.carts.checkout)
    const [isOpenModalUser, setIsOpenModalUser] = useState(false)
    const [openModalAddress, setOpenModalAddress] = useState(false)
    const shippingCost = useSelector(state => state.carts.shippingCost)
    const setAddress = useSelector(state => state.carts.setAddress)
    const isLoading = useSelector(state => state.carts.isLoading)

    useEffect(() => {
        dispatch(fetchCheckout())
        dispatch(getShippingCost())
    }, [dispatch, user])

    const togglePopupMenu = () => {
        setShowPopupMenu(!showPopupMenu)
    }

    const closePopupMenu = () => {
        setShowPopupMenu(false)
    }

    const closeModalAddress = () => {
        setOpenModalAddress(false)
    }

    useEffect(() => {
        if (showPopupMenu) {
            document.body.classList.add("modal-open")
        } else {
            document.body.classList.remove("modal-open")
        }

        console.log("====================================")
        console.log("shippingCost", shippingCost)
        console.log("setAddress", setAddress)
        console.log("====================================")
    }, [showPopupMenu, shippingCost, setAddress])

    const closeModalUser = () => {
        setIsOpenModalUser(false)
    }

    const handleCheckout = () => {
        if (cart.address.name == null) {
            setOpenModalAddress(true) // Cegah lanjut jika belum ada alamat
            return
        }
        if (JSON.parse(localStorage.getItem("signinWithGoogle"))) {
            if (
                JSON.parse(localStorage.getItem("signinWithGoogle")).is_new_user
            ) {
                setIsOpenModalUser(true)
            } else {
                window.location.href = "/payment-method"
            }
        } else {
            window.location.href = "/payment-method"
        }
    }

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

    // console.log(cart.items)

    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center justify-between border-[#F0F3F7] px-4 py-3 lg:hidden">
                <div className="flex items-center">
                    <ArrowLeftIcon
                        className="h-6 w-6"
                        onClick={() => router.back()}
                    />
                    <div className="ml-2 font-semibold">
                        {t("shipping.shipping")}
                    </div>
                </div>
                <Bars3BottomRightIcon
                    className="h-6 w-6"
                    onClick={togglePopupMenu}
                />
            </div>
            {showPopupMenu && (
                <PopupMenuMobile
                    showPopupMenu={showPopupMenu}
                    closePopupMenu={closePopupMenu}
                />
            )}
            <div className="min-h-screen bg-[#F5F5F5] lg:p-10">
                <div className="mx-auto max-w-7xl">
                    <div className="hidden text-2xl font-extrabold lg:block">
                        {t("shipping.shipping")}
                    </div>
                    <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-8 lg:py-10">
                        <div className="w-full lg:col-span-2">
                            <div className="mb-2 flex flex-col bg-white px-5 py-4 lg:mb-4 lg:rounded-lg">
                                <div className="text-sm font-extrabold text-[#6D7588]">
                                    {t("shipping.address")}
                                </div>
                                {cart.address !== null ? (
                                    <>
                                        <div className="mt-3 flex items-center">
                                            <MapPinIcon className="mr-2 h-4 w-4 text-[#007185]" />
                                            <div className="text-sm font-extrabold">
                                                {cart.address.label} .{" "}
                                                {cart.address.name}
                                            </div>
                                        </div>
                                        <div className="mt-2 text-sm">
                                            {cart.address.formatted_area}
                                        </div>
                                        <div
                                            onClick={() =>
                                                setOpenModalAddress(true)
                                            }
                                            className="mt-4 w-fit cursor-pointer rounded-lg border border-[#BFC9D9] px-4 py-2 text-xs hover:bg-[#F5F5F5]">
                                            {t("shipping.changeAddress")}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="mt-4 text-sm">
                                            {t("shipping.notYetAddress")}
                                        </div>
                                        <div
                                            onClick={() =>
                                                setOpenModalAddress(true)
                                            }
                                            className="mt-4 w-fit cursor-pointer rounded-lg border border-[#BFC9D9] px-4 py-2 text-xs hover:bg-[#F5F5F5]">
                                            {t("shipping.selectAddress")}
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="mb-2 rounded-lg py-4 lg:mb-4">
                                {cart.items.length > 0 ? (
                                    cart.items.map(item => (
                                        <div
                                            className="mb-2 flex items-center bg-white px-5 py-4 lg:mb-4"
                                            key={item.id}>
                                            <div className="flex w-1/5 items-center">
                                                <Image
                                                    src={item.product.images[0]}
                                                    width={100}
                                                    height={100}
                                                    alt="cart-product"
                                                    className="ml-3 w-2/3"
                                                    priority={false}
                                                />
                                            </div>
                                            <div className="ml-5 w-2/5 text-sm leading-6">
                                                <label className="text-md">
                                                    {Cookies.get("locale") ===
                                                    "id"
                                                        ? item?.product
                                                              ?.name_trans?.id
                                                        : item?.product
                                                              ?.name_trans?.en}
                                                </label>
                                            </div>
                                            <div className="ml-5 flex w-2/5 items-center justify-end text-sm leading-6">
                                                <label className="text-md font-bold">
                                                    {item.price.formatted}
                                                </label>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No items in cart.</p>
                                )}

                                {/* <div className="mt-10 text-sm">
                                    Note Shipping : <br />
                                    Untuk saat ini semua pembelian oleh
                                    customer, barang yg sudah dibeli dapat di
                                    ambil di Gudang Bulky.id di alamat:{" "}
                                    <b>
                                        {" "}
                                        Jl. Cilodong Raya No.89, Cilodong, Kec.
                                        Cilodong, Kota Depok, Jawa Barat 16414.{" "}
                                    </b>{" "}
                                    Atau jika Anda membutuhkan bantuan untuk
                                    pengiriman ekspedisi lain, silahkan
                                    menghubungi admin kami di nomor{" "}
                                    <b> 0811 833 164 </b>
                                    <br />
                                    <br />
                                    Terima Kasih sudah berbelanja di Bulky.id
                                </div> */}
                                {/* <div className="relative w-full">
                                    <div
                                        className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 p-2 font-bold focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33] ${paymentMethod === "none" && "border-red-500"}`}
                                        onClick={() => setIsOpen(!isOpen)}>
                                        <div className="flex items-center text-sm">
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
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex flex-col">
                                                    <div className="text-sm font-extrabold">
                                                        Ambil ditempat
                                                    </div>
                                                    <div className="text-sm">
                                                        Dapat menyesuaikan waktu
                                                        pengambilanmu
                                                    </div>
                                                </div>
                                                <div className="text-sm font-extrabold">
                                                    Rp0
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="flex cursor-pointer items-center border-b border-[#F0F3F7] p-2 text-sm hover:rounded-lg hover:bg-[#F5F5F5]"
                                            onClick={() =>
                                                handleOptionClick(
                                                    "/single.svg",
                                                    "Bayar Langsung",
                                                )
                                            }>
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex flex-col">
                                                    <div className="text-sm font-extrabold">
                                                        Reguler
                                                    </div>
                                                    <div className="text-sm">
                                                        Estimasi tiba besok - 3
                                                        Aug
                                                    </div>
                                                </div>
                                                <div className="text-sm font-extrabold">
                                                    Rp19.400
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="flex cursor-pointer items-center border-b border-[#F0F3F7] p-2 text-sm hover:rounded-lg hover:bg-[#F5F5F5]"
                                            onClick={() =>
                                                handleOptionClick(
                                                    "/single.svg",
                                                    "Bayar Langsung",
                                                )
                                            }>
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex flex-col">
                                                    <div className="text-sm font-extrabold">
                                                        Express
                                                    </div>
                                                    <div className="text-sm">
                                                        Estimasi tiba 3 - 8 Aug
                                                    </div>
                                                </div>
                                                <div className="text-sm font-extrabold">
                                                    Rp17.000 - Rp19.400
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="flex cursor-pointer items-center border-b border-[#F0F3F7] p-2 text-sm hover:rounded-lg hover:bg-[#F5F5F5]"
                                            onClick={() =>
                                                handleOptionClick(
                                                    "/single.svg",
                                                    "Bayar Langsung",
                                                )
                                            }>
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex flex-col">
                                                    <div className="text-sm font-extrabold">
                                                        Kargo
                                                    </div>
                                                    <div className="text-sm">
                                                        Estimasi tiba 3 - 6 Aug
                                                    </div>
                                                </div>
                                                <div className="text-sm font-extrabold">
                                                    Rp19.400
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex cursor-pointer items-center border-b border-[#F0F3F7] p-2 text-sm hover:rounded-lg hover:bg-[#F5F5F5]">
                                            <div className="flex w-full items-center">
                                                <input
                                                    id="selectAll"
                                                    type="checkbox"
                                                    className="mr-2 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                                />
                                                <ShieldCheckIcon className="mr-2 h-4 w-4" />
                                                <div className="text-sm">
                                                    Pakai asuransi pengiriman
                                                    (Rp400)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="hidden w-full lg:block">
                            <div className="mb-0.5 rounded-t-lg bg-white px-5 py-1 pt-3">
                                <div className="text-md mb-3 font-bold">
                                    {t("shipping.summaryOrder")}
                                </div>
                                <div className="flex justify-between pb-0.5">
                                    <div className="text-sm leading-6">
                                        <label className="text-sm text-[#6D7588]">
                                            {t("shipping.totalPrice")}
                                        </label>
                                    </div>
                                    <div className="ml-5 text-right text-sm leading-6">
                                        <label className="text-sm">
                                            {cart.total_price.formatted}
                                        </label>
                                    </div>
                                </div>
                                <div className="flex justify-between pb-0.5">
                                    <div className="text-sm leading-6">
                                        <label className="text-sm text-[#6D7588]">
                                            {t("shipping.shippingCost")}
                                        </label>
                                    </div>
                                    <div className="ml-5 text-right text-sm leading-6">
                                        <label className="text-sm">
                                            {cart.shipping_cost.formatted}
                                        </label>
                                    </div>
                                </div>
                                <div className="flex justify-between py-3">
                                    <div className="text-sm leading-6">
                                        <label className="text-sm">Total</label>
                                    </div>
                                    <div className="ml-5 text-right text-sm leading-6">
                                        <label className="text-base font-bold">
                                            {cart.total?.formatted}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-b-lg bg-white px-5 py-5">
                                <div
                                    onClick={() => handleCheckout()}
                                    className="cursor-pointer rounded-lg bg-secondary py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                    {t("shipping.selectPayment")}
                                </div>
                            </div>
                        </div>
                        <div className="fixed bottom-0 left-0 right-0 block w-full bg-white px-5 py-5 shadow-lg lg:hidden">
                            <div className="flex items-center justify-between">
                                <div className="w-1/2 text-sm leading-6">
                                    <label className="text-sm">Total</label>
                                    <div className="text-base font-bold">
                                        {cart.total?.formatted}
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <div
                                        onClick={() => handleCheckout()}
                                        className={`rounded-lg bg-secondary px-10 py-2 text-center text-base font-bold hover:bg-[#e8bc00] ${isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                                        disabled={isLoading}>
                                        {t("shipping.selectPayment")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popup Modal */}

            <PopupChangeAddress
                isOpen={openModalAddress}
                closeModal={closeModalAddress}
            />

            <PopupModal
                isOpen={isOpenModalUser}
                closeModal={closeModalUser}
                type="updateProfile"
                title={t("notification")}
                message={t("shipping.messageAddress")}
                confirmText={t("fillNow")}
                cancelText={t("later")}
            />

            <FloatingIcon />
        </div>
    )
}

export default Shipping
