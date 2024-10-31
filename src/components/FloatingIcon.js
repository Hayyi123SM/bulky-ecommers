"use client"

import { fetchFloatingWhatsapp } from "@/store/slices/pageSlice"
import Image from "next/image"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function FloatingIcon() {
    const data = useSelector(state => state.pages.floatingButton)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchFloatingWhatsapp())
    }, [dispatch])

    const handleClikButton = () => {
        window.open(
            "https://api.whatsapp.com/send?phone=" +
                data.phone_number +
                "&text=" +
                data.message,
            "_blank",
        )
    }

    return (
        <div className="fixed bottom-4 right-4">
            <button
                className="group relative flex items-center overflow-hidden rounded-full p-0 text-white transition-all duration-700 ease-in-out"
                onClick={handleClikButton}>
                <span className="hidden px-2 text-sm font-semibold opacity-0 transition-opacity duration-700 ease-in-out group-hover:block group-hover:opacity-100">
                    Chat with us
                </span>
                <Image
                    src="/new/Frame 13.png"
                    alt="wa"
                    width={48}
                    height={48}
                    className="transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
                <span className="absolute inset-0 -z-10 origin-right scale-x-0 bg-gradient-whatsapp transition-transform duration-700 ease-in-out group-hover:scale-x-100" />
            </button>
        </div>
    )
}
