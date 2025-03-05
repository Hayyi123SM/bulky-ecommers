"use client"

import FloatingIcon from "@/components/FloatingIcon"
import Footer from "@/components/Footer"
import InputError from "@/components/InputError"
import LoadingSpinner from "@/components/LoadingSpinner"
import Navbar from "@/components/Navbar"
import PopupMenuMobile from "@/components/PopupMenuMobile"
import PopupModal from "@/components/PopupModal"
import ProductCard from "@/components/ProductCard"
import VideoThumbnail from "@/components/VideoThumbnail"
import { fetchBanners } from "@/store/slices/bannerSlice"
import { fetchCategories, setFilters } from "@/store/slices/filterSlice"
import { createWholesale, getBudgets } from "@/store/slices/orderSlice"
import { getGeneralReview } from "@/store/slices/pageSlice"
import { fetchProducts } from "@/store/slices/productSlice"
import { fetchTestimonies } from "@/store/slices/testimonySlice"
import { fetchVideos } from "@/store/slices/videoSlice"
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon, ArrowRightIcon, StarIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Skeleton from "react-loading-skeleton"
import { useDispatch, useSelector } from "react-redux"
import "swiper/css"
import "swiper/css/autoplay"
import "swiper/css/navigation"
import { Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"
import Hero from "../../public/new/hero.webp"
import Illustration from "../../public/new/Illustrations.webp"
import { useTranslations } from "next-intl"
import Cookies from "js-cookie"
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"

function Home() {
    const t = useTranslations()
    const [showPopupMenu, setShowPopupMenu] = useState(false)
    const [current, setCurrent] = useState(0)
    const router = useRouter()
    const dispatch = useDispatch()
    const banners = useSelector(state => state.banners.items)
    const products = useSelector(state => state.products.items)
    const videos = useSelector(state => state.videos.items)
    // const testimonys = useSelector(state => state.testimony.items)
    const loadingBanners = useSelector(state => state.banners.isLoading)
    const loadingProducts = useSelector(state => state.products.isLoading)
    const loadingVideos = useSelector(state => state.videos.isLoading)
    const loadingReviews = useSelector(state => state.pages.isLoading)
    const reviews = useSelector(state => state.pages.reviews)
    const [isLoadingPdf, setIsLoadingPdf] = useState(false)
    const [isOpenPdf, setIsOpenPdf] = useState(false)
    const [isPdf, setIsPdf] = useState(null)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [showWholesale, setShowWholesale] = useState(false)
    const prevRef = useRef(null)
    const nextRef = useRef(null)
    const [isClient, setIsClient] = useState(false)
    const [swiperInstance, setSwiperInstance] = useState(null)
    const categories = useSelector(state => state.filters.categories)
    const [selectedCategories, setSelectedCategories] = useState([])

    const [nameWholesale, setNameWholesale] = useState("")
    const [selectedOption, setSelectedOption] = useState("Budgetmu")
    const [phoneWholesale, setPhoneWholesale] = useState("")
    const [addressWholesale, setAddressWholesale] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const budgets = useSelector(state => state.orders.budgets)
    const errors = useSelector(state => state.orders.errors)
    const [showNotification, setShowNotification] = useState(false)

    useEffect(() => {
        setIsClient(true) // This ensures that Swiper only renders on the client
    }, [])

    useEffect(() => {
        if (swiperInstance && prevRef.current && nextRef.current) {
            // Set navigation elements after Swiper is initialized
            swiperInstance.params.navigation.prevEl = prevRef.current
            swiperInstance.params.navigation.nextEl = nextRef.current
            swiperInstance.navigation.init()
            swiperInstance.navigation.update()
        }
    }, [swiperInstance])

    // const scrollLeft = () => {
    //     if (scrollRef.current) {
    //         scrollRef.current.scrollBy({ left: -350, behavior: "smooth" })
    //     }
    // }

    // const scrollRight = () => {
    //     if (scrollRef.current) {
    //         scrollRef.current.scrollBy({ left: 350, behavior: "smooth" })
    //     }
    // }

    // const dummy = {
    //     data: {
    //         id: 1,
    //         title: "dummy",
    //         description: "dummy",
    //         image: "dummy",
    //         url: "dummy",
    //     },
    //     is_new_user: true,
    // }

    useEffect(() => {
        dispatch(fetchBanners())
        dispatch(fetchProducts({ filters: { perPage: 6 } }))
        dispatch(fetchTestimonies({ take: 20 }))
        dispatch(fetchVideos({ perPage: 8, paginate: 1 }))
        dispatch(fetchCategories())
        dispatch(getBudgets())
        dispatch(getGeneralReview())
        // localStorage.setItem("signinWithGoogle", JSON.stringify(dummy))
    }, [dispatch])

    const togglePopupMenu = () => {
        // if (!user) {
        //     router.push("/login")
        // } else {
        setShowPopupMenu(!showPopupMenu)
        // }
    }
    const closePopupMenu = () => setShowPopupMenu(false)
    const handlePackageDetail = pdf => {
        setIsOpenPdf(true)
        setIsPdf(pdf)
    }

    useEffect(() => {
        if (showPopupMenu) {
            document.body.classList.add("modal-open")
        } else {
            document.body.classList.remove("modal-open")
        }
    }, [showPopupMenu])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev === banners.length - 1 ? 0 : prev + 1))
        }, 15000)
        return () => clearInterval(interval)
    }, [banners.length])

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("signinWithGoogle"))) {
            if (JSON.parse(localStorage.getItem("signinWithGoogle")).is_new_user) {
                setIsOpenModal(true)
            }
        }
    }, [])

    const closeModal = () => {
        setIsOpenModal(false)
    }

    useEffect(() => {
        if (isOpenPdf) {
            setIsLoadingPdf(true) // Reset loading setiap kali PDF dibuka
        }
    }, [isOpenPdf])

    const handleSelectCategory = category => {
        dispatch(setFilters({ categories: [category] }))
        localStorage.setItem("category", category)
        router.push(`/product?category=${category}`)
    }

    const handleCloseWholesale = () => {
        setShowWholesale(false)
        setShowNotification(false)
    }

    const handleOptionClick = name => {
        setSelectedOption(name)
        setIsOpen(false)
    }

    const handleCategoryChange = (e, category) => {
        const updatedCategories = e.target.checked ? [...selectedCategories, category.id] : selectedCategories.filter(id => id !== category.id)
        setSelectedCategories(updatedCategories)
    }

    const handleSelectAllCategories = e => {
        if (e.target.checked) {
            // Select all category IDs
            const allCategoryIds = categories.map(category => category.id)
            setSelectedCategories(allCategoryIds)
        } else {
            // Deselect all categories
            setSelectedCategories([])
        }
    }

    const handleSubmitWholesale = async e => {
        e.preventDefault()

        const data = {
            name: nameWholesale,
            phone_number: phoneWholesale,
            address: addressWholesale,
            budget: selectedOption,
            categories: selectedCategories,
        }

        const result = await dispatch(createWholesale(data))

        if (!result.error) {
            setShowWholesale(false)
            setShowNotification(true)
        } else {
            console.log("====================================")
            console.log("Error:", result.error) // Log errors if any
            console.log("====================================")
        }
    }

    if (!isClient) return null

    return (
        <div>
            {/* Search results displayed outside the Navbar */}
            {/* Rest of your page content */}
            <Navbar togglePopupMenu={togglePopupMenu} visibleOn="both" />
            {showPopupMenu && <PopupMenuMobile showPopupMenu={showPopupMenu} closePopupMenu={closePopupMenu} />}
            <div className="">
                <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-center md:flex-row">
                    <div className="w-full p-4 md:w-2/3 lg:w-1/2">
                        <div className="flex flex-col">
                            <div className="text-2xl font-bold leading-[60px] md:text-4xl lg:text-5xl">{t("welcome")}</div>
                            <div className="mt-2 text-xl leading-7 md:pr-28">{t("description")}</div>
                            <div className="mt-5 flex w-full items-center gap-4 text-center md:pr-28">
                                <Link href="/product?page=1" className="w-1/2 font-light">
                                    <div className="rounded-lg border border-secondary bg-secondary py-3 hover:bg-white md:px-3 md:py-2 lg:px-4 lg:py-3">{t("showAllProduct")}</div>
                                </Link>
                                <Link href="/video" className="w-1/2 font-light">
                                    <div className="rounded-lg border border-secondary py-3 hover:bg-secondary md:px-3 md:py-2 lg:px-4 lg:py-3">{t("showVideo")}</div>
                                </Link>
                            </div>
                            <div className="mt-5 flex items-center gap-8 text-center md:pr-28">
                                <div>
                                    <div className="flex items-center border-b border-dashed border-black pb-2">
                                        <StarIcon className="h-5 w-5 text-secondary" />
                                        <StarIcon className="h-5 w-5 text-secondary" />
                                        <StarIcon className="h-5 w-5 text-secondary" />
                                        <StarIcon className="h-5 w-5 text-secondary" />
                                        <StarIcon className="h-5 w-5 text-secondary" />
                                        <div className="ml-1">4.9</div>
                                    </div>
                                    <div className="mt-1">Bapak Aan</div>
                                </div>
                                <div>
                                    <div className="flex items-center border-b border-dashed border-black pb-2">
                                        <StarIcon className="h-5 w-5 text-secondary" />
                                        <StarIcon className="h-5 w-5 text-secondary" />
                                        <StarIcon className="h-5 w-5 text-secondary" />
                                        <StarIcon className="h-5 w-5 text-secondary" />
                                        <StarIcon className="h-5 w-5 text-secondary" />
                                        <div className="ml-1">4.9</div>
                                    </div>
                                    <div className="mt-1">Bapak Yudi</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full py-10 md:w-1/3 lg:w-1/2">
                        <Image {...Hero} alt="Product" width={700} height={700} priority={true} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" quality={75} placeholder="blur" />
                    </div>
                </div>
                <div className="mx-auto max-w-7xl p-0 lg:p-5">
                    <div className="relative mx-auto h-[120px] w-full overflow-hidden md:h-[224px] lg:h-[324px] lg:rounded-3xl">
                        {loadingBanners ? (
                            <Skeleton height={324} />
                        ) : (
                            banners.map((banner, index) => (
                                <div key={index} className={`absolute inset-0 transition-transform duration-1000 ${index === current ? "translate-x-0" : index < current ? "-translate-x-full" : "translate-x-full"}`}>
                                    <Image src={banner.full_url} alt={`Banner ${index}`} fill priority={false} className="h-full w-full object-cover" />
                                </div>
                            ))
                        )}
                        <div className="absolute bottom-5 left-5 flex space-x-2">
                            {loadingBanners ? <Skeleton height={324} /> : banners.map((_, index) => <div key={index} className={`h-2 w-2 cursor-pointer lg:rounded-full ${current === index ? "bg-white" : "bg-gray-400"}`} onClick={() => setCurrent(index)} />)}
                        </div>
                    </div>
                </div>
                {/* <div className="w-full bg-secondary bg-opacity-20 p-6">
                    <div className="mx-auto flex max-w-7xl items-center">
                        <div className="flex w-full flex-col md:w-1/3">
                            <div className="mb-4 font-bold md:text-2xl lg:text-3xl">
                                Partner Kami
                            </div>
                            <div className="mb-6 md:text-sm lg:text-lg">
                                Terpercaya pada beberapa perusahaan
                            </div>
                        </div>

                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={20}
                            slidesPerView={4}
                            loop={true}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                425: {
                                    slidesPerView: 2, // Show 2 slides
                                },
                                768: {
                                    slidesPerView: 3, // Show 3 slides
                                },
                                1024: {
                                    slidesPerView: 4, // Show 4 slides
                                },
                            }}
                            className="flex items-center justify-center">
                            <SwiperSlide className="flex justify-center">
                                <Image
                                    src="/new/logo.webp"
                                    alt="Partner"
                                    width={160}
                                    height={50}
                                />
                            </SwiperSlide>
                            <SwiperSlide className="flex justify-center">
                                <Image
                                    src="/new/logo (2).webp"
                                    alt="Partner"
                                    width={160}
                                    height={50}
                                />
                            </SwiperSlide>
                            <SwiperSlide className="flex justify-center">
                                <Image
                                    src="/new/logo (3).webp"
                                    alt="Partner"
                                    width={160}
                                    height={50}
                                />
                            </SwiperSlide>
                            <SwiperSlide className="flex justify-center">
                                <Image
                                    src="/new/logo (4) s.png"
                                    alt="Partner"
                                    width={160}
                                    height={50}
                                />
                            </SwiperSlide>
                            <SwiperSlide className="flex justify-center">
                                <Image
                                    src="/new/lel.webp"
                                    alt="Partner"
                                    width={160}
                                    height={50}
                                />
                            </SwiperSlide>
                            <SwiperSlide className="flex justify-center">
                                <Image
                                    src="/new/logo (6).webp"
                                    alt="Partner"
                                    width={160}
                                    height={50}
                                />
                            </SwiperSlide>
                            <SwiperSlide className="flex justify-center">
                                <Image
                                    src="/new/logo (7).webp"
                                    alt="Partner"
                                    width={160}
                                    height={50}
                                />
                            </SwiperSlide>
                            <SwiperSlide className="flex justify-center">
                                <Image
                                    src="/new/logo (8).webp"
                                    alt="Partner"
                                    width={160}
                                    height={50}
                                />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div> */}
                <div className="mx-auto my-5 max-w-7xl p-0 lg:p-5">
                    <div className="grid grid-cols-1 gap-5 py-10 md:grid-cols-2">
                        <div className="flex items-center bg-secondary bg-opacity-20">
                            <div className="w-2/3 p-4">
                                <div className="mb-3 w-fit rounded bg-[#F5F5F5] p-2 text-xs">70% OFF</div>
                                <div className="py-2 text-2xl font-bold">{t("shoesPallet")}</div>
                                <div className="mb-5 text-lg">{t("dontMiss")}</div>
                                <div className="flex w-fit cursor-pointer items-center rounded-lg border border-secondary bg-secondary px-4 py-2 hover:bg-white" onClick={() => handleSelectCategory("sepatu")}>
                                    {t("buyNow")}
                                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                                </div>
                            </div>
                            <div className="w-1/3 pt-12">
                                <Image src="/new/Pallet Sepatu.png" alt="Product" width={200} height={200} />
                            </div>
                        </div>
                        <div className="flex items-center bg-secondary bg-opacity-20">
                            <div className="w-2/3 p-4">
                                <div className="mb-3 w-fit rounded bg-[#F5F5F5] p-2 text-xs">70% OFF</div>
                                <div className="py-2 text-2xl font-bold">{t("fashionPallet")}</div>
                                <div className="mb-5 text-lg">{t("dontMiss")}</div>
                                <div className="flex w-fit cursor-pointer items-center rounded-lg border border-secondary bg-secondary px-4 py-2 hover:bg-white" onClick={() => handleSelectCategory("fashion-1")}>
                                    {t("buyNow")}
                                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                                </div>
                            </div>
                            <div className="w-1/3 pt-12">
                                <Image src="/new/Pallet Fashion.png" alt="Product" width={200} height={200} />
                            </div>
                        </div>
                        <div className="flex items-center bg-secondary bg-opacity-20">
                            <div className="w-2/3 p-4">
                                <div className="mb-3 w-fit rounded bg-[#F5F5F5] p-2 text-xs">50% OFF</div>
                                <div className="py-2 text-2xl font-bold">{t("electronicPallet")}</div>
                                <div className="mb-5 text-lg">{t("dontMiss")}</div>
                                <div className="flex w-fit cursor-pointer items-center rounded-lg border border-secondary bg-secondary px-4 py-2 hover:bg-white" onClick={() => handleSelectCategory("elektronik")}>
                                    {t("buyNow")}
                                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                                </div>
                            </div>
                            <div className="w-1/3 pt-12">
                                <Image src="/image 15.png" alt="Product" width={200} height={200} />
                            </div>
                        </div>
                        <div className="flex items-center bg-secondary bg-opacity-20">
                            <div className="w-2/3 p-4">
                                <div className="mb-3 w-fit rounded bg-[#F5F5F5] p-2 text-xs">60% OFF</div>
                                <div className="py-2 text-2xl font-bold">{t("fmcgPallet")}</div>
                                <div className="mb-5 text-lg">{t("dontMiss")}</div>
                                <div className="flex w-fit cursor-pointer items-center rounded-lg border border-secondary bg-secondary px-4 py-2 hover:bg-white" onClick={() => handleSelectCategory("fmcg")}>
                                    {t("buyNow")}
                                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                                </div>
                            </div>
                            <div className="w-1/3 pt-12">
                                <Image src="/new/Pallet FMCG.png" alt="Product" width={200} height={200} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl p-5">
                    <div className="mt-2 flex justify-between py-5">
                        <div className="text-xl font-bold">New Pallets</div>
                        <Link href="/product?page=1">
                            <div className="text-base font-semibold text-[#007185]">{t("showAll")}</div>
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <div className="flex gap-4 lg:grid lg:grid-cols-6">
                            {loadingProducts
                                ? Array.from({ length: 6 }).map((_, index) => (
                                      <div key={index} className="min-w-[50%] md:min-w-0">
                                          <Skeleton height={200} />
                                          <Skeleton count={5} />
                                      </div>
                                  ))
                                : products.map(product => (
                                      <div key={product.id} className="min-w-[50%] md:min-w-[30%]">
                                          <ProductCard
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
                                      </div>
                                  ))}
                        </div>
                    </div>
                </div>

                <div className="my-10 bg-secondary bg-opacity-20">
                    <div className="mx-auto max-w-7xl overflow-x-auto p-5">
                        <div className="flex gap-4 lg:grid lg:grid-cols-4">
                            <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                <div className="flex flex-col items-center p-4 text-center">
                                    <Image src="/package box 07.png" alt="box" width={36} height={36} />
                                    <div className="py-2 text-lg font-bold">{t("sendCargo")}</div>
                                    <div className="text-base">{t("services")}</div>
                                </div>
                            </div>
                            <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                <div className="flex flex-col items-center p-4 text-center">
                                    <Image src="/package box 8.png" alt="box" width={36} height={36} />
                                    <div className="py-2 text-lg font-bold">{t("legitSeller")}</div>
                                    <div className="text-base">{t("qcDone")}</div>
                                </div>
                            </div>
                            <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                <div className="flex flex-col items-center p-4 text-center">
                                    <Image src="/package box 9.png" alt="box" width={36} height={36} />
                                    <div className="py-2 text-lg font-bold">{t("paymentTerjamin")}</div>
                                    <div className="text-base">
                                        <b>100%</b> {t("safetyPayment")}
                                    </div>
                                </div>
                            </div>
                            <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                <div className="flex flex-col items-center p-4 text-center">
                                    <Image src="/package box 10.png" alt="box" width={36} height={36} />
                                    <div className="py-2 text-lg font-bold">{t("support24Hours")}</div>
                                    <div className="text-base">{t("supportPrivate")}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-center p-4 md:flex-row">
                    <div className="w-full md:w-1/2">
                        <Image {...Illustration} alt="bulky" width={500} height={500} priority={true} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" quality={75} placeholder="blur" />
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="text-4xl font-semibold">{t("aboutBulky")}</div>
                        <div className="mt-5 pr-20 text-sm leading-6 opacity-60">{t("aboutBulkyDescription")}</div>
                        <div className="mt-10 flex w-full justify-between pr-20">
                            <Link href="/about-us">
                                <div className="flex w-fit items-center rounded-lg border border-secondary bg-secondary px-4 py-2 hover:bg-white">{t("learnNext")}</div>
                            </Link>
                            <Image src="/new/cartoon-2.png" alt="bulky" width={150} height={150} className="w-1/3" />
                        </div>
                    </div>
                </div>
                {/* <div className="mx-auto max-w-7xl p-4">
                    <div className="flex items-center justify-between">
                        <div className="w-2/3">
                            <div className="text-4xl font-semibold">
                                Kelebihan Kami
                            </div>
                            <div className="mt-5 text-lg opacity-60">
                                Discover our complete range of plumbing services
                                tailored to meet your need.
                            </div>
                        </div>
                        <div className="flex w-1/3 items-center justify-end gap-3">
                            <div
                                className="cursor-pointer rounded-full bg-secondary p-3"
                                onClick={scrollLeft}>
                                <ArrowLeftIcon className="h-5 w-5" />
                            </div>
                            <div
                                className="cursor-pointer rounded-full bg-secondary p-3"
                                onClick={scrollRight}>
                                <ArrowRightIcon className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                    <div
                        className="scrollbar-hide overflow-x-auto py-10"
                        ref={scrollRef}>
                        <div className="flex gap-4">
                            <div className="min-w-[250px] rounded-lg bg-white p-4 shadow-lg lg:w-auto lg:min-w-[350px]">
                                <div
                                    className="h-48 w-full rounded bg-cover bg-center lg:h-64"
                                    style={{
                                        backgroundImage:
                                            'url("/new/Layanan Pelanggan.jpg")',
                                    }}
                                />
                                <div className="mt-3 text-lg font-semibold">
                                    LAYANAN PELANGGAN
                                </div>
                                <div className="mt-5 text-sm opacity-60">
                                    Kami berdedikasi untuk menyediakan layanan
                                    pelanggan yang luar biasa dan membangun
                                    hubungan jangka panjang dengan klien kami
                                    berdasarkan kepercayaan dan kehandalan.
                                </div>
                            </div>
                            <div className="min-w-[250px] rounded-lg bg-white p-4 shadow-lg lg:w-auto lg:min-w-[350px]">
                                <div
                                    className="h-48 w-full rounded bg-cover bg-center lg:h-64"
                                    style={{
                                        backgroundImage: 'url("/new/2.webp")',
                                    }}
                                />
                                <div className="mt-3 text-lg font-semibold">
                                    KESELAMATAN
                                </div>
                                <div className="mt-5 text-sm opacity-60">
                                    Kami memprioritaskan keselamatan karyawan,
                                    klien, dan lingkungan di semua operasi kami.
                                </div>
                            </div>
                            <div className="min-w-[250px] rounded-lg bg-white p-4 shadow-lg lg:w-auto lg:min-w-[350px]">
                                <div
                                    className="h-48 w-full rounded bg-cover bg-center lg:h-64"
                                    style={{
                                        backgroundImage: 'url("/new/3.webp")',
                                    }}
                                />
                                <div className="mt-3 text-lg font-semibold">
                                    KEBERLANJUTAN
                                </div>
                                <div className="mt-5 text-sm opacity-60">
                                    Kami berkomitmen untuk menyediakan limbah
                                    yang berkelanjutan solusi manajemen yang
                                    melestarikan sumber daya alam dan melindungi
                                    lingkungan.
                                </div>
                            </div>
                            <div className="min-w-[250px] rounded-lg bg-white p-4 shadow-lg lg:w-auto lg:min-w-[350px]">
                                <div
                                    className="h-48 w-full rounded bg-cover bg-center lg:h-64"
                                    style={{
                                        backgroundImage: 'url("/new/4.webp")',
                                    }}
                                />
                                <div className="mt-3 text-lg font-semibold">
                                    INVOVASI
                                </div>
                                <div className="mt-5 text-sm opacity-60">
                                    Kami terus mengeksplorasi teknologi dan
                                    proses baru untuk meningkatkan layanan kami
                                    dan memberikan solusi pengelolaan limbah
                                    yang lebih efisien dan efektif.
                                </div>
                            </div>
                            <div className="min-w-[250px] rounded-lg bg-white p-4 shadow-lg lg:w-auto lg:min-w-[350px]">
                                <div
                                    className="h-48 w-full rounded bg-cover bg-center lg:h-64"
                                    style={{
                                        backgroundImage: 'url("/new/5.webp")',
                                    }}
                                />
                                <div className="mt-3 text-lg font-semibold">
                                    INTEGRITAS
                                </div>
                                <div className="mt-5 text-sm opacity-60">
                                    Kami menjalankan bisnis kami dengan tingkat
                                    integritas,transparansi, dan standar etika
                                    tertinggi.
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center px-4 py-10">
                    <div className="text-3xl font-bold">
                        {t("whatInBulky")}
                        <br />
                        {t("viewVideo")}
                    </div>
                    <div className="my-2 flex justify-center text-center text-lg leading-9">{t("descriptionVideo")}</div>
                    <div className="h-[300px] w-full md:h-[400px] lg:h-[450px] lg:w-2/3">
                        {/*<iframe
                            className="h-full w-full" // Menyesuaikan iframe dengan ukuran parent
                            src="https://www.youtube.com/embed/gTQamrVevWE?si=8HxQ3jZMHPZcg_zM"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />*/}
                        <LiteYouTubeEmbed id="gTQamrVevWE" title="YouTube video player" />
                    </div>
                </div>
                <div className="mt-10 bg-secondary bg-opacity-20 px-4 py-10">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex justify-center pt-10 text-center text-xs font-semibold text-[#007185]">{t("tipsAndTrick")}</div>
                        <div className="my-2 flex justify-center text-center text-3xl font-semibold leading-9">
                            {t("academyBulky")} <br /> {t("buildFuture")}
                        </div>
                        <div className="mt-10 overflow-x-auto">
                            <div className="flex gap-4 lg:grid lg:grid-cols-4">
                                {loadingVideos
                                    ? Array.from({ length: 4 }).map((_, index) => (
                                          <div key={index} className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                              <Skeleton height={150} />
                                              <Skeleton width="60%" />
                                          </div>
                                      ))
                                    : videos &&
                                      videos.length > 0 &&
                                      videos.map(video => (
                                          <div className="min-w-[100%] md:min-w-[30%] lg:min-w-0" key={video.id}>
                                              <Link href={`/video/${video.id}`}>
                                                  <VideoThumbnail thumbnail={video.thumbnail} title={video.title} />
                                              </Link>
                                          </div>
                                      ))}
                            </div>
                        </div>
                        <Link href="/video">
                            <div className="flex justify-center pt-10 text-center text-sm font-semibold text-[#007185] underline">{t("viewAllVideo")}</div>
                        </Link>
                    </div>
                </div>
                <div className="w-full bg-transparent bg-contain bg-right-bottom bg-no-repeat lg:bg-[url('/new/cartoon-1.png')]">
                    <div className="mx-auto max-w-7xl px-4 py-10">
                        <div className="mb-10 flex justify-center text-center text-2xl font-semibold leading-9">{t("testimonyUs")}</div>
                        <div className="flex w-full grid-cols-1 items-center justify-center gap-10">
                            {/* <div className="w-1/3 rounded-lg bg-secondary bg-opacity-20 p-10">
                                <div className="text-4xl font-bold">
                                    Testimoni Klien
                                </div>
                                <div className="my-10 flex items-center border-l-2 border-black pl-3">
                                    <div className="text-xl font-semibold">
                                        30+
                                    </div>
                                    <div className="ml-2 text-lg">
                                        Testimoni
                                    </div>
                                </div>
                                <div className="flex w-1/3 items-center gap-3">
                                    <div
                                        className="cursor-pointer rounded-full bg-secondary p-3"
                                        onClick={scrollLeftTwo}>
                                        <ArrowLeftIcon className="h-5 w-5" />
                                    </div>
                                    <div
                                        className="cursor-pointer rounded-full bg-secondary p-3"
                                        onClick={scrollRightTwo}>
                                        <ArrowRightIcon className="h-5 w-5" />
                                    </div>
                                </div>
                            </div> */}
                            <div className="w-full px-4">
                                {/* <div
                                    className="scrollbar-hide overflow-x-auto py-0 md:py-10"
                                    ref={scrollRefTwo}>
                                    <div className="flex w-full gap-4">
                                        {loadingReviews
                                            ? Array.from({ length: 3 }).map(
                                                  (_, index) => (
                                                      <div
                                                          key={index}
                                                          className="min-w-[100%] md:min-w-[50%] lg:min-w-0">
                                                          <Skeleton
                                                              height={150}
                                                          />
                                                          <Skeleton width="60%" />
                                                      </div>
                                                  ),
                                              )
                                            : testimonys &&
                                              testimonys.map(testimoni => (
                                                  <div
                                                      key={testimoni.id}
                                                      className="min-w-[100%] rounded-lg p-4 md:pr-20">
                                                      <div className="opacity-70">
                                                          {testimoni.content}
                                                      </div>
                                                      <div className="mt-10 flex items-center gap-3">
                                                          <div
                                                              className="h-12 w-12 rounded-full bg-cover bg-center"
                                                              style={{
                                                                  backgroundImage: `url(${testimoni.image})`,
                                                              }}
                                                          />
                                                          <div className="flex flex-col justify-center">
                                                              <div className="text-lg font-bold">
                                                                  {
                                                                      testimoni.name
                                                                  }
                                                              </div>
                                                              <div className="text-base opacity-60">
                                                                  {
                                                                      testimoni.label
                                                                  }
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              ))}
                                    </div>
                                </div> */}
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
                                                    <div key={review.id} className="flex min-h-60 w-full flex-col justify-start rounded-lg p-4 text-left">
                                                        <div className="mb-3 flex items-start gap-3">
                                                            <div className="flex w-full flex-col text-left">
                                                                <div className="text-lg font-bold">{review.rated_by}</div>
                                                                <div className="flex">
                                                                    {[...Array(5)].map((_, index3) => (
                                                                        <StarIcon key={index3} className={`mr-1 h-4 w-4 cursor-pointer ${index3 < review.rating ? "text-secondary" : "text-[#BFC9D9]"}`} />
                                                                    ))}
                                                                </div>
                                                                <div className="mt-2 font-bold text-[#007185]">{Cookies.get("locale") === "en" ? (review?.product?.en ? review.product.en : review?.product?.id) : review?.product?.id}</div>
                                                            </div>
                                                        </div>
                                                        <div className="w-full opacity-70">{review.comment}</div>
                                                        <div className="flex items-center gap-2">
                                                            {review.images &&
                                                                review.images.map((image, index2) => (
                                                                    <div
                                                                        key={index2}
                                                                        className="mt-2 h-12 w-12 rounded bg-cover bg-center"
                                                                        style={{
                                                                            backgroundImage: `url(${image.url})`,
                                                                        }}
                                                                    />
                                                                ))}
                                                        </div>
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

                                    <style>
                                        {`
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
                                        `}
                                    </style>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-secondary bg-opacity-20">
                    <div className="mx-auto max-w-5xl px-4 py-10">
                        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                            <Image src="/box bulky-01 1.png" alt="Product" width={400} height={400} />
                            <div className="flex flex-col">
                                <div className="text-4xl font-semibold">{t("wantWholesaler")}</div>
                                <div className="mt-5 pr-20 text-sm leading-6 opacity-60">{t("descriptionWholesale")}</div>
                                <div className="mt-6 flex justify-between pr-20">
                                    <div className="flex w-fit cursor-pointer items-center rounded-lg border border-secondary bg-secondary px-4 py-2 hover:bg-[#e8bc00]" onClick={() => setShowWholesale(true)}>
                                        {t("registerNow")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PopupModal isOpen={isOpenModal} closeModal={closeModal} type="updateProfile" title={t("notification")} message={t("notificationMessage")} confirmText={t("fillNow")} cancelText={t("later")} />

            {isOpenPdf && (
                <div onClick={() => setIsOpenPdf(false)}>
                    <div className="pointer-events-none fixed inset-0 z-40 bg-black bg-opacity-50 lg:top-[120px]" />
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
                            {/* <object
                                width="100%"
                                height="400"
                                data={isPdf}
                                type="application/pdf"
                                className={`h-full w-full ${isLoadingPdf ? "hidden" : "block"}`}
                                allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                title="PDF Viewer"
                                onLoad={() => setIsLoadingPdf(false)}
                            /> */}
                            {/* <PdfViewer isPdf={isPdf} /> */}
                        </div>
                    </div>
                </div>
            )}

            {showWholesale && (
                <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50`}>
                    <div className={`relative w-full max-w-md transform rounded-lg bg-white p-6 transition-all duration-300 ease-out`}>
                        <div className="my-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">{t("formWholesale")}</h2>
                            <XMarkIcon className="h-6 w-6 cursor-pointer" onClick={handleCloseWholesale} />
                        </div>
                        <div className="py-1">
                            <div className="mb-2 text-sm font-bold text-[#6D7588]">{t("form.name")}</div>
                            <input type="text" value={nameWholesale} onChange={e => setNameWholesale(e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]" placeholder={t("placeholder.name")} />
                            <InputError messages={errors && errors.name} className={"mt-2"} />
                        </div>
                        <div className="py-1">
                            <div className="mb-2 text-sm font-bold text-[#6D7588]">{t("form.phone")}</div>
                            <input type="text" value={phoneWholesale} onChange={e => setPhoneWholesale(e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]" placeholder={t("placeholder.phone")} />
                            <InputError messages={errors && errors.phone_number} className={"mt-2"} />
                        </div>
                        <div className="py-1">
                            <div className="mb-2 text-sm font-bold text-[#6D7588]">{t("form.address")}</div>
                            <input type="text" value={addressWholesale} onChange={e => setAddressWholesale(e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]" placeholder={t("placeholder.address")} />
                            <InputError messages={errors && errors.address} className={"mt-2"} />
                        </div>
                        <div className="py-1">
                            <div className="mb-2 text-sm font-bold text-[#6D7588]">{t("form.budget")}</div>
                            <div className="relative w-full lg:max-w-xl">
                                <div className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]" onClick={() => setIsOpen(!isOpen)}>
                                    <div className="flex items-center">{selectedOption}</div>
                                    {isOpen ? <ChevronUpIcon className="inline-block h-5 w-5" /> : <ChevronDownIcon className="inline-block h-5 w-5" />}
                                </div>

                                {/* Dropdown options */}
                                <div className={`absolute mt-1 w-full rounded-lg border border-[#F0F3F7] bg-white p-2 shadow-lg transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}>
                                    {budgets.map((option, index) => (
                                        <div key={index} className="flex cursor-pointer items-center border-b border-[#F0F3F7] p-2 text-xs hover:rounded-lg hover:bg-[#F5F5F5]" onClick={() => handleOptionClick(option)}>
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <InputError messages={errors && errors.budget} className={"mt-2"} />
                        </div>
                        <div className="mt-2 py-1">
                            <div className="mb-2 text-sm font-bold text-[#6D7588]">{t("form.productCategory")}</div>
                            <div className="grid max-h-32 grid-cols-2 gap-2 overflow-y-auto">
                                <div className="flex items-center gap-2 p-0.5 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]">
                                    <input
                                        id={`selected-all`} // Unique ID for accessibility
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        checked={selectedCategories.length === categories.length}
                                        onChange={handleSelectAllCategories}
                                        className="h-3 w-3 rounded border-black checked:bg-[#007185] checked:text-[#007185] focus:ring-0"
                                    />
                                    <label htmlFor={`selected-all`} className="text-sm font-bold text-[#6D7588]">
                                        Semua Kategori
                                    </label>
                                </div>
                                {categories.map((category, index) => (
                                    <div key={index} className="flex items-center gap-2 p-0.5 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]">
                                        <input
                                            id={`category-${category.id}`} // Unique ID for accessibility
                                            aria-describedby="comments-description"
                                            name="comments"
                                            type="checkbox"
                                            checked={selectedCategories.includes(category.id)}
                                            onChange={e => handleCategoryChange(e, category)}
                                            className="h-3 w-3 rounded border-black checked:bg-[#007185] checked:text-[#007185] focus:ring-0"
                                        />
                                        <label htmlFor={`category-${category.id}`} className="text-sm font-bold text-[#6D7588]">
                                            {category.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <InputError messages={errors && errors.categories} className={"mt-2"} />
                        </div>
                        <div className="mt-6 flex justify-center">
                            <div className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-secondary bg-secondary px-4 py-2 hover:bg-[#e8bc00]" onClick={handleSubmitWholesale}>
                                {t("form.sendForm")}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <PopupModal isOpen={showNotification} closeModal={handleCloseWholesale} type={"notification"} title={t("notification")} message={t("congratulationWholesale")} urlConfirm="/" />
            <Footer />

            {/* <LoadingSpinner /> */}

            <FloatingIcon />
        </div>
    )
}

export default Home
