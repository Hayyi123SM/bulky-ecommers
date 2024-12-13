"use client"

import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

function RegisterMethod() {
    const t = useTranslations()
    const router = useRouter()
    return (
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
                        <div className="flex items-center pt-6">
                            <ArrowLeftIcon
                                className="h-5 w-5"
                                onClick={() => router.back()}
                            />
                            <div className="ml-3 text-2xl font-bold">
                                {t("register.createAccount")}
                            </div>
                        </div>
                        <div className="mb-2 py-2 text-sm text-[#6D7588]">
                            {t("register.description")}
                        </div>
                        <Link href="/register">
                            <div className="mb-4 cursor-pointer rounded-xl border border-[#BFC9D9] bg-white py-3 text-center text-sm font-bold hover:bg-[#F5F5F5]">
                                {t("register.createAccount")}
                            </div>
                        </Link>
                        <div className="flex items-center justify-center">
                            <div className="w-full border-b border-[#BFC9D9]">
                                {" "}
                            </div>
                            <div className="px-2 text-sm text-[#6D7588]">
                                {t("register.or")}
                            </div>
                            <div className="w-full border-b border-[#BFC9D9]">
                                {" "}
                            </div>
                        </div>
                        <div className="mt-4 flex w-full max-w-md cursor-pointer items-center justify-center rounded-xl border border-[#BFC9D9] bg-white py-3 text-center text-sm font-bold">
                            <Image
                                src="/google.svg"
                                width={20}
                                height={20}
                                alt="Logo"
                                className="mr-2"
                                priority={false}
                            />
                            {t("register.loginWithGoogle")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterMethod
