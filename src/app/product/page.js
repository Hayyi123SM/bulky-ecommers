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
import { useEffect, useRef, useState } from "react"
import Skeleton from "react-loading-skeleton"
import { useDispatch, useSelector } from "react-redux"
import {
    fetchProducts,
    fetchSearchProducts,
} from "../../store/slices/productSlice"

function Product() {
    const category = useSearchParams().get("category")

    const [showPopup, setShowPopup] = useState(false)
    const [showPopupMenu, setShowPopupMenu] = useState(false)
    const [isOpenPdf, setIsOpenPdf] = useState(false)
    const [isPdf, setIsPdf] = useState(null)

    // const searchParams = useSearchParams()
    const router = useRouter()
    const inputRef = useRef(null)
    const popupRef = useRef(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [showSearchResults, setShowSearchResults] = useState(false)
    const currentPage = useSelector(state => state.products.currentPage || 1)

    const dispatch = useDispatch()
    const products = useSelector(state => state.products.items)
    const totalPages = useSelector(state => state.products.totalPages)
    const filters = useSelector(state => state.filters.selectedFilters)
    const loadingProducts = useSelector(state => state.products.isLoading)
    const searchResults = useSelector(state => state.products.searchResults)

    const selectedFilters = useSelector(state => state.filters.selectedFilters)
    const categories = useSelector(state => state.filters.categories)
    const warehouses = useSelector(state => state.filters.warehouses)
    const conditions = useSelector(state => state.filters.conditions)
    const statuses = useSelector(state => state.filters.statuses)
    const brands = useSelector(state => state.filters.brands)

    useEffect(() => {
        if (currentPage && filters) {
            dispatch(fetchProducts({ currentPage, filters })) // pastikan currentPage tidak undefined
        }
    }, [currentPage, filters, dispatch])

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

    const handlePageChange = page => {
        if (page) {
            router.push(`?page=${page}`)
            dispatch(fetchProducts({ currentPage: page, filters }))
        }
    }

    const togglePopup = () => setShowPopup(!showPopup)
    const closePopup = () => setShowPopup(false)
    const togglePopupMenu = () => setShowPopupMenu(!showPopupMenu)
    const closePopupMenu = () => setShowPopupMenu(false)
    const handlePackageDetail = pdf => {
        setIsOpenPdf(true)
        setIsPdf(pdf)
    }
    // Get the names of selected filters
    const selectedCategoryNames = categories
        .filter(category => selectedFilters.categories.includes(category.slug))
        .map(category => category.name)

    const selectedWarehouseNames = warehouses
        .filter(warehouse => selectedFilters.warehouses.includes(warehouse.id))
        .map(warehouse => warehouse.name)

    const selectedConditionNames = conditions
        .filter(condition =>
            selectedFilters.conditions.includes(condition.slug),
        )
        .map(condition => condition.title)

    const selectedStatusNames = statuses
        .filter(status => selectedFilters.statuses.includes(status.id))
        .map(status => status.status)

    const selectedBrandNames = brands
        .filter(brand => selectedFilters.brands.includes(brand.slug))
        .map(brand => brand.name)

    useEffect(() => {
        if (showPopup || showPopupMenu) {
            document.body.classList.add("modal-open")
        } else {
            document.body.classList.remove("modal-open")
        }
    }, [showPopup, showPopupMenu])

    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center justify-between border-b border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon
                    className="h-6 w-6"
                    onClick={() => router.back()}
                />
                <div className="w-2/3">
                    <input
                        ref={inputRef}
                        className="w-full rounded-3xl border py-2 pl-14 text-black bg-search focus:border-secondary focus:ring-0"
                        placeholder="Cari barang"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    {showSearchResults && (
                        <>
                            <div className="pointer-events-none fixed inset-0 top-[67px] z-40 bg-black bg-opacity-50">
                                {" "}
                            </div>
                            <div className="absolute left-0 z-50 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
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
                <Link href="/cart">
                    <ArchiveBoxIcon className="h-6 w-6" />
                </Link>
                <Bars3BottomRightIcon
                    className="h-6 w-6"
                    onClick={togglePopupMenu}
                />
            </div>
            <div className="flex items-center p-4 lg:hidden">
                <div className="mr-2 flex items-center overflow-x-auto">
                    {selectedCategoryNames.map((name, index) => (
                        <div
                            key={`category-${index}`}
                            className="mr-1 flex-shrink-0 rounded-3xl border border-[#007185] bg-[#0071850D] px-4 py-2 text-base text-[#007185]">
                            {name}
                        </div>
                    ))}
                    {selectedWarehouseNames.map((name, index) => (
                        <div
                            key={`warehouse-${index}`}
                            className="mr-1 flex-shrink-0 rounded-3xl border border-[#007185] bg-[#0071850D] px-4 py-2 text-base text-[#007185]">
                            {name}
                        </div>
                    ))}
                    {selectedConditionNames.map((name, index) => (
                        <div
                            key={`condition-${index}`}
                            className="mr-1 flex-shrink-0 rounded-3xl border border-[#007185] bg-[#0071850D] px-4 py-2 text-base text-[#007185]">
                            {name}
                        </div>
                    ))}
                    {selectedStatusNames.map((name, index) => (
                        <div
                            key={`status-${index}`}
                            className="mr-1 flex-shrink-0 rounded-3xl border border-[#007185] bg-[#0071850D] px-4 py-2 text-base text-[#007185]">
                            {name}
                        </div>
                    ))}
                    {selectedBrandNames.map((name, index) => (
                        <div
                            key={`brand-${index}`}
                            className="mr-1 flex-shrink-0 rounded-3xl border border-[#007185] bg-[#0071850D] px-4 py-2 text-base text-[#007185]">
                            {name}
                        </div>
                    ))}
                    {/* Render price range if available */}
                    {selectedFilters.minPrice || selectedFilters.maxPrice ? (
                        <div className="mr-1 flex-shrink-0 rounded-3xl border border-[#007185] bg-[#0071850D] px-4 py-2 text-base text-[#007185]">
                            {`Rp ${selectedFilters.minPrice || 0} - Rp ${selectedFilters.maxPrice || "∞"}`}
                        </div>
                    ) : null}
                </div>
                <div
                    className="mr-1 flex flex-shrink-0 items-center rounded-full border border-[#BFC9D9] px-2 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]"
                    onClick={togglePopup}>
                    <AdjustmentsHorizontalIcon className="h-5 w-5 text-[#2E3137]" />
                    {selectedCategoryNames.length > 0 ||
                    selectedWarehouseNames.length > 0 ||
                    selectedConditionNames.length > 0 ||
                    selectedStatusNames.length > 0 ||
                    selectedBrandNames.length > 0 ||
                    selectedFilters.minPrice ||
                    selectedFilters.maxPrice ? (
                        <></>
                    ) : (
                        <div className="ml-2">Filter</div>
                    )}
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
                <SidebarProduct category={category} />
                <div className="w-full p-4 lg:w-4/5">
                    {/* {products && products.length > 0 && (
                        <> */}
                    <div className="pb-5 text-sm text-[#212121]">
                        Menampilkan 1 - {loadingProducts ? 0 : products.length}{" "}
                        barang dari {loadingProducts ? 0 : totalPages} barang
                    </div>
                    <div className="mb-8 grid grid-cols-2 gap-2 lg:grid-cols-5">
                        {loadingProducts
                            ? Array.from({
                                  length: products.length,
                              }).map((_, index) => (
                                  <div key={index}>
                                      <Skeleton height={200} />
                                      <Skeleton count={5} />
                                  </div>
                              ))
                            : products.map(product => (
                                  <ProductCard
                                      key={product.id}
                                      productId={product.id}
                                      image={product.images[0]}
                                      location={product.warehouse.name}
                                      title={product.name}
                                      price={product.price.formatted}
                                      url={`/product/${product.slug}`}
                                      sale={product.show_price_before_discount}
                                      beforeDiscount={
                                          product.price_before_discount
                                              .formatted
                                      }
                                      percent={Math.round(
                                          ((product.price_before_discount
                                              .numeric -
                                              product.price.numeric) /
                                              product.price_before_discount
                                                  .numeric) *
                                              100,
                                      )}
                                      totalQty={product.total_quantity}
                                      isOpenPdf={() =>
                                          handlePackageDetail(product.pdf_file)
                                      }
                                  />
                              ))}
                    </div>
                    {/* </>
                    )} */}
                    {products && products.length > 15 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>

            {isOpenPdf && (
                <div onClick={() => setIsOpenPdf(false)}>
                    <div className="pointer-events-none fixed inset-0 z-40 bg-black bg-opacity-50 lg:top-[120px]">
                        {" "}
                    </div>
                    <div className="fixed top-[4rem] z-50 flex h-[calc(100%-4rem)] w-full items-center justify-center">
                        <iframe
                            className="h-[800px] max-h-[calc(100%-4rem)] w-[90%] max-w-[600px] md:h-[800px] lg:h-[700px] xl:h-[800px]"
                            src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(isPdf)}`}
                            title="PDF File"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
            <div className="hidden lg:block">
                <Footer />
            </div>
        </div>
    )
}

export default Product
