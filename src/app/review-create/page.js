import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import { PlusIcon, StarIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"

function ReviewCreate() {
    return (
        <div>
            <Navbar />
            <div className="mx-auto flex min-h-screen max-w-7xl">
                <div className="w-1/5 p-7">
                    <SidebarProfile />
                </div>
                <div className="w-4/5 p-7">
                    <div className="pb-1 text-2xl font-bold">Ulasan</div>
                    <div className="mt-5">
                        <div className="item-center w-full text-sm font-semibold text-[#6D7588]">
                            Rating Penjual
                        </div>
                        <div className="item-center flex pt-4">
                            <StarIcon className="mr-1 h-8 w-8 text-secondary" />
                            <StarIcon className="mr-1 h-8 w-8 text-secondary" />
                            <StarIcon className="mr-1 h-8 w-8 text-secondary" />
                            <StarIcon className="mr-1 h-8 w-8 text-[#BFC9D9]" />
                            <StarIcon className="mr-1 h-8 w-8 text-[#BFC9D9]" />
                        </div>
                        <div className="item-center w-full pt-8 text-sm font-semibold text-[#6D7588]">
                            Upload Gambar / Video
                        </div>
                        <div className="item-center mt-4 flex">
                            <div className="w-fit cursor-pointer rounded-lg border border-[#BFC9D9] p-7 hover:bg-[#F5F5F5]">
                                <PlusIcon className="h-4 w-4" />
                            </div>
                            <Image
                                className="ml-4 rounded-lg"
                                src="/bio.png"
                                alt="Product"
                                width={80}
                                height={80}
                            />
                            <Image
                                className="ml-4 rounded-lg"
                                src="/bio.png"
                                alt="Product"
                                width={80}
                                height={80}
                            />
                            <Image
                                className="ml-4 rounded-lg"
                                src="/bio.png"
                                alt="Product"
                                width={80}
                                height={80}
                            />
                        </div>
                        <div className="item-center mt-5 w-full text-sm font-semibold text-[#6D7588]">
                            Berikan Ulasan
                        </div>
                        <textarea
                            className="mt-2 w-full rounded-lg border border-[#BFC9D9] p-4 text-sm focus:border-[#007185] focus:ring-0"
                            rows="5"
                            placeholder="Ulasan..."
                        />
                        <div className="mt-1 w-full text-xs text-[#6D7588]">
                            Dengan memberikan ulasan Anda berkontribusi terhadap
                            reputasi penjual terima kasih
                        </div>
                        <div className="mt-8 cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                            Berikan Ulasan
                        </div>
                        <Link href="/review">
                            <div className="mt-3 cursor-pointer items-center justify-center rounded-lg border bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#F5F5F5]">
                                Batalkan
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ReviewCreate
