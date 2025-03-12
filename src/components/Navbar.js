"use client"

import CategorySelect from "@/components/CategorySelect"
import { useAuth } from "@/hooks/auth"
import { fetchCarts } from "@/store/slices/cartSlice"
import { fetchCategories, resetFilters, setFilters } from "@/store/slices/filterSlice"
import { useFetchProductsQuery } from "@/store/slices/productSlice"
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import LanguageSelector from "./LanguageSelector"
import { useTranslations } from "next-intl"
import Cookies from "js-cookie"

function Navbar({ togglePopupMenu, visibleOn = "both" }) {
    const t = useTranslations()
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [showSearchResults, setShowSearchResults] = useState(false)
    const inputRef = useRef(null)
    const popupRef = useRef(null)
    // const searchResults = useSelector(state => state.products.searchResults)
    const searchParams = useSearchParams()
    const currentPage = parseInt(searchParams.get("page")) || 1
    const { user } = useAuth({ middleware: "guest" })
    const dispatch = useDispatch()
    const categories = useSelector(state => state.filters.categories)
    // const scrollRef = useRef(null) // Reference to the scrollable div
    const carts = useSelector(state => state.carts.cart)

    const { data } = useFetchProductsQuery(
        { currentPage, filters: { search: searchQuery } },
        { skip: !searchQuery }, // Skip if there is no search query
    )

    const searchResults = data?.data || []

    useEffect(() => {
        // const getUser = JSON.parse(localStorage.getItem("user"))
        // setUser(isUserLogin)
        dispatch(fetchCarts())
        dispatch(fetchCategories())
    }, [])

    const handleSearchInputChange = e => {
        setSearchQuery(e.target.value)
        setShowSearchResults(e.target.value.length > 0)
        // dispatch(
        //     fetchSearchProducts({
        //         currentPage,
        //         filters: { search: e.target.value },
        //     }),
        // )
        setSearchQuery(e.target.value)
    }

    const handleSelectCategory = category => {
        if (category) {
            dispatch(setFilters({ categories: [category.slug] }))
            localStorage.setItem("category", category.slug)
            router.push(`/product?categories=${category.slug}&page=1`)
        } else {
            localStorage.removeItem("category")
            router.push("/")
        }
    }

    useEffect(() => {
        const handleClickOutside = event => {
            if (inputRef.current && !inputRef.current.contains(event.target) && popupRef.current && !popupRef.current.contains(event.target)) {
                setTimeout(() => {
                    setShowSearchResults(false)
                }, 200)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [setShowSearchResults])

    // Function to scroll left
    // const scrollLeft = () => {
    //     scrollRef.current.scrollBy({
    //         left: -200, // Scroll 200px to the left
    //         behavior: "smooth", // Smooth scroll animation
    //     })
    // }

    // Function to scroll right
    // const scrollRight = () => {
    //     scrollRef.current.scrollBy({
    //         left: 200, // Scroll 200px to the right
    //         behavior: "smooth",
    //     })
    // }

    const handleToProducts = () => {
        dispatch(resetFilters())
        router.push("/product?page=1")
    }

    const visibilityClasses = visibleOn === "mobile" ? "lg:hidden" : visibleOn === "desktop" ? "hidden lg:block" : ""

    return (
        <Suspense fallback={<div>Loading ... </div>}>
            <div className={`sticky top-0 z-40 ${visibilityClasses}`}>
                {/* Mobile Navbar */}
                <nav className="block h-[160px] bg-[#212121] px-4 py-3 lg:hidden">
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <Image src="/bulky.svg" width={60} height={20} alt="Logo" className="cursor-pointer" priority={false} />
                        </Link>
                        <div className="flex gap-2">
                            <Link href="/cart">
                                <div className="relative flex items-center justify-center gap-1 text-white hover:text-secondary lg:mx-5 xl:mx-10">
                                    <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-black">{carts ? carts.items_count : 0}</div>
                                    <Image src="/cart.png" width={34} height={34} alt="Cart" className="h-8 w-8" />
                                </div>
                            </Link>
                            <Bars3BottomRightIcon className="h-8 w-8 font-bold text-white" onClick={togglePopupMenu} />
                        </div>
                    </div>
                    <div className="relative mt-2">
                        <input ref={inputRef} className="w-full rounded-3xl py-2 pl-14 text-black bg-search focus:border-secondary focus:outline-none" placeholder={t("other.search")} value={searchQuery} onChange={handleSearchInputChange} />
                        {showSearchResults && (
                            <>
                                <div className="pointer-events-none fixed inset-0 top-[120px] z-40 bg-black bg-opacity-50" />
                                <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
                                    <ul className="py-2">
                                        {searchResults && searchResults.length > 0 ? (
                                            searchResults.map(product => (
                                                <li ref={popupRef} className="m-2 flex items-center justify-between px-4 py-2 hover:rounded-lg hover:bg-[#F0F3F7]" key={product.id} onMouseDown={e => e.preventDefault()} onClick={() => router.push(`/product/${product.slug}`)}>
                                                    {Cookies.get("locale") === "en" ? (product?.name_trans?.en ? product.name_trans.en : product?.name_trans?.id) : product?.name_trans?.id}
                                                </li>
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
                    <div className="mt-3 flex items-center justify-between text-sm">
                        {/*<ChevronLeftIcon*/}
                        {/*    onClick={scrollLeft}*/}
                        {/*    className="mr-1 h-5 w-5 cursor-pointer text-white hover:text-secondary"*/}
                        {/*/>*/}
                        {/*<div*/}
                        {/*    ref={scrollRef}*/}
                        {/*    className="scrollbar-hide w-full overflow-x-scroll text-sm">*/}
                        {/*    <ul className="inline-flex items-center space-x-4 whitespace-nowrap">*/}
                        {/*        {categories &&*/}
                        {/*            categories.length > 0 &&*/}
                        {/*            categories.map(category => (*/}
                        {/*                <li*/}
                        {/*                    key={category.id}*/}
                        {/*                    className="text-white">*/}
                        {/*                    <Link*/}
                        {/*                        href={`/product?category=${category.slug}`}>*/}
                        {/*                        {category.name}*/}
                        {/*                    </Link>*/}
                        {/*                </li>*/}
                        {/*            ))}*/}
                        {/*    </ul>*/}
                        {/*</div>*/}
                        {/*<ChevronRightIcon*/}
                        {/*    onClick={scrollRight}*/}
                        {/*    className="ml-1 h-5 w-5 cursor-pointer text-white hover:text-secondary"*/}
                        {/*/>*/}

                        <div className="w-full">
                            <CategorySelect options={categories} onSelect={handleSelectCategory} />
                        </div>
                    </div>
                </nav>

                {/* Desktop Navbar */}
                <nav className="hidden h-[140px] bg-[#212121] md:hidden lg:block">
                    <div className="mx-auto max-w-7xl px-5 py-3">
                        <div className="item-center flex pt-2">
                            <div className="item-center flex w-1/12">
                                <Link href="/">
                                    <Image src="/bulky.svg" width={100} height={30} alt="Logo" className="cursor-pointer" priority={false} />
                                </Link>
                            </div>
                            <div className="item-center flex pl-10 lg:w-8/12 xl:w-8/12 2xl:w-8/12">
                                <div className="relative w-full">
                                    <input ref={inputRef} className="w-full rounded-xl border-2 border-[#212121] py-2 pl-14 text-black bg-search focus:border-2 focus:border-secondary focus:outline-none" placeholder={t("other.search")} value={searchQuery} onChange={handleSearchInputChange} />
                                    {showSearchResults && (
                                        <>
                                            <div className="pointer-events-none fixed inset-0 top-[120px] z-40 bg-black bg-opacity-50" />
                                            <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
                                                <ul className="py-2">
                                                    {searchResults && searchResults.length > 0 ? (
                                                        searchResults.map(product => (
                                                            <li key={product.id} className="m-2 flex cursor-pointer items-center justify-between px-4 py-2 hover:rounded-lg hover:bg-[#F0F3F7]" onMouseDown={e => e.preventDefault()} onClick={() => router.push(`/product/${product.slug}`)}>
                                                                {Cookies.get("locale") === "en" ? (product?.name_trans?.en ? product.name_trans.en : product?.name_trans?.id) : product?.name_trans?.id}
                                                            </li>
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
                            </div>
                            <div className="flex lg:w-3/12 xl:w-3/12 2xl:w-3/12">
                                <div className="flex w-full items-center justify-between">
                                    <LanguageSelector />
                                    <Link href="/cart">
                                        <div className="flex cursor-pointer items-center justify-center gap-1 text-white hover:text-secondary lg:mx-5 xl:mx-10">
                                            <Image src="/cart.png" width={34} height={34} alt="Cart" />
                                            <div className="flex flex-col text-center text-xs">
                                                {/* {t("orderCart")} */}
                                                <span className="text-sm font-bold">
                                                    {carts ? carts.items_count : 0} {t("items")}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                    {!user ? (
                                        <Link href="/login" className="cursor-pointer rounded-lg bg-secondary px-7 py-2 text-center text-sm hover:bg-[#e8bc00]">
                                            {t("navbar.login")}
                                        </Link>
                                    ) : (
                                        <Link href="/profile">
                                            <div className="flex cursor-pointer items-center px-2">
                                                <div className="text-white hover:text-secondary">
                                                    <div className="text-sm">{t("hai")}</div>
                                                    <div className="flex cursor-pointer items-center">
                                                        <div className="line-clamp-1 text-sm font-bold">{user && user.data.name}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            {/*<ChevronLeftIcon*/}
                            {/*    onClick={scrollLeft}*/}
                            {/*    className="mr-2 h-5 w-5 cursor-pointer text-white hover:text-secondary"*/}
                            {/*/>*/}
                            {/*<div*/}
                            {/*    ref={scrollRef}*/}
                            {/*    className="scrollbar-hide w-full overflow-x-scroll whitespace-nowrap">*/}
                            {/*    <ul className="inline-flex items-center whitespace-nowrap">*/}
                            {/*        {categories &&*/}
                            {/*            categories.length > 0 &&*/}
                            {/*            categories.map(category => (*/}
                            {/*                <li*/}
                            {/*                    key={category.id}*/}
                            {/*                    className="mr-5 text-white">*/}
                            {/*                    <Link*/}
                            {/*                        href={`/product?category=${category.slug}`}>*/}
                            {/*                        {category.name}*/}
                            {/*                    </Link>*/}
                            {/*                </li>*/}
                            {/*            ))}*/}
                            {/*    </ul>*/}
                            {/*</div>*/}
                            {/*<ChevronRightIcon*/}
                            {/*    onClick={scrollRight}*/}
                            {/*    className="ml-2 h-5 w-5 cursor-pointer text-white hover:text-secondary"*/}
                            {/*/>*/}

                            <div className="w-3/12 pr-16">
                                <CategorySelect options={categories} onSelect={handleSelectCategory} />
                            </div>
                            <div className="flex w-7/12 items-center justify-between">
                                <Link href="/">
                                    <div className="cursor-pointer px-8 text-white hover:text-secondary">{t("navbar.home")}</div>
                                </Link>
                                <div className="cursor-pointer px-8 text-white hover:text-secondary" onClick={handleToProducts}>
                                    {t("navbar.product")}
                                </div>
                                <Link href="/about-us">
                                    <div className="cursor-pointer px-8 text-white hover:text-secondary">{t("navbar.about")}</div>
                                </Link>
                                <Link href="/contact-us">
                                    <div className="cursor-pointer px-8 text-white hover:text-secondary">{t("navbar.contact")}</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </Suspense>
    )
}

export default Navbar
