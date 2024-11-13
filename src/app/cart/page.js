"use client"

import FloatingIcon from "@/components/FloatingIcon"
import Navbar from "@/components/Navbar"
import PopupMenuMobile from "@/components/PopupMenuMobile"
import PopupModal from "@/components/PopupModal"
import { useAuth } from "@/hooks/auth"
import {
    fetchCarts,
    toggleSelectItem,
    toggleSelectAllItems,
    updateSelectedItems,
    removeItems,
    setShippingMethod,
} from "@/store/slices/cartSlice"
import { Bars3BottomRightIcon, TrashIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function Cart() {
    const { user } = useAuth({ middleware: "auth" })
    const router = useRouter()
    const [showPopupMenu, setShowPopupMenu] = useState(false)
    const dispatch = useDispatch()
    const cart = useSelector(state => state.carts.cart)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isOpenModalUser, setIsOpenModalUser] = useState(false)
    const [itemId, setItemId] = useState(null)
    const [isShipping, setIsShipping] = useState(false)
    const selectedShipping = useSelector(state => state.carts.shippingMethod)
    const [methodSelected, setMethodSelected] = useState(null)
    // const updateStatus = useSelector(state => state.carts.updateStatus)
    // const updateError = useSelector(state => state.carts.updateError)
    console.log("====================================")
    console.log("user", user)
    console.log("====================================")
    useEffect(() => {
        dispatch(fetchCarts())
    }, [dispatch, user])

    const togglePopupMenu = () => {
        setShowPopupMenu(!showPopupMenu)
    }

    const closePopupMenu = () => {
        setShowPopupMenu(false)
    }

    useEffect(() => {
        if (showPopupMenu) {
            document.body.classList.add("modal-open")
        } else {
            document.body.classList.remove("modal-open")
        }
    }, [showPopupMenu])

    const handleSelectItem = (itemId, isSelected) => {
        dispatch(toggleSelectItem({ itemId, isSelected }))
        dispatch(updateSelectedItems([{ id: itemId, selected: isSelected }]))
    }

    const handleSelectAllItems = isSelected => {
        dispatch(toggleSelectAllItems(isSelected))
        const cartItems = cart.items.map(item => ({
            id: item.id,
            selected: isSelected,
        }))
        dispatch(updateSelectedItems(cartItems))
    }

    const openModal = itemCart => {
        setItemId(itemCart)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const closeModalUser = () => {
        setIsOpenModalUser(false)
    }

    const handleConfirm = () => {
        console.log("Confirmed!")
        dispatch(removeItems(itemId))
        closeModal()
    }

    const handleCheckout = method => {
        setMethodSelected(method)
        if (JSON.parse(localStorage.getItem("signinWithGoogle"))) {
            if (
                JSON.parse(localStorage.getItem("signinWithGoogle")).is_new_user
            ) {
                setIsOpenModalUser(true)
            } else {
                dispatch(setShippingMethod({ method }))
            }
        } else {
            dispatch(setShippingMethod({ method }))
        }
    }

    useEffect(() => {
        if (methodSelected === "self_pickup") {
            window.location.href = "/payment-method"
        }
        if (methodSelected === "courier_pickup") {
            window.location.href = "/shipping"
        }
    }, [selectedShipping])

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
                    <Link href="/product">
                        <ArrowLeftIcon
                            className="h-6 w-6"
                            onClick={() => router.back()}
                        />
                    </Link>
                    <div className="ml-2 font-semibold">Keranjang</div>
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
                        Keranjang
                    </div>
                    <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-8 lg:py-10">
                        <div className="w-full lg:col-span-2">
                            <div className="mb-2 flex bg-white px-5 py-4 lg:mb-4 lg:rounded-t-lg">
                                <div className="flex items-center">
                                    <input
                                        id="selectAll"
                                        type="checkbox"
                                        className="h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                        checked={
                                            cart.items.length > 0 &&
                                            cart.items.every(
                                                item => item.is_selected,
                                            )
                                        }
                                        onChange={e =>
                                            handleSelectAllItems(
                                                e.target.checked,
                                            )
                                        }
                                    />
                                </div>
                                <div className="ml-2 text-sm leading-6">
                                    <label className="font-bold">
                                        Pilih Semua
                                    </label>
                                </div>
                            </div>
                            {cart.items.length > 0 ? (
                                cart.items.map(item => (
                                    <div
                                        className="mb-2 flex items-center bg-white px-5 py-4 lg:mb-4"
                                        key={item.id}>
                                        <div className="flex w-1/5 items-center">
                                            <input
                                                id={`selectItem-${item.id}`}
                                                type="checkbox"
                                                className="h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                                checked={item.is_selected}
                                                onChange={e =>
                                                    handleSelectItem(
                                                        item.id,
                                                        e.target.checked,
                                                    )
                                                }
                                            />
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
                                                {item.product.name}
                                            </label>
                                        </div>
                                        <div className="ml-5 flex w-2/5 items-center justify-end text-sm leading-6">
                                            <label className="text-md font-bold">
                                                {item.price.formatted}
                                            </label>
                                            <TrashIcon
                                                className="ml-2 h-5 w-5 cursor-pointer text-[#9FA6B0] hover:text-red-700"
                                                onClick={() =>
                                                    openModal(item.product.id)
                                                }
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No items in cart.</p>
                            )}
                        </div>
                        <div className="hidden w-full lg:block">
                            <div className="mb-0.5 rounded-t-lg bg-white px-5 py-4">
                                <div className="text-md font-bold">
                                    Ringkasan Belanja
                                </div>
                                <div className="flex justify-between py-5">
                                    <div className="text-sm leading-6">
                                        <label className="text-sm">Total</label>
                                    </div>
                                    <div className="ml-5 text-right text-sm leading-6">
                                        <label className="text-md font-bold">
                                            {cart.total_price.formatted}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-b-lg bg-white px-5 py-5">
                                <div
                                    onClick={
                                        cart.items.some(
                                            item => item.is_selected,
                                        )
                                            ? () => setIsShipping(true)
                                            : null
                                    }
                                    className={`cursor-pointer rounded-lg bg-secondary py-2 text-center text-lg font-bold hover:bg-[#e8bc00] ${
                                        cart.items.some(
                                            item => item.is_selected,
                                        )
                                            ? ""
                                            : "cursor-not-allowed opacity-50"
                                    }`}
                                    disabled={
                                        !cart.items.some(
                                            item => item.is_selected,
                                        )
                                    }>
                                    Beli
                                </div>
                            </div>
                        </div>
                        <div className="fixed bottom-0 left-0 right-0 block w-full bg-white px-5 py-5 shadow-lg lg:hidden">
                            <div className="flex items-center justify-between">
                                <div className="w-1/2 text-sm leading-6">
                                    <label className="text-sm">Total</label>
                                    <div className="text-base font-bold">
                                        {cart.total_price.formatted}
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <div
                                        onClick={
                                            cart.items.some(
                                                item => item.is_selected,
                                            )
                                                ? () => setIsShipping(true)
                                                : null
                                        }
                                        className={`cursor-pointer rounded-lg bg-secondary px-10 py-2 text-center text-base font-bold hover:bg-[#e8bc00] ${
                                            cart.items.some(
                                                item => item.is_selected,
                                            )
                                                ? ""
                                                : "cursor-not-allowed opacity-50"
                                        }`}
                                        disabled={
                                            !cart.items.some(
                                                item => item.is_selected,
                                            )
                                        }>
                                        Beli
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {isShipping && (
                <div
                    className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 ${
                        isShipping ? "opacity-100" : "opacity-0"
                    }`}>
                    <div
                        className={`relative w-full max-w-lg transform rounded-lg bg-white p-6 transition-all duration-300 ease-out ${
                            isShipping
                                ? "translate-y-0 scale-100 opacity-100"
                                : "translate-y-4 scale-95 opacity-0"
                        }`}>
                        <div className="my-4 flex items-center justify-between">
                            <h2 className="text-base font-semibold">
                                Pilih Metode Pengiriman
                            </h2>
                            <XMarkIcon
                                className="h-6 w-6 cursor-pointer"
                                onClick={() => setIsShipping(false)}
                            />
                        </div>

                        <p className="mb-6 text-gray-700">
                            Silahkan pilih metode pengiriman
                        </p>

                        <div className="flex justify-end space-x-3">
                            <>
                                <button
                                    className="w-1/2 rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-[#f5f5f5]"
                                    onClick={() =>
                                        handleCheckout("self_pickup")
                                    }>
                                    Ambil Ditempat
                                </button>
                                <button
                                    className="w-1/2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold hover:bg-[#e8bc00]"
                                    onClick={() =>
                                        handleCheckout("courier_pickup")
                                    }>
                                    Menggunakan Deliveree
                                </button>
                            </>
                        </div>
                    </div>
                </div>
            )}

            {/* Popup Modal */}
            <PopupModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                type="confirmation"
                title="Konfirmasi"
                message="Apakah anda yakin ingin menghapus item ini?"
                onConfirm={handleConfirm}
                confirmText="Ya, Lanjutkan"
                cancelText="Kembali"
            />

            <PopupModal
                isOpen={isOpenModalUser}
                closeModal={closeModalUser}
                type="updateProfile"
                title="Pemberitahuan"
                message="Sebelum melakukan checkout, Anda harus melengkapi data diri"
                confirmText="Lengkapi Sekarang"
                cancelText="Nanti"
            />

            <FloatingIcon />
        </div>
    )
}

export default Cart
