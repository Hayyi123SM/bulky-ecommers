import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"

function OrderDetail() {
    return (
        <div>
            <Navbar />
            <div className="mx-auto flex min-h-screen max-w-7xl">
                <div className="w-1/5 p-7">
                    <SidebarProfile />
                </div>
                <div className="w-4/5 p-7">
                    <div className="flex items-center">
                        <Link href="/order">
                            <ArrowLeftIcon className="mr-3 h-7 w-7 cursor-pointer" />
                        </Link>
                        <div className="pb-1 text-2xl font-bold">
                            Order Pesanan
                        </div>
                    </div>
                    <div className="my-7 flex gap-8">
                        <div className="w-full rounded-xl bg-white px-5 py-4 shadow">
                            <div className="flex items-center border-b">
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
                            <div className="border-b py-2">
                                <div className="flex items-center p-1">
                                    <div className="w-1/2 text-[#6D7588]">
                                        Order ID
                                    </div>
                                    <div className="w-1/2">
                                        : AB123456890GDED
                                    </div>
                                </div>
                                <div className="flex items-center p-1">
                                    <div className="w-1/2 text-[#6D7588]">
                                        Nomor Transaksi
                                    </div>
                                    <div className="w-1/2">
                                        : AB123456GGWPFDD
                                    </div>
                                </div>
                                <div className="flex items-center p-1">
                                    <div className="w-1/2 text-[#6D7588]">
                                        Metode Pembayaran
                                    </div>
                                    <div className="w-1/2">
                                        : BCA Virtual Account
                                    </div>
                                </div>
                                <div className="flex items-center p-1">
                                    <div className="w-1/2 text-[#6D7588]">
                                        Waktu Transaksi
                                    </div>
                                    <div className="w-1/2">
                                        : 11 Juni 2024 06.09
                                    </div>
                                </div>
                            </div>
                            <div className="my-2 border-b p-1">
                                <div className="w-1/2 text-[#6D7588]">
                                    Penjual
                                </div>
                                <div className="w-1/2">
                                    AUTO INDO OFFICIAL STORE
                                </div>
                            </div>
                            <div className="my-2 mb-4 border-b p-1">
                                <div className="w-1/2 text-[#6D7588]">
                                    Nomor Resi
                                </div>
                                <div className="w-1/2">000123456789</div>
                            </div>
                            <div className="my-2 cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-3 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                Bayar Sekarang
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default OrderDetail
