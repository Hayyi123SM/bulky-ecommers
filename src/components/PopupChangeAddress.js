"use client"

import { fetchAddresses } from "@/store/slices/addressSlice"
import { fetchCarts, setAddress } from "@/store/slices/cartSlice"
import { MapPinIcon, XMarkIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTranslations } from "next-intl"

const PopupChangeAddress = ({ isOpen, closeModal }) => {
    const t = useTranslations()
    const [isVisible, setIsVisible] = useState(false)
    const dispatch = useDispatch()
    const modalRef = useRef(null)
    const addresses = useSelector(state => state.address.addresses)

    useEffect(() => {
        dispatch(fetchAddresses())
    }, [dispatch])

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true) // Mulai menampilkan modal dengan transisi
        } else {
            const timeout = setTimeout(() => setIsVisible(false), 300) // Tunggu sebelum modal menghilang sepenuhnya
            return () => clearTimeout(timeout)
        }
    }, [isOpen])

    const handleSetAddress = addressId => {
        dispatch(setAddress({ address_id: addressId }))
        dispatch(fetchCarts())
        setTimeout(() => {
            closeModal()
            window.location.reload()
        }, 1500)
    }

    const handleOverlayClick = e => {
        // Check if the click is outside the modal
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal()
        }
    }

    useEffect(() => {
        if (isOpen) {
            // Add event listener for clicks
            document.addEventListener("mousedown", handleOverlayClick)
        } else {
            // Remove event listener when the modal is closed
            document.removeEventListener("mousedown", handleOverlayClick)
        }

        return () => {
            document.removeEventListener("mousedown", handleOverlayClick) // Clean up event listener
        }
    }, [isOpen])

    if (!isOpen && !isVisible) return null

    if (!addresses) {
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
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 ${
                    isOpen ? "opacity-100" : "opacity-0"
                }`}>
                <div
                    ref={modalRef}
                    className={`relative w-full max-w-md transform rounded-lg bg-white p-6 transition-all duration-300 ease-out ${
                        isOpen
                            ? "translate-y-0 scale-100 opacity-100"
                            : "translate-y-4 scale-95 opacity-0"
                    }`}>
                    <div className="my-4 flex items-center justify-between">
                        <h2 className="text-base font-semibold">
                            {t("profile.listAddress")}
                        </h2>

                        <XMarkIcon
                            className="h-6 w-6 cursor-pointer"
                            onClick={closeModal}
                        />
                    </div>
                    <div className="mx-auto max-h-[70svh] min-h-[10svh] max-w-7xl overflow-auto">
                        <div className="mb-16 px-4">
                            {/* Start : View Mobile */}
                            {addresses ? (
                                addresses.map(address => (
                                    <div
                                        key={address.id}
                                        className={`my-7 rounded-xl bg-white px-5 py-4 shadow`}>
                                        <div className="flex items-baseline">
                                            <div className="text-sm leading-6">
                                                <div className="text-sm font-bold">
                                                    {address.label}
                                                </div>
                                                <div className="text-sm font-bold">
                                                    {address.name}
                                                </div>
                                                <div className="pb-1 text-xs font-normal">
                                                    {address.phone_number}
                                                </div>
                                                <div className="text-sm">
                                                    {address.address},{" "}
                                                    {address.address}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center py-4">
                                            <MapPinIcon className="h-5 w-5 text-[#007185]" />
                                            <div className="ml-2 text-xs font-bold text-[#007185]">
                                                {t("profile.alreadyPinPoint")}
                                            </div>
                                        </div>
                                        <div
                                            className="cursor-pointer items-center py-1"
                                            onClick={() =>
                                                handleSetAddress(address.id)
                                            }>
                                            <div className="w-full rounded-lg border py-2 text-center text-xs font-bold">
                                                {t("profile.selectAddress")}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div> {t("profile.notHaveAddress")} </div>
                            )}
                            {/* End : View Mobile */}
                            <div className="fixed bottom-0 left-0 right-0 block w-full px-5 py-5 shadow-lg">
                                <div className="mt-10">
                                    <Link href="/address">
                                        <div className="w-full cursor-pointer rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                            + {t("addressForm.titleAddress")}
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

export default PopupChangeAddress
