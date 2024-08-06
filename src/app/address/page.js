import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import { CheckBadgeIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

function Address() {
    return (
        <div>
            <Navbar />
            <div className="mx-auto flex min-h-screen max-w-7xl">
                <div className="w-1/5 p-7">
                    <SidebarProfile />
                </div>
                <div className="w-4/5 p-7">
                    <div className="pb-1 text-2xl font-bold">Profil</div>
                    <div className="mt-10 flex items-center justify-center">
                        <Link
                            href="/profile"
                            className="item-center w-6/12 cursor-pointer border-b-4 border-gray-100 text-center font-bold text-[#B1B1B1] hover:border-[#007185] hover:text-[#007185]">
                            Biodata
                        </Link>
                        <Link
                            href="/address"
                            className="item-center w-6/12 cursor-pointer border-b-4 border-[#007185] text-center font-bold text-[#007185] hover:border-[#007185] hover:text-[#007185]">
                            Daftar Alamat
                        </Link>
                    </div>

                    <div className="mt-10 flex items-center justify-between">
                        <div className="item-center w-5/12">
                            <input
                                className="mr-4 w-full rounded-lg border py-2 pl-14 text-black bg-search focus:border-secondary focus:ring-0"
                                placeholder="Cari alamat"
                            />
                        </div>
                        <div className="item-center flex w-8/12 justify-end">
                            <Link
                                href="/address-create"
                                className="w-fit cursor-pointer rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                + Tambah Alamat Baru
                            </Link>
                        </div>
                    </div>
                    <div className="my-7 flex items-center rounded-xl border border-[#007185] bg-white px-5 py-4 shadow">
                        <div className="w-2/5 border-r">
                            <div className="flex items-center">
                                <div className="ml-5 text-sm leading-6">
                                    <div className="text-md font-bold">
                                        Rumah
                                    </div>
                                    <div className="text-md pb-1 font-bold">
                                        Agung Nugroho
                                    </div>
                                    <div className="text-md">
                                        Jl. Sagan, No.14, D.I Yogyakarta, Kota
                                        Yogyakarta
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-3/5">
                            <div className="flex items-center justify-between">
                                <div className="ml-5 text-sm leading-6">
                                    <div className="text-md pb-1">Status :</div>
                                    <div className="text-md flex items-center font-bold">
                                        Digunakan
                                        <CheckBadgeIcon className="ml-2 h-5 w-5 text-green-500" />
                                    </div>
                                </div>
                                <div className="cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                    Ubah Alamat
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-7 flex items-center rounded-xl bg-white px-5 py-4 shadow">
                        <div className="w-2/5 border-r">
                            <div className="flex items-center">
                                <div className="ml-5 text-sm leading-6">
                                    <div className="text-md font-bold">
                                        Office
                                    </div>
                                    <div className="text-md pb-1 font-bold">
                                        Agung Nugroho
                                    </div>
                                    <div className="text-md">
                                        Jl. Sagan, No.14, D.I Yogyakarta, Kota
                                        Yogyakarta
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-3/5">
                            <div className="flex items-center justify-between">
                                <div className="ml-5 text-sm leading-6">
                                    <div className="text-md pb-1">Status :</div>
                                    <div className="text-md flex items-center font-bold">
                                        -
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="mr-1 cursor-pointer rounded-lg border bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#B1B1B1]">
                                        Alamat Utama
                                    </div>
                                    <div className="ml-1 cursor-pointer rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                        Ubah Alamat
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Address
