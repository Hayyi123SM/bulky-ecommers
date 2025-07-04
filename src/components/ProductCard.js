import { Square2StackIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useState } from "react"
import { useDispatch } from "react-redux"
import LoadingSpinner from "./LoadingSpinner"
import { useAuth } from "@/hooks/auth"
import { addToCart } from "@/store/slices/cartSlice"
import { useRouter } from "next/navigation"
import PopupModal from "./PopupModal"
import { useTranslations } from "next-intl"

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
    productId,
    soldOut = false,
}) {
    const t = useTranslations()
    const { user } = useAuth()
    const dispatch = useDispatch()
    const [isLoading, setIsloading] = useState(false)
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)

    const handleAddToCart = product => {
        setIsloading(true)
        if (user) {
            dispatch(addToCart(product.productId))
            setShowModal(true)
            // setTimeout(() => {
            //     router.push("/cart")
            // }, 1000)
        } else {
            router.push("/login")
        }
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    return (
        <>
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
                        <div className="py-1 text-xs font-bold text-[#007185]">
                            {location}
                        </div>
                        <div className="line-clamp-2 py-1 text-base">
                            {title}
                        </div>
                        <div className="py-1 text-base font-bold text-[#007185]">
                            {price}
                        </div>
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
                    className="mb-2 flex cursor-pointer items-center justify-between border-b border-t border-[#F0F3F7] px-1 py-4 hover:rounded-lg hover:bg-[#f5f5f5]">
                    <div className="text-sm font-bold">
                        {t("product.showDetail")}
                    </div>
                    <Square2StackIcon className="h-5 w-5 text-[#007185]" />
                </div>
                {soldOut ? (
                    <div className="flex items-center justify-center rounded-lg bg-[#F5F5F5] py-3 text-center text-sm font-bold text-[#BFC9D9]">
                        {t("product.addToCart")}
                    </div>
                ) : (
                    <div
                        onClick={() => handleAddToCart({ productId })}
                        className="flex cursor-pointer items-center justify-center rounded-lg bg-secondary py-3 text-center text-sm font-bold hover:bg-[#e8bc00]">
                        {isLoading ? (
                            <>
                                {t("product.waiting")}...
                                <LoadingSpinner
                                    text={false}
                                    color="#000"
                                    size={20}
                                />
                            </>
                        ) : (
                            t("product.addToCart")
                        )}
                    </div>
                )}
            </div>

            <PopupModal
                isOpen={showModal}
                closeModal={handleCloseModal}
                type="addToCart"
                title={t("notification")}
                message={t("product.successAddCart")}
            />
        </>
    )
}

export default ProductCard
