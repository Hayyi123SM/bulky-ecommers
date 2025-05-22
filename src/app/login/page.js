"use client"

import AuthSessionStatus from "@/components/AuthSessionStatus"
import InputError from "@/components/InputError"
import LoadingSpinner from "@/components/LoadingSpinner"
import { useAuth } from "@/hooks/auth"
import { getCallbackGoogle, getRedrectUrlGoogle } from "@/store/slices/authSlice"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function Login() {
    const t = useTranslations()
    const code = useSearchParams().get("code")
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingGoogle, setIsLoadingGoogle] = useState(false)
    const [isProcessingCode, setIsProcessingCode] = useState(false)
    const redirectUrl = useSelector(state => state.auth.item)
    const error = useSelector(state => state.auth.error)

    const redirect = useSearchParams().get("redirect") || "/"
    const { login } = useAuth({
        middleware: "guest",
        // redirectIfAuthenticated: "/",
    })

    // const { loginMobile } = useAuth({
    //     middleware: "guest",
    //     // redirectIfAuthenticated: "/",
    // })

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const submitForm = async event => {
        event.preventDefault()

        setIsLoading(true)

        await login(
            {
                email,
                password,
                remember: shouldRemember,
                setErrors,
                setStatus,
                redirectTo: redirect,
                // device_name: "Riku's Phone",
            },
            dispatch,
        )

        setIsLoading(false)
    }

    const handleLoginWithGoogle = async () => {
        setIsLoadingGoogle(true)
        dispatch(getRedrectUrlGoogle())
    }

    useEffect(() => {
        const processGoogleCallback = async () => {
            if (code !== null) {
                setIsProcessingCode(true)
                dispatch(getCallbackGoogle(code))
                setTimeout(() => {
                    window.location.href = "/"
                }, 4000)
                setIsProcessingCode(false)
            }
        }

        if (redirectUrl !== null) {
            window.location.href = redirectUrl
        }

        processGoogleCallback()
    }, [redirectUrl, code, dispatch])

    return (
        <>
            {code === null ? (
                <div className="flex min-h-screen items-center justify-center bg-[#F5F5F5]">
                    <div className="flex-1">
                        <div className="flex items-center justify-center pt-10">
                            <Link href="/">
                                <Image src="/bulky-black.svg" width={180} height={60} alt="Logo" className="h-auto w-auto cursor-pointer" priority={false} />
                            </Link>
                        </div>
                        <div className="flex flex-col items-center justify-center py-5">
                            <div className="h-fit w-full max-w-md rounded-xl border-[#BFC9D9] bg-white p-8 lg:border">
                                <AuthSessionStatus className="mb-4" status={status} />

                                <form onSubmit={submitForm}>
                                    <div className="py-6 text-2xl font-bold">{t("login.login")}</div>
                                    <div className="py-2">
                                        <div className="mb-2 text-sm font-bold text-[#6D7588]">Email</div>
                                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]" placeholder="Email" />
                                        <InputError messages={errors.email} className={"mt-2"} />
                                    </div>
                                    <div className="py-2">
                                        <div className="mb-2 text-sm font-bold text-[#6D7588]">{t("login.password")}</div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            defaultValue={password}
                                            onChange={e => setPassword(e.target.value)}
                                            className="h-10 w-full rounded-lg border border-gray-300 p-2 pl-10 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                            placeholder="Password"
                                        />
                                        <div className="absolute mt-[-40px] h-10 cursor-pointer place-content-center rounded-l-lg px-2 hover:bg-yellow-300" onClick={togglePasswordVisibility}>
                                            {!showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
                                        </div>
                                        <InputError messages={errors.password} className={"mt-2"} />
                                    </div>
                                    <div className="flex justify-between py-5">
                                        <div className="flex">
                                            <div className="flex items-center">
                                                <input
                                                    id="comments"
                                                    aria-describedby="comments-description"
                                                    name="comments"
                                                    type="checkbox"
                                                    value={shouldRemember}
                                                    className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                                    onChange={event => setShouldRemember(event.target.checked)}
                                                />
                                            </div>
                                            <div className="ml-2 text-sm leading-6">
                                                <label className="font-sm text-[#6D7588]">{t("login.rememberMe")}</label>
                                            </div>
                                        </div>
                                        <div>
                                            <Link href="/forgot-password" className="text-sm font-semibold text-[#007185]">
                                                {t("login.forgotPassword")}?
                                            </Link>
                                        </div>
                                    </div>
                                    <button type="submit" className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-secondary py-3 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                        {isLoading ? (
                                            <>
                                                {t("waiting")}...
                                                <LoadingSpinner text={false} color="#000" size={16} />
                                            </>
                                        ) : (
                                            t("login.login")
                                        )}
                                    </button>
                                    <div
                                        onClick={() => {
                                            handleLoginWithGoogle()
                                        }}
                                        className="mt-4 flex w-full max-w-md cursor-pointer items-center justify-center rounded-xl border border-[#BFC9D9] bg-white py-3 text-center text-sm font-bold">
                                        {isLoadingGoogle ? (
                                            <>
                                                {t("waiting")}...
                                                <LoadingSpinner text={false} color="#000" size={16} />
                                            </>
                                        ) : (
                                            <>
                                                <Image src="/google.svg" width={20} height={20} alt="Logo" className="mr-2" priority={false} />
                                                {t("login.loginWithGoogle")}
                                            </>
                                        )}
                                    </div>
                                </form>
                            </div>
                            <div className="flex w-full max-w-md py-5 text-center">
                                <div className="mt-3 w-1/5 border-t-2"> </div>
                                <div className="w-3/5 text-[#6D7588]">{t("login.newUser")}</div>
                                <div className="mt-3 w-1/5 border-t-2"> </div>
                            </div>
                            <div className="h-fit w-full max-w-md px-8 lg:px-0">
                                <Link href="/register-method">
                                    <div className="w-full max-w-md cursor-pointer rounded-xl border border-[#BFC9D9] bg-white py-3 text-center text-sm font-bold">{t("login.newAccount")}</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {isLoading && <LoadingSpinner />}
                </div>
            ) : isProcessingCode ? ( // Show loading while processing code
                <LoadingSpinner text={true} />
            ) : error !== null ? ( // Show error after processing the code
                <LoadingSpinner isError={true} backToUrl="/login" textFailure={"Maaf, kamu gagal login"} />
            ) : (
                <LoadingSpinner isSuccess={true} textSuccess={"Yaey, kamu berhasil login"} />
            )}
        </>
    )
}

export default Login
