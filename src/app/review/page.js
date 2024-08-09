import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Image from "next/image"

function Review() {
    return (
        <div>
            <div className="hidden lg:block">
                <Navbar />
            </div>
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon className="h-6 w-6" />
                <div className="ml-2 font-semibold">Ulasan</div>
            </div>
            <div className="mx-auto min-h-screen max-w-7xl lg:flex">
                <div className="hidden w-1/5 p-7 lg:block">
                    <SidebarProfile />
                </div>
                <div className="w-5/5 px-4 py-4 lg:w-4/5 lg:p-7">
                    <div className="hidden pb-1 text-2xl font-bold lg:block">
                        Ulasan
                    </div>
                    <div className="flex items-center lg:mt-10">
                        <div className="item-center flex w-full">
                            <input
                                className="w-full rounded-lg border py-2 pl-14 text-black bg-search focus:border-secondary focus:ring-0"
                                placeholder="Cari pesananmu"
                            />
                        </div>
                    </div>
                    {/* Start : View Website */}
                    <div className="my-4 hidden items-center rounded-xl bg-white px-5 py-4 shadow lg:flex">
                        <div className="w-4/12 border-r">
                            <div className="flex items-center">
                                <div>
                                    <Image
                                        src="/product.png"
                                        width={100}
                                        height={100}
                                        alt="cart-product"
                                    />
                                </div>
                                <div className="ml-5 text-sm leading-6">
                                    <div className="text-md pb-1">
                                        Motul ATF VI Automatic Transmission
                                        Fluid 105774
                                    </div>
                                    <div className="text-md font-bold">
                                        Rp8.126.777
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-4/12">
                            <div className="flex items-center justify-between">
                                <div className="ml-5 text-sm leading-6">
                                    <div className="text-md flex pb-1">
                                        <Image
                                            src="/star.svg"
                                            width={15}
                                            height={15}
                                            alt="Logo"
                                            className="mr-1"
                                        />
                                        <Image
                                            src="/star.svg"
                                            width={15}
                                            height={15}
                                            alt="Logo"
                                            className="mr-1"
                                        />
                                        <Image
                                            src="/star.svg"
                                            width={15}
                                            height={15}
                                            alt="Logo"
                                            className="mr-1"
                                        />
                                        <Image
                                            src="/star.svg"
                                            width={15}
                                            height={15}
                                            alt="Logo"
                                            className="mr-1"
                                        />
                                        <Image
                                            src="/star.svg"
                                            width={15}
                                            height={15}
                                            alt="Logo"
                                            className="mr-1"
                                        />
                                    </div>
                                    <div className="text-md py-1 font-light opacity-50">
                                        1 Hari lalu
                                    </div>
                                    <div className="text-md font-light">
                                        pengiriman super cepat, sore pesan besok
                                        siang sampai. packing rapi dan aman,
                                        barang sesuai yang di deskripsikan,
                                        rekomendasi seller
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-5/12">
                            <div className="flex items-center justify-end">
                                <div className="mr-3 cursor-pointer items-center justify-center rounded-lg border bg-white px-6 py-2 text-center text-sm font-bold hover:bg-secondary">
                                    Hubungi Penjual
                                </div>
                                <div className="cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                    Beli Lagi
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End : View Website */}

                    {/* Start : View Mobile */}
                    <div className="my-4 flex flex-col items-center rounded-xl bg-white px-5 py-4 shadow lg:hidden">
                        <div className="flex w-full items-center">
                            <div className="w-1/3">
                                <Image
                                    src="/product.png"
                                    width={100}
                                    height={100}
                                    alt="cart-product"
                                />
                            </div>
                            <div className="ml-5 w-2/3 text-sm leading-6">
                                <div className="text-md pb-1">
                                    Motul ATF VI Automatic Transmission Fluid
                                    105774
                                </div>
                                <div className="text-md font-bold">
                                    Rp8.126.777
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm leading-6">
                                <div className="text-md flex pb-1">
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="mr-1"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="mr-1"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="mr-1"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="mr-1"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="mr-1"
                                    />
                                    <div className="text-md ml-2 py-1 font-light opacity-50">
                                        1 Hari lalu
                                    </div>
                                </div>
                                <div className="text-md font-light">
                                    pengiriman super cepat, sore pesan besok
                                    siang sampai. packing rapi dan aman, barang
                                    sesuai yang di deskripsikan, rekomendasi
                                    seller
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex w-full items-center justify-end">
                            <div className="mr-3 cursor-pointer items-center justify-center rounded-lg border bg-white px-6 py-2 text-center text-sm font-bold hover:bg-secondary">
                                Hubungi Penjual
                            </div>
                            <div className="cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                Beli Lagi
                            </div>
                        </div>
                    </div>
                    {/* End : View Mobile */}
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default Review
