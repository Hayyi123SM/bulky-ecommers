"use client"

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Link from "next/link"
import GoogleMapReact from "google-map-react"

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
        <div>
            <Navbar />
            <div className="min-h-screen">
                <div className="mx-auto max-w-7xl">
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
                <div className="mt-6 border-b border-[#F0F3F7]"> </div>
                <div className="mx-auto max-w-7xl p-7">
                    <div className="flex">
                        <div className="w-2/5">
                            <div className="rounded-xl bg-white px-12 py-12 shadow">
                                <div className="text-2xl font-bold">
                                    Pusat Bantuan
                                </div>
                                <div className="mt-4 text-sm font-normal leading-6">
                                    Apakah anda adalah merchant kami dan punya
                                    pertanyaan seputar akun anda? Hubungi kami
                                    melalui kontak berikut
                                </div>
                                <div className="mt-10 text-sm font-extrabold text-[#6D7588]">
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
                            className="ml-8 w-3/5 overflow-hidden rounded-xl"
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
            <Footer />
        </div>
    )
}

export default ContactUs
