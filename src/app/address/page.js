"use client"

import Navbar from "@/components/Navbar"
import PopupModal from "@/components/PopupModal"
import SidebarProfile from "@/components/SidebarProfile"
import {
    fetchAddresses,
    removeAddress,
    setAddressPrimary,
} from "@/store/slices/addressSlice"
import { TrashIcon } from "@heroicons/react/24/outline"
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
                    <div className="mt-10 hidden items-center justify-center lg:flex">
                        <Link
                            href="/profile"
                            className="item-center w-6/12 cursor-pointer border-b-4 border-gray-100 text-center font-bold text-[#B1B1B1] hover:border-[#007185] hover:text-[#007185]">
                            Biodata
                        </Link>
                        <Link
                            href="/address"
                            className="item-center w-6/12 cursor-pointer border-b-4 border-[#007185] text-center font-bold text-[#007185] hover:border-[#007185] hover:text-[#007185]">
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
                                <div className="w-2/5 border-r">
                                    <div className="flex items-center">
                                        <div className="ml-5 text-sm leading-6">
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
                                </div>
                                <div className="w-3/5">
                                    <div className="flex items-center justify-between">
                                        <div className="ml-5 text-sm leading-6">
                                            <div className="text-md pb-1">
                                                Status :
                                            </div>
                                            <div className="text-md flex items-center font-bold">
                                                {address.is_primary ? (
                                                    <>
                                                        Digunakan
                                                        <CheckBadgeIcon className="ml-2 h-5 w-5 text-green-500" />
                                                    </>
                                                ) : (
                                                    "Tidak Digunakan"
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            {address.is_primary === false && (
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
                                            <Link
                                                href={`/address/${address.id}`}>
                                                <div className="cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                                    Ubah Alamat
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    {address.is_primary === false && (
                                        <div
                                            onClick={() =>
                                                openModal(address.id)
                                            }
                                            className="float-right flex w-fit cursor-pointer items-center justify-center rounded-lg px-6 py-2 text-center text-sm font-bold text-[#B1B1B1] hover:text-red-500">
                                            <TrashIcon className="mr-1 h-5 w-5" />
                                            Hapus
                                        </div>
                                    )}
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
                                <div className="flex items-baseline border-b pb-4">
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
                                    {address.is_primary === false && (
                                        <div
                                            onClick={() =>
                                                openModal(address.id)
                                            }
                                            className="float-right flex w-fit cursor-pointer items-center justify-center rounded-lg text-center text-sm font-bold text-[#B1B1B1] hover:text-red-500">
                                            <TrashIcon className="mr-1 h-4 w-4" />
                                            Hapus
                                        </div>
                                    )}
                                </div>
                                <div className="mb-4 mt-4">
                                    <div className="flex items-center justify-between text-sm font-bold">
                                        <div className="w-1/2 font-light">
                                            Status :
                                        </div>
                                        <div className="flex w-1/2 items-center justify-end">
                                            {address.is_primary ? (
                                                <>
                                                    Digunakan
                                                    <CheckBadgeIcon className="ml-2 h-5 w-5 text-green-500" />
                                                </>
                                            ) : (
                                                "Tidak Digunakan"
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="items-center justify-end">
                                    {address.is_primary === false && (
                                        <div
                                            onClick={() =>
                                                openModalPrimary(address.id)
                                            }
                                            className="mb-2 mr-1 cursor-pointer rounded-lg border bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#B1B1B1]">
                                            Alamat Utama
                                        </div>
                                    )}
                                    <Link href={`/address/${address.id}`}>
                                        <div className="cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                            Ubah Alamat
                                        </div>
                                    </Link>
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
