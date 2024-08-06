"use client"

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
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
            <Navbar />
            <div className="mx-auto flex min-h-screen max-w-7xl">
                <div className="w-1/5 p-7">
                    <SidebarProfile />
                </div>
                <div className="w-4/5 p-7">
                    <div className="pb-1 text-2xl font-bold">Profil</div>
                    <div className="mt-10 flex items-center justify-center">
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

                    <div className="mt-10 flex items-center justify-between">
                        <div className="item-center w-5/12">
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
                    <div className="mt-3 flex items-center justify-between">
                        <div className="item-center w-5/12">
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
                    <div className="mt-3 flex items-center justify-between">
                        <div className="item-center w-5/12">
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
                    <div className="mt-10 w-5/12">
                        <Link href="/profile">
                            <div className="w-full cursor-pointer rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                Simpan Kata Sandi
                            </div>
                        </Link>
                    </div>
                    <div className="mt-3 w-5/12">
                        <Link href="/profile">
                            <div className="w-full cursor-pointer rounded-lg border border-[#BFC9D9] bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#f5f5f5]">
                                Batalkan
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ChangePassword
