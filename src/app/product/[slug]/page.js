"use client"

import Navbar from "@/components/Navbar"
import ProductCard from "@/components/ProductCard"
import {
    ArrowUpOnSquareIcon,
    // QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline"
import { ArrowLeftIcon, Bars3BottomRightIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useEffect, useState } from "react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/swiper-bundle.css"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper/modules"
import Link from "next/link"
import PopupMenuMobile from "@/components/PopupMenuMobile"
import { useDispatch, useSelector } from "react-redux"
import {
    fetchProductDetail,
    fetchProductRelated,
} from "@/store/slices/productSlice"
import { addToCart } from "@/store/slices/cartSlice"
import { useRouter } from "next/navigation"

function ProductDetail({ params }) {
    const productId = params.slug // Access the dynamic parameter
    const [mainImage, setMainImage] = useState("")
    const [productImages, setProductImages] = useState([])
    const [showPopupMenu, setShowPopupMenu] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.productDetails)
    const relatedProducts = useSelector(state => state.products.relatedProducts)
    const [savedUser, setSavedUser] = useState(null)

    useEffect(() => {
        const getUser = localStorage.getItem("user")
        setSavedUser(getUser)
    }, [])

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
        if (savedUser) {
            dispatch(addToCart(product))
            router.push("/cart")
        } else {
            router.push("/login")
        }
    }

    if (!products || !products.condition) {
        // Optionally, you can return a loading state here
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className="hidden lg:block">
                <Navbar />
            </div>
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
                        {productImages.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                alt={`product-${index}`}
                                width={80}
                                height={80}
                                className={`mb-3 cursor-pointer border-2 hover:border-[#007185] ${mainImage === image ? "border-[#007185]" : "border-[#BFC9D9]"}`}
                                onClick={() => setMainImage(image)}
                            />
                        ))}
                    </div>
                    <div className="ml-2 hidden lg:block lg:w-1/2">
                        <div className="flex items-center justify-center">
                            <Image
                                src={mainImage}
                                alt="main product"
                                width={500}
                                height={400}
                                priority={true}
                            />
                        </div>
                    </div>
                    <div className="lg:hidden">
                        <Swiper
                            className="mySwiper"
                            pagination={{
                                type: "fraction",
                            }}
                            modules={[Pagination, Navigation]}>
                            {productImages.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <Image
                                        src={image}
                                        alt={`product-${index}`}
                                        width={1000}
                                        height={1000}
                                    />
                                </SwiperSlide>
                            ))}
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
                            {products.name}, {products.total_quantity} Units,{" "}
                            {products.condition.title}.
                        </h1>
                        <div className="mb-4 flex items-center">
                            <div className="mr-2 w-3/12 text-sm text-[#6D7588]">
                                ID Palet
                            </div>
                            <div className="w-10/12 text-sm font-bold">
                                {products.id_pallet}
                            </div>
                        </div>
                        <div className="mb-4 text-xl font-bold text-[#007185]">
                            {products.price.formatted}
                        </div>
                        <div className="mb-4 flex items-center">
                            <div className="mr-2 w-3/12 text-sm text-[#6D7588]">
                                Quantity
                            </div>
                            <div className="w-10/12 text-sm font-bold">
                                {products.total_quantity} pcs
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
                                Total Berat
                            </div>
                            <div className="w-10/12 text-sm font-bold">
                                5.00 lbs per lot / 0.77 pounds per lot
                                dimensional weight
                                <span className="ml-1 text-[#007185] underline">
                                    (Package Details)
                                </span>
                            </div>
                        </div>
                        {/* <div className="hidden items-center py-3 lg:flex">
                            <Image
                                src="/package.svg"
                                alt="package"
                                width={56}
                                height={56}
                            />
                            <div className="ml-2 text-xs">
                                Saat ini barang sedang dalam proses pembayaran
                                salah satu pengguna Bulky{" "}
                                <span className="inline-flex items-center text-xs font-bold text-[#F20B0B]">
                                    01:30:59
                                    <QuestionMarkCircleIcon
                                        className="ml-1 h-4 w-4 text-[#007185]"
                                        style={{ strokeWidth: "2.5" }}
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="hidden rounded-lg bg-[#F5F5F5] py-3 text-center text-lg font-bold text-[#BFC9D9] lg:block">
                            Masukkan Keranjang
                        </div> */}
                        <div
                            onClick={() => handleAddToCart(products.id)}
                            className="hidden cursor-pointer rounded-lg bg-secondary py-3 text-center text-lg font-bold hover:bg-[#e8bc00] lg:block">
                            Masukkan Keranjang
                        </div>
                        {/* <div className="hidden py-3 lg:flex">
                            <Image
                                src="/mandiri.svg"
                                alt="mandiri"
                                width={50}
                                height={50}
                            />
                            <Image
                                src="/mandiri.svg"
                                alt="mandiri"
                                width={50}
                                height={50}
                            />
                        </div> */}
                    </div>
                </div>
                <div className="p-4 lg:mt-20">
                    <div className="mb-4 text-2xl font-bold">Deskripsi</div>
                    <div className="flex border-b border-[#BFC9D9] py-2">
                        <div className="w-2/6 text-sm font-semibold lg:w-1/6">
                            Kondisi :
                        </div>
                        <div className="w-5/6 text-sm">
                            {products.condition.title}
                        </div>
                    </div>
                    <div className="flex border-b border-[#BFC9D9] py-2">
                        <div className="w-2/6 text-sm font-semibold lg:w-1/6">
                            Brand :
                        </div>
                        <div className="w-5/6 text-sm">
                            {products.brands.map(brand => brand.name)}
                        </div>
                    </div>
                    <div className="flex border-b border-[#BFC9D9] py-2">
                        <div className="w-2/6 text-sm font-semibold lg:w-1/6">
                            Status Produk :
                        </div>
                        <div className="w-5/6 text-sm">
                            {products.status.status}
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
                            {products.category.name}
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
                            {relatedProducts.map(product => (
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
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="fixed bottom-0 left-0 right-0 block w-full bg-white px-5 py-5 shadow-lg lg:hidden">
                        <Link href="/cart">
                            <div className="w-full cursor-pointer rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                Masukan Keranjang
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default ProductDetail
