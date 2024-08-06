import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import Link from "next/link"

function AddressCreate() {
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
                            <div className="mb-1 font-semibold text-[#B1B1B1]">
                                Perusahaan
                            </div>
                            <input
                                type="text"
                                className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                placeholder="Perusahaan"
                            />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                        <div className="item-center w-5/12">
                            <div className="mb-1 font-semibold text-[#B1B1B1]">
                                Alamat
                            </div>
                            <input
                                type="text"
                                className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                placeholder="Alamat"
                            />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                        <div className="item-center w-5/12">
                            <div className="mb-1 font-semibold text-[#B1B1B1]">
                                Provinsi
                            </div>
                            <input
                                type="text"
                                className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                placeholder="Provinsi"
                            />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                        <div className="item-center flex w-5/12">
                            <div className="item-center w-1/2 pr-2">
                                <div className="mb-1 font-semibold text-[#B1B1B1]">
                                    Kota / Kabupaten
                                </div>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                    placeholder="Kota / Kabupaten"
                                />
                            </div>
                            <div className="item-center w-1/2 pl-2">
                                <div className="mb-1 font-semibold text-[#B1B1B1]">
                                    Kode Pos
                                </div>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                    placeholder="Kode Pos"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-14 flex items-center justify-between">
                        <div className="item-center w-5/12">
                            <Link
                                href="/address"
                                className="mr-2 w-fit cursor-pointer rounded-lg border border-[#BFC9D9] bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#f5f5f5]">
                                Batalkan
                            </Link>
                            <Link
                                href="/address"
                                className="ml-2 w-fit cursor-pointer rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                Simpan
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AddressCreate
