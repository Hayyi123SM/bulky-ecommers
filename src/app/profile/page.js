"use client"

import FloatingIcon from "@/components/FloatingIcon"
import Navbar from "@/components/Navbar"
import PopupModal from "@/components/PopupModal"
import SidebarProfile from "@/components/SidebarProfile"
import { useAuth } from "@/hooks/auth"
import {
    clearUser,
    deleteAccount,
    updateProfilePicture,
} from "@/store/slices/authSlice"
import {
    ArrowRightStartOnRectangleIcon,
    TrashIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"

function Profile() {
    const router = useRouter()
    const { logout } = useAuth({ middleware: "guest" })
    const { user } = useAuth({ middleware: "auth" })
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [selectedFile, setSelectedFile] = useState(null) // Store a single file
    const [previewImage, setPreviewImage] = useState(null) // For preview
    const fileInputRef = useRef(null)
    const [notification, setNotfication] = useState(false)
    const [isDeleteAccount, setisDeleteAccount] = useState(false)
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const handleLogout = async () => {
        console.log("Handling logout...")
        await logout({ redirect: "/" })
        dispatch(clearUser())
    }

    useEffect(() => {
        if (user !== undefined) {
            console.log("Parsed user from local storage:", user)
            setIsLoading(false)
        }
    }, [user])

    // useEffect(() => {
    //     if (savedUser) {
    //         console.log("Dispatching setUser with:", savedUser)
    //         dispatch(setUser(savedUser))
    //     } else {
    //         dispatch(clearUser())
    //     }
    // }, [dispatch, savedUser])

    useEffect(() => {
        // console.log("loading:", isLoading)

        // console.log("user:", user)
        if (!isLoading) {
            if (!user) {
                console.log("Logging out as user and savedUser are null")
                handleLogout()
            }
        }
    }, [user, isLoading])

    const handleImageChange = e => {
        const file = e.target.files[0] // Get the first file (single image)
        if (file) {
            // Save the file for FormData (uploading)
            setSelectedFile(file)

            // Generate a preview for displaying the image
            const previewUrl = URL.createObjectURL(file)
            setPreviewImage(previewUrl) // Set the preview image
        }
    }

    const handleButtonClick = () => {
        fileInputRef.current.click() // Trigger file input click
    }

    const handleSubmit = async () => {
        const formData = new FormData()
        if (selectedFile) {
            formData.append("image", selectedFile) // Append the file object
        }

        // Log FormData contents (optional for debugging)
        formData.forEach((value, key) => {
            if (value instanceof File) {
                console.log(`${key}:`, {
                    name: value.name,
                    size: value.size,
                    type: value.type,
                })
            } else {
                console.log(`${key}:`, value)
            }
        })

        try {
            const response = await dispatch(
                updateProfilePicture(formData),
            ).unwrap()

            if (response.data) {
                setNotfication(true)

                console.log("Update Profile Picture successfully!", response)
            }
        } catch (error) {
            console.error("Error Update Profile Picture:", error)
        }
    }

    const handleCloseNotification = () => {
        setNotfication(false)
    }

    const handleDeleteAccount = () => {
        if (password === "") {
            setError("Password wajib diisi")
            return
        }

        dispatch(deleteAccount({ password: password }))

        window.location.href = "/"
    }

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon
                    className="h-6 w-6"
                    onClick={() => router.back()}
                />
                <div className="ml-2 font-semibold">Ubah Profil</div>
            </div>
            <div className="mx-auto min-h-screen max-w-7xl lg:flex">
                <div className="hidden w-1/5 p-7 lg:block">
                    <SidebarProfile />
                </div>
                <div className="w-5/5 py-4 lg:w-4/5 lg:p-7 lg:px-4">
                    <div className="hidden pb-1 text-2xl font-bold lg:block">
                        Profil
                    </div>
                    <div className="mt-5 hidden items-center justify-center lg:flex">
                        <Link
                            href="/profile"
                            className="item-center w-6/12 cursor-pointer border-b-4 border-[#007185] py-4 text-center font-bold text-[#007185] hover:border-[#007185] hover:text-[#007185]">
                            Biodata
                        </Link>
                        <Link
                            href="/address"
                            className="item-center w-6/12 cursor-pointer border-b-4 border-gray-100 py-4 text-center font-bold text-[#B1B1B1] hover:border-[#007185] hover:text-[#007185]">
                            Daftar Alamat
                        </Link>
                    </div>
                    <div className="w-full rounded-xl bg-white py-4 lg:my-7 lg:flex lg:px-5 lg:shadow">
                        <div className="hidden lg:block">
                            <div className="w-80 rounded-lg bg-white px-5 py-4 shadow">
                                {previewImage ? (
                                    // If user has uploaded a photo, show preview
                                    <Image
                                        src={previewImage}
                                        width={300}
                                        height={300}
                                        alt="Preview"
                                        className="rounded-lg"
                                    />
                                ) : user.data.profile_picture !==
                                  "https://back-office.bulky.id/storage/" ? (
                                    // If user has a stored photo, show it
                                    <Image
                                        src={user.data.profile_picture}
                                        width={300}
                                        height={300}
                                        alt="User Photo"
                                        className="rounded-lg"
                                    />
                                ) : (
                                    // Otherwise, show the default image
                                    <Image
                                        src="/bio.png"
                                        width={300}
                                        height={300}
                                        alt="Default Image"
                                        priority={false}
                                        className="rounded-lg"
                                    />
                                )}
                                <div
                                    className="my-4 cursor-pointer items-center justify-center rounded-lg border bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#f5f5f5]"
                                    onClick={handleButtonClick}>
                                    Pilih Foto
                                </div>
                                {previewImage && (
                                    <div
                                        className="my-4 cursor-pointer items-center justify-center rounded-lg border border-secondary bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#f2d365]"
                                        onClick={handleSubmit}>
                                        Simpan Perubahan
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={handleImageChange}
                                />
                                <div className="text-sm font-light text-[#6D7588]">
                                    Besar file: maksimum 10.000.000 bytes (10
                                    Megabytes). Ekstensi file yang
                                    diperbolehkan: .JPG .JPEG .PNG
                                </div>
                            </div>
                            {user?.data?.has_set_password && (
                                <Link href="/change-password">
                                    <div className="my-4 cursor-pointer items-center justify-center rounded-lg border bg-white px-6 py-2 text-center text-base font-bold hover:bg-[#f5f5f5]">
                                        Ubah Kata Sandi
                                    </div>
                                </Link>
                            )}
                            <div
                                className="my-4 flex cursor-pointer items-center justify-center rounded-lg border bg-white px-6 py-2 text-center text-base font-bold hover:bg-[#f5f5f5]"
                                onClick={handleLogout}>
                                <ArrowRightStartOnRectangleIcon className="mr-3 h-6 w-6" />
                                Keluar Akun
                            </div>
                            <div
                                className="my-4 flex cursor-pointer items-center justify-center rounded-lg border bg-white px-6 py-2 text-center text-base font-bold hover:bg-[#f5f5f5]"
                                onClick={() => setisDeleteAccount(true)}>
                                <TrashIcon className="mr-3 h-6 w-6" />
                                Hapus Akun
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center lg:hidden">
                            {previewImage ? (
                                // If user has uploaded a photo, show preview
                                <Image
                                    src={previewImage}
                                    width={60}
                                    height={60}
                                    alt="Preview"
                                    className="cursor-pointer rounded-full"
                                />
                            ) : user.data.profile_picture !==
                              "https://back-office.bulky.id/storage/" ? (
                                // If user has a stored photo, show it
                                <Image
                                    src={user.data.profile_picture}
                                    width={60}
                                    height={60}
                                    alt="User Photo"
                                    className="cursor-pointer rounded-full"
                                />
                            ) : (
                                // Otherwise, show the default image
                                <Image
                                    src="/bio.png"
                                    width={60}
                                    height={60}
                                    alt="Default Image"
                                    priority={false}
                                    className="cursor-pointer rounded-full"
                                />
                            )}
                            <div
                                className="mt-4 cursor-pointer items-center justify-center rounded-lg px-6 py-2 text-center text-sm font-bold text-[#007185]"
                                onClick={handleButtonClick}>
                                Ubah Foto Profil
                            </div>
                            {previewImage && (
                                <div
                                    className="mb-4 cursor-pointer items-center justify-center rounded-lg px-6 py-2 text-center text-sm font-bold text-secondary"
                                    onClick={handleSubmit}>
                                    Simpan Perubahan
                                </div>
                            )}
                        </div>
                        <div className="flex-grow">
                            <div className="flex-grow border-t px-10 py-4 lg:border-none">
                                <div className="mb-5 text-base font-bold">
                                    Info Biodata Diri
                                </div>
                                <div className="flex py-3">
                                    <div className="w-1/3 text-base font-light">
                                        Nama
                                    </div>
                                    <div className="w-2/3 text-base font-light">
                                        {user.data.name}
                                    </div>
                                </div>
                                <div className="flex py-3">
                                    <div className="w-1/3 text-base font-light">
                                        Username
                                    </div>
                                    <div className="w-2/3 text-base font-light">
                                        {user.data.username}
                                    </div>
                                </div>
                                <div className="flex py-3">
                                    <div className="w-1/3 text-base font-light">
                                        Tanggal Lahir
                                    </div>
                                    <div className="w-2/3 text-base font-light">
                                        28 September 1996
                                    </div>
                                </div>
                                <div className="flex py-3">
                                    <div className="w-1/3 text-base font-light">
                                        Jenis Kelamin
                                    </div>
                                    <div className="w-2/3 text-base font-light">
                                        Laki-laki
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow border-t px-10 py-4 lg:border-none">
                                <div className="mb-5 text-base font-bold">
                                    Ubah Kontak
                                </div>
                                <div className="flex py-3">
                                    <div className="w-1/3 text-base font-light">
                                        Email
                                    </div>
                                    <div className="w-2/3 text-base font-light">
                                        {user.data.email}
                                    </div>
                                </div>
                                <div className="flex py-3">
                                    <div className="w-1/3 text-base font-light">
                                        Nomor HP
                                    </div>
                                    <div className="w-2/3 text-base font-light">
                                        {user.data.phone_number}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fixed bottom-0 left-0 right-0 block w-full px-5 py-5 shadow-lg lg:hidden">
                        <div className="mt-10">
                            <Link href="/update-profile">
                                <div className="w-full cursor-pointer rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                    Ubah Data
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <PopupModal
                isOpen={notification}
                closeModal={handleCloseNotification}
                type={"notification"}
                title={"Pemberitahuan"}
                message={`berhasil mengubah photo profil.`}
            />
            {/* <Footer /> */}

            {isDeleteAccount && (
                <div
                    className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50`}>
                    <div
                        className={`relative w-full max-w-md transform rounded-lg bg-white p-6 transition-all duration-300 ease-out`}>
                        <div className="my-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">
                                Hapus Akun
                            </h2>
                            <XMarkIcon
                                className="h-6 w-6 cursor-pointer"
                                onClick={() => setisDeleteAccount(false)}
                            />
                        </div>
                        <div className="mb-2 py-1 text-sm text-[#6D7588]">
                            Apakah anda yakin ingin menghapus akun ?
                            <br />
                            Silahkan masukkan password anda untuk melanjutkan
                        </div>
                        <div className="py-1">
                            <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                Password
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className={`h-10 w-full rounded-lg border p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33] ${error === null ? "border-gray-300" : "border-red-300"}`}
                                placeholder="Masukkan Password"
                            />
                            {error && (
                                <div className="mt-2 text-sm text-red-500">
                                    {error}
                                </div>
                            )}
                        </div>
                        <div className="mt-6 flex justify-center">
                            <div
                                className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-secondary bg-secondary px-4 py-2 font-semibold hover:bg-[#e8bc00]"
                                onClick={handleDeleteAccount}>
                                Kirim
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <FloatingIcon />
        </div>
    )
}

export default Profile
