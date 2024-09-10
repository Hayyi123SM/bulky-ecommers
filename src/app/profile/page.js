"use client"

import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import { useAuth } from "@/hooks/auth"
import { clearUser } from "@/store/slices/authSlice"
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

function Profile() {
    const { logout } = useAuth({ middleware: "guest" })
    const { user } = useAuth()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

    const handleLogout = async () => {
        console.log("Handling logout...")
        await logout({ redirect: "/" })
        dispatch(clearUser())
    }

    useEffect(() => {
        if (user !== undefined) {
            console.log("Parsed user from local storage:", user)
            setIsLoading(false)
        }
    }, [user])

    // useEffect(() => {
    //     if (savedUser) {
    //         console.log("Dispatching setUser with:", savedUser)
    //         dispatch(setUser(savedUser))
    //     } else {
    //         dispatch(clearUser())
    //     }
    // }, [dispatch, savedUser])

    useEffect(() => {
        // console.log("loading:", isLoading)

        // console.log("user:", user)
        if (!isLoading) {
            if (!user) {
                console.log("Logging out as user and savedUser are null")
                handleLogout()
            }
        }
    }, [user, isLoading])

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon className="h-6 w-6" />
                <div className="ml-2 font-semibold">Ubah Profil</div>
            </div>
            <div className="mx-auto min-h-screen max-w-7xl lg:flex">
                <div className="hidden w-1/5 p-7 lg:block">
                    <SidebarProfile />
                </div>
                <div className="w-5/5 py-4 lg:w-4/5 lg:p-7 lg:px-4">
                    <div className="hidden pb-1 text-2xl font-bold lg:block">
                        Profil
                    </div>
                    <div className="mt-5 hidden items-center justify-center lg:flex">
                        <Link
                            href="/profile"
                            className="item-center w-6/12 cursor-pointer border-b-4 border-[#007185] py-4 text-center font-bold text-[#007185] hover:border-[#007185] hover:text-[#007185]">
                            Biodata
                        </Link>
                        <Link
                            href="/address"
                            className="item-center w-6/12 cursor-pointer border-b-4 border-gray-100 py-4 text-center font-bold text-[#B1B1B1] hover:border-[#007185] hover:text-[#007185]">
                            Daftar Alamat
                        </Link>
                    </div>
                    <div className="w-full rounded-xl bg-white py-4 lg:my-7 lg:flex lg:px-5 lg:shadow">
                        <div className="hidden lg:block">
                            <div className="w-80 rounded-lg bg-white px-5 py-4 shadow">
                                <Image
                                    src="/bio.png"
                                    width={300}
                                    height={300}
                                    alt="biodata"
                                    priority={false}
                                />
                                <div className="my-4 cursor-pointer items-center justify-center rounded-lg border bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#f5f5f5]">
                                    Pilih Foto
                                </div>
                                <div className="text-sm font-light text-[#6D7588]">
                                    Besar file: maksimum 10.000.000 bytes (10
                                    Megabytes). Ekstensi file yang
                                    diperbolehkan: .JPG .JPEG .PNG
                                </div>
                            </div>
                            <Link href="/change-password">
                                <div className="my-4 cursor-pointer items-center justify-center rounded-lg border bg-white px-6 py-2 text-center text-base font-bold hover:bg-[#f5f5f5]">
                                    Ubah Kata Sandi
                                </div>
                            </Link>
                            <div
                                className="my-4 flex cursor-pointer items-center justify-center rounded-lg border bg-white px-6 py-2 text-center text-base font-bold hover:bg-[#f5f5f5]"
                                onClick={handleLogout}>
                                <ArrowRightStartOnRectangleIcon className="mr-3 h-6 w-6" />
                                Keluar Akun
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center lg:hidden">
                            <Image
                                src="/bio.png"
                                width={56}
                                height={56}
                                alt="Profile"
                                className="cursor-pointer rounded-full"
                                priority={true}
                            />
                            <Link href="/change-password">
                                <div className="my-4 cursor-pointer items-center justify-center rounded-lg px-6 py-2 text-center text-sm font-bold text-[#007185]">
                                    Ubah Kata Sandi
                                </div>
                            </Link>
                        </div>
                        <div className="flex-grow">
                            <div className="flex-grow border-t px-10 py-4 lg:border-none">
                                <div className="mb-5 text-base font-bold">
                                    Info Biodata Diri
                                </div>
                                <div className="flex py-3">
                                    <div className="w-1/3 text-base font-light">
                                        Nama
                                    </div>
                                    <div className="w-2/3 text-base font-light">
                                        {user.data.name}
                                    </div>
                                </div>
                                <div className="flex py-3">
                                    <div className="w-1/3 text-base font-light">
                                        Username
                                    </div>
                                    <div className="w-2/3 text-base font-light">
                                        {user.data.username}
                                    </div>
                                </div>
                                <div className="flex py-3">
                                    <div className="w-1/3 text-base font-light">
                                        Tanggal Lahir
                                    </div>
                                    <div className="w-2/3 text-base font-light">
                                        28 September 1996
                                    </div>
                                </div>
                                <div className="flex py-3">
                                    <div className="w-1/3 text-base font-light">
                                        Jenis Kelamin
                                    </div>
                                    <div className="w-2/3 text-base font-light">
                                        Laki-laki
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow border-t px-10 py-4 lg:border-none">
                                <div className="mb-5 text-base font-bold">
                                    Ubah Kontak
                                </div>
                                <div className="flex py-3">
                                    <div className="w-1/3 text-base font-light">
                                        Email
                                    </div>
                                    <div className="w-2/3 text-base font-light">
                                        {user.data.email}
                                    </div>
                                </div>
                                <div className="flex py-3">
                                    <div className="w-1/3 text-base font-light">
                                        Nomor HP
                                    </div>
                                    <div className="w-2/3 text-base font-light">
                                        {user.data.phone_number}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fixed bottom-0 left-0 right-0 block w-full px-5 py-5 shadow-lg lg:hidden">
                        <div className="mt-10">
                            <Link href="/profile">
                                <div className="w-full cursor-pointer rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                    Ubah Data
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default Profile
