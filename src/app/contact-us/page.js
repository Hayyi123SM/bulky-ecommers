"use client"

import Navbar from "@/components/Navbar"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import GoogleMapReact from "google-map-react"
import Link from "next/link"
import { Suspense } from "react"

const AnyReactComponent = ({ text }) => <div>{text}</div>

function ContactUs() {
    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627,
        },
        zoom: 11,
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <div className="hidden lg:block">
                    <Navbar />
                </div>
                <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                    <ArrowLeftIcon className="h-6 w-6" />
                    <div className="ml-2 font-semibold">Kontak Kami</div>
                </div>
                <div className="min-h-screen">
                    <div className="mx-auto hidden max-w-7xl lg:block">
                        <div className="px-7 pb-1 pt-12 text-2xl font-bold">
                            Kontak Kami
                        </div>
                        <div className="px-7 text-[#007185]">
                            <Link href="/profile" className="cursor-pointer">
                                Home
                            </Link>{" "}
                            / Kontak Kami
                        </div>
                    </div>
                    <div className="border-b border-[#F0F3F7] lg:mt-6"> </div>
                    <div className="mx-auto max-w-7xl lg:p-7">
                        <div className="flex flex-col lg:flex-row">
                            <div className="lg:w-2/5">
                                <div className="bg-white p-4 lg:rounded-xl lg:p-12 lg:shadow">
                                    <div className="text-sm font-bold lg:text-2xl">
                                        Pusat Bantuan
                                    </div>
                                    <div className="mt-4 text-sm font-normal leading-6">
                                        Apakah anda adalah merchant kami dan
                                        punya pertanyaan seputar akun anda?
                                        Hubungi kami melalui kontak berikut
                                    </div>
                                    <div className="mt-10 text-xs font-extrabold text-[#6D7588] lg:text-sm">
                                        Jakarta
                                    </div>
                                    <div className="mt-4 text-sm font-normal leading-6 opacity-80">
                                        Jam operasional: <br /> Senin-Jumat |
                                        8.00-17.00 <br />
                                        <div className="mt-2 w-full text-sm leading-6 text-[#007185]">
                                            Kontak kami melalui WhatsApp
                                        </div>
                                        <div className="mt-2 w-full text-sm leading-6 text-[#007185]">
                                            cutomercare@bulky.com
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="overflow-hidden lg:ml-8 lg:w-3/5 lg:rounded-xl"
                                style={{ height: "500px" }}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: "" }}
                                    defaultCenter={defaultProps.center}
                                    defaultZoom={defaultProps.zoom}>
                                    <AnyReactComponent
                                        lat={59.955413}
                                        lng={30.337844}
                                        text="My Marker"
                                    />
                                </GoogleMapReact>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        </Suspense>
    )
}

export default ContactUs
