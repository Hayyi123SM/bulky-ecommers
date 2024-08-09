"use client"

import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { useState } from "react"

function ChangePassword() {
    // const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    // const handleSubmit = e => {
    //     e.preventDefault()
    //     // Lakukan proses login di sini
    //     console.log("Email:", email)
    //     console.log("Password:", password)
    // }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div>
            <div className="hidden lg:block">
                <Navbar />
            </div>
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon className="h-6 w-6" />
                <div className="ml-2 font-semibold">Ubah Kata Sandi</div>
            </div>
            <div className="mx-auto min-h-screen max-w-7xl lg:flex">
                <div className="hidden w-1/5 p-7 lg:block">
                    <SidebarProfile />
                </div>
                <div className="w-5/5 px-4 py-4 lg:w-4/5 lg:p-7">
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

                    <div className="items-center justify-between lg:mt-10 lg:flex">
                        <div className="item-center lg:w-5/12">
                            <div className="mb-1 text-sm font-semibold text-[#B1B1B1]">
                                Kata Sandi Saat Ini
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="h-10 w-full rounded-lg border border-gray-300 p-2 pl-10 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                placeholder="Password"
                            />
                            <div
                                className="absolute mt-[-40px] h-10 cursor-pointer place-content-center rounded-l-lg px-2 hover:bg-[#F5F5F5]"
                                onClick={togglePasswordVisibility}>
                                {!showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-500" />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 items-center justify-between lg:flex">
                        <div className="item-center lg:w-5/12">
                            <div className="mb-1 text-sm font-semibold text-[#B1B1B1]">
                                Kata Sandi Baru
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="h-10 w-full rounded-lg border border-gray-300 p-2 pl-10 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                placeholder="Password"
                            />
                            <div
                                className="absolute mt-[-40px] h-10 cursor-pointer place-content-center rounded-l-lg px-2 hover:bg-[#F5F5F5]"
                                onClick={togglePasswordVisibility}>
                                {!showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-500" />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 items-center justify-between lg:flex">
                        <div className="item-center lg:w-5/12">
                            <div className="mb-1 text-sm font-semibold text-[#B1B1B1]">
                                Konfirmasi Kata Sandi
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="h-10 w-full rounded-lg border border-gray-300 p-2 pl-10 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                placeholder="Password"
                            />
                            <div
                                className="absolute mt-[-40px] h-10 cursor-pointer place-content-center rounded-l-lg px-2 hover:bg-[#F5F5F5]"
                                onClick={togglePasswordVisibility}>
                                {!showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-500" />
                                )}
                            </div>
                            <div className="mt-2 text-xs text-[#6D7588]">
                                Kata sandi dapat dikombinasikan antara huruf,
                                angka, dan karakter spesial.
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:block lg:w-5/12">
                        <div className="mt-10">
                            <Link href="/profile">
                                <div className="w-full cursor-pointer rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                    Simpan Kata Sandi
                                </div>
                            </Link>
                        </div>
                        <div className="mt-3">
                            <Link href="/profile">
                                <div className="w-full cursor-pointer rounded-lg border border-[#BFC9D9] bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#f5f5f5]">
                                    Batalkan
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="fixed bottom-0 left-0 right-0 block w-full px-5 py-5 shadow-lg lg:hidden">
                        <div className="mt-10">
                            <Link href="/profile">
                                <div className="w-full cursor-pointer rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                    Simpan Kata Sandi
                                </div>
                            </Link>
                        </div>
                        <div className="mt-3">
                            <Link href="/profile">
                                <div className="w-full cursor-pointer rounded-lg border border-[#BFC9D9] bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#f5f5f5]">
                                    Batalkan
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

export default ChangePassword
