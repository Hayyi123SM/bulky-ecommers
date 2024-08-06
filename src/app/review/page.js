import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import Image from "next/image"
import Link from "next/link"

function Review() {
    return (
        <div>
            <Navbar />
            <div className="mx-auto flex min-h-screen max-w-7xl">
                <div className="w-1/5 p-7">
                    <SidebarProfile />
                </div>
                <div className="w-4/5 p-7">
                    <div className="pb-1 text-2xl font-bold">Ulasan</div>
                    <div className="mt-10 flex items-center">
                        <div className="item-center flex w-full">
                            <input
                                className="mr-4 w-full rounded-lg border py-2 pl-14 text-black bg-search focus:border-secondary focus:ring-0"
                                placeholder="Cari pesananmu"
                            />
                        </div>
                    </div>
                    <div className="my-4 flex items-center rounded-xl bg-white px-5 py-4 shadow">
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
                    <div className="my-4 flex items-center rounded-xl bg-white px-5 py-4 shadow">
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
                                    <div className="text-md font-bold">
                                        Belum Memberikan Ulasan
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-5/12">
                            <div className="flex items-center justify-end">
                                <div className="mr-3 cursor-pointer items-center justify-center rounded-lg border bg-white px-6 py-2 text-center text-sm font-bold hover:bg-secondary">
                                    Hubungi Penjual
                                </div>
                                <Link href="/review-create">
                                    <div className="cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                        Berikan Ulasan
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Review
