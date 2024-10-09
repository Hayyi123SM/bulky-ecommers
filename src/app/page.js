"use client"

import Footer from "@/components/Footer"
import LoadingSpinner from "@/components/LoadingSpinner"
import Navbar from "@/components/Navbar"
import PopupMenuMobile from "@/components/PopupMenuMobile"
import PopupModal from "@/components/PopupModal"
import ProductCard from "@/components/ProductCard"
import TestimoniCard from "@/components/TestimoniCard"
import VideoThumbnail from "@/components/VideoThumbnail"
import { fetchBanners } from "@/store/slices/bannerSlice"
import { fetchProducts } from "@/store/slices/productSlice"
import { fetchTestimonies } from "@/store/slices/testimonySlice"
import { fetchVideos } from "@/store/slices/videoSlice"
import {
    ClockIcon,
    CreditCardIcon,
    HandThumbUpIcon,
    TruckIcon,
} from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import { useDispatch, useSelector } from "react-redux"

function Home() {
    const [showPopupMenu, setShowPopupMenu] = useState(false)
    const [current, setCurrent] = useState(0)

    const dispatch = useDispatch()
    const banners = useSelector(state => state.banners.items)
    const products = useSelector(state => state.products.items)
    const videos = useSelector(state => state.videos.items)
    const testimonys = useSelector(state => state.testimony.items)
    const loadingBanners = useSelector(state => state.banners.isLoading)
    const loadingProducts = useSelector(state => state.products.isLoading)
    const loadingVideos = useSelector(state => state.videos.isLoading)
    const loadingTestimonies = useSelector(state => state.testimony.isLoading)
    const [isLoadingPdf, setIsLoadingPdf] = useState(false)
    const [isOpenPdf, setIsOpenPdf] = useState(false)
    const [isPdf, setIsPdf] = useState(null)
    const [isOpenModal, setIsOpenModal] = useState(false)

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
        dispatch(fetchTestimonies({ take: 3 }))
        dispatch(fetchVideos({ perPage: 8, paginate: 1 }))

        // localStorage.setItem("signinWithGoogle", JSON.stringify(dummy))
    }, [dispatch])
    // console.log("====================================")
    // console.log("loadingBanners:", loadingBanners)
    // console.log("====================================")

    const togglePopupMenu = () => setShowPopupMenu(!showPopupMenu)
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
        }, 3000)
        return () => clearInterval(interval)
    }, [banners.length])

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("signinWithGoogle"))) {
            if (
                JSON.parse(localStorage.getItem("signinWithGoogle")).is_new_user
            ) {
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

    return (
        <div>
            {/* Search results displayed outside the Navbar */}
            {/* Rest of your page content */}
            <Navbar togglePopupMenu={togglePopupMenu} visibleOn="both" />
            {showPopupMenu && (
                <PopupMenuMobile
                    showPopupMenu={showPopupMenu}
                    closePopupMenu={closePopupMenu}
                />
            )}
            <div className="">
                <div className="mx-auto max-w-7xl p-0 lg:p-5">
                    <div className="relative mx-auto h-[120px] w-full overflow-hidden md:h-[224px] lg:h-[324px] lg:rounded-3xl">
                        {loadingBanners ? (
                            <Skeleton height={324} />
                        ) : (
                            banners.map((banner, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-transform duration-1000 ${index === current ? "translate-x-0" : index < current ? "-translate-x-full" : "translate-x-full"}`}>
                                    <Image
                                        src={banner.full_url}
                                        alt={`Banner ${index}`}
                                        fill
                                        priority={false}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            ))
                        )}
                        <div className="absolute bottom-5 left-5 flex space-x-2">
                            {loadingBanners ? (
                                <Skeleton height={324} />
                            ) : (
                                banners.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`h-2 w-2 cursor-pointer lg:rounded-full ${current === index ? "bg-white" : "bg-gray-400"}`}
                                        onClick={() => setCurrent(index)}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl p-5">
                    <div className="mt-2 flex justify-between py-5">
                        <div className="text-xl font-bold">New Pallets</div>
                        <Link href="/product">
                            <div className="text-base font-semibold text-[#007185]">
                                Lihat Semua
                            </div>
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <div className="flex gap-4 lg:grid lg:grid-cols-6">
                            {loadingProducts
                                ? Array.from({ length: 6 }).map((_, index) => (
                                      <div
                                          key={index}
                                          className="min-w-[50%] md:min-w-0">
                                          <Skeleton height={200} />
                                          <Skeleton count={5} />
                                      </div>
                                  ))
                                : products.map(product => (
                                      <div
                                          key={product.id}
                                          className="min-w-[50%] md:min-w-[30%]">
                                          <ProductCard
                                              productId={product.id}
                                              image={product.images[0]}
                                              location={product.warehouse.name}
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
                                              isOpenPdf={() =>
                                                  handlePackageDetail(
                                                      product.pdf_file,
                                                  )
                                              }
                                          />
                                      </div>
                                  ))}
                        </div>
                    </div>

                    <div className="my-10 flex justify-center p-5 text-center text-3xl font-semibold leading-9">
                        The world's leading retailers work <br /> with Bulky
                    </div>

                    <div className="overflow-x-auto">
                        <div className="flex gap-4 lg:grid lg:grid-cols-4">
                            <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                <div className="text-left">
                                    <div className="mb-5 w-fit rounded-full bg-[#212121] p-3">
                                        <TruckIcon className="h-10 w-10 text-[#FFCF02]" />
                                    </div>
                                    <div className="pb-1 text-lg font-bold">
                                        Pengiriman Kargo
                                    </div>
                                    <div className="pr-10 text-base">
                                        Ambil Sendiri atau Layanan Pengiriman
                                    </div>
                                </div>
                            </div>
                            <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                <div className="text-left">
                                    <div className="mb-5 w-fit rounded-full bg-[#212121] p-3">
                                        <HandThumbUpIcon className="h-10 w-10 text-[#FFCF02]" />
                                    </div>
                                    <div className="pb-1 text-lg font-bold">
                                        Legit Seller
                                    </div>
                                    <div className="pr-10 text-base">
                                        Semua Produk Lulus QC & Tanpa Perantara
                                    </div>
                                </div>
                            </div>
                            <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                <div className="text-left">
                                    <div className="mb-5 w-fit rounded-full bg-[#212121] p-3">
                                        <CreditCardIcon className="h-10 w-10 text-[#FFCF02]" />
                                    </div>
                                    <div className="pb-1 text-lg font-bold">
                                        Pembayaran Terjamin
                                    </div>
                                    <div className="pr-10 text-base">
                                        <b>100%</b> Pembayaran Aman, dengan
                                        berbagai Metode
                                    </div>
                                </div>
                            </div>
                            <div className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                <div className="text-left">
                                    <div className="mb-5 w-fit rounded-full bg-[#212121] p-3">
                                        <ClockIcon className="h-10 w-10 text-[#FFCF02]" />
                                    </div>
                                    <div className="pb-1 text-lg font-bold">
                                        Dukungan 24 Jam
                                    </div>
                                    <div className="pr-10 text-base">
                                        Dukungan Khusus
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10 bg-[#FFF5EB] px-4 py-10">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex justify-center pt-10 text-center text-xs font-semibold text-[#007185]">
                            TIPS & TRICK IN WHOLESALE BUSINESS
                        </div>
                        <div className="my-2 flex justify-center text-center text-3xl font-semibold leading-9">
                            Wholesales Academy by Bulky <br /> Build your future
                        </div>
                        <div className="mt-10 overflow-x-auto">
                            <div className="flex gap-4 lg:grid lg:grid-cols-4">
                                {loadingVideos
                                    ? Array.from({ length: 4 }).map(
                                          (_, index) => (
                                              <div
                                                  key={index}
                                                  className="min-w-[50%] md:min-w-[30%] lg:min-w-0">
                                                  <Skeleton height={150} />
                                                  <Skeleton width="60%" />
                                              </div>
                                          ),
                                      )
                                    : videos &&
                                      videos.length > 0 &&
                                      videos.map(video => (
                                          <div
                                              className="min-w-[50%] md:min-w-[30%] lg:min-w-0"
                                              key={video.id}>
                                              <Link href={`/video/${video.id}`}>
                                                  <VideoThumbnail
                                                      thumbnail={
                                                          video.thumbnail
                                                      }
                                                      title={video.title}
                                                  />
                                              </Link>
                                          </div>
                                      ))}
                            </div>
                        </div>
                        <Link href="/video">
                            <div className="flex justify-center pt-10 text-center text-sm font-semibold text-[#007185] underline">
                                View All Comunity Video
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl px-4 py-10">
                    <div className="flex justify-center pt-10 text-center text-xs font-semibold text-[#007185]">
                        BETTER THAN WHOLESALE
                    </div>
                    <div className="my-2 flex justify-center text-center text-3xl font-semibold leading-9">
                        Bulky empowers businesses all
                        <br />
                        around the world
                    </div>
                    <div className="mt-10 overflow-x-auto">
                        <div className="flex gap-4 lg:grid lg:grid-cols-3">
                            {loadingTestimonies
                                ? Array.from({ length: 3 }).map((_, index) => (
                                      <div
                                          key={index}
                                          className="min-w-[100%] md:min-w-[50%] lg:min-w-0">
                                          <Skeleton height={150} />
                                          <Skeleton width="60%" />
                                      </div>
                                  ))
                                : testimonys &&
                                  testimonys.map(testimoni => (
                                      <div
                                          key={testimoni.id}
                                          className="min-w-[100%] md:min-w-[50%] lg:min-w-0">
                                          <TestimoniCard
                                              name={testimoni.name}
                                              image={testimoni.image}
                                              title={testimoni.label}
                                              review={testimoni.content}
                                          />
                                      </div>
                                  ))}
                        </div>
                    </div>
                </div>
            </div>
            <PopupModal
                isOpen={isOpenModal}
                closeModal={closeModal}
                type="updateProfile"
                title="Pemberitahuan"
                message="Anda belum melengkapi data diri"
                confirmText="Lengkapi Sekarang"
                cancelText="Nanti"
            />

            {isOpenPdf && (
                <div onClick={() => setIsOpenPdf(false)}>
                    <div className="pointer-events-none fixed inset-0 z-40 bg-black bg-opacity-50 lg:top-[120px]">
                        {" "}
                    </div>
                    <div className="fixed top-[4rem] z-50 flex h-[calc(100%-4rem)] w-full items-center justify-center">
                        <div className="relative h-[800px] max-h-[calc(100%-4rem)] w-[90%] max-w-[600px] bg-white p-4 shadow-lg md:h-[800px] lg:h-[700px] xl:h-[800px]">
                            {/* start: close modal */}
                            <div
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
                            </div>
                            {/* end: close modal */}

                            {/* Loading Spinner */}
                            {isLoadingPdf && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white">
                                    Tunggu Sebentar...
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
                                src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(isPdf)}`}
                                title="PDF File"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                onLoad={() => setIsLoadingPdf(false)} // Set loading false saat PDF selesai dimuat
                            />
                        </div>
                    </div>
                </div>
            )}
            <Footer />

            {/* <LoadingSpinner /> */}
        </div>
    )
}

export default Home
