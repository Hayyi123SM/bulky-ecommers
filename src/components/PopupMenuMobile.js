import { useAuth } from "@/hooks/auth"
import { clearUser, setUser } from "@/store/slices/authSlice"
import { resetFilters } from "@/store/slices/filterSlice"
import {
    ArrowRightStartOnRectangleIcon,
    BanknotesIcon,
    BuildingStorefrontIcon,
    ChatBubbleBottomCenterTextIcon,
    Cog6ToothIcon,
    CreditCardIcon,
    DocumentTextIcon,
    HomeIcon,
    InformationCircleIcon,
    LockClosedIcon,
    PencilIcon,
    PhoneIcon,
    QuestionMarkCircleIcon,
    ShieldCheckIcon,
    ShoppingCartIcon,
    StarIcon,
} from "@heroicons/react/24/outline"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"

function PopupMenuMobile({ showPopupMenu, closePopupMenu }) {
    const router = useRouter()
    const [showPopupMenuProfile, setShowPopupMenuProfile] = useState(false)
    const { logout } = useAuth({ middleware: "guest" })
    const dispatch = useDispatch()
    const { user } = useAuth()
    const [savedUser, setSavedUser] = useState(null)
    const modalRef = useRef(null)
    const profileModalRef = useRef(null)

    const handleLogout = async () => {
        await logout({ redirect: "/" })
        dispatch(clearUser())
    }

    const setTogglePopupMenuProfile = () => {
        setShowPopupMenuProfile(!showPopupMenuProfile)
    }

    useEffect(() => {
        const getUser = localStorage.getItem("user")
        setSavedUser(getUser)
    }, [])

    useEffect(() => {
        if (savedUser) {
            dispatch(setUser(JSON.parse(savedUser)))
        }
    }, [dispatch, savedUser])

    useEffect(() => {
        if (showPopupMenuProfile) {
            document.body.classList.add("modal-open")
        } else {
            document.body.classList.remove("modal-open")
        }
    }, [])

    const handleOverlayClick = e => {
        if (
            modalRef.current &&
            !modalRef.current.contains(e.target) &&
            profileModalRef.current &&
            !profileModalRef.current.contains(e.target)
        ) {
            closePopupMenu()
            setShowPopupMenuProfile(false)
        }
    }

    useEffect(() => {
        if (showPopupMenu || showPopupMenuProfile) {
            document.addEventListener("mousedown", handleOverlayClick)
        } else {
            document.removeEventListener("mousedown", handleOverlayClick)
        }

        return () => {
            document.removeEventListener("mousedown", handleOverlayClick)
        }
    }, [showPopupMenu, showPopupMenuProfile])

    // useEffect(() => {
    //     if (!user) {
    //         router.push("/login")
    //     }
    // }, [user, router])

    const handleToProducts = () => {
        dispatch(resetFilters())
        router.push("/product")
    }

    return (
        <div
            className={`transition-all duration-500 ease-in-out ${showPopupMenu ? "opacity-100" : "opacity-0"}`}>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 pt-20">
                <div
                    ref={modalRef}
                    className="min-h-screen w-full rounded-lg bg-[#F5F5F5] shadow-lg md:w-5/6">
                    <div className="bg-white p-4">
                        <div className="my-4 flex items-center">
                            <XMarkIcon
                                className="h-6 w-6 cursor-pointer"
                                onClick={closePopupMenu}
                            />
                            <h2 className="ml-3 text-base font-bold">
                                Menu Utama
                            </h2>
                        </div>
                    </div>
                    <div className="mt-2 bg-white p-4">
                        <Link href="/">
                            <div className="flex items-center py-3">
                                <HomeIcon className="h-6 w-6 cursor-pointer" />
                                <div className="ml-3 text-sm">Home</div>
                            </div>
                        </Link>
                        <div
                            className="flex items-center py-3"
                            onClick={handleToProducts}>
                            <ShoppingCartIcon className="h-6 w-6 cursor-pointer" />
                            <div className="ml-3 text-sm">Shop</div>
                        </div>
                        <Link href="/about-us">
                            <div className="flex items-center py-3">
                                <InformationCircleIcon className="h-6 w-6 cursor-pointer" />
                                <div className="ml-3 text-sm">About Us</div>
                            </div>
                        </Link>
                        <Link href="/contact-us">
                            <div className="flex items-center py-3">
                                <PhoneIcon className="h-6 w-6 cursor-pointer" />
                                <div className="ml-3 text-sm"> Contact Us</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {user && (
                <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 pt-20">
                        <div
                            ref={modalRef}
                            className="min-h-screen w-full rounded-lg bg-[#F5F5F5] shadow-lg md:w-5/6">
                            <div className="bg-white p-4">
                                <div className="my-4 flex items-center">
                                    <XMarkIcon
                                        className="h-6 w-6 cursor-pointer"
                                        onClick={closePopupMenu}
                                    />
                                    <h2 className="ml-3 text-base font-bold">
                                        Menu Utama
                                    </h2>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        <Image
                                            src="/profile.png"
                                            width={56}
                                            height={56}
                                            alt="Profile"
                                            className="cursor-pointer"
                                            priority={false}
                                        />
                                        <div className="ml-3">
                                            <div className="pb-1 text-base font-bold">
                                                {user && user.data.name}
                                            </div>
                                            <div className="text-xs">
                                                <Link href="/profile">
                                                    <div className="cursor-pointer">
                                                        {user &&
                                                            user.data.email}
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <Cog6ToothIcon
                                        className="ml-auto h-6 w-6 cursor-pointer"
                                        onClick={setTogglePopupMenuProfile}
                                    />
                                </div>
                            </div>
                            <div className="mt-2 bg-white p-4">
                                <Link href="/waiting-payment">
                                    <div className="flex items-center py-3">
                                        <CreditCardIcon className="h-6 w-6 cursor-pointer" />
                                        <div className="ml-3 text-sm">
                                            Menunggu Pembayaran
                                        </div>
                                    </div>
                                </Link>
                                <Link href="/order">
                                    <div className="flex items-center py-3">
                                        <DocumentTextIcon className="h-6 w-6 cursor-pointer" />
                                        <div className="ml-3 text-sm">
                                            Status Pesanan
                                        </div>
                                    </div>
                                </Link>
                                <Link href="/order-split">
                                    <div className="flex items-center py-3">
                                        <BanknotesIcon className="h-6 w-6 cursor-pointer" />
                                        <div className="ml-3 text-sm">
                                            Pembayaran Patungan
                                        </div>
                                    </div>
                                </Link>
                                <Link href="/review">
                                    <div className="flex items-center py-3">
                                        <StarIcon className="h-6 w-6 cursor-pointer" />
                                        <div className="ml-3 text-sm">
                                            Ulasan
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="mt-2 bg-white p-4">
                                <Link href="/privacy-policy">
                                    <div className="flex items-center py-3">
                                        <ShieldCheckIcon className="h-6 w-6 cursor-pointer" />
                                        <div className="ml-3 text-sm">
                                            Kebijakan Privasi
                                        </div>
                                    </div>
                                </Link>
                                <Link href="/terms-and-conditions">
                                    <div className="flex items-center py-3">
                                        <DocumentTextIcon className="h-6 w-6 cursor-pointer" />
                                        <div className="ml-3 text-sm">
                                            Syarat & Ketentuan
                                        </div>
                                    </div>
                                </Link>
                                <Link href="/about-payment">
                                    <div className="flex items-center py-3">
                                        <BanknotesIcon className="h-6 w-6 cursor-pointer" />
                                        <div className="ml-3 text-sm">
                                            Tentang Pembayaran
                                        </div>
                                    </div>
                                </Link>
                                <Link href="/how-to-buy">
                                    <div className="flex items-center py-3">
                                        <QuestionMarkCircleIcon className="h-6 w-6 cursor-pointer" />
                                        <div className="ml-3 text-sm">
                                            How to Buy
                                        </div>
                                    </div>
                                </Link>
                                <Link href="/faq">
                                    <div className="flex items-center py-3">
                                        <ChatBubbleBottomCenterTextIcon className="h-6 w-6 cursor-pointer" />
                                        <div className="ml-3 text-sm">FAQ</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {showPopupMenuProfile && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 pt-20">
                            <div
                                ref={profileModalRef} // Use ref to detect clicks inside profile modal
                                className="min-h-screen w-full rounded-lg bg-[#F5F5F5] shadow-lg md:w-5/6"
                                onClick={e => e.stopPropagation()} // Prevent click events from bubbling to overlay
                            >
                                <div className="bg-white p-4">
                                    <div className="my-4 flex items-center">
                                        <XMarkIcon
                                            className="h-6 w-6 cursor-pointer"
                                            onClick={closePopupMenu}
                                        />
                                        <h2 className="ml-3 text-base font-bold">
                                            Menu Utama
                                        </h2>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            <Image
                                                src="/profile.png"
                                                width={56}
                                                height={56}
                                                alt="Profile"
                                                className="cursor-pointer"
                                                priority={false}
                                            />
                                            <div className="ml-3">
                                                <div className="pb-1 text-base font-bold">
                                                    {user && user.data.name}
                                                </div>
                                                <div className="text-xs">
                                                    <Link href="/profile">
                                                        <div className="cursor-pointer">
                                                            {user &&
                                                                user.data.email}
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <Link
                                            href="/update-profile"
                                            className="ml-auto">
                                            <PencilIcon className="ml-auto h-6 w-6 cursor-pointer" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="mt-2 bg-white p-4">
                                    <div className="flex items-center py-3">
                                        <div className="text-base font-bold">
                                            Pengaturan Akun
                                        </div>
                                    </div>
                                    <Link href="/address">
                                        <div className="flex items-center py-3">
                                            <BuildingStorefrontIcon className="h-6 w-6 cursor-pointer" />
                                            <div className="ml-3">
                                                <div className="pb-1 text-base font-bold">
                                                    Daftar Alamat
                                                </div>
                                                <div className="text-xs">
                                                    <div className="cursor-pointer">
                                                        Atur alamat pengiriman
                                                        belanjaan
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link href="/change-password">
                                        <div className="flex items-center py-3">
                                            <LockClosedIcon className="h-6 w-6 cursor-pointer" />
                                            <div className="ml-3">
                                                <div className="pb-1 text-base font-bold">
                                                    Ubah Kata Sandi
                                                </div>
                                                <div className="text-xs">
                                                    <div className="cursor-pointer">
                                                        Atur kata sandi yang
                                                        kamu ingin gunakan
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="mt-2 bg-white p-4">
                                    <div
                                        className="flex items-center py-3"
                                        onClick={handleLogout}>
                                        <ArrowRightStartOnRectangleIcon className="h-6 w-6 cursor-pointer" />
                                        <div className="ml-3 text-sm font-bold">
                                            Keluar Akun
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default PopupMenuMobile
