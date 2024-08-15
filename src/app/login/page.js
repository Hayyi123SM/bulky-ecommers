"use client"

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

function Login() {
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
                        <div className="py-6 text-2xl font-bold">Masuk</div>
                        <div className="py-2">
                            <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                Masukan Email
                            </div>
                            <input
                                type="email"
                                className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                placeholder="Email"
                            />
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
                                className="absolute mt-[-40px] h-10 cursor-pointer place-content-center rounded-l-lg px-2 hover:bg-yellow-300"
                                onClick={togglePasswordVisibility}>
                                {!showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-500" />
                                )}
                            </div>
                        </div>
                        <div className="flex justify-between py-5">
                            <div className="flex">
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 text-sm leading-6">
                                    <label className="font-sm text-[#6D7588]">
                                        Ingat Saya
                                    </label>
                                </div>
                            </div>
                            <div>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm font-semibold text-[#007185]">
                                    Lupa Kata Sandi?
                                </Link>
                            </div>
                        </div>
                        <Link href="/">
                            <div className="cursor-pointer rounded-xl bg-secondary py-3 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                Masuk
                            </div>
                        </Link>
                        <div className="mt-4 flex w-full max-w-md cursor-pointer items-center justify-center rounded-xl border border-[#BFC9D9] bg-white py-3 text-center text-sm font-bold">
                            <Image
                                src="/google.svg"
                                width={20}
                                height={20}
                                alt="Logo"
                                className="mr-2"
                            />
                            Masuk dengan Google
                        </div>
                    </div>
                    <div className="flex w-full max-w-md py-5 text-center">
                        <div className="mt-3 w-1/5 border-t-2"> </div>
                        <div className="w-3/5 text-[#6D7588]">
                            Apakah kamu pengguna baru?
                        </div>
                        <div className="mt-3 w-1/5 border-t-2"> </div>
                    </div>
                    <div className="h-fit w-full max-w-md px-8 lg:px-0">
                        <Link href="/register-method">
                            <div className="w-full max-w-md cursor-pointer rounded-xl border border-[#BFC9D9] bg-white py-3 text-center text-sm font-bold">
                                Buat akun bulkymu
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
