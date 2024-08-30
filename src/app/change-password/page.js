"use client"

import InputError from "@/components/InputError"
import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import { changePassword } from "@/store/slices/authSlice"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { useState } from "react"
import { useDispatch } from "react-redux"

function ChangePassword() {
    const dispatch = useDispatch()
    const [currentPassword, setCurrentPassword] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false)
    const [errors, setErrors] = useState([])

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword)
    }

    const togglePasswordConfirmationVisibility = () => {
        setShowPasswordConfirmation(!showPasswordConfirmation)
    }

    const submitForm = async event => {
        if (password !== passwordConfirmation) {
            setErrors({ password: "The password confirmation does not match." })
            return
        }

        event.preventDefault()

        const params = {
            current_password: currentPassword,
            password: password,
            password_confirmation: passwordConfirmation,
        }
        dispatch(changePassword(params))

        setTimeout(() => {
            window.location.href = "/profile"
        }, 1000)
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
                    <div className="hidden items-center border-[#F0F3F7] lg:flex">
                        <ArrowLeftIcon className="h-6 w-6" />
                        <div className="ml-2 font-semibold">
                            Ubah Kata Sandi
                        </div>
                    </div>
                    <form onSubmit={submitForm}>
                        <div className="items-center justify-between lg:mt-10 lg:flex">
                            <div className="item-center lg:w-5/12">
                                <div className="mb-1 text-sm font-semibold text-[#B1B1B1]">
                                    Kata Sandi Saat Ini
                                </div>
                                <input
                                    type={
                                        showCurrentPassword
                                            ? "text"
                                            : "password"
                                    }
                                    defaultValue={currentPassword}
                                    onChange={e =>
                                        setCurrentPassword(e.target.value)
                                    }
                                    className="h-10 w-full rounded-lg border border-gray-300 p-2 pl-10 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                    placeholder="Password"
                                />
                                <InputError
                                    messages={errors.currentPassword}
                                    className={"mt-2"}
                                />
                                <div
                                    className="absolute mt-[-40px] h-10 cursor-pointer place-content-center rounded-l-lg px-2 hover:bg-[#F5F5F5]"
                                    onClick={toggleCurrentPasswordVisibility}>
                                    {!showCurrentPassword ? (
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
                                    defaultValue={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="h-10 w-full rounded-lg border border-gray-300 p-2 pl-10 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                    placeholder="Password"
                                />
                                <InputError
                                    messages={errors.password}
                                    className={"mt-2"}
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
                                    type={
                                        showPasswordConfirmation
                                            ? "text"
                                            : "password"
                                    }
                                    defaultValue={passwordConfirmation}
                                    onChange={e =>
                                        setPasswordConfirmation(e.target.value)
                                    }
                                    className="h-10 w-full rounded-lg border border-gray-300 p-2 pl-10 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                    placeholder="Password"
                                />
                                <InputError
                                    messages={errors.passwordConfirmation}
                                    className={"mt-2"}
                                />
                                <div
                                    className="absolute mt-[-40px] h-10 cursor-pointer place-content-center rounded-l-lg px-2 hover:bg-[#F5F5F5]"
                                    onClick={
                                        togglePasswordConfirmationVisibility
                                    }>
                                    {!showPasswordConfirmation ? (
                                        <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-500" />
                                    )}
                                </div>
                                <div className="mt-2 text-xs text-[#6D7588]">
                                    Kata sandi dapat dikombinasikan antara
                                    huruf, angka, dan karakter spesial.
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block lg:w-5/12">
                            <div className="mt-10">
                                <button
                                    type="submit"
                                    className="w-full cursor-pointer rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                    Simpan Kata Sandi
                                </button>
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
                                <button
                                    type="submit"
                                    className="w-full cursor-pointer rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                    Simpan Kata Sandi
                                </button>
                            </div>
                            <div className="mt-3">
                                <Link href="/profile">
                                    <div className="w-full cursor-pointer rounded-lg border border-[#BFC9D9] bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#f5f5f5]">
                                        Batalkan
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default ChangePassword
