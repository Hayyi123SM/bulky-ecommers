"use client"

import AuthSessionStatus from "@/components/AuthSessionStatus"
import InputError from "@/components/InputError"
import Navbar from "@/components/Navbar"
import PopupModal from "@/components/PopupModal"
import SidebarProfile from "@/components/SidebarProfile"
import { useAuth } from "@/hooks/auth"
import { fetchProvinces } from "@/store/slices/areaSlice"
import { updateProfile } from "@/store/slices/authSlice"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function UpdateProfile() {
    const dispatch = useDispatch()
    const { user } = useAuth({ middleware: "auth" })
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const errors = useSelector(state => state.auth.error)
    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        dispatch(fetchProvinces())
    }, [dispatch])

    useEffect(() => {
        if (user) {
            setEmail(user.data.email)
            setName(user.data.name)
            setPhoneNumber(user.data.phone_number)
        }
    }, [user])

    const submitForm = e => {
        e.preventDefault()
        const data = {
            email,
            name,
            phoneNumber,
        }
        dispatch(updateProfile(data))

        // Redirect to profile page
        if (errors) {
            return
        } else {
            setIsShow(true)
            setTimeout(() => {
                window.location.href = "/profile"
            }, 1000)
        }
    }

    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <Link href="/profile">
                    <ArrowLeftIcon className="h-6 w-6" />
                </Link>
                <div className="ml-2 font-semibold">Update Profile</div>
            </div>
            <div className="mx-auto min-h-screen max-w-7xl lg:flex">
                <div className="hidden w-1/5 p-7 lg:block">
                    <SidebarProfile />
                </div>
                <div className="w-5/5 px-4 py-4 lg:w-4/5 lg:p-7 lg:px-4">
                    <div className="hidden items-center border-[#F0F3F7] lg:flex">
                        <Link href="/profile">
                            <ArrowLeftIcon className="h-6 w-6" />
                        </Link>
                        <div className="ml-2 font-semibold">Update Profile</div>
                    </div>
                    <AuthSessionStatus className="mb-4" status={status} />

                    <form onSubmit={submitForm}>
                        <div className="mt-3 items-center justify-between lg:mt-10 lg:flex">
                            <div className="item-center lg:w-5/12">
                                <div className="mb-1 font-semibold text-[#B1B1B1]">
                                    Nama
                                </div>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                    placeholder="Nama"
                                    onChange={e => setName(e.target.value)}
                                    defaultValue={name}
                                />
                                <InputError
                                    messages={errors && errors.name}
                                    className={"mt-2"}
                                />
                            </div>
                        </div>
                        <div className="mt-3 items-center justify-between lg:flex">
                            <div className="item-center lg:w-5/12">
                                <div className="mb-1 font-semibold text-[#B1B1B1]">
                                    Email
                                </div>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                    placeholder="Cth: Perusahaan"
                                    onChange={e => setEmail(e.target.value)}
                                    defaultValue={email}
                                />
                                <InputError
                                    messages={errors && errors.email}
                                    className={"mt-2"}
                                />
                            </div>
                        </div>
                        <div className="mt-3 items-center justify-between lg:flex">
                            <div className="item-center lg:w-5/12">
                                <div className="mb-1 font-semibold text-[#B1B1B1]">
                                    Nomor Telepon
                                </div>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                    placeholder="Nomor Telepon"
                                    onChange={e =>
                                        setPhoneNumber(e.target.value)
                                    }
                                    defaultValue={phoneNumber}
                                />
                                <InputError
                                    messages={errors && errors.phone_number}
                                    className={"mt-2"}
                                />
                            </div>
                        </div>
                        <div className="mt-10 hidden items-center justify-between lg:flex">
                            <div className="item-center flex flex-col lg:w-5/12">
                                <button
                                    type="submit"
                                    className="mb-4 w-full cursor-pointer rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                    Simpan
                                </button>
                                <Link
                                    href="/address"
                                    className="w-full cursor-pointer rounded-lg border border-[#BFC9D9] bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#f5f5f5]">
                                    Batalkan
                                </Link>
                            </div>
                        </div>
                        <div className="fixed bottom-0 left-0 right-0 block w-full px-5 py-5 shadow-lg lg:hidden">
                            <div className="mt-10">
                                <button type="submit" className="w-full">
                                    <div className="w-full cursor-pointer rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                        Simpan
                                    </div>
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

            <PopupModal
                isOpen={isShow}
                type={"notification"}
                title={"Pemberitahuan"}
                message={`Selamat, profil anda telah diperbarui.`}
            />
            {/* <Footer /> */}
        </div>
    )
}

export default UpdateProfile
