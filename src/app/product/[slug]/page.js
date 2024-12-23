"use client"

import FloatingIcon from "@/components/FloatingIcon"
import LoadingSpinner from "@/components/LoadingSpinner"
import Navbar from "@/components/Navbar"
import PopupMenuMobile from "@/components/PopupMenuMobile"
import ProductCard from "@/components/ProductCard"
import { useAuth } from "@/hooks/auth"
import { addToCart } from "@/store/slices/cartSlice"
import {
    fetchProductDetail,
    fetchProductRelated,
} from "@/store/slices/productSlice"
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon,
} from "@heroicons/react/24/outline"
import {
    ArrowLeftIcon,
    Bars3BottomRightIcon,
    StarIcon,
} from "@heroicons/react/24/solid"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Skeleton from "react-loading-skeleton"
import { useDispatch, useSelector } from "react-redux"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"
import { useTranslations } from "next-intl"
import Cookies from "js-cookie"

function ProductDetail({ params }) {
    const t = useTranslations()
    const productId = params.slug // Access the dynamic parameter
    const [mainImage, setMainImage] = useState("")
    const [productImages, setProductImages] = useState([])
    const [showPopupMenu, setShowPopupMenu] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.productDetails)
    const relatedProducts = useSelector(state => state.products.relatedProducts)
    const loadingProducts = useSelector(state => state.products.isLoading)
    const [isLoading, setIsloading] = useState(false)
    const [isOpenPdf, setIsOpenPdf] = useState(false)
    const [showFullDescription, setShowFullDescription] = useState(false)
    const [isLoadingPdf, setIsLoadingPdf] = useState(false)
    // const [savedUser, setSavedUser] = useState(null)
    const { user } = useAuth()
    const scrollRef = useRef(null)

    // useEffect(() => {
    // const getUser = localStorage.getItem("user")
    //     setSavedUser(getUser)
    // }, [])

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductDetail(productId))
            dispatch(fetchProductRelated(productId))
        }
    }, [dispatch, productId])

    useEffect(() => {
        if (products?.images?.length > 0) {
            setMainImage(products.images[0])
            setProductImages(products.images)
        }
    }, [products])

    useEffect(() => {
        if (showPopupMenu) {
            document.body.classList.add("modal-open")
        } else {
            document.body.classList.remove("modal-open")
        }
    }, [showPopupMenu])

    const togglePopupMenu = () => {
        setShowPopupMenu(!showPopupMenu)
    }

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription)
    }

    const closePopupMenu = () => {
        setShowPopupMenu(false)
    }

    const handleAddToCart = product => {
        setIsloading(true)
        if (user) {
            dispatch(addToCart(product))
            setTimeout(() => {
                router.push("/cart")
            }, 1000)
        } else {
            router.push("/login")
        }
    }

    const handlePackageDetail = () => {
        setIsOpenPdf(true)
    }

    useEffect(() => {
        if (isOpenPdf) {
            setIsLoadingPdf(true) // Reset loading setiap kali PDF dibuka
        }
    }, [isOpenPdf])

    const showPreviousImage = () => {
        const currentIndex = productImages.indexOf(mainImage)
        const newIndex =
            currentIndex === 0 ? productImages.length - 1 : currentIndex - 1
        setMainImage(productImages[newIndex])
    }

    const showNextImage = () => {
        const currentIndex = productImages.indexOf(mainImage)
        const newIndex =
            currentIndex === productImages.length - 1 ? 0 : currentIndex + 1
        setMainImage(productImages[newIndex])
    }

    if (!products || !products.condition) {
        // Optionally, you can return a loading state here
        return <LoadingSpinner />
    }

    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center justify-between border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon
                    className="h-6 w-6"
                    onClick={() => router.back()}
                />
                <div className="flex items-center">
                    <Bars3BottomRightIcon
                        className="h-6 w-6"
                        onClick={togglePopupMenu}
                    />
                </div>
            </div>
            {showPopupMenu && (
                <PopupMenuMobile
                    showPopupMenu={showPopupMenu}
                    closePopupMenu={closePopupMenu}
                />
            )}
            <div className="mx-auto max-w-7xl lg:p-8 lg:px-44">
                <div className="flex flex-col gap-2 lg:flex-row">
                    <div className="scrollbar-hide relative hidden max-h-[400px] flex-col overflow-y-auto whitespace-nowrap lg:flex">
                        {productImages.length === 0 ? (
                            <Skeleton height={80} width={80} />
                        ) : (
                            <>
                                {/* Scroll Up Button */}
                                <div
                                    className="absolute left-0 right-0 top-0 z-10 flex cursor-pointer items-center justify-center bg-white bg-opacity-50"
                                    onClick={() => {
                                        if (scrollRef.current) {
                                            scrollRef.current.scrollBy({
                                                top: -100,
                                                behavior: "smooth",
                                            })
                                        }
                                    }}>
                                    <ChevronUpIcon className="h-5 w-5" />
                                </div>

                                {/* Image Thumbnails */}
                                <div
                                    ref={scrollRef}
                                    className="scrollbar-hide flex flex-col gap-1 overflow-y-auto">
                                    {productImages.map((image, index) => (
                                        <Image
                                            key={index}
                                            src={image}
                                            alt={`product-${index}`}
                                            width={80}
                                            height={80}
                                            className={`mb-3 cursor-pointer border-2 hover:border-[#007185] ${
                                                mainImage === image
                                                    ? "border-[#007185]"
                                                    : "border-[#BFC9D9]"
                                            }`}
                                            onClick={() => setMainImage(image)}
                                            priority={false}
                                        />
                                    ))}
                                </div>

                                {/* Scroll Down Button */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 z-10 flex cursor-pointer items-center justify-center bg-white bg-opacity-50"
                                    onClick={() => {
                                        if (scrollRef.current) {
                                            scrollRef.current.scrollBy({
                                                top: 100,
                                                behavior: "smooth",
                                            })
                                        }
                                    }}>
                                    <ChevronDownIcon className="h-5 w-5" />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="ml-2 hidden lg:block lg:w-1/2">
                        {!mainImage ? (
                            <Skeleton height={400} />
                        ) : (
                            <div className="relative flex items-center justify-center">
                                {/* Main Image */}
                                <Image
                                    src={mainImage}
                                    alt="main product"
                                    width={500}
                                    height={400}
                                    priority={true}
                                />

                                {/* Previous Image Button */}
                                <div
                                    className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer bg-white bg-opacity-50 p-2"
                                    onClick={showPreviousImage}>
                                    <ChevronLeftIcon className="h-5 w-5" />
                                </div>

                                {/* Next Image Button */}
                                <div
                                    className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer bg-white bg-opacity-50 p-2"
                                    onClick={showNextImage}>
                                    <ChevronRightIcon className="h-5 w-5" />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:hidden">
                        <Swiper
                            className="mySwiper"
                            pagination={{
                                type: "fraction",
                            }}
                            modules={[Pagination, Navigation]}>
                            {loadingProducts ? (
                                <Skeleton height={1000} />
                            ) : (
                                productImages.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <Image
                                            src={image}
                                            alt={`product-${index}`}
                                            width={1000}
                                            height={1000}
                                            priority={false}
                                        />
                                    </SwiperSlide>
                                ))
                            )}
                        </Swiper>

                        <style>{`
                            .swiper-pagination-fraction {
                                background-color: #fff;
                                margin-left: 12px;
                                margin-bottom: 12px;
                                border: 1px solid #BFC9D9;
                                border-radius: 10px;
                                padding: 5px 15px;
                                border-radius: 10px;
                                color: #212121;
                                width: fit-content;
                                font-size: 12px;
                            }
                        `}</style>
                    </div>
                    <div className="p-4 lg:w-1/2 lg:p-8">
                        <h1 className="mb-4 text-2xl font-bold">
                            {loadingProducts ? (
                                <Skeleton />
                            ) : Cookies.get("locale") === "en" ? (
                                products?.name_trans?.en ? (
                                    products.name_trans.en
                                ) : (
                                    products?.name_trans?.id
                                )
                            ) : (
                                products?.name_trans?.id
                            )}
                        </h1>
                        <div className="mb-1 text-xl font-bold text-[#007185]">
                            {loadingProducts ? (
                                <Skeleton />
                            ) : (
                                products.price?.formatted
                            )}
                        </div>
                        <div className="mb-4 text-xl font-bold text-[#007185]">
                            {products.show_price_before_discount && (
                                <div className="flex items-center">
                                    <div className="text-xs font-bold text-gray-400 line-through">
                                        {
                                            products.price_before_discount
                                                .formatted
                                        }
                                    </div>
                                    <div className="ml-1 text-xs font-bold text-[#007185]">
                                        {Math.round(
                                            ((products.price_before_discount
                                                .numeric -
                                                products.price.numeric) /
                                                products.price_before_discount
                                                    .numeric) *
                                                100,
                                        )}
                                        %
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="mb-1 flex items-center">
                            <div className="mr-2 w-4/12 text-base text-[#6D7588]">
                                ID Palet
                            </div>
                            <div className="w-8/12 text-base font-bold">
                                {loadingProducts ? (
                                    <Skeleton />
                                ) : (
                                    products.id_pallet
                                )}
                            </div>
                        </div>
                        <div className="mb-1 flex items-center">
                            <div className="mr-2 w-4/12 text-base text-[#6D7588]">
                                Quantity
                            </div>
                            <div className="w-8/12 text-base font-bold">
                                {loadingProducts ? (
                                    <Skeleton />
                                ) : (
                                    products.total_quantity
                                )}{" "}
                                pcs
                            </div>
                        </div>
                        <div className="mb-1 flex items-center">
                            <div className="mr-2 w-4/12 text-base text-[#6D7588]">
                                Location
                            </div>
                            <div className="w-8/12 text-base font-bold">
                                {products.warehouse.name}
                            </div>
                        </div>
                        <div className="mb-8 flex items-center">
                            <div className="mr-2 w-4/12 text-base text-[#6D7588]">
                                Detail Pallet
                            </div>
                            <div className="w-8/12 text-base font-bold">
                                {/* 5.00 lbs per lot / 0.77 pounds per lot
                                dimensional weight */}
                                <span
                                    className="ml-1 cursor-pointer text-[#007185] underline"
                                    onClick={handlePackageDetail}>
                                    (Package Details)
                                </span>
                            </div>
                        </div>
                        {products && products.sold_out ? (
                            <>
                                {/* <div className="hidden items-center py-3 lg:flex">
                                    <Image
                                        src="/package.svg"
                                        alt="package"
                                        width={56}
                                        height={56}
                                        priority={false}
                                    />
                                    <div className="ml-2 text-xs">
                                        Saat ini barang sedang dalam proses
                                        pembayaran salah satu pengguna Bulky{" "}
                                        <span className="inline-flex items-center text-xs font-bold text-[#F20B0B]">
                                    01:30:59
                                    <QuestionMarkCircleIcon
                                        className="ml-1 h-4 w-4 text-[#007185]"
                                        style={{ strokeWidth: "2.5" }}
                                    />
                                </span>
                                    </div>
                                </div> */}
                                <div className="hidden items-center py-3 lg:flex">
                                    <div className="ml-2 text-xs">
                                        {t("product.outOfStock")}
                                    </div>
                                </div>
                                <div className="hidden rounded-lg bg-[#F5F5F5] py-3 text-center text-lg font-bold text-[#BFC9D9] lg:block">
                                    {t("product.notAvailable")}
                                </div>
                            </>
                        ) : (
                            <div
                                onClick={() => handleAddToCart(products.id)}
                                className="hidden cursor-pointer justify-center rounded-lg bg-secondary py-3 text-center text-lg font-bold hover:bg-[#e8bc00] lg:flex">
                                {isLoading ? (
                                    <>
                                        {t("waiting")}...
                                        <LoadingSpinner
                                            text={false}
                                            color="#000"
                                            size={22}
                                        />
                                    </>
                                ) : (
                                    t("product.addToCart")
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="p-4 lg:mt-20">
                    <div className="mb-4 text-2xl font-bold">Deskripsi</div>
                    <div className="flex border-b border-[#BFC9D9] py-2">
                        <div className="w-3/6 text-base font-semibold md:w-2/6 lg:w-2/6 xl:w-1/6">
                            {t("filter.condition")} :
                        </div>
                        <div className="w-5/6 text-base">
                            {loadingProducts ? (
                                <Skeleton />
                            ) : Cookies.get("locale") === "id" ? (
                                products?.condition?.title_trans?.id
                            ) : (
                                products?.condition?.title_trans?.en
                            )}
                        </div>
                    </div>
                    <div className="flex border-b border-[#BFC9D9] py-2">
                        <div className="w-3/6 text-base font-semibold md:w-2/6 lg:w-2/6 xl:w-1/6">
                            {t("filter.brand")} :
                        </div>
                        <div className="w-5/6 text-base">
                            {loadingProducts ? (
                                <Skeleton />
                            ) : (
                                products.brands.map(brand => brand.name)
                            )}
                        </div>
                    </div>
                    <div className="flex border-b border-[#BFC9D9] py-2">
                        <div className="w-3/6 text-base font-semibold md:w-2/6 lg:w-2/6 xl:w-1/6">
                            Status Produk :
                        </div>
                        <div className="w-5/6 text-base">
                            {loadingProducts ? (
                                <Skeleton />
                            ) : Cookies.get("locale") === "id" ? (
                                products?.status?.status_trans?.id
                            ) : (
                                products?.status?.status_trans?.en
                            )}
                        </div>
                    </div>
                    <div className="flex border-b border-[#BFC9D9] py-2">
                        <div className="w-3/6 text-base font-semibold md:w-2/6 lg:w-2/6 xl:w-1/6">
                            Min Pesanan :
                        </div>
                        <div className="w-5/6 text-base">1 Palet</div>
                    </div>
                    <div className="flex border-b border-[#BFC9D9] py-2">
                        <div className="w-3/6 text-base font-semibold md:w-2/6 lg:w-2/6 xl:w-1/6">
                            {t("filter.category")} :
                        </div>
                        <div className="w-5/6 text-base font-semibold text-[#007185]">
                            {loadingProducts ? (
                                <Skeleton />
                            ) : Cookies.get("locale") === "id" ? (
                                products?.category?.name_trans?.id
                            ) : (
                                products?.category?.name_trans?.en
                            )}
                        </div>
                    </div>
                    <div className="py-10">
                        <div className="staticStyle">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: showFullDescription
                                        ? Cookies.get("locale") === "id"
                                            ? products?.description_trans?.id
                                            : products?.description_trans?.en // Show full description
                                        : `${
                                              Cookies.get("locale") === "id"
                                                  ? products?.name_trans?.id?.substring(
                                                        0,
                                                        50,
                                                    )
                                                  : products?.name_trans?.en?.substring(
                                                        0,
                                                        50,
                                                    )
                                          }...`, // Show shortened description
                                }}
                            />
                        </div>
                        <div
                            className="cursor-pointer py-8 text-base font-bold text-[#007185]"
                            onClick={toggleDescription}>
                            {showFullDescription
                                ? "Lihat Lebih Sedikit"
                                : "Lihat Lebih Banyak"}
                        </div>
                    </div>
                </div>

                {products.reviews?.length > 0 && (
                    <div className="p-4 lg:mt-20">
                        <div className="mb-4 text-2xl font-bold">Ulasan</div>
                        <div className="border-b border-[#BFC9D9] py-2">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, index) => (
                                    <StarIcon
                                        key={index}
                                        className={`mr-1 h-4 w-4 cursor-pointer ${
                                            index <
                                            products.reviews?.[0]?.rating
                                                ? "text-secondary"
                                                : "text-[#BFC9D9]"
                                        }`}
                                    />
                                ))}
                            </div>
                            <div className="py-3 font-semibold">
                                {products.reviews?.rated_by}
                            </div>
                            <div className="flex items-center py-3">
                                {products.reviews?.[0]?.images.map(
                                    (image, index) => (
                                        <Image
                                            key={index}
                                            src={image.url}
                                            alt={image}
                                            width={100}
                                            height={100}
                                            className="mr-2 h-16 w-16 cursor-pointer rounded-lg"
                                        />
                                    ),
                                )}
                            </div>
                            <div className="flex items-center">
                                {products.reviews?.[0]?.comment}
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-20 p-4">
                    <div className="mb-8 text-2xl font-bold">
                        {t("product.otherProducts")}
                    </div>
                    <div className="overflow-x-auto">
                        <div className="flex gap-2 md:grid-cols-4 lg:grid lg:grid-cols-5">
                            {loadingProducts
                                ? Array.from({
                                      length: relatedProducts.length,
                                  }).map((_, index) => (
                                      <div
                                          key={index}
                                          className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                          <Skeleton height={200} />
                                          <Skeleton count={5} />
                                      </div>
                                  ))
                                : relatedProducts.map(product => (
                                      <div
                                          className="min-w-[50%] md:min-w-[30%] lg:min-w-0"
                                          key={product.id}>
                                          <ProductCard
                                              image={product.images[0]}
                                              productId={product.id}
                                              location={product.warehouse?.name}
                                              title={
                                                  Cookies.get("locale") === "id"
                                                      ? product?.name_trans?.id
                                                      : product?.name_trans?.en
                                              }
                                              price={product.price.formatted}
                                              url={`/product/${product.slug}`}
                                              sale={
                                                  product.show_price_before_discount
                                              }
                                              beforeDiscount={
                                                  product.price_before_discount
                                                      .formatted
                                              }
                                              percent={Math.round(
                                                  ((product
                                                      .price_before_discount
                                                      .numeric -
                                                      product.price.numeric) /
                                                      product
                                                          .price_before_discount
                                                          .numeric) *
                                                      100,
                                              )}
                                              totalQty={product.total_quantity}
                                              isOpenPdf={handlePackageDetail}
                                              soldOut={product.sold_out}
                                          />
                                      </div>
                                  ))}
                        </div>
                    </div>

                    <div className="fixed bottom-0 left-0 right-0 block w-full bg-white px-5 py-5 shadow-lg lg:hidden">
                        {products && products.sold_out ? (
                            <div className="w-full cursor-pointer rounded-lg bg-[#F5F5F5] px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                {t("product.notAvailable")}
                            </div>
                        ) : (
                            <div
                                onClick={() => handleAddToCart(products.id)}
                                className="w-full cursor-pointer rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                {isLoading
                                    ? t("waiting") +
                                      "... " +
                                      (
                                          <LoadingSpinner
                                              text={false}
                                              color="#000"
                                              size={22}
                                          />
                                      )
                                    : t("product.addToCart")}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isOpenPdf && (
                <div onClick={() => setIsOpenPdf(false)}>
                    <div className="pointer-events-none fixed inset-0 z-40 bg-black bg-opacity-50 lg:top-[120px]">
                        {" "}
                    </div>
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
                                    <LoadingSpinner
                                        text={false}
                                        color="#000"
                                        size={20}
                                    />
                                </div>
                            )}

                            {/* PDF Viewer */}
                            <iframe
                                className={`h-full w-full ${isLoadingPdf ? "hidden" : "block"}`}
                                src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(products.pdf_file)}`}
                                title="PDF File"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                onLoad={() => setIsLoadingPdf(false)} // Set loading false saat PDF selesai dimuat
                            />

                            {/* <iframe
                                src={products.pdf_file}
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
            {/* <Footer /> */}
            <FloatingIcon />
        </div>
    )
}

export default ProductDetail
