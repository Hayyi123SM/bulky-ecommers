import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Image from "next/image"
import Link from "next/link"

function Cart() {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-[#F5F5F5] p-10">
                <div className="mx-auto max-w-7xl">
                    <div className="text-2xl font-extrabold">Keranjang</div>
                    <div className="grid grid-cols-3 gap-8 py-10">
                        <div className="col-span-2 h-10 w-full">
                            <div className="mb-4 flex rounded-t-lg bg-white px-5 py-4">
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        className="h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 text-sm leading-6">
                                    <label className="font-bold">
                                        Pilih Semua
                                    </label>
                                </div>
                            </div>
                            <div className="mb-4 flex items-center bg-white px-5 py-4">
                                <div className="flex w-1/5 items-center">
                                    <div className="mr-5">
                                        <input
                                            id="comments"
                                            aria-describedby="comments-description"
                                            name="comments"
                                            type="checkbox"
                                            className="h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                        />
                                    </div>
                                    <Image
                                        src="/product.png"
                                        width={100}
                                        height={100}
                                        alt="cart-product"
                                    />
                                </div>
                                <div className="ml-5 w-3/5 text-sm leading-6">
                                    <label className="text-md">
                                        Toyo Proxes R888R Tires 104150
                                    </label>
                                </div>
                                <div className="ml-5 w-1/5 text-right text-sm leading-6">
                                    <label className="text-md font-bold">
                                        Rp8.126.777
                                    </label>
                                </div>
                            </div>
                            <div className="mb-4 flex items-center bg-white px-5 py-4">
                                <div className="flex w-1/5 items-center">
                                    <div className="mr-5">
                                        <input
                                            id="comments"
                                            aria-describedby="comments-description"
                                            name="comments"
                                            type="checkbox"
                                            className="h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                        />
                                    </div>
                                    <Image
                                        src="/product.png"
                                        width={100}
                                        height={100}
                                        alt="cart-product"
                                    />
                                </div>
                                <div className="ml-5 w-3/5 text-sm leading-6">
                                    <label className="text-md">
                                        Toyo Proxes R888R Tires 104150
                                    </label>
                                </div>
                                <div className="ml-5 w-1/5 text-right text-sm leading-6">
                                    <label className="text-md font-bold">
                                        Rp8.126.777
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="h-10 w-full">
                            <div className="mb-0.5 rounded-t-lg bg-white px-5 py-4">
                                <div className="text-md font-bold">
                                    Ringkasan Belanja
                                </div>
                                <div className="flex justify-between py-5">
                                    <div className="text-sm leading-6">
                                        <label className="text-sm">Total</label>
                                    </div>
                                    <div className="ml-5 w-1/5 text-right text-sm leading-6">
                                        <label className="text-md font-bold">
                                            Rp8.126.777
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-b-lg bg-white px-5 py-5">
                                <Link href="/">
                                    <div className="cursor-pointer rounded-lg bg-secondary py-2 text-center text-lg font-bold hover:bg-[#e8bc00]">
                                        Beli
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

export default Cart
