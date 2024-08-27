"use client"

import Navbar from "@/components/Navbar"
import PopupMenuMobile from "@/components/PopupMenuMobile"
import {
    fetchCarts,
    toggleSelectItem,
    toggleSelectAllItems,
    updateSelectedItems,
    removeItems,
} from "@/store/slices/cartSlice"
import { Bars3BottomRightIcon, TrashIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function Cart() {
    const [showPopupMenu, setShowPopupMenu] = useState(false)
    const dispatch = useDispatch()
    const cart = useSelector(state => state.carts.cart)
    // const updateStatus = useSelector(state => state.carts.updateStatus)
    // const updateError = useSelector(state => state.carts.updateError)

    useEffect(() => {
        dispatch(fetchCarts())
    }, [dispatch])

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

    if (!cart) {
        return <div>Loading cart...</div>
    }

    console.log(cart.items)

    return (
        <div>
            <div className="hidden lg:block">
                <Navbar />
            </div>
            <div className="flex items-center justify-between border-[#F0F3F7] px-4 py-3 lg:hidden">
                <div className="flex items-center">
                    <Link href="/product">
                        <ArrowLeftIcon className="h-6 w-6" />
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
                                                    dispatch(
                                                        removeItems(
                                                            item.product.id,
                                                        ),
                                                    )
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
                                <Link href="/payment-method">
                                    <div className="cursor-pointer rounded-lg bg-secondary py-2 text-center text-lg font-bold hover:bg-[#e8bc00]">
                                        Beli
                                    </div>
                                </Link>
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
                                    <Link href="/payment-method">
                                        <div className="cursor-pointer rounded-lg bg-secondary px-10 py-2 text-center text-base font-bold hover:bg-[#e8bc00]">
                                            Beli
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
