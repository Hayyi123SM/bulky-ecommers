import { Square2StackIcon } from "@heroicons/react/24/outline"
import Image from "next/image"

function ProductCard({ image, location, title, price, sale = false }) {
    return (
        <div
            className={`flex flex-col rounded-lg border border-[#F0F3F7] bg-white p-1`}>
            <Image
                src={image}
                width={300}
                height={300}
                alt="Logo"
                className="cursor-pointer"
            />
            <div className="min-h-[140px] flex-grow px-1 py-4">
                <div className="py-1 text-xs font-bold text-[#007185]">
                    {location}
                </div>
                <div className="py-1 text-base">{title}</div>
                <div className="py-1 text-lg font-bold">{price}</div>
                {sale && (
                    <div className="flex items-center py-1">
                        <div className="text-xs font-bold text-gray-400 line-through">
                            Rp15.000
                        </div>
                        <div className="ml-1 text-xs font-bold text-[#007185]">
                            15%
                        </div>
                    </div>
                )}
                <div className="flex items-center py-1">
                    <div className="text-xs">64 pcs / Baru 90-95% </div>
                </div>
            </div>
            <div className="flex cursor-pointer items-center justify-between rounded-b-lg border-t border-[#F0F3F7] px-4 py-4 hover:bg-[#f5f5f5]">
                <div className="font-bold">View PDF Detail</div>
                <Square2StackIcon className="h-5 w-5 text-[#007185]" />
            </div>
        </div>
    )
}

export default ProductCard
