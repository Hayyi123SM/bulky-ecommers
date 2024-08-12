import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

function AddressCreate() {
    return (
        <div>
            <div className="hidden lg:block">
                <Navbar />
            </div>
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon className="h-6 w-6" />
                <div className="ml-2 font-semibold">Tambah Alamat</div>
            </div>
            <div className="mx-auto min-h-screen max-w-7xl lg:flex">
                <div className="hidden w-1/5 p-7 lg:block">
                    <SidebarProfile />
                </div>
                <div className="w-5/5 px-4 py-4 lg:w-4/5 lg:p-7 lg:px-4">
                    <div className="flex items-center border-[#F0F3F7]">
                        <ArrowLeftIcon className="h-6 w-6" />
                        <div className="ml-2 font-semibold">Tambah Alamat</div>
                    </div>
                    <div className="items-center justify-between lg:mt-10 lg:flex">
                        <div className="item-center lg:w-5/12">
                            <div className="mb-1 font-semibold text-[#B1B1B1]">
                                Label
                            </div>
                            <input
                                type="text"
                                className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                placeholder="Cth: Perusahaan"
                            />
                        </div>
                    </div>
                    <div className="mt-3 items-center justify-between lg:flex">
                        <div className="item-center lg:w-5/12">
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
                    <div className="mt-3 items-center justify-between lg:flex">
                        <div className="item-center lg:w-5/12">
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
                        <div className="item-center flex w-full lg:w-5/12">
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
                    <div className="mt-14 hidden items-center justify-between lg:flex">
                        <div className="item-center flex flex-col lg:w-5/12">
                            <Link
                                href="/address"
                                className="mb-4 w-full cursor-pointer rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                Simpan
                            </Link>
                            <Link
                                href="/address"
                                className="w-full cursor-pointer rounded-lg border border-[#BFC9D9] bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#f5f5f5]">
                                Batalkan
                            </Link>
                        </div>
                    </div>
                    <div className="fixed bottom-0 left-0 right-0 block w-full px-5 py-5 shadow-lg lg:hidden">
                        <div className="mt-10">
                            <Link href="/profile">
                                <div className="w-full cursor-pointer rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                    Simpan
                                </div>
                            </Link>
                        </div>
                        <div className="mt-3">
                            <Link href="/profile">
                                <div className="w-full cursor-pointer rounded-lg border border-[#BFC9D9] bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#f5f5f5]">
                                    Batalkan
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default AddressCreate
