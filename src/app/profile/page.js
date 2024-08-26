"use client"

import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import { useAuth } from "@/hooks/auth"
import { clearUser, setUser } from "@/store/slices/authSlice"
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function Profile() {
    const { logout } = useAuth({ middleware: "guest" })
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const [savedUser, setSavedUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true) // Add a loading state

    // Define handleLogout function before using it
    const handleLogout = async () => {
        console.log("Handling logout...")
        await logout({ redirect: "/" })
        dispatch(clearUser())
    }

    // Load user from local storage and update state
    useEffect(() => {
        const getUser = localStorage.getItem("user")
        if (getUser) {
            const parsedUser = JSON.parse(getUser)
            console.log("Parsed user from local storage:", parsedUser)
            setSavedUser(parsedUser)
        }
        // Set isLoading to false after checking local storage
        setIsLoading(false)
    }, [])

    // Update Redux store with the loaded user data
    useEffect(() => {
        if (savedUser) {
            console.log("Dispatching setUser with:", savedUser)
            dispatch(setUser(savedUser))
        } else {
            // If savedUser is null, handle user clearing
            dispatch(clearUser())
        }
    }, [dispatch, savedUser])

    // Monitor the `user` state and handle loading or redirecting
    useEffect(() => {
        if (!isLoading) {
            if (!user && !savedUser) {
                console.log("Logging out as user and savedUser are null")
                handleLogout() // Trigger logout when data is not available
            }
        }
    }, [user, savedUser, isLoading])

    if (isLoading) {
        return <h1>Loading...</h1> // Show a loading state until data is processed
    }

    if (!user) {
        console.log("user is null")
        if (savedUser) {
            console.log("savedUser exists:", savedUser)
            return <h1>Loading user...</h1>
        } else {
            console.log("Redirecting...")
            return <h1>Redirecting...</h1> // Optionally add a loading state or spinner
        }
    }

    return (
        <div>
            <div className="hidden lg:block">
                <Navbar />
            </div>
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
                    <div className="mt-10 hidden items-center justify-center lg:flex">
                        <Link
                            href="/profile"
                            className="item-center w-6/12 cursor-pointer border-b-4 border-[#007185] text-center font-bold text-[#007185] hover:border-[#007185] hover:text-[#007185]">
                            Biodata
                        </Link>
                        <Link
                            href="/address"
                            className="item-center w-6/12 cursor-pointer border-b-4 border-gray-100 text-center font-bold text-[#B1B1B1] hover:border-[#007185] hover:text-[#007185]">
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
                                />
                                <div className="my-4 cursor-pointer items-center justify-center rounded-lg border bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#B1B1B1]">
                                    Pilih Foto
                                </div>
                                <div className="text-sm font-light text-[#6D7588]">
                                    Besar file: maksimum 10.000.000 bytes (10
                                    Megabytes). Ekstensi file yang
                                    diperbolehkan: .JPG .JPEG .PNG
                                </div>
                            </div>
                            <div className="my-4 cursor-pointer items-center justify-center rounded-lg border bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#B1B1B1]">
                                Ubah Kata Sandi
                            </div>
                            <div
                                className="my-4 flex cursor-pointer items-center justify-center rounded-lg border bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#B1B1B1]"
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
                            />
                            <div className="my-4 cursor-pointer items-center justify-center rounded-lg px-6 py-2 text-center text-sm font-bold text-[#007185]">
                                Ubah Kata Sandi
                            </div>
                        </div>
                        <div className="flex-grow">
                            <div className="flex-grow border-t px-5 py-4 lg:border-none">
                                <div className="mb-5 text-sm font-bold">
                                    Info Biodata Diri
                                </div>
                                <div className="flex py-4">
                                    <div className="w-1/3 text-sm font-light">
                                        Nama
                                    </div>
                                    <div className="w-2/3 text-sm font-light">
                                        {user.name}
                                    </div>
                                </div>
                                <div className="flex py-4">
                                    <div className="w-1/3 text-sm font-light">
                                        Tanggal Lahir
                                    </div>
                                    <div className="w-2/3 text-sm font-light">
                                        28 September 1996
                                    </div>
                                </div>
                                <div className="flex py-4">
                                    <div className="w-1/3 text-sm font-light">
                                        Jenis Kelamin
                                    </div>
                                    <div className="w-2/3 text-sm font-light">
                                        Laki-laki
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow border-t px-5 py-4 lg:border-none">
                                <div className="mb-5 text-sm font-bold">
                                    Ubah Kontak
                                </div>
                                <div className="flex py-4">
                                    <div className="w-1/3 text-sm font-light">
                                        Email
                                    </div>
                                    <div className="w-2/3 text-sm font-light">
                                        {user.email}
                                    </div>
                                </div>
                                <div className="flex py-4">
                                    <div className="w-1/3 text-sm font-light">
                                        Nomor HP
                                    </div>
                                    <div className="w-2/3 text-sm font-light">
                                        {user.phone_number}
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
