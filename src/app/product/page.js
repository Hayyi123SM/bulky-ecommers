// components/Product.js
"use client"

import Footer from "@/components/Footer"
import LoadingSpinner from "@/components/LoadingSpinner"
import Navbar from "@/components/Navbar"
import Pagination from "@/components/Pagination"
import PopupFilter from "@/components/PopupFilter"
import PopupMenuMobile from "@/components/PopupMenuMobile"
import ProductCard from "@/components/ProductCard"
import SidebarProduct from "@/components/SidebarProduct"
import { resetFilters, setFilters } from "@/store/slices/filterSlice"
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon, ArrowRightIcon, Bars3BottomRightIcon, StarIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Skeleton from "react-loading-skeleton"
import { useDispatch, useSelector } from "react-redux"
import { fetchSearchProducts, useFetchProductsQuery } from "@/store/slices/productSlice"
import FloatingIcon from "@/components/FloatingIcon"
import Cookies from "js-cookie"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { fetchCarts } from "@/store/slices/cartSlice"
import "swiper/css"
import "swiper/css/autoplay"
import "swiper/css/navigation"
import { Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"
import { fetchTestimonies } from "@/store/slices/testimonySlice"
import { getGeneralReview } from "@/store/slices/pageSlice"

function Product({ searchParams }) {
    const t = useTranslations()
    const category = useSearchParams().get("category")
    // const category = searchParams?.category || ""
    const pages = searchParams?.page || 1

    const [showPopup, setShowPopup] = useState(false)
    const [showPopupMenu, setShowPopupMenu] = useState(false)
    const [isOpenPdf, setIsOpenPdf] = useState(false)
    const [isPdf, setIsPdf] = useState(null)
    const [isLoadingPdf, setIsLoadingPdf] = useState(false)

    // const searchParams = useSearchParams()
    const router = useRouter()
    const inputRef = useRef(null)
    const popupRef = useRef(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [showSearchResults, setShowSearchResults] = useState(false)
    // const currentPage = useSelector(state => state.products.currentPage || 1)
    const [currentPage, setCurrentPage] = useState(pages)

    const dispatch = useDispatch()
    const filters = useSelector(state => state.filters.selectedFilters)
    const searchResults = useSelector(state => state.products.searchResults)
    const carts = useSelector(state => state.carts.cart)
    const loadingReviews = useSelector(state => state.pages.isLoading)
    const reviews = useSelector(state => state.pages.reviews)

    const selectedFilters = useSelector(state => state.filters.selectedFilters)
    const categories = useSelector(state => state.filters.categories)
    const warehouses = useSelector(state => state.filters.warehouses)
    const conditions = useSelector(state => state.filters.conditions)
    const statuses = useSelector(state => state.filters.statuses)
    const brands = useSelector(state => state.filters.brands)

    const [swiperInstance, setSwiperInstance] = useState(null)
    const prevRef = useRef(null)
    const nextRef = useRef(null)

    const formatToIDR = number => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            currencyDisplay: "narrowSymbol",
        })
            .format(number)
            .replace("Rp", "")
            .trim() // Remove "Rp" prefix
    }

    useEffect(() => {
        if (swiperInstance && prevRef.current && nextRef.current) {
            // Set navigation elements after Swiper is initialized
            swiperInstance.params.navigation.prevEl = prevRef.current
            swiperInstance.params.navigation.nextEl = nextRef.current
            swiperInstance.navigation.init()
            swiperInstance.navigation.update()
        }
    }, [swiperInstance])

    useEffect(() => {
        dispatch(fetchCarts())
        dispatch(fetchTestimonies({ take: 20 }))
        dispatch(getGeneralReview())
    }, [dispatch])

    useEffect(() => {
        if (!category) {
            dispatch(resetFilters())
            localStorage.removeItem("category")
        } else {
            dispatch(setFilters({ categories: [category] }))
            localStorage.setItem("category", category)
            router.push(`?categories=${category}&page=1`)
        }
    }, [category])

    // useEffect(() => {
    //     const queryPage = new URLSearchParams(window.location.search).get(
    //         "page",
    //     )
    //     const pageNumber = Number(queryPage) || 1
    //     setCurrentPage(pageNumber)
    // }, [router])

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search)
        const initFilters = {
            search: queryParams.get("search") || "",
            categories: queryParams.get("categories")?.split(",") || [],
            conditions: queryParams.get("conditions")?.split(",") || [],
            statuses: queryParams.get("statuses")?.split(",") || [],
            warehouses: queryParams.get("warehouses")?.split(",") || [],
            minPrice: queryParams.get("minPrice") || null,
            maxPrice: queryParams.get("maxPrice") || null,
            brands: queryParams.get("brands")?.split(",") || [],
        }

        const initPage = Number(queryParams.get("page")) || 1

        dispatch(setFilters(initFilters))
        setCurrentPage(initPage)
    }, [dispatch])

    useEffect(() => {
        const queryParams = new URLSearchParams()

        if (filters.search) queryParams.set("search", filters.search)
        if (filters.categories?.length) queryParams.set("categories", filters.categories.join(","))
        if (filters.conditions?.length) queryParams.set("conditions", filters.conditions.join(","))
        if (filters.statuses?.length) queryParams.set("statuses", filters.statuses.join(","))
        if (filters.warehouses?.length) queryParams.set("warehouses", filters.warehouses.join(","))
        if (filters.minPrice) queryParams.set("minPrice", filters.minPrice)
        if (filters.maxPrice) queryParams.set("maxPrice", filters.maxPrice)
        if (filters.brands?.length) queryParams.set("brands", filters.brands.join(","))
        if (currentPage) queryParams.set("page", Number(currentPage))

        router.replace(`?${queryParams.toString()}`)
    }, [filters, currentPage, router])

    // console.log("====================================")
    // console.log("filters product", filters)
    // console.log("====================================")

    // const isFilterActive = [
    //     filters.search,
    //     filters.categories?.length,
    //     filters.conditions?.length,
    //     filters.statuses?.length,
    //     filters.warehouses?.length,
    //     filters.minPrice,
    //     filters.maxPrice,
    //     filters.brands?.length,
    // ].some(Boolean)

    const { data, error, isLoading: loadingProducts } = useFetchProductsQuery({ currentPage, filters })

    const products = data?.data || []
    const totalItems = data?.meta?.total || 0
    const totalPages = data?.meta?.last_page || 0

    useEffect(() => {
        if (filters.search || filters.categories?.length || filters.conditions?.length || filters.statuses?.length || filters.warehouses?.length || filters.minPrice || filters.maxPrice || filters.brands?.length) {
            setCurrentPage(1)
            // router.push("?page=1")
        }
    }, [filters, router])

    // useEffect(() => {
    //     if (isFilterActive) {
    //         setCurrentPage(1)
    //         router.push("?page=1")
    //     }
    // }, [isFilterActive, router])

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
            setCurrentPage(page)
            router.push(`?page=${page}`)
            // dispatch(fetchProducts({ currentPage: page, filters }))
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
    const selectedCategoryNames = categories.filter(category => selectedFilters.categories.includes(category.slug)).map(category => category.name)

    const selectedWarehouseNames = warehouses.filter(warehouse => selectedFilters.warehouses.includes(warehouse.id)).map(warehouse => warehouse.name)

    const selectedConditionNames = conditions.filter(condition => selectedFilters.conditions.includes(condition.slug)).map(condition => condition.title)

    const selectedStatusNames = statuses.filter(status => selectedFilters.statuses.includes(status.id)).map(status => status.status)

    const selectedBrandNames = brands.filter(brand => selectedFilters.brands.includes(brand.slug)).map(brand => brand.name)

    useEffect(() => {
        if (showPopup || showPopupMenu) {
            document.body.classList.add("modal-open")
        } else {
            document.body.classList.remove("modal-open")
        }
    }, [showPopup, showPopupMenu])

    useEffect(() => {
        if (isOpenPdf) {
            setIsLoadingPdf(true) // Reset loading setiap kali PDF dibuka
        }
    }, [isOpenPdf])

    if (error) return <div>Error: {error.data || error.message}</div>

    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center justify-between border-b border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon className="h-6 w-6" onClick={() => router.back()} />
                <div className="w-2/3">
                    <input ref={inputRef} className="w-full rounded-3xl border py-2 pl-14 text-black bg-search focus:border-secondary focus:ring-0" placeholder={t("other.search")} value={searchQuery} onChange={handleSearchInputChange} />
                    {showSearchResults && (
                        <>
                            <div className="pointer-events-none fixed inset-0 top-[67px] z-40 bg-black bg-opacity-50"></div>
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
            <div className="flex items-center p-4 lg:hidden">
                <div className="mr-2 flex items-center overflow-x-auto">
                    {selectedCategoryNames.map((name, index) => (
                        <div key={`category-${index}`} className="mr-1 flex-shrink-0 rounded-3xl border border-[#007185] bg-[#0071850D] px-4 py-2 text-base text-[#007185]">
                            {name}
                        </div>
                    ))}
                    {selectedWarehouseNames.map((name, index) => (
                        <div key={`warehouse-${index}`} className="mr-1 flex-shrink-0 rounded-3xl border border-[#007185] bg-[#0071850D] px-4 py-2 text-base text-[#007185]">
                            {name}
                        </div>
                    ))}
                    {selectedConditionNames.map((name, index) => (
                        <div key={`condition-${index}`} className="mr-1 flex-shrink-0 rounded-3xl border border-[#007185] bg-[#0071850D] px-4 py-2 text-base text-[#007185]">
                            {name}
                        </div>
                    ))}
                    {selectedStatusNames.map((name, index) => (
                        <div key={`status-${index}`} className="mr-1 flex-shrink-0 rounded-3xl border border-[#007185] bg-[#0071850D] px-4 py-2 text-base text-[#007185]">
                            {name}
                        </div>
                    ))}
                    {selectedBrandNames.map((name, index) => (
                        <div key={`brand-${index}`} className="mr-1 flex-shrink-0 rounded-3xl border border-[#007185] bg-[#0071850D] px-4 py-2 text-base text-[#007185]">
                            {name}
                        </div>
                    ))}
                    {/* Render price range if available */}
                    {selectedFilters.minPrice || selectedFilters.maxPrice ? (
                        <div className="mr-1 flex-shrink-0 rounded-3xl border border-[#007185] bg-[#0071850D] px-4 py-2 text-base text-[#007185]">{`Rp ${formatToIDR(selectedFilters.minPrice) || 0} - Rp ${formatToIDR(selectedFilters.maxPrice) || "∞"}`}</div>
                    ) : null}
                </div>
                <div className="mr-1 flex flex-shrink-0 items-center rounded-full border border-[#BFC9D9] px-2 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]" onClick={togglePopup}>
                    <AdjustmentsHorizontalIcon className="h-5 w-5 text-[#2E3137]" />
                    {selectedCategoryNames.length > 0 || selectedWarehouseNames.length > 0 || selectedConditionNames.length > 0 || selectedStatusNames.length > 0 || selectedBrandNames.length > 0 || selectedFilters.minPrice || selectedFilters.maxPrice ? <></> : <div className="ml-2">Filter</div>}
                </div>
            </div>
            {showPopup && <PopupFilter closePopup={closePopup} />}
            {showPopupMenu && <PopupMenuMobile showPopupMenu={showPopupMenu} closePopupMenu={closePopupMenu} />}
            <div className="mx-auto flex min-h-screen max-w-7xl">
                <SidebarProduct category={category} />
                <div className="w-full p-4 lg:w-4/5">
                    {/* {products && products.length > 0 && (
                        <> */}
                    <div className="pb-5 text-sm text-[#212121]">
                        {t("other.show")} 1 - {loadingProducts ? 0 : products.length} {t("other.itemFrom")} {loadingProducts ? 0 : totalItems} {t("other.product")}
                    </div>
                    <div className="mb-8 grid grid-cols-2 gap-2 lg:grid-cols-5">
                        {loadingProducts
                            ? Array.from({
                                  length: 15,
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
                                      title={Cookies.get("locale") === "en" ? (product?.name_trans?.en ? product.name_trans.en : product?.name_trans?.id) : product?.name_trans?.id}
                                      price={product.price.formatted}
                                      url={`/product/${product.slug}`}
                                      sale={product.show_price_before_discount}
                                      beforeDiscount={product.price_before_discount.formatted}
                                      percent={Math.round(((product.price_before_discount.numeric - product.price.numeric) / product.price_before_discount.numeric) * 100)}
                                      totalQty={product.total_quantity}
                                      isOpenPdf={() => handlePackageDetail(product.pdf_file)}
                                      soldOut={product.sold_out}
                                  />
                              ))}
                    </div>
                    {/* </>
                    )} */}
                    {products && totalItems > 15 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
                </div>
            </div>

            <div className="mx-auto w-full max-w-7xl px-4">
                <div className="relative px-4">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        slidesPerView={1} // Default slides per view
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            426: { slidesPerView: 1 }, // sm: 1 slide
                            768: { slidesPerView: 2 }, // md: 2 slides
                            1024: { slidesPerView: 3 }, // lg and above: 3 slides
                        }}
                        onSwiper={setSwiperInstance}>
                        {loadingReviews ? (
                            <Skeleton height={1000} />
                        ) : (
                            reviews.map((review, index) => (
                                <SwiperSlide key={index}>
                                    <div key={review.id} className="flex h-56 min-w-[100%] flex-col justify-center rounded-lg p-4 md:pr-20">
                                        <div className="mb-3 flex gap-3">
                                            {review.images &&
                                                review.images.map((image, index2) => (
                                                    <div
                                                        key={index2}
                                                        className="h-12 w-12 rounded-full bg-cover bg-center"
                                                        style={{
                                                            backgroundImage: `url(${image.path})`,
                                                        }}
                                                    />
                                                ))}
                                            <div className="flex flex-col">
                                                <div className="text-lg font-bold">{review.rated_by}</div>
                                                <div className="flex">
                                                    {[...Array(5)].map((_, index3) => (
                                                        <StarIcon key={index3} className={`mr-1 h-4 w-4 cursor-pointer ${index3 < review.rating ? "text-secondary" : "text-[#BFC9D9]"}`} />
                                                    ))}
                                                </div>
                                                <div className="mt-2 font-bold text-[#007185]">{Cookies.get("locale") === "en" ? (review?.product?.en ? review.product.en : review?.product?.id) : review?.product?.id}</div>
                                            </div>
                                        </div>
                                        <div className="opacity-70">{review.comment}</div>
                                    </div>
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <button ref={prevRef} className="custom-swiper-button custom-swiper-button-prev">
                        <ArrowLeftIcon className="h-6 w-6" />
                    </button>
                    <button ref={nextRef} className="custom-swiper-button custom-swiper-button-next">
                        <ArrowRightIcon className="h-6 w-6" />
                    </button>

                    <style>{`
                                    .custom-swiper-button {
                                        position: absolute;
                                        top: 50%;
                                        transform: translateY(-50%);
                                        background-color: #ffcf02;
                                        color: #000000;
                                        padding: 10px;
                                        border-radius: 50%;
                                        cursor: pointer;
                                        z-index: 10;
                                    }

                                    .custom-swiper-button-prev {
                                        left: -30px;
                                    }

                                    .custom-swiper-button-next {
                                        right: -30px;
                                    }

                                    @media (max-width: 426px) {
                                        .custom-swiper-button {
                                            padding: 8px;
                                            top: 45%;
                                            transform: translateY(-45%);
                                            font-size: 12px;
                                        }
                                        .custom-swiper-button-prev {
                                            left: -20px;
                                        }
                                        .custom-swiper-button-next {
                                            right: -20px;
                                        }
                                    }
                                `}</style>
                </div>
            </div>
            {isOpenPdf && (
                <div onClick={() => setIsOpenPdf(false)}>
                    <div className="pointer-events-none fixed inset-0 z-40 bg-black bg-opacity-50 lg:top-[120px]"></div>
                    <div className="fixed top-[4rem] z-50 flex h-[calc(100%-4rem)] w-full items-center justify-center">
                        <div className="relative h-[800px] max-h-[calc(100%-4rem)] w-[90%] max-w-[500px] bg-white p-4 shadow-lg md:h-[800px] lg:h-[700px] xl:h-[800px]">
                            {/* start: close modal */}
                            {/* <div
                                className="absolute left-4 top-4 flex cursor-pointer rounded-lg border bg-white p-2 text-xs text-[#212121] hover:text-[#007185]"
                                onClick={() => setIsOpenPdf(false)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                                Tutup
                            </div> */}
                            {/* end: close modal */}

                            {/* Loading Spinner */}
                            {isLoadingPdf && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white">
                                    {t("waiting")}...
                                    <LoadingSpinner text={false} color="#000" size={20} />
                                </div>
                            )}

                            {/* PDF Viewer */}
                            <iframe
                                className={`h-full w-full ${isLoadingPdf ? "hidden" : "block"}`}
                                src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(isPdf)}`}
                                title="PDF File"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                onLoad={() => setIsLoadingPdf(false)} // Set loading false saat PDF selesai dimuat
                            />

                            {/* <iframe
                                src={isPdf}
                                className={`h-full w-full ${isLoadingPdf ? "hidden" : "block"}`}
                                allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="PDF Viewer"
                                type="application/pdf"
                                onLoad={() => setIsLoadingPdf(false)}
                            /> */}
                        </div>
                    </div>
                </div>
            )}
            <div className="hidden lg:block">
                <Footer />
            </div>
            <FloatingIcon />
        </div>
    )
}

export default Product
