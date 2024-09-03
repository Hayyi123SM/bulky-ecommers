"use client"

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
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon, Bars3BottomRightIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import { useDispatch, useSelector } from "react-redux"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"

function ProductDetail({ params }) {
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
    // const [savedUser, setSavedUser] = useState(null)
    const { user } = useAuth()

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

    if (!products || !products.condition) {
        // Optionally, you can return a loading state here
        return <LoadingSpinner />
    }

    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center justify-between border-[#F0F3F7] px-4 py-3 lg:hidden">
                <Link href="/product">
                    <ArrowLeftIcon className="h-6 w-6" />
                </Link>
                <div className="flex items-center">
                    <ArrowUpOnSquareIcon className="mr-2 h-6 w-6" />
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
                <div className="flex flex-col lg:flex-row">
                    <div className="hidden flex-col lg:flex">
                        {productImages.length === 0 ? (
                            <Skeleton height={80} width={80} />
                        ) : (
                            productImages.map((image, index) => (
                                <Image
                                    key={index}
                                    src={image}
                                    alt={`product-${index}`}
                                    width={80}
                                    height={80}
                                    className={`mb-3 cursor-pointer border-2 hover:border-[#007185] ${mainImage === image ? "border-[#007185]" : "border-[#BFC9D9]"}`}
                                    onClick={() => setMainImage(image)}
                                    priority={false}
                                />
                            ))
                        )}
                    </div>
                    <div className="ml-2 hidden lg:block lg:w-1/2">
                        {!mainImage ? (
                            <Skeleton height={400} />
                        ) : (
                            <div className="flex items-center justify-center">
                                <Image
                                    src={mainImage}
                                    alt="main product"
                                    width={500}
                                    height={400}
                                    priority={true}
                                />
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
                            {loadingProducts ? <Skeleton /> : products.name}
                        </h1>
                        <div className="mb-4 text-xl font-bold text-[#007185]">
                            {loadingProducts ? (
                                <Skeleton />
                            ) : (
                                products.price?.formatted
                            )}
                        </div>
                        <div className="mb-4 flex items-center">
                            <div className="mr-2 w-3/12 text-sm text-[#6D7588]">
                                ID Palet
                            </div>
                            <div className="w-10/12 text-sm font-bold">
                                {loadingProducts ? (
                                    <Skeleton />
                                ) : (
                                    products.id_pallet
                                )}
                            </div>
                        </div>
                        <div className="mb-4 flex items-center">
                            <div className="mr-2 w-3/12 text-sm text-[#6D7588]">
                                Quantity
                            </div>
                            <div className="w-10/12 text-sm font-bold">
                                {loadingProducts ? (
                                    <Skeleton />
                                ) : (
                                    products.total_quantity
                                )}{" "}
                                pcs
                            </div>
                        </div>
                        <div className="mb-4 flex items-center">
                            <div className="mr-2 w-3/12 text-sm text-[#6D7588]">
                                Location
                            </div>
                            <div className="w-10/12 text-sm font-bold">
                                Yogyakarta
                            </div>
                        </div>
                        <div className="mb-4 flex items-center">
                            <div className="mr-2 w-3/12 text-sm text-[#6D7588]">
                                Detail Pallet
                            </div>
                            <div className="w-10/12 text-sm font-bold">
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
                                <div className="hidden items-center py-3 lg:flex">
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
                                        {/* <span className="inline-flex items-center text-xs font-bold text-[#F20B0B]">
                                    01:30:59
                                    <QuestionMarkCircleIcon
                                        className="ml-1 h-4 w-4 text-[#007185]"
                                        style={{ strokeWidth: "2.5" }}
                                    />
                                </span> */}
                                    </div>
                                </div>
                                <div className="hidden rounded-lg bg-[#F5F5F5] py-3 text-center text-lg font-bold text-[#BFC9D9] lg:block">
                                    Masukkan Keranjang
                                </div>
                            </>
                        ) : (
                            <div
                                onClick={() => handleAddToCart(products.id)}
                                className="hidden cursor-pointer justify-center rounded-lg bg-secondary py-3 text-center text-lg font-bold hover:bg-[#e8bc00] lg:flex">
                                {isLoading ? (
                                    <>
                                        Tunggu Sebentar...
                                        <LoadingSpinner
                                            text={false}
                                            color="#000"
                                            size={22}
                                        />
                                    </>
                                ) : (
                                    "Masukkan Keranjang"
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="p-4 lg:mt-20">
                    <div className="mb-4 text-2xl font-bold">Deskripsi</div>
                    <div className="flex border-b border-[#BFC9D9] py-2">
                        <div className="w-2/6 text-sm font-semibold lg:w-1/6">
                            Kondisi :
                        </div>
                        <div className="w-5/6 text-sm">
                            {loadingProducts ? (
                                <Skeleton />
                            ) : (
                                products.condition?.title
                            )}
                        </div>
                    </div>
                    <div className="flex border-b border-[#BFC9D9] py-2">
                        <div className="w-2/6 text-sm font-semibold lg:w-1/6">
                            Brand :
                        </div>
                        <div className="w-5/6 text-sm">
                            {loadingProducts ? (
                                <Skeleton />
                            ) : (
                                products.brands.map(brand => brand.name)
                            )}
                        </div>
                    </div>
                    <div className="flex border-b border-[#BFC9D9] py-2">
                        <div className="w-2/6 text-sm font-semibold lg:w-1/6">
                            Status Produk :
                        </div>
                        <div className="w-5/6 text-sm">
                            {loadingProducts ? (
                                <Skeleton />
                            ) : (
                                products.status.status
                            )}
                        </div>
                    </div>
                    <div className="flex border-b border-[#BFC9D9] py-2">
                        <div className="w-2/6 text-sm font-semibold lg:w-1/6">
                            Min Pesanan :
                        </div>
                        <div className="w-5/6 text-sm">1 Palet</div>
                    </div>
                    <div className="flex border-b border-[#BFC9D9] py-2">
                        <div className="w-2/6 text-sm font-semibold lg:w-1/6">
                            Kategori :
                        </div>
                        <div className="w-5/6 text-sm font-semibold text-[#007185]">
                            {loadingProducts ? (
                                <Skeleton />
                            ) : (
                                products.category.name
                            )}
                        </div>
                    </div>
                    <div className="py-10">
                        <div
                            className="text-sm"
                            dangerouslySetInnerHTML={{
                                __html: products.description,
                            }}
                        />
                        <div className="py-8 text-sm font-bold text-[#007185]">
                            Lihat Lebih Sedikit
                        </div>
                    </div>
                </div>
                <div className="mb-20 p-4">
                    <div className="mb-4 text-2xl font-bold">
                        Produk Lainnya
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
                                              isOpenPdf={handlePackageDetail}
                                          />
                                      </div>
                                  ))}
                        </div>
                    </div>

                    <div className="fixed bottom-0 left-0 right-0 block w-full bg-white px-5 py-5 shadow-lg lg:hidden">
                        <div
                            onClick={() => handleAddToCart(products.id)}
                            className="w-full cursor-pointer rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                            {isLoading
                                ? "Tunggu Sebentar... " +
                                  (
                                      <LoadingSpinner
                                          text={false}
                                          color="#000"
                                          size={22}
                                      />
                                  )
                                : "Masukkan Keranjang"}
                        </div>
                    </div>
                </div>
            </div>
            {isOpenPdf && (
                <div onClick={() => setIsOpenPdf(false)}>
                    <div className="pointer-events-none fixed inset-0 z-40 bg-black bg-opacity-50 lg:top-[120px]">
                        {" "}
                    </div>
                    <div className="fixed top-[4rem] z-50 flex h-[calc(100%-4rem)] w-full items-center justify-center">
                        <iframe
                            className="h-[400px] max-h-[calc(100%-4rem)] w-[90%] max-w-[600px] md:h-[800px] lg:h-[700px] xl:h-[800px]"
                            src={products.pdf_file}
                            title="PDF File"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
            {/* <Footer /> */}
        </div>
    )
}

export default ProductDetail
