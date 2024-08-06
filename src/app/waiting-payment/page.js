import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import Image from "next/image"

function WaitingPayment() {
    return (
        <div>
            <Navbar />
            <div className="mx-auto flex min-h-screen max-w-7xl">
                <div className="w-1/5 p-7">
                    <SidebarProfile />
                </div>
                <div className="w-4/5 p-7">
                    <div className="pb-1 text-2xl font-bold">
                        Menunggu Pembayaran
                    </div>
                    <div className="mt-10 flex items-center">
                        <div className="item-center flex w-8/12">
                            <input
                                className="mr-4 w-full rounded-lg border py-2 pl-14 text-black bg-search focus:border-secondary focus:ring-0"
                                placeholder="Cari pesananmu"
                            />
                        </div>
                        <div className="item-center flex w-4/12">
                            <input
                                className="w-full rounded-lg border py-2 pl-14 text-black bg-calendar focus:border-secondary focus:ring-0"
                                placeholder="Pilih Tanggal Transaksi"
                            />
                        </div>
                    </div>
                    <div className="flex items-center border-b border-[#F0F3F7] bg-white px-5 py-4">
                        <div className="w-1/2 border-r">
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
                        <div className="w-1/2">
                            <div className="flex items-center justify-between">
                                <div className="ml-5 text-sm leading-6">
                                    <div className="text-md pb-1">
                                        Status Pesanan:
                                    </div>
                                    <div className="text-md font-bold">
                                        Menunggu Pembayaran
                                    </div>
                                </div>
                                <div className="cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                    Lacak Pesanan
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center border-b border-[#F0F3F7] bg-white px-5 py-4">
                        <div className="w-1/2 border-r">
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
                        <div className="w-1/2">
                            <div className="flex items-center justify-between">
                                <div className="ml-5 text-sm leading-6">
                                    <div className="text-md pb-1">
                                        Status Pesanan:
                                    </div>
                                    <div className="text-md font-bold">
                                        Menunggu Pembayaran
                                    </div>
                                </div>
                                <div className="cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                    Lacak Pesanan
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center border-b border-[#F0F3F7] bg-white px-5 py-4">
                        <div className="w-1/2 border-r">
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
                        <div className="w-1/2">
                            <div className="flex items-center justify-between">
                                <div className="ml-5 text-sm leading-6">
                                    <div className="text-md pb-1">
                                        Status Pesanan:
                                    </div>
                                    <div className="text-md font-bold">
                                        Menunggu Pembayaran
                                    </div>
                                </div>
                                <div className="cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                    Lacak Pesanan
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

export default WaitingPayment
