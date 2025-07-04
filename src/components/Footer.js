"use client"

import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline"
import { PhoneIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"

function Footer() {
    const t = useTranslations()
    const payments = []

    for (let i = 1; i < 16; i++) {
        payments.push(i)
    }

    return (
        <div className="bg-[#F5F5F5] lg:p-14">
            <div className="flex flex-wrap font-normal text-[#212121]">
                <div className="w-full p-5 md:w-2/5 lg:w-3/12 xl:w-3/12">
                    <Link href="/">
                        <Image src="/bulky.svg" width={94} height={32} alt="Logo" className="cursor-pointer" priority={false} />
                    </Link>
                    <div className="mt-3 text-sm">{t("footer.description")}</div>
                    <div className="mt-3 flex text-sm">
                        <MapPinIcon className="h-auto w-6 md:w-9" />
                        <div className="ml-2">
                            Sahid Sudriman Center 40th Floor <br />
                            Jl. Jend. Sudirman No.86, Kota Administrasi Jakarta Pusat - 10220 Indonesia (ID)
                        </div>
                    </div>
                    <div className="mt-3 flex text-sm">
                        <PhoneIcon className="h-auto w-4" />
                        <div className="ml-2 cursor-pointer font-semibold text-[#007185] underline" onClick={() => window.open("https://wa.me/62811833164", "_blank")}>
                            0811 833 164
                        </div>
                    </div>
                    <div className="mt-3 flex text-sm">
                        <EnvelopeIcon className="h-auto w-4" />
                        <div className="ml-2 font-semibold text-[#007185] underline">admin@bulky.id</div>
                    </div>
                </div>
                <div className="w-1/3 p-5 md:w-1/5 lg:w-2/12 xl:w-2/12">
                    <div className="text-base font-bold">{t("footer.locationWarehouse")}</div>
                    <div className="mt-3 text-sm">Depok</div>
                </div>
                <div className="w-1/3 p-5 md:w-1/5 lg:w-2/12 xl:w-2/12">
                    <div className="text-base font-bold">{t("footer.office")}</div>
                    <div className="mt-3 text-sm">
                        <Link href="/about-us">{t("footer.aboutUs")}</Link>
                    </div>
                    <div className="mt-3 text-sm">
                        <Link href="/how-to-shop">{t("footer.howToBuy")}</Link>
                    </div>
                    <div className="mt-3 text-sm">
                        <Link href="/about-payment">{t("footer.aboutPayment")}</Link>
                    </div>
                    <div className="mt-3 text-sm">
                        <Link href="/contact-us">{t("footer.contactUs")}</Link>
                    </div>
                    <div className="mt-3 text-sm">
                        <Link href="/faq">{t("footer.faq")}</Link>
                    </div>
                    <div className="mt-3 text-sm">
                        <Link href="/terms-and-conditions">{t("footer.termsAndConditions")}</Link>
                    </div>
                    <div className="mt-3 text-sm">
                        <Link href="/privacy-policy">{t("footer.privacyPolicy")}</Link>
                    </div>
                </div>
                <div className="w-1/3 p-5 md:w-1/5 lg:w-2/12 xl:w-2/12">
                    <div className="text-base font-bold">{t("footer.services")}</div>
                    <div className="mt-3 text-sm">
                        <Link href="/product?page=1">{t("footer.otherProducts")}</Link>
                    </div>
                    <div className="mt-3 text-sm">
                        <Link href="/order">{t("footer.orderStatus")}</Link>
                    </div>
                    <div className="mt-3 text-sm">
                        <Link href="/profile">{t("footer.profile")}</Link>
                    </div>
                    <div className="mt-3 flex text-sm">
                        <Link href="https://www.instagram.com/bulky.id/" target="_blank">
                            <Image src="/instagram 1.svg" width={17} height={20} alt="Logo" className="mr-2 cursor-pointer" priority={false} />
                        </Link>
                        <Link href="https://www.facebook.com/liquid8wholesale" target="_blank">
                            <Image src="/facebook.svg" width={17} height={20} alt="Logo" className="mr-2 cursor-pointer" priority={false} />
                        </Link>
                        <Link
                            href="https://www.tiktok.com/@bulky.id?_r=1&_d=e2jcahcm8a23cl&sec_uid=MS4wLjABAAAA11tktaAUZ9TiF9YaCdgagpDkKhtMutYt7x7f7EU5kKUMcUwaDxr62D3-KUTVesgQ&share_author_id=7243643351286088710&sharer_language=en&source=h5_t&u_code=e8c95m16jb84di&timestamp=1739522230&user_id=7243643351286088710&sec_user_id=MS4wLjABAAAA11tktaAUZ9TiF9YaCdgagpDkKhtMutYt7x7f7EU5kKUMcUwaDxr62D3-KUTVesgQ&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7468477067408164615&share_link_id=bdf3b6ae-2990-4d33-95a8-bba5a0fb7275&share_app_id=1180&ugbiz_name=ACCOUNT&ug_btm=b8727%2Cb7360&social_share_type=5&enable_checksum=1"
                            target="_blank">
                            <Image src="/tiktok.svg" width={17} height={20} alt="Logo" className="mr-2 cursor-pointer" priority={false} />
                        </Link>
                    </div>
                </div>
                <div className="w-full p-5 md:w-full lg:w-3/12 xl:w-3/12">
                    <div className="text-base font-bold">{t("footer.paymentMethod")}</div>
                    <div className="mt-3 grid grid-cols-6 gap-3 text-sm">
                        {payments.map((payment, index) => (
                            <Image key={index} src={`/payment/image ${payment}.svg`} width={100} height={100} alt="Logo" priority={false} />
                        ))}
                    </div>

                    <div className="mt-10 text-base font-bold">{t("footer.accessApp")}</div>
                    <div className="mt-3 flex items-center text-sm">
                        <a href="https://apps.apple.com/app/bulky-id/id6738534149" target="_blank" rel="noopener noreferrer">
                            <Image src={`/payment_method/apple.svg`} width={120} height={100} alt="Logo" priority={false} className="cursor-pointer" />
                        </a>
                        <a
                            href="https://play.google.com/store/apps/details?id=com.bulky.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => {
                                try {
                                    // Log or handle click events if needed
                                    console.log("Opening Google Play Store...", e)
                                } catch (err) {
                                    console.error("Error navigating to Play Store:", err)
                                }
                            }}>
                            <Image src={`/payment_method/gplay.svg`} width={120} height={100} alt="Google Play Logo" priority={false} className="cursor-pointer" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
