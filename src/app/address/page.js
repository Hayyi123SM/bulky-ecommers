"use client"

import Navbar from "@/components/Navbar"
import PopupModal from "@/components/PopupModal"
import SidebarProfile from "@/components/SidebarProfile"
import {
    fetchAddresses,
    removeAddress,
    setAddressPrimary,
} from "@/store/slices/addressSlice"
import { MapPinIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon, CheckBadgeIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function Address() {
    const dispatch = useDispatch()
    const addresses = useSelector(state => state.address.addresses)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalOpenPrimary, setIsModalOpenPrimary] = useState(false)
    const [itemId, setItemId] = useState(null)
    const [isShowPrimary, setIsShowPrimary] = useState(false)
    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        dispatch(fetchAddresses())
    }, [dispatch])

    const openModalPrimary = item => {
        setItemId(item)
        setIsModalOpenPrimary(true)
    }

    const closeModalPrimary = () => {
        setIsModalOpenPrimary(false)
    }

    const handleConfirmPrimary = () => {
        console.log("Confirmed!")
        dispatch(setAddressPrimary(itemId))
        closeModalPrimary()
        setIsShowPrimary(true)
        dispatch(fetchAddresses())
        setTimeout(() => {
            setIsShowPrimary(false)
        }, 2000)
    }

    const openModal = item => {
        setItemId(item)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleConfirm = () => {
        console.log("Confirmed!")
        dispatch(removeAddress(itemId))
        closeModal()
        setIsShow(true)
        dispatch(fetchAddresses())
        setTimeout(() => {
            setIsShow(false)
        }, 2000)
    }

    if (!addresses) return <div>Loading ... </div>
    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon className="h-6 w-6" />
                <div className="ml-2 font-semibold">Daftar Alamat</div>
            </div>
            <div className="mx-auto min-h-screen max-w-7xl lg:flex">
                <div className="hidden w-1/5 p-7 lg:block">
                    <SidebarProfile />
                </div>
                <div className="w-5/5 px-4 py-4 lg:w-4/5 lg:p-7 lg:px-4">
                    <div className="hidden pb-1 text-2xl font-bold lg:block">
                        Profil
                    </div>
                    <div className="mt-5 hidden items-center justify-center lg:flex">
                        <Link
                            href="/profile"
                            className="item-center w-6/12 cursor-pointer border-b-4 border-gray-100 py-4 text-center font-bold text-[#B1B1B1] hover:border-[#007185] hover:text-[#007185]">
                            Biodata
                        </Link>
                        <Link
                            href="/address"
                            className="item-center w-6/12 cursor-pointer border-b-4 border-[#007185] py-4 text-center font-bold text-[#007185] hover:border-[#007185] hover:text-[#007185]">
                            Daftar Alamat
                        </Link>
                    </div>

                    <div className="items-center justify-between lg:mt-10 lg:flex">
                        <div className="item-center w-12/12 lg:w-5/12">
                            <input
                                className="mr-4 w-full rounded-lg border py-2 pl-14 text-black bg-search focus:border-secondary focus:ring-0"
                                placeholder="Cari alamat"
                            />
                        </div>
                        <div className="item-center hidden w-8/12 justify-end lg:flex">
                            <Link
                                href="/address-create"
                                className="w-fit cursor-pointer rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                + Tambah Alamat Baru
                            </Link>
                        </div>
                    </div>
                    {/* Start : View Website */}
                    {addresses &&
                        addresses.map(address => (
                            <div
                                key={address.id}
                                className={`my-7 hidden items-center rounded-xl bg-white px-5 py-4 shadow lg:flex ${address.is_primary && "border border-[#007185]"}`}>
                                <div className="ml-5 w-3/5 pr-5">
                                    <div className="flex items-center">
                                        <div className="text-sm leading-6">
                                            <div className="text-md font-bold">
                                                {address.label}
                                            </div>
                                            <div className="text-md font-bold">
                                                {address.name}
                                            </div>
                                            <div className="pb-1 text-xs font-normal">
                                                {address.phone_number}
                                            </div>
                                            <div className="text-md">
                                                {address.address},{" "}
                                                {address.formatted_area}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center py-1">
                                        <MapPinIcon className="h-5 w-5 text-[#007185]" />
                                        <div className="ml-2 text-xs font-bold text-[#007185]">
                                            Sudah Pin Point
                                        </div>
                                    </div>
                                    <div className="flex items-center py-1">
                                        <Link href={`/address/${address.id}`}>
                                            <div className="cursor-pointer text-xs font-bold text-[#007185] hover:text-secondary">
                                                Ubah Alamat
                                            </div>
                                        </Link>
                                        {address.is_primary === false && (
                                            <>
                                                <div
                                                    onClick={() =>
                                                        openModalPrimary(
                                                            address.id,
                                                        )
                                                    }
                                                    className="cursor-pointer px-5 text-xs font-bold text-[#007185] hover:text-secondary">
                                                    Jadikan Alamat Utama
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        openModal(address.id)
                                                    }
                                                    className="cursor-pointer text-xs font-bold text-[#007185] hover:text-secondary">
                                                    Hapus
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="w-2/5">
                                    <div className="flex items-center justify-end">
                                        <div className="ml-5 text-sm leading-6">
                                            <div className="text-md flex items-center font-bold">
                                                {address.is_primary ? (
                                                    <>
                                                        Digunakan
                                                        <CheckBadgeIcon className="ml-2 h-5 w-5 text-green-500" />
                                                    </>
                                                ) : (
                                                    <div
                                                        onClick={() =>
                                                            openModalPrimary(
                                                                address.id,
                                                            )
                                                        }
                                                        className="mr-2 cursor-pointer rounded-lg border bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#f5f5f5]">
                                                        Alamat Utama
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    {/* End : View Website */}

                    {/* Start : View Mobile */}
                    {addresses &&
                        addresses.map(address => (
                            <div
                                key={address.id}
                                className={`my-7 rounded-xl bg-white px-5 py-4 shadow lg:hidden ${address.is_primary && "border border-[#007185]"}`}>
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
                                            {address.formatted_area}
                                        </div>
                                    </div>
                                    <div className="w-2/5">
                                        <div className="flex items-center justify-end">
                                            <div className="ml-5 text-sm leading-6">
                                                <div className="text-md flex items-center font-bold">
                                                    {address.is_primary && (
                                                        <>
                                                            Digunakan
                                                            <CheckBadgeIcon className="ml-2 h-5 w-5 text-green-500" />
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center py-4">
                                    <MapPinIcon className="h-5 w-5 text-[#007185]" />
                                    <div className="ml-2 text-xs font-bold text-[#007185]">
                                        Sudah Pin Point
                                    </div>
                                </div>
                                <div className="items-center py-1">
                                    {address.is_primary === false ? (
                                        <>
                                            <div
                                                onClick={() =>
                                                    openModalPrimary(address.id)
                                                }
                                                className="w-full rounded-lg bg-green-300 py-2 text-center text-xs font-bold">
                                                Jadikan Alamat Utama
                                            </div>
                                            <div className="flex items-center gap-2 py-2">
                                                <Link
                                                    href={`/address/${address.id}`}
                                                    className="w-1/2 rounded-lg border border-[#B2B2B2] bg-white py-2 text-center text-xs font-bold">
                                                    <div>Ubah Alamat</div>
                                                </Link>
                                                <div
                                                    onClick={() =>
                                                        openModal(address.id)
                                                    }
                                                    className="w-1/2 rounded-lg border border-red-300 bg-white py-2 text-center text-xs font-bold">
                                                    Hapus
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <Link href={`/address/${address.id}`}>
                                            <div className="w-full rounded-lg bg-secondary py-2 text-center text-xs font-bold">
                                                Ubah Alamat
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    {/* End : View Mobile */}
                    <div className="fixed bottom-0 left-0 right-0 block w-full px-5 py-5 shadow-lg lg:hidden">
                        <div className="mt-10">
                            <Link href="/profile">
                                <div className="w-full cursor-pointer rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                    + Tambah Alamat
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}

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
                isOpen={isShow}
                closeModal={closeModal}
                type={"notification"}
                title={"Pemberitahuan"}
                message={`Berhasil hapus alamat`}
            />

            <PopupModal
                isOpen={isModalOpenPrimary}
                closeModal={closeModalPrimary}
                type="confirmation"
                title="Konfirmasi"
                message="Apakah anda yakin ingin menjadikan alamat utama?"
                onConfirm={handleConfirmPrimary}
                confirmText="Ya, Lanjutkan"
                cancelText="Kembali"
            />

            <PopupModal
                isOpen={isShowPrimary}
                closeModal={closeModalPrimary}
                type={"notification"}
                title={"Pemberitahuan"}
                message={`Selamat, berhasil menjadikan alamat utama.`}
            />
        </div>
    )
}

export default Address
