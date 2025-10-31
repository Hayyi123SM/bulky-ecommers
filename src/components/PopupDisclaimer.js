"use client"

import { XMarkIcon } from "@heroicons/react/24/solid"
import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { ArrowDownCircleIcon, ArrowPathIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline"
import axios from "@/lib/axios"

const PopupDisclaimer = ({ isOpen, closeModal, handlePay }) => {
    const t = useTranslations()
    const [isVisible, setIsVisible] = useState(false)
    const modalRef = useRef(null)
    const contentRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isApprove, setIsApprove] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [content, setContent] = useState("")

    const handleGetDisclaimer = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get("/api/orders/disclaimers/active")

            setContent(res.data.data.content)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (isOpen) {
            handleGetDisclaimer()
        } else {
            setContent("")
        }
    }, [isOpen])

    useEffect(() => {
        if (content) {
            if (isOpen) {
                setIsVisible(true) // Mulai menampilkan modal dengan transisi
            } else {
                const timeout = setTimeout(() => setIsVisible(false), 300) // Tunggu sebelum modal menghilang sepenuhnya
                return () => clearTimeout(timeout)
            }
        }
    }, [isOpen, content])

    const handleOverlayClick = e => {
        // Check if the click is outside the modal
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal()
        }
    }

    useEffect(() => {
        if (content) {
            if (isOpen) {
                // Add event listener for clicks
                document.addEventListener("mousedown", handleOverlayClick)
            } else {
                // Remove event listener when the modal is closed
                document.removeEventListener("mousedown", handleOverlayClick)
            }

            return () => {
                document.removeEventListener("mousedown", handleOverlayClick) // Clean up event listener
            }
        }
    }, [isOpen, content])

    useEffect(() => {
        if (!isOpen || !content) return

        // tunggu 1 frame supaya React sempat render ulang
        const timer = requestAnimationFrame(() => {
            const box = contentRef.current
            console.log(box, isOpen, content)
            if (!box) return

            function handleScroll() {
                if (box.scrollTop + box.clientHeight >= box.scrollHeight - 2) {
                    setIsScrolled(true)
                    setIsApprove(true)
                }
            }

            box.addEventListener("scroll", handleScroll)
            return () => box.removeEventListener("scroll", handleScroll)
        })

        return () => cancelAnimationFrame(timer)
    }, [isOpen, content])

    if (!isOpen || !isVisible) return null

    return (
        <div>
            <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 p-2 md:p-4 lg:p-0 ${isOpen ? "opacity-100" : "opacity-0"}`}>
                <div ref={modalRef} className={`relative w-full max-w-3xl transform rounded-lg bg-white p-4 transition-all duration-300 ease-out md:p-6 ${isOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0"}`}>
                    <div className="my-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Disclaimer Policy</h2>

                        <XMarkIcon className="h-6 w-6 cursor-pointer" onClick={closeModal} />
                    </div>
                    <div ref={contentRef} className="mx-auto max-h-[60svh] min-h-[50svh] w-full overflow-auto">
                        {isLoading ? (
                            <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4 text-sm">
                                <ArrowPathIcon className="size-4 animate-spin" />
                                <p>Loading...</p>
                            </div>
                        ) : (
                            <div
                                className="staticStyle aspect-[1/1.4] w-full !py-0 [&_h1]:!text-base md:[&_h1]:!text-lg [&_h2]:!text-sm md:[&_h2]:!text-base [&_h3]:!text-sm md:[&_h3]:!text-base [&_h4]:!text-sm md:[&_h4]:!text-base [&_h5]:!text-sm md:[&_h5]:!text-base [&_li]:!my-2 [&_li]:!text-xs [&_li]:!leading-relaxed md:[&_li]:!text-sm [&_ol]:!mb-4 [&_ol]:!pl-3 md:[&_ol]:!mb-5 md:[&_ol]:!pl-4 [&_p]:!my-2 [&_p]:!text-xs [&_p]:!leading-relaxed md:[&_p]:!my-3 md:[&_p]:!text-sm"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        )}
                    </div>
                    {!isLoading && !isScrolled && (
                        <div className="absolute bottom-[65px] left-0 flex h-20 w-full items-center justify-center gap-2 bg-gradient-to-b from-white/0 via-white/80 to-white md:bottom-[75px]">
                            <div className="mt-7 flex items-center gap-2 rounded-full bg-white px-5 py-1 text-xs font-semibold">
                                <ArrowDownCircleIcon className="mt-1.5 size-5 animate-bounce" />
                                <p>{t("payment.scroll")}</p>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center gap-4 pt-4">
                        <button className="flex h-9 w-full items-center justify-center gap-2 rounded-md border border-gray-400 bg-white px-5 py-2 text-center text-xs font-medium hover:border-gray-500 hover:bg-gray-50 md:text-sm" onClick={closeModal}>
                            <XCircleIcon className="size-4" />
                            {t("payment.reject")}
                        </button>
                        <button className="flex h-9 w-full items-center justify-center gap-2 rounded-md bg-secondary px-5 py-2 text-center text-xs font-medium disabled:pointer-events-none disabled:opacity-50 md:text-sm" disabled={!isApprove || isLoading} onClick={handlePay}>
                            <CheckCircleIcon className="size-4" />
                            {t("payment.accept")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupDisclaimer
