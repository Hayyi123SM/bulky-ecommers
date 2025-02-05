"use client"

import FloatingIcon from "@/components/FloatingIcon"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import Image from "next/image"

function AboutUs() {
    const t = useTranslations()
    const router = useRouter()
    // const dispatch = useDispatch()
    // const aboutUs = useSelector(state => state.pages.item)
    //
    // useEffect(() => {
    //     dispatch(fetchPages("tentang-kami"))
    // }, [dispatch])

    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon className="h-6 w-6" onClick={() => router.back()} />
                <div className="ml-2 font-semibold">{t("page.aboutus")}</div>
            </div>
            <div className="mt-10 min-h-screen p-4">
                <div className="mx-auto max-w-7xl text-3xl">
                    <div className="text-center font-semibold">
                        {t("page.aboutUsTitle1")} <br /> {t("page.aboutUsTitle2")}
                    </div>
                </div>
                <Image src={"/about-us.png"} alt={"about-us"} width={500} height={500} className="my-10 w-full" />
                <div className="mx-auto max-w-xl">
                    <div className="mb-5 text-center text-2xl font-semibold">{t("page.mission")}</div>
                    <div className="text-center">{t("page.aboutUsDesc")}</div>
                </div>
            </div>
            <Footer />
            <FloatingIcon />
        </div>
    )
}

export default AboutUs
