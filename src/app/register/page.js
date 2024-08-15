"use client"

import { ArrowLeftIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

function Register() {
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
        <div className="flex min-h-screen items-center justify-center bg-cover bg-center lg:bg-[url('/bg-login.png')]">
            <div className="flex-1">
                <div className="flex items-center justify-center pt-10">
                    <Link href="/">
                        <Image
                            src="/bulky-black.svg"
                            width={180}
                            height={60}
                            alt="Logo"
                            className="cursor-pointer"
                        />
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-center py-5">
                    <div className="h-fit w-full max-w-md rounded-xl border-[#BFC9D9] bg-white p-8 lg:border">
                        <div className="flex items-center py-6">
                            <ArrowLeftIcon className="h-5 w-5" />
                            <div className="ml-3 text-2xl font-bold">
                                Buat Akun
                            </div>
                        </div>
                        <div className="py-2">
                            <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                Nama Lengkap
                            </div>
                            <input
                                type="text"
                                className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                placeholder="Nama Lengkap"
                            />
                        </div>
                        <div className="py-2">
                            <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                Alamat
                            </div>
                            <input
                                type="text"
                                className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                placeholder="Alamat"
                            />
                        </div>
                        <div className="py-2">
                            <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                Provinsi
                            </div>
                            <input
                                type="text"
                                className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                placeholder="Provinsi"
                            />
                        </div>
                        <div className="flex py-2">
                            <div className="mr-5 w-1/2">
                                <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                    Kota / Kabupaten
                                </div>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                    placeholder="Kota / Kabupaten"
                                />
                            </div>
                            <div className="w-1/2">
                                <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                    Kode Pos
                                </div>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                    placeholder="Kode Pos"
                                />
                            </div>
                        </div>
                        <div className="py-2">
                            <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                Email
                            </div>
                            <input
                                type="email"
                                className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                placeholder="Email"
                            />
                        </div>
                        <div className="py-2">
                            <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                No Telepon
                            </div>
                            <input
                                type="text"
                                className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                placeholder="No Telepon"
                            />
                        </div>
                        <div className="py-2">
                            <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                Jenis Kelamin
                            </div>
                            <div className="flex items-center">
                                <div className="mr-5 flex items-center">
                                    <input
                                        id="sms"
                                        name="notification-method"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-[#007185] focus:ring-[#007185]"
                                    />
                                    <label className="ml-3 block text-sm font-medium leading-6 text-[#6D7588]">
                                        Laki-Laki
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="push"
                                        name="notification-method"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-[#007185] focus:ring-[#007185]"
                                    />
                                    <label className="ml-3 block text-sm font-medium leading-6 text-[#6D7588]">
                                        Perempuan
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="py-2">
                            <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                Kata Sandi
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                defaultValue={password}
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
                        <div className="py-2">
                            <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                Konfirmasi Kata Sandi
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                defaultValue={password}
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
                        <div className="mb-2 py-2 text-sm text-[#6D7588]">
                            Dengan mendaftar, kamu menyetujui
                            <Link
                                href="/terms-and-condition"
                                className="ml-1 cursor-pointer font-bold text-[#007185]">
                                Syarat & Ketentuan
                            </Link>
                            , serta
                            <Link
                                href="/privacy-policy"
                                className="ml-1 cursor-pointer font-bold text-[#007185]">
                                Kebijakan Privasi
                            </Link>
                            yang berlaku.
                        </div>
                        <Link href="/login">
                            <div className="mt-3 cursor-pointer rounded-xl bg-secondary py-3 text-center text-lg font-bold hover:bg-[#e8bc00]">
                                Daftar
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
