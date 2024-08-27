"use client"

import { fetchSearchProducts } from "@/store/slices/productSlice"
import {
    ArchiveBoxIcon,
    Bars3BottomRightIcon,
    BellIcon,
} from "@heroicons/react/24/outline"
import { ChevronDownIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function Navbar({ togglePopupMenu }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [showSearchResults, setShowSearchResults] = useState(false)
    const inputRef = useRef(null)
    const searchResults = useSelector(state => state.products.searchResults)
    const searchParams = useSearchParams()
    const currentPage = parseInt(searchParams.get("page")) || 1
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        const getUser = JSON.parse(localStorage.getItem("user"))
        setUser(getUser)
    }, [])

    useEffect(() => {
        setIsAuthenticated(user !== null)
    }, [user])

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
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowSearchResults(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [setShowSearchResults])

    return (
        <Suspense fallback={<div>Loading ... </div>}>
            <div className="sticky top-0 z-40">
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
                                                    key={product.id}>
                                                    <li className="m-2 flex items-center justify-between px-4 py-2 hover:rounded-lg hover:bg-[#F0F3F7]">
                                                        {product.name}
                                                    </li>
                                                </Link>
                                            ))
                                        ) : (
                                            <li className="flex items-center justify-between px-4 py-2">
                                                <p className="px-4 py-2">
                                                    Tidak ada hasilan yang cocok
                                                </p>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="mt-2 w-full overflow-x-auto text-sm">
                        <ul className="inline-flex items-center space-x-4 whitespace-nowrap">
                            <li className="text-white">Elektronik</li>
                            <li className="text-white">Fashion</li>
                            <li className="text-white">Rumah Tangga</li>
                            <li className="text-white">Olahraga</li>
                            <li className="text-white">Kecantikan</li>
                        </ul>
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
                                <div className="flex items-center">
                                    <BellIcon className="mr-2 h-9 w-9 font-bold text-white" />
                                </div>
                                <Link href="/cart">
                                    <div className="flex items-center lg:mx-7 xl:mx-10">
                                        <ArchiveBoxIcon className="h-9 w-9 font-bold text-white" />
                                        <div className="ml-3 text-center text-white">
                                            <div className="text-sm">
                                                Keranjang
                                            </div>
                                            <div className="text-sm font-bold">
                                                0 Items
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                {!isAuthenticated ? (
                                    <Link
                                        href="/login"
                                        className="ml-5 cursor-pointer rounded-lg bg-secondary px-10 py-2 text-center text-lg font-bold hover:bg-[#e8bc00]">
                                        Masuk
                                    </Link>
                                ) : (
                                    <Link href="/profile">
                                        <div className="flex items-center px-7 py-2">
                                            <div className="ml-3 text-white">
                                                <div className="text-sm">
                                                    Welcome
                                                </div>
                                                <div className="flex cursor-pointer items-center">
                                                    <div className="mr-2 text-sm font-bold">
                                                        {user.name}
                                                    </div>
                                                    <ChevronDownIcon className="h-5 w-5 font-bold text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 flex justify-between text-sm">
                        <div className="w-2/3">
                            <ul className="inline-flex items-center">
                                {/* <li className="mr-5 text-white">
                                <Bars3BottomRightIcon className="h-8 w-8 font-bold text-white" />
                            </li> */}
                                <li className="mr-5 text-white">Elektronik</li>
                                <li className="mr-5 text-white">Fashion</li>
                                <li className="mr-5 text-white">
                                    Rumah Tangga
                                </li>
                                <li className="mr-5 text-white">Olahraga</li>
                                <li className="mr-5 text-white">Kecantikan</li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </Suspense>
    )
}

export default Navbar
