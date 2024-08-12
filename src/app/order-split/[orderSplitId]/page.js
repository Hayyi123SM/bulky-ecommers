import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"

function OrderDetail() {
    return (
        <div>
            <div className="hidden lg:block">
                <Navbar />
            </div>
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon className="h-6 w-6" />
                <div className="ml-2 font-semibold">Detail Pesanan</div>
            </div>
            <div className="mx-auto min-h-screen max-w-7xl lg:flex">
                <div className="hidden w-1/5 p-7 lg:block">
                    <SidebarProfile />
                </div>
                <div className="w-5/5 py-4 lg:w-4/5 lg:p-7 lg:px-4">
                    <div className="hidden items-center lg:flex">
                        <Link href="/order">
                            <ArrowLeftIcon className="mr-3 h-7 w-7 cursor-pointer" />
                        </Link>
                        <div className="pb-1 text-2xl font-bold">
                            Detail Pesanan
                        </div>
                    </div>
                    <div className="flex flex-col lg:my-7 lg:flex-row lg:gap-8">
                        <div className="rounded-xl bg-white px-5 lg:w-1/2 lg:py-4 lg:shadow">
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
                            <div className="border-b py-2 text-sm">
                                <div className="flex items-center p-1">
                                    <div className="w-1/2 text-[#6D7588]">
                                        Order ID
                                    </div>
                                    <div className="w-1/2">AB123456890GDED</div>
                                </div>
                                <div className="flex items-center p-1">
                                    <div className="w-1/2 text-[#6D7588]">
                                        Nomor Transaksi
                                    </div>
                                    <div className="w-1/2">AB123456GGWPFDD</div>
                                </div>
                                <div className="flex items-center p-1">
                                    <div className="w-1/2 text-[#6D7588]">
                                        Metode Pembayaran
                                    </div>
                                    <div className="w-1/2">
                                        BCA Virtual Account
                                    </div>
                                </div>
                                <div className="flex items-center p-1">
                                    <div className="w-1/2 text-[#6D7588]">
                                        Waktu Transaksi
                                    </div>
                                    <div className="w-1/2">
                                        11 Juni 2024 06.09
                                    </div>
                                </div>
                            </div>
                            <div className="my-2 mb-4 flex items-center justify-between border-b p-1 text-sm">
                                <div>
                                    <div className="text-[#6D7588] lg:w-1/2">
                                        Split Link
                                    </div>
                                    <div className="text-[#007185] lg:w-1/2">
                                        https://g.co/gemini/share/44ff9809b4ed
                                    </div>
                                </div>
                                <div className="ml-5 flex items-center text-right text-sm">
                                    <div className="mr-1 text-sm font-bold text-[#007185]">
                                        Salin
                                    </div>
                                    <ClipboardDocumentIcon className="h-5 w-5 font-bold text-[#007185]" />
                                </div>
                            </div>
                            <div className="my-2 mb-4 border-b p-1 text-sm">
                                <div className="w-1/2 text-[#6D7588]">
                                    Nomor Resi
                                </div>
                                <div className="w-1/2">000123456789</div>
                            </div>
                            <div className="my-2 cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-3 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                Bayar
                            </div>
                        </div>
                        <div className="h-full lg:w-1/2">
                            <div className="h-full rounded-xl bg-white px-5 py-4 lg:shadow">
                                <div className="flex items-center">
                                    <div className="mb-5 text-sm leading-6">
                                        <div className="text-base font-bold">
                                            Ringkasan Pembayaran
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-sm leading-6">
                                        <label className="text-sm font-light">
                                            Total Harga
                                        </label>
                                    </div>
                                    <div className="ml-5 text-right text-sm leading-6">
                                        <label className="text-md font-light">
                                            Rp428.260
                                        </label>
                                    </div>
                                </div>
                                <div className="my-3 border-b p-1"> </div>
                                <div className="flex justify-between">
                                    <div className="text-sm leading-6">
                                        <label className="text-sm font-semibold">
                                            Total Tagihan
                                        </label>
                                    </div>
                                    <div className="ml-5 text-right text-sm leading-6">
                                        <label className="text-lg font-bold">
                                            Rp429.260
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="my-2 rounded-xl bg-white px-5 py-4 shadow">
                                <div className="mb-2 font-extrabold">
                                    Status Pembayaran
                                </div>
                                <div className="my-1">
                                    <div className="flex items-center justify-between p-2 text-sm">
                                        <div className="flex items-center">
                                            <Image
                                                src="/Rectangle 1-2.png"
                                                width={40}
                                                height={40}
                                                alt="single"
                                                className="mr-4"
                                            />
                                            <div>
                                                <div className="text-sm font-medium">
                                                    Darrell Steward
                                                </div>
                                                <div className="w-fit rounded-lg bg-[#0071850D] px-4 py-1 text-[9px] font-semibold text-[#007185] lg:hidden">
                                                    Paid
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-14 hidden w-fit rounded-lg bg-[#0071850D] px-4 py-1 text-[9px] font-semibold text-[#007185] lg:block">
                                            Paid
                                        </div>
                                        <div className="text-xs font-bold">
                                            Rp2.126.260
                                        </div>
                                    </div>
                                </div>
                                <div className="my-1">
                                    <div className="flex items-center justify-between p-2 text-sm">
                                        <div className="flex items-center">
                                            <Image
                                                src="/Rectangle 1-2.png"
                                                width={40}
                                                height={40}
                                                alt="single"
                                                className="mr-4"
                                            />
                                            <div>
                                                <div className="text-sm font-medium">
                                                    Darrell Steward
                                                </div>
                                                <div className="w-fit rounded-lg bg-[#FFCF020D] px-4 py-1 text-[9px] font-semibold text-[#FFCF02] lg:hidden">
                                                    Waiting for payment
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-14 hidden w-fit rounded-lg bg-[#FFCF020D] px-4 py-1 text-[9px] font-semibold text-[#FFCF02] lg:block">
                                            Waiting for payment
                                        </div>
                                        <div className="text-xs font-bold">
                                            Rp2.126.260
                                        </div>
                                    </div>
                                </div>
                                <div className="my-1">
                                    <div className="flex items-center justify-between p-2 text-sm">
                                        <div className="flex items-center">
                                            <Image
                                                src="/Rectangle 1-2.png"
                                                width={40}
                                                height={40}
                                                alt="single"
                                                className="mr-4"
                                            />
                                            <div>
                                                <div className="text-sm font-medium">
                                                    Darrell Steward
                                                </div>
                                                <div className="w-fit rounded-lg bg-[#C400000D] px-4 py-1 text-[9px] font-semibold text-[#C40000] lg:hidden">
                                                    Unpaid
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-14 hidden w-fit rounded-lg bg-[#C400000D] px-4 py-1 text-[9px] font-semibold text-[#C40000] lg:block">
                                            Unpaid
                                        </div>
                                        <div className="text-xs font-bold">
                                            -
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-xl bg-white px-5 py-4 shadow">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm">
                                        Total Pembayaran
                                    </div>
                                    <div className="font-extrabold">
                                        Rp8.126.777
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default OrderDetail
