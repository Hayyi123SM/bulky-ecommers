"use client"

import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import { fetchAddresses } from "@/store/slices/addressSlice"
import { ArrowLeftIcon, CheckBadgeIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { Suspense, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

function Address() {
    const dispatch = useDispatch()
    const addresses = useSelector(state => state.address.addresses)

    useEffect(() => {
        dispatch(fetchAddresses())
    }, [dispatch])

    // console.log("====================================")
    // console.log("addresses:", addresses)
    // console.log("====================================")

    if (!addresses) return <div>Loading ... </div>
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <div className="hidden lg:block">
                    <Navbar />
                </div>
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
                                    className="my-7 hidden items-center rounded-xl border border-[#007185] bg-white px-5 py-4 shadow lg:flex">
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
                                                    Digunakan
                                                    <CheckBadgeIcon className="ml-2 h-5 w-5 text-green-500" />
                                                </div>
                                            </div>
                                            <Link
                                                href={`/address/${address.id}`}>
                                                <div className="cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                                    Ubah Alamat
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        <div className="my-7 hidden items-center rounded-xl bg-white px-5 py-4 shadow lg:flex">
                            <div className="w-2/5 border-r">
                                <div className="flex items-center">
                                    <div className="ml-5 text-sm leading-6">
                                        <div className="text-md font-bold">
                                            Office
                                        </div>
                                        <div className="text-md pb-1 font-bold">
                                            Agung Nugroho
                                        </div>
                                        <div className="text-md">
                                            Jl. Sagan, No.14, D.I Yogyakarta,
                                            Kota Yogyakarta
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
                                            -
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="mr-1 cursor-pointer rounded-lg border bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#B1B1B1]">
                                            Alamat Utama
                                        </div>
                                        <div className="ml-1 cursor-pointer rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                            Ubah Alamat
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End : View Website */}

                        {/* Start : View Mobile */}
                        {addresses &&
                            addresses.map(address => (
                                <div
                                    key={address.id}
                                    className="my-7 rounded-xl border border-[#007185] bg-white px-5 py-4 shadow lg:hidden">
                                    <div className="flex items-center border-b pb-4">
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
                                    <div className="mb-4 mt-4">
                                        <div className="flex items-center justify-between text-sm font-bold">
                                            <div className="w-1/2 font-light">
                                                Status :
                                            </div>
                                            <div className="flex w-1/2 items-center justify-end">
                                                Digunakan
                                                <CheckBadgeIcon className="ml-2 h-5 w-5 text-green-500" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="items-center justify-end">
                                        <Link href={`/address/${address.id}`}>
                                            <div className="cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                                Ubah Alamat
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        <div className="my-7 rounded-xl border bg-white px-5 py-4 shadow lg:hidden">
                            <div className="flex items-center border-b pb-4">
                                <div className="text-sm leading-6">
                                    <div className="text-md font-bold">
                                        Office
                                    </div>
                                    <div className="text-md pb-1 font-bold">
                                        Agung Nugroho
                                    </div>
                                    <div className="text-md">
                                        Jl. Sagan, No.14, D.I Yogyakarta, Kota
                                        Yogyakarta
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center">
                                {/* <div className="flex items-center text-sm font-bold">
                                        Digunakan
                                        <CheckBadgeIcon className="ml-2 h-5 w-5 text-green-500" />
                                    </div> */}
                            </div>
                            <div className="items-center justify-end">
                                <div className="mb-2 mr-1 cursor-pointer rounded-lg border bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#B1B1B1]">
                                    Alamat Utama
                                </div>
                                <div className="cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                    Ubah Alamat
                                </div>
                            </div>
                        </div>
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
            </div>
        </Suspense>
    )
}

export default Address
