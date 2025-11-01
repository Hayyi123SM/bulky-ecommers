// components/Product.js
"use client"

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import PopupMenuMobile from "@/components/PopupMenuMobile"
import { ArrowLeftIcon, Bars3BottomRightIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import FloatingIcon from "@/components/FloatingIcon"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSearchProducts } from "@/store/slices/productSlice"
import { ArrowRightIcon } from "@heroicons/react/24/outline"

function Product() {
    const t = useTranslations()
    const router = useRouter()
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    const popupRef = useRef(null)

    const carts = useSelector(state => state.carts.cart)
    const searchResults = useSelector(state => state.products.searchResults)

    const [searchQuery, setSearchQuery] = useState("")
    const [showSearchResults, setShowSearchResults] = useState(false)
    const [showPopupMenu, setShowPopupMenu] = useState(false)

    const togglePopupMenu = () => setShowPopupMenu(!showPopupMenu)
    const closePopupMenu = () => setShowPopupMenu(false)

    const handleSearchInputChange = e => {
        setSearchQuery(e.target.value)
        setShowSearchResults(e.target.value.length > 0)
        dispatch(
            fetchSearchProducts({
                currentPage: 1,
                filters: { search: e.target.value },
            }),
        )
    }

    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center justify-between border-b border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon className="h-6 w-6" onClick={() => router.back()} />
                <div className="w-2/3">
                    <input ref={inputRef} className="w-full rounded-3xl border py-2 pl-14 text-black bg-search focus:border-secondary focus:ring-0" placeholder={t("other.search")} value={searchQuery} onChange={handleSearchInputChange} />
                    {showSearchResults && (
                        <>
                            <div className="pointer-events-none fixed inset-0 top-[67px] z-40 bg-black bg-opacity-50" />
                            <div className="absolute left-0 z-50 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
                                <ul className="py-2">
                                    {searchResults && searchResults.length > 0 ? (
                                        searchResults.map(product => (
                                            <Link href={`/product/${product.slug}`} key={product.id} onMouseDown={e => e.preventDefault()}>
                                                <li ref={popupRef} className="m-2 flex items-center justify-between px-4 py-2 hover:rounded-lg hover:bg-[#F0F3F7]">
                                                    {product.name}
                                                </li>
                                            </Link>
                                        ))
                                    ) : (
                                        <li className="flex items-center justify-between px-4 py-2">
                                            <p className="px-4 py-2">{t("other.noResult")}</p>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
                <Link href="/cart">
                    <div className="relative flex items-center justify-center gap-1 text-white hover:text-secondary lg:mx-5 xl:mx-10">
                        <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-black bg-white text-xs font-bold text-black">{carts ? carts.items_count : 0}</div>
                        <Image src="/cart-black.svg" width={34} height={34} alt="Cart" className="h-8 w-8" />
                    </div>
                </Link>
                <Bars3BottomRightIcon className="h-6 w-6" onClick={togglePopupMenu} />
            </div>
            {showPopupMenu && <PopupMenuMobile showPopupMenu={showPopupMenu} closePopupMenu={closePopupMenu} />}
            <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 p-2 md:gap-10 md:p-6 md:pb-16">
                <div className="flex w-full flex-col gap-2 px-2 md:gap-4 md:px-4">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <div className="flex size-8 items-center justify-center rounded-full bg-secondary/50 md:size-10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 md:size-5" viewBox="0 0 15 12" fill="none">
                                    <path
                                        d="M9.75 0C10.1478 0 10.5294 0.158035 10.8107 0.43934C11.092 0.720644 11.25 1.10218 11.25 1.5V2.25H12.39C12.6148 2.25003 12.8368 2.30059 13.0394 2.39796C13.2421 2.49532 13.4202 2.637 13.5607 2.8125L14.6708 4.20075C14.8838 4.46677 14.9999 4.79742 15 5.13825V8.25C15 8.64782 14.842 9.02936 14.5607 9.31066C14.2794 9.59196 13.8978 9.75 13.5 9.75C13.5 10.3467 13.2629 10.919 12.841 11.341C12.419 11.7629 11.8467 12 11.25 12C10.6533 12 10.081 11.7629 9.65901 11.341C9.23705 10.919 9 10.3467 9 9.75H6C6 10.0455 5.9418 10.3381 5.82873 10.611C5.71566 10.884 5.54992 11.1321 5.34099 11.341C5.13206 11.5499 4.88402 11.7157 4.61104 11.8287C4.33806 11.9418 4.04547 12 3.75 12C3.45453 12 3.16194 11.9418 2.88896 11.8287C2.61598 11.7157 2.36794 11.5499 2.15901 11.341C1.95008 11.1321 1.78434 10.884 1.67127 10.611C1.5582 10.3381 1.5 10.0455 1.5 9.75C1.10218 9.75 0.720644 9.59196 0.43934 9.31066C0.158035 9.02936 0 8.64782 0 8.25V1.5C0 1.10218 0.158035 0.720644 0.43934 0.43934C0.720644 0.158035 1.10218 0 1.5 0H9.75ZM3.75 9C3.55109 9 3.36032 9.07902 3.21967 9.21967C3.07902 9.36032 3 9.55109 3 9.75C3 9.94891 3.07902 10.1397 3.21967 10.2803C3.36032 10.421 3.55109 10.5 3.75 10.5C3.94891 10.5 4.13968 10.421 4.28033 10.2803C4.42098 10.1397 4.5 9.94891 4.5 9.75C4.5 9.55109 4.42098 9.36032 4.28033 9.21967C4.13968 9.07902 3.94891 9 3.75 9ZM11.25 9C11.0511 9 10.8603 9.07902 10.7197 9.21967C10.579 9.36032 10.5 9.55109 10.5 9.75C10.5 9.94891 10.579 10.1397 10.7197 10.2803C10.8603 10.421 11.0511 10.5 11.25 10.5C11.4489 10.5 11.6397 10.421 11.7803 10.2803C11.921 10.1397 12 9.94891 12 9.75C12 9.55109 11.921 9.36032 11.7803 9.21967C11.6397 9.07902 11.4489 9 11.25 9ZM9.75 1.5H1.5V8.25H2.073C2.27584 8.02269 2.52277 7.83899 2.7988 7.71005C3.07482 7.58112 3.37418 7.50964 3.67868 7.49996C3.98318 7.49028 4.28647 7.5426 4.57012 7.65374C4.85378 7.76489 5.11188 7.93253 5.32875 8.1465L5.427 8.25H9.573L9.65925 8.15925L9.75 8.073V1.5ZM12.39 3.75H11.25V7.5C11.865 7.5 12.4222 7.7475 12.8287 8.1465L12.927 8.25H13.5V5.1375L12.39 3.75Z"
                                        className="fill-black"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-lg font-bold md:text-2xl">PALET LOAD</h2>
                        </div>
                        <Link href={"/product?packaging_type=palet"} className="flex items-center gap-2 text-xs transition-all hover:-translate-x-3 hover:underline md:text-sm">
                            Lihat Semua Product
                            <ArrowRightIcon className="size-3.5" />
                        </Link>
                    </div>
                    <div className="relative flex aspect-[3/1] w-full items-center justify-center text-3xl md:aspect-[4/1]">
                        <div className="relative size-full overflow-hidden rounded-lg object-cover">
                            <Image src={"/check-banner.webp"} fill alt="Banner 1" className="object-cover" />
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-2 px-2 md:gap-4 md:px-4">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <div className="flex size-8 items-center justify-center rounded-full bg-secondary/50 md:size-10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 md:size-5" viewBox="0 0 15 15" fill="none">
                                    <path
                                        d="M2.25 13.3333V14.2593C2.25 14.4691 2.178 14.6452 2.034 14.7874C1.89 14.9296 1.712 15.0005 1.5 15H0.75C0.5375 15 0.3595 14.9289 0.216 14.7867C0.0725001 14.6444 0.0005 14.4686 0 14.2593V12.5926C0 12.3827 0.0720001 12.2069 0.216 12.0652C0.36 11.9235 0.538 11.8523 0.75 11.8518H14.25C14.4625 11.8518 14.6407 11.923 14.7847 12.0652C14.9287 12.2074 15.0005 12.3832 15 12.5926V14.2593C15 14.4691 14.928 14.6452 14.784 14.7874C14.64 14.9296 14.462 15.0005 14.25 15H13.5C13.2875 15 13.1095 14.9289 12.966 14.7867C12.8225 14.6444 12.7505 14.4686 12.75 14.2593V13.3333H8.625V14.2593C8.625 14.4691 8.553 14.6452 8.409 14.7874C8.265 14.9296 8.087 15.0005 7.875 15H7.125C6.9125 15 6.7345 14.9289 6.591 14.7867C6.4475 14.6444 6.3755 14.4686 6.375 14.2593V13.3333H2.25ZM3 10.3704C2.7875 10.3704 2.6095 10.2993 2.466 10.157C2.3225 10.0148 2.2505 9.83901 2.25 9.62963V0.740741C2.25 0.530864 2.322 0.355062 2.466 0.213333C2.61 0.071605 2.788 0.000493827 3 0H12C12.2125 0 12.3907 0.0711112 12.5347 0.213333C12.6787 0.355556 12.7505 0.531358 12.75 0.740741V9.62963C12.75 9.8395 12.678 10.0156 12.534 10.1578C12.39 10.3 12.212 10.3709 12 10.3704H3ZM3.75 8.88889H11.25V1.48148H3.75V8.88889ZM9 4.44444C9.2125 4.44444 9.39075 4.37333 9.53475 4.23111C9.67875 4.08889 9.7505 3.91309 9.75 3.7037C9.7495 3.49432 9.6775 3.31852 9.534 3.1763C9.3905 3.03407 9.2125 2.96296 9 2.96296H6C5.7875 2.96296 5.6095 3.03407 5.466 3.1763C5.3225 3.31852 5.2505 3.49432 5.25 3.7037C5.2495 3.91309 5.3215 4.08913 5.466 4.23185C5.6105 4.37457 5.7885 4.44543 6 4.44444H9Z"
                                        className="fill-black"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-lg font-bold md:text-2xl">TRUCK LOAD</h2>
                        </div>
                        <Link href={"/product?packaging_type=truck_load"} className="flex items-center gap-2 text-xs transition-all hover:-translate-x-3 hover:underline md:text-sm">
                            Lihat Semua Product
                            <ArrowRightIcon className="size-3.5" />
                        </Link>
                    </div>
                    <div className="relative flex aspect-[3/1] w-full items-center justify-center text-3xl md:aspect-[4/1]">
                        <div className="relative size-full overflow-hidden rounded-lg object-cover">
                            <Image src={"/check-banner.webp"} fill alt="Banner 1" className="object-cover" />
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-2 px-2 md:gap-4 md:px-4">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <div className="flex size-8 items-center justify-center rounded-full bg-secondary/50 md:size-10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 md:size-5" viewBox="0 0 15 15" fill="none">
                                    <path
                                        d="M13.5 6H12L8.4075 3.375C8.58878 3.24828 8.73713 3.08006 8.8402 2.88436C8.94326 2.68867 8.99806 2.47117 9 2.25C8.99634 1.98856 8.92542 1.73247 8.79405 1.50639C8.66269 1.28032 8.47532 1.09189 8.25 0.95925V0H7.5V1.5C7.64834 1.5 7.79334 1.54399 7.91668 1.6264C8.04001 1.70881 8.13614 1.82594 8.19291 1.96299C8.24967 2.10003 8.26453 2.25083 8.23559 2.39632C8.20665 2.5418 8.13522 2.67544 8.03033 2.78033C7.92544 2.88522 7.7918 2.95665 7.64632 2.98559C7.50083 3.01453 7.35003 2.99968 7.21299 2.94291C7.07594 2.88614 6.95881 2.79001 6.8764 2.66668C6.79399 2.54334 6.75 2.39834 6.75 2.25H6C6.00245 2.47156 6.05793 2.68932 6.1618 2.88504C6.26566 3.08077 6.41489 3.24877 6.597 3.375L3 6H1.5C1.10218 6 0.720644 6.15804 0.43934 6.43934C0.158035 6.72064 0 7.10217 0 7.5V13.5C0 13.8978 0.158035 14.2794 0.43934 14.5607C0.720644 14.842 1.10218 15 1.5 15H13.5C13.6971 15.0003 13.8923 14.9617 14.0744 14.8864C14.2565 14.8111 14.422 14.7007 14.5613 14.5613C14.7007 14.422 14.8111 14.2565 14.8864 14.0744C14.9617 13.8923 15.0003 13.6971 15 13.5V7.5C15 7.10217 14.842 6.72064 14.5607 6.43934C14.2794 6.15804 13.8978 6 13.5 6ZM7.5 3.75C7.5045 3.75 10.5 6 10.5 6H4.5L7.5 3.75ZM13.5 13.5H1.5V7.5H13.5V13.5Z"
                                        className="fill-black"
                                    />
                                    <path
                                        d="M9 12.75C9.19891 12.75 9.38968 12.671 9.53033 12.5303C9.67098 12.3897 9.75 12.1989 9.75 12V9C9.75 8.80109 9.67098 8.61032 9.53033 8.46967C9.38968 8.32902 9.19891 8.25 9 8.25C8.80109 8.25 8.61032 8.32902 8.46967 8.46967C8.32902 8.61032 8.25 8.80109 8.25 9V12C8.25 12.1989 8.32902 12.3897 8.46967 12.5303C8.61032 12.671 8.80109 12.75 9 12.75ZM12 12.75C12.1989 12.75 12.3897 12.671 12.5303 12.5303C12.671 12.3897 12.75 12.1989 12.75 12V9C12.75 8.80109 12.671 8.61032 12.5303 8.46967C12.3897 8.32902 12.1989 8.25 12 8.25C11.8011 8.25 11.6103 8.32902 11.4697 8.46967C11.329 8.61032 11.25 8.80109 11.25 9V12C11.25 12.1989 11.329 12.3897 11.4697 12.5303C11.6103 12.671 11.8011 12.75 12 12.75ZM3 12.75C3.19891 12.75 3.38968 12.671 3.53033 12.5303C3.67098 12.3897 3.75 12.1989 3.75 12V9C3.75 8.80109 3.67098 8.61032 3.53033 8.46967C3.38968 8.32902 3.19891 8.25 3 8.25C2.80109 8.25 2.61032 8.32902 2.46967 8.46967C2.32902 8.61032 2.25 8.80109 2.25 9V12C2.25 12.1989 2.32902 12.3897 2.46967 12.5303C2.61032 12.671 2.80109 12.75 3 12.75ZM6 12.75C6.19891 12.75 6.38968 12.671 6.53033 12.5303C6.67098 12.3897 6.75 12.1989 6.75 12V9C6.75 8.80109 6.67098 8.61032 6.53033 8.46967C6.38968 8.32902 6.19891 8.25 6 8.25C5.80109 8.25 5.61032 8.32902 5.46967 8.46967C5.32902 8.61032 5.25 8.80109 5.25 9V12C5.25 12.1989 5.32902 12.3897 5.46967 12.5303C5.61032 12.671 5.80109 12.75 6 12.75Z"
                                        className="fill-black"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-lg font-bold md:text-2xl">CONTAINER LOAD</h2>
                        </div>
                        <Link href={"/product?packaging_type=container"} className="flex items-center gap-2 text-xs transition-all hover:-translate-x-3 hover:underline md:text-sm">
                            Lihat Semua Product
                            <ArrowRightIcon className="size-3.5" />
                        </Link>
                    </div>
                    <div className="relative flex aspect-[3/1] w-full items-center justify-center text-3xl md:aspect-[4/1]">
                        <div className="relative size-full overflow-hidden rounded-lg object-cover">
                            <Image src={"/check-banner.webp"} fill alt="Banner 1" className="object-cover" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block">
                <Footer />
            </div>
            <FloatingIcon />
        </div>
    )
}

export default Product
