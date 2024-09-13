"use client"

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/hooks/auth"
import InputError from "@/components/InputError"
import AuthSessionStatus from "@/components/AuthSessionStatus"
import { useDispatch } from "react-redux"
import { useSearchParams } from "next/navigation"
import LoadingSpinner from "@/components/LoadingSpinner"

function ResetPassword() {
    const { resetPassword } = useAuth()

    const dispatch = useDispatch()
    const searchParams = useSearchParams()
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false)

    const token = searchParams.get("token")
    const email = searchParams.get("email")

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const togglePasswordConfirmationVisibility = () => {
        setShowPasswordConfirmation(!showPasswordConfirmation)
    }

    const submitForm = async event => {
        event.preventDefault()

        setIsLoading(true)

        await resetPassword(
            {
                token: token,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
                setErrors,
                setStatus,
            },
            dispatch,
        )

        setIsLoading(false)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F5F5F5]">
            <div className="flex-1">
                <div className="flex items-center justify-center pt-10">
                    <Link href="/">
                        <Image
                            src="/bulky-black.svg"
                            width={180}
                            height={60}
                            alt="Logo"
                            className="h-auto w-auto cursor-pointer"
                            priority={false}
                        />
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-center py-5">
                    <div className="h-fit w-full max-w-md rounded-xl border-[#BFC9D9] bg-white p-8 lg:border">
                        <AuthSessionStatus className="mb-4" status={status} />

                        {isLoading && <div>Loading...</div>}

                        <form onSubmit={submitForm}>
                            <div className="py-4 text-2xl font-bold">
                                Reset Password
                            </div>
                            <div className="py-2">
                                <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                    Masukan Email
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    className="h-10 w-full rounded-lg border border-gray-300 bg-[#f5f5f5] p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                    placeholder="Email"
                                    readOnly
                                />
                                <InputError
                                    messages={errors.email}
                                    className={"mt-2"}
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
                                <InputError
                                    messages={errors.password}
                                    className={"mt-2"}
                                />
                            </div>
                            <div className="py-2">
                                <div className="mb-2 text-sm font-bold text-[#6D7588]">
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
                                <div
                                    className="absolute mt-[-40px] h-10 cursor-pointer place-content-center rounded-l-lg px-2 hover:bg-yellow-300"
                                    onClick={
                                        togglePasswordConfirmationVisibility
                                    }>
                                    {!showPasswordConfirmation ? (
                                        <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-500" />
                                    )}
                                </div>
                                <InputError
                                    messages={errors.passwordConfirmation}
                                    className={"mt-2"}
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-xl bg-secondary py-3 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                {isLoading ? (
                                    <>
                                        Tunggu Sebentar...
                                        <LoadingSpinner
                                            text={false}
                                            color="#000"
                                            size={16}
                                        />
                                    </>
                                ) : (
                                    "Kirim"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
