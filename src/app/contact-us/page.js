"use client"
import FloatingIcon from "@/components/FloatingIcon"
import Navbar from "@/components/Navbar"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import Footer from "@/components/Footer"

const libraries = ["places"]
const mapContainerStyle = {
    width: "100%",
    height: "100%",
}

function ContactUs() {
    const t = useTranslations()
    const router = useRouter()
    const coords = { lat: -6.4365753, lng: 106.847836 }

    // useEffect(() => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             position => {
    //                 const { latitude, longitude } = position.coords
    //                 setCoords({ lat: latitude, lng: longitude })
    //             },
    //             error => console.error("Error getting location", error),
    //         )
    //     }
    // }, [])

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon className="h-6 w-6" onClick={() => router.back()} />
                <div className="ml-2 font-semibold">{t("page.contactus")}</div>
            </div>
            <div className="min-h-screen">
                <div className="mx-auto hidden max-w-7xl lg:block">
                    <div className="px-7 pb-1 pt-12 text-2xl font-bold">{t("page.contactus")}</div>
                    <div className="px-7 text-[#007185]">
                        <Link href="/profile" className="cursor-pointer">
                            Home
                        </Link>{" "}
                        / {t("page.contactus")}
                    </div>
                </div>
                <div className="border-b border-[#F0F3F7] lg:mt-6"></div>
                <div className="mx-auto max-w-7xl lg:p-7">
                    <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-2/5">
                            <div className="bg-white p-4 lg:rounded-xl lg:p-12 lg:shadow">
                                <div className="text-sm font-bold lg:text-2xl">{t("page.helpCenter")}</div>
                                <div className="mt-4 text-sm font-normal leading-6">{t("page.contactDescription")}</div>
                                <div className="mt-10 text-xs font-extrabold text-[#6D7588] lg:text-sm">Jakarta</div>
                                <div className="mt-4 text-sm font-normal leading-6 opacity-80">
                                    Jam operasional: <br /> Senin-Jumat | 9.00-18.00 <br />
                                    <div className="mt-2 w-full cursor-pointer text-sm leading-6 text-[#007185]" onClick={() => window.open("https://wa.me/62811833164", "_blank")}>
                                        {t("page.contactMeByWatsapp")}
                                    </div>
                                    <div className="mt-2 w-full text-sm leading-6 text-[#007185]">admin@bulky.id</div>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-hidden lg:ml-8 lg:w-3/5 lg:rounded-xl" style={{ height: "500px" }}>
                            {isLoaded ? (
                                <GoogleMap mapContainerStyle={mapContainerStyle} center={coords} zoom={19}>
                                    <Marker position={coords} />
                                </GoogleMap>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <FloatingIcon />
        </div>
    )
}

export default ContactUs
