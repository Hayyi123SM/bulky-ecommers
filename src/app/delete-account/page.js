"use client"

import FloatingIcon from "@/components/FloatingIcon"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { useRouter } from "next/navigation"

function DeleteAccount() {
    const router = useRouter()

    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon
                    className="h-6 w-6"
                    onClick={() => router.back()}
                />
                <div className="ml-2 font-semibold">Cara Hapus Akun</div>
            </div>
            <div className="min-h-screen">
                <div className="mx-auto hidden max-w-7xl lg:block">
                    <div className="px-7 pb-1 pt-12 text-2xl font-bold">
                        Cara Hapus Akun
                    </div>
                    <div className="px-7 text-[#007185]">
                        <Link href="/profile" className="cursor-pointer">
                            Home
                        </Link>{" "}
                        / Cara Hapus Akun
                    </div>
                </div>
                <div className="border-b border-[#F0F3F7] lg:mt-6"> </div>
                <div className="mx-auto flex max-w-7xl lg:px-[176px]">
                    <div className="p-7">
                        <div className="items-center rounded-xl bg-white px-12 py-10 shadow">
                            <div className="mx-auto max-w-3xl rounded-lg bg-white p-6">
                                <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
                                    Cara Hapus Akun
                                </h1>

                                <p className="mb-4 text-lg text-gray-700">
                                    Ikuti langkah-langkah berikut untuk
                                    menghapus akun Anda:
                                </p>

                                <ol className="list-decimal space-y-4 pl-6 text-gray-700">
                                    <li>
                                        <strong>Masuk ke Halaman Profil</strong>
                                        <br /> Buka halaman profil Anda dengan
                                        mengklik menu atau ikon profil di
                                        aplikasi.
                                    </li>
                                    <li>
                                        <strong>Klik Tombol Hapus Akun</strong>
                                        <br /> Di halaman profil, klik tombol{" "}
                                        <strong>"Hapus Akun"</strong> untuk
                                        memulai proses penghapusan akun.
                                    </li>
                                    <li>
                                        <strong>Masukkan Password</strong>
                                        <br /> Setelah mengklik tombol "Hapus
                                        Akun", sebuah popup akan muncul yang
                                        meminta Anda untuk memasukkan kata sandi
                                        akun Anda.
                                    </li>
                                    <li>
                                        <strong>Klik Tombol Kirim</strong>
                                        <br /> Setelah memasukkan password, klik
                                        tombol <strong>"Kirim"</strong> untuk
                                        mengonfirmasi penghapusan akun.
                                    </li>
                                    <li>
                                        <strong>
                                            Akun Terhapus dan Dihubungkan ke
                                            Halaman Login
                                        </strong>
                                        <br /> Setelah tombol "Kirim" ditekan,
                                        akun Anda akan terhapus dan Anda akan
                                        diarahkan ke halaman login.
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <FloatingIcon />
        </div>
    )
}

export default DeleteAccount
