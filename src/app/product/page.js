// components/Product.js
"use client"

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Pagination from "@/components/Pagination"
import PopupFilter from "@/components/PopupFilter"
import PopupMenuMobile from "@/components/PopupMenuMobile"
import ProductCard from "@/components/ProductCard"
import SidebarProduct from "@/components/SidebarProduct"
import {
    AdjustmentsHorizontalIcon,
    ArchiveBoxIcon,
} from "@heroicons/react/24/outline"
import { ArrowLeftIcon, Bars3BottomRightIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../../store/slices/productSlice"

function Product() {
    const [showPopup, setShowPopup] = useState(false)
    const [showPopupMenu, setShowPopupMenu] = useState(false)

    const searchParams = useSearchParams()
    const router = useRouter()
    const currentPage = parseInt(searchParams.get("page")) || 1

    const dispatch = useDispatch()
    const products = useSelector(state => state.products.items)
    console.log("Products from Redux state:", products)
    const totalPages = useSelector(state => state.products.totalPages)
    console.log("Total from Redux state:", totalPages)

    useEffect(() => {
        console.log("Dispatching fetchProducts with page:", currentPage)
        dispatch(fetchProducts(currentPage))
    }, [currentPage, dispatch])

    const handlePageChange = page => {
        router.push(`?page=${page}`)
    }

    const togglePopup = () => setShowPopup(!showPopup)
    const closePopup = () => setShowPopup(false)
    const togglePopupMenu = () => setShowPopupMenu(!showPopupMenu)
    const closePopupMenu = () => setShowPopupMenu(false)

    useEffect(() => {
        if (showPopup || showPopupMenu) {
            document.body.classList.add("modal-open")
        } else {
            document.body.classList.remove("modal-open")
        }
    }, [showPopup, showPopupMenu])

    useEffect(() => {
        console.log("Fetched products in component:", products)
    }, [products])

    return (
        <div>
            <div className="hidden lg:block">
                <Navbar />
            </div>
            <div className="flex items-center justify-between border-b border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon className="h-6 w-6" />
                <div className="w-2/3">
                    <input
                        className="w-full rounded-3xl border py-2 pl-14 text-black bg-search focus:border-secondary focus:ring-0"
                        placeholder="Cari barang"
                    />
                </div>
                <Link href="/cart">
                    <ArchiveBoxIcon className="h-6 w-6" />
                </Link>
                <Bars3BottomRightIcon
                    className="h-6 w-6"
                    onClick={togglePopupMenu}
                />
            </div>
            <div className="flex items-center p-4 lg:hidden">
                <div className="flex items-center overflow-x-auto">
                    {/* Categories rendering code */}
                </div>
                <div
                    className="ml-4 mr-1 flex-shrink-0 rounded-full border border-[#BFC9D9] px-2 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]"
                    onClick={togglePopup}>
                    <AdjustmentsHorizontalIcon className="h-5 w-5 text-[#2E3137]" />
                </div>
            </div>
            {showPopup && <PopupFilter closePopup={closePopup} />}
            {showPopupMenu && (
                <PopupMenuMobile
                    showPopupMenu={showPopupMenu}
                    closePopupMenu={closePopupMenu}
                />
            )}
            <div className="mx-auto flex min-h-screen max-w-7xl">
                <SidebarProduct />
                <div className="w-full p-4 lg:w-4/5">
                    {products && products.length > 0 ? (
                        <>
                            <div className="pb-5 text-sm text-[#212121]">
                                Menampilkan 1 - {products.length} barang dari{" "}
                                {totalPages} barang
                            </div>
                            <div className="mb-8 grid grid-cols-2 gap-2 lg:grid-cols-5">
                                {products.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        image={product.images[0]}
                                        location={"Jakarta"}
                                        title={product.name}
                                        price={product.price.formatted}
                                        url={`/product/${product.slug}`}
                                        sale={
                                            product.show_price_before_discount
                                        }
                                        beforeDiscount={
                                            product.price_before_discount
                                                .formatted
                                        }
                                        totalQty={product.total_quantity}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>No products available</p>
                    )}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            <div className="hidden lg:block">
                <Footer />
            </div>
        </div>
    )
}

export default Product
