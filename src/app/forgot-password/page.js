"use client"

import AuthSessionStatus from "@/components/AuthSessionStatus"
import InputError from "@/components/InputError"
import LoadingSpinner from "@/components/LoadingSpinner"
import { useAuth } from "@/hooks/auth"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"

function ForgotPassword() {
    const t = useTranslations()
    const router = useRouter()
    const { forgotPassword } = useAuth()
    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [showScreen, setShowScreen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async e => {
        setIsLoading(true)
        e.preventDefault()

        await forgotPassword({ setErrors, setStatus, email })

        setIsLoading(false)
    }

    useEffect(() => {
        if (email && errors.length === 0) {
            // console.log("====================================")
            // console.log("No Error")
            // console.log("====================================")

            setTimeout(() => {
                setShowScreen(true)
            }, 3000)
        }
    }, [errors])

    return (
        <>
            {!showScreen ? (
                <div className="flex min-h-screen items-center justify-center bg-[#F5F5F5]">
                    <div className="flex-1">
                        <div className="flex items-center justify-center">
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
                                <div className="flex items-center py-6">
                                    <Link href="/login">
                                        <ArrowLeftIcon
                                            className="h-5 w-5 text-gray-500"
                                            onClick={() => router.back()}
                                        />
                                    </Link>
                                    <div className="pl-3 text-2xl font-bold">
                                        {t("forgotPassword.title")}
                                    </div>
                                </div>
                                <AuthSessionStatus
                                    className="mb-4"
                                    status={status}
                                />
                                <form onSubmit={handleSubmit}>
                                    <div className="py-2">
                                        <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                            Email
                                        </div>
                                        <input
                                            type="email"
                                            className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                            placeholder="Email"
                                            defaultValue={email}
                                            onChange={e =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                        <InputError
                                            messages={errors.email}
                                            className={"mt-2"}
                                        />
                                        <div className="mb-2 py-2 text-sm text-[#6D7588]">
                                            {t(
                                                "forgotPassword.emailDescription",
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full cursor-pointer rounded-xl bg-secondary py-2 text-center text-lg font-bold hover:bg-[#e8bc00]">
                                        {isLoading ? (
                                            <>
                                                {t("waiting")}...
                                                <LoadingSpinner
                                                    text={false}
                                                    color="#000"
                                                    size={16}
                                                />
                                            </>
                                        ) : (
                                            t("forgotPassword.submit")
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex min-h-screen items-center justify-center bg-white">
                        <Image
                            src="/mail.svg"
                            width={150}
                            height={80}
                            alt="Logo"
                            priority={false}
                        />
                        <div className="ml-5 text-left">
                            <div className="mb-5 text-2xl font-semibold text-[#212121]">
                                {t("forgotPassword.emailSent")} <br />
                                {t("forgotPassword.verify")}...
                            </div>

                            <div
                                onClick={handleSubmit}
                                className="flex w-fit cursor-pointer rounded-lg border border-[#BFC9D9] bg-white px-3 py-2 text-sm font-bold hover:bg-[#f5f5f5]">
                                {isLoading ? (
                                    <>
                                        {t("waiting")}...
                                        <LoadingSpinner
                                            text={false}
                                            color="#000"
                                            size={16}
                                        />
                                    </>
                                ) : (
                                    t("forgotPassword.sendAgain")
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ForgotPassword
