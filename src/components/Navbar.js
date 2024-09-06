"use client"

import { useAuth } from "@/hooks/auth"
import { fetchCarts } from "@/store/slices/cartSlice"
import { fetchCategories } from "@/store/slices/filterSlice"
import { fetchSearchProducts } from "@/store/slices/productSlice"
import {
    ArchiveBoxIcon,
    Bars3BottomRightIcon,
} from "@heroicons/react/24/outline"
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function Navbar({ togglePopupMenu, visibleOn = "both" }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [showSearchResults, setShowSearchResults] = useState(false)
    const inputRef = useRef(null)
    const popupRef = useRef(null)
    const searchResults = useSelector(state => state.products.searchResults)
    const searchParams = useSearchParams()
    const currentPage = parseInt(searchParams.get("page")) || 1
    const { user } = useAuth()
    const dispatch = useDispatch()
    const carts = useSelector(state => state.carts.cart)
    const categories = useSelector(state => state.filters.categories)
    const scrollRef = useRef(null) // Reference to the scrollable div

    useEffect(() => {
        // const getUser = JSON.parse(localStorage.getItem("user"))
        // setUser(isUserLogin)
        dispatch(fetchCarts())
        dispatch(fetchCategories())
    }, [])

    const handleSearchInputChange = e => {
        setSearchQuery(e.target.value)
        setShowSearchResults(e.target.value.length > 0)
        dispatch(
            fetchSearchProducts({
                currentPage,
                filters: { search: e.target.value },
            }),
        )
    }

    useEffect(() => {
        const handleClickOutside = event => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target) &&
                popupRef.current &&
                !popupRef.current.contains(event.target)
            ) {
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
    const scrollLeft = () => {
        scrollRef.current.scrollBy({
            left: -200, // Scroll 200px to the left
            behavior: "smooth", // Smooth scroll animation
        })
    }

    // Function to scroll right
    const scrollRight = () => {
        scrollRef.current.scrollBy({
            left: 200, // Scroll 200px to the right
            behavior: "smooth",
        })
    }

    const visibilityClasses =
        visibleOn === "mobile"
            ? "lg:hidden"
            : visibleOn === "desktop"
              ? "hidden lg:block"
              : ""

    return (
        <Suspense fallback={<div>Loading ... </div>}>
            <div className={`sticky top-0 z-40 ${visibilityClasses}`}>
                <nav className="block h-[134px] bg-primary px-4 py-3 lg:hidden">
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <Image
                                src="/bulky.svg"
                                width={100}
                                height={30}
                                alt="Logo"
                                className="h-auto w-full cursor-pointer"
                                priority={false}
                            />
                        </Link>
                        <Bars3BottomRightIcon
                            className="h-8 w-8 font-bold text-white"
                            onClick={togglePopupMenu}
                        />
                    </div>
                    <div className="relative mt-2">
                        <input
                            ref={inputRef}
                            className="w-full rounded-3xl py-2 pl-14 text-black bg-search focus:border-secondary focus:ring-0"
                            placeholder="Cari barang"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                        {showSearchResults && (
                            <>
                                <div className="pointer-events-none fixed inset-0 top-[120px] z-40 bg-black bg-opacity-50">
                                    {" "}
                                </div>
                                <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
                                    <ul className="py-2">
                                        {searchResults &&
                                        searchResults.length > 0 ? (
                                            searchResults.map(product => (
                                                <Link
                                                    href={`/product/${product.slug}`}
                                                    key={product.id}
                                                    onMouseDown={e =>
                                                        e.preventDefault()
                                                    }>
                                                    <li
                                                        ref={popupRef}
                                                        className="m-2 flex items-center justify-between px-4 py-2 hover:rounded-lg hover:bg-[#F0F3F7]">
                                                        {product.name}
                                                    </li>
                                                </Link>
                                            ))
                                        ) : (
                                            <li className="flex items-center justify-between px-4 py-2">
                                                <p className="px-4 py-2">
                                                    Tidak ada hasil yang cocok
                                                </p>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                        <ChevronLeftIcon
                            onClick={scrollLeft}
                            className="mr-1 h-5 w-5 cursor-pointer text-white hover:text-secondary"
                        />
                        <div
                            ref={scrollRef}
                            className="scrollbar-hide w-full overflow-x-scroll text-sm">
                            <ul className="inline-flex items-center space-x-4 whitespace-nowrap">
                                {categories &&
                                    categories.length > 0 &&
                                    categories.map(category => (
                                        <li
                                            key={category.id}
                                            className="text-white">
                                            <Link
                                                href={`/product?category=${category.slug}`}>
                                                {category.name}
                                            </Link>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <ChevronRightIcon
                            onClick={scrollRight}
                            className="ml-1 h-5 w-5 cursor-pointer text-white hover:text-secondary"
                        />
                    </div>
                </nav>

                <nav className="hidden h-[120px] bg-primary px-10 py-3 md:hidden lg:block">
                    <div className="item-center flex">
                        <div className="item-center flex w-1/12">
                            <Link href="/">
                                <Image
                                    src="/bulky.svg"
                                    width={100}
                                    height={30}
                                    alt="Logo"
                                    className="h-auto w-full cursor-pointer"
                                    priority={false}
                                />
                            </Link>
                        </div>
                        <div className="item-center flex pl-10 lg:w-6/12 xl:w-7/12 2xl:w-8/12">
                            <div className="relative w-full">
                                <input
                                    ref={inputRef}
                                    className="w-full rounded-lg py-2 pl-14 text-black bg-search focus:border-secondary focus:ring-0"
                                    placeholder="Cari barang bundlemu di bulky aja..."
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                />
                                {showSearchResults && (
                                    <>
                                        <div className="pointer-events-none fixed inset-0 top-[120px] z-40 bg-black bg-opacity-50">
                                            {" "}
                                        </div>
                                        <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
                                            <ul className="py-2">
                                                {searchResults &&
                                                searchResults.length > 0 ? (
                                                    searchResults.map(
                                                        product => (
                                                            <Link
                                                                href={`/product/${product.slug}`}
                                                                key={
                                                                    product.id
                                                                }>
                                                                <li
                                                                    className="m-2 flex items-center justify-between px-4 py-2 hover:rounded-lg hover:bg-[#F0F3F7]"
                                                                    onMouseDown={e =>
                                                                        e.preventDefault()
                                                                    }>
                                                                    {
                                                                        product.name
                                                                    }
                                                                </li>
                                                            </Link>
                                                        ),
                                                    )
                                                ) : (
                                                    <li className="flex items-center justify-between px-4 py-2">
                                                        <p className="px-4 py-2">
                                                            Tidak ada hasilan
                                                            yang cocok
                                                        </p>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="flex lg:w-5/12 xl:w-4/12 2xl:w-3/12">
                            <div className="flex w-full items-center justify-end">
                                <div className="flex cursor-pointer items-center">
                                    {/* <BellIcon className="mr-2 h-9 w-9 font-bold text-white hover:text-secondary" /> */}
                                </div>
                                <Link href="/cart">
                                    <div className="flex items-center text-white hover:text-secondary lg:mx-7 xl:mx-10">
                                        <ArchiveBoxIcon className="h-9 w-9 font-bold hover:text-secondary" />
                                        <div className="ml-3 text-center hover:text-secondary">
                                            <div className="text-sm">
                                                Keranjang
                                            </div>
                                            <div className="text-sm font-bold">
                                                {carts ? carts.items_count : 0}{" "}
                                                Items
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                {!user ? (
                                    <Link
                                        href="/login"
                                        className="ml-5 cursor-pointer rounded-lg bg-secondary px-10 py-2 text-center text-lg font-bold hover:bg-[#e8bc00]">
                                        Masuk
                                    </Link>
                                ) : (
                                    <Link href="/profile">
                                        <div className="flex items-center px-7 py-2">
                                            <div className="ml-3 text-white hover:text-secondary">
                                                <div className="text-sm">
                                                    Welcome
                                                </div>
                                                <div className="flex cursor-pointer items-center">
                                                    <div className="mr-2 text-sm font-bold">
                                                        {user && user.data.name}
                                                    </div>
                                                    <ChevronDownIcon className="h-5 w-5 font-bold" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 flex items-center justify-between text-sm">
                        <ChevronLeftIcon
                            onClick={scrollLeft}
                            className="mr-2 h-5 w-5 cursor-pointer text-white hover:text-secondary"
                        />
                        <div
                            ref={scrollRef}
                            className="scrollbar-hide w-full overflow-x-scroll whitespace-nowrap">
                            <ul className="inline-flex items-center whitespace-nowrap">
                                {categories &&
                                    categories.length > 0 &&
                                    categories.map(category => (
                                        <li
                                            key={category.id}
                                            className="mr-5 text-white">
                                            <Link
                                                href={`/product?category=${category.slug}`}>
                                                {category.name}
                                            </Link>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <ChevronRightIcon
                            onClick={scrollRight}
                            className="ml-2 h-5 w-5 cursor-pointer text-white hover:text-secondary"
                        />
                    </div>
                </nav>
            </div>
        </Suspense>
    )
}

export default Navbar
