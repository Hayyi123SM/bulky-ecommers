import { Square2StackIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

function ProductCard({
    url = "#",
    image,
    location,
    title,
    price,
    sale = false,
    beforeDiscount,
    totalQty,
    isOpenPdf,
    percent = 0,
}) {
    return (
        <div
            className={`flex flex-col rounded-lg border border-[#F0F3F7] bg-white p-1`}>
            <Link href={url}>
                <div
                    className="aspect-square w-full rounded-t-lg bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}>
                    {/* The aspect-square ensures it stays square */}
                </div>
            </Link>
            <div className="h-[180px] flex-grow px-1 py-4">
                <Link href={url}>
                    <div className="py-1 text-sm font-bold text-[#007185]">
                        {location}
                    </div>
                    <div className="line-clamp-2 py-1 text-sm">{title}</div>
                    <div className="py-1 text-base font-bold">{price}</div>
                    {sale && (
                        <div className="flex items-center">
                            <div className="text-xs font-bold text-gray-400 line-through">
                                {beforeDiscount}
                            </div>
                            <div className="ml-1 text-xs font-bold text-[#007185]">
                                {percent}%
                            </div>
                        </div>
                    )}
                    <div className="flex items-center py-1">
                        <div className="text-sm">{totalQty} pcs</div>
                    </div>
                </Link>
            </div>
            <div
                onClick={isOpenPdf}
                className="flex cursor-pointer items-center justify-between rounded-b-lg border-t border-[#F0F3F7] px-1 py-4 hover:bg-[#f5f5f5]">
                <div className="text-sm font-bold">View PDF Detail</div>
                <Square2StackIcon className="h-5 w-5 text-[#007185]" />
            </div>
        </div>
    )
}

export default ProductCard
