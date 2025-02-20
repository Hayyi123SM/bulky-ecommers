"use client"

import { useEffect, useState } from "react"
import { MoonLoader } from "react-spinners"
import { useSearchParams } from "next/navigation"

function Redirect() {
    const orderId = useSearchParams().get("order_id")
    const type = useSearchParams().get("type")
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth <= 768) // Anggap <=768px adalah mobile
        }

        checkDevice() // Cek saat pertama kali render
        window.addEventListener("resize", checkDevice) // Update saat resize

        return () => window.removeEventListener("resize", checkDevice)
    }, [])

    useEffect(() => {
        if (isMobile) {
            setTimeout(() => {
                window.location.href = "/"
            }, 3000)
        } else {
            if (type === "order") {
                setTimeout(() => {
                    window.location.href = "/order/" + orderId
                }, 3000)
            }
            if (type === "order-split") {
                setTimeout(() => {
                    window.location.href = "/order-split/" + orderId
                }, 3000)
            }
        }
    }, [isMobile])

    return (
        <div className="flex min-h-screen items-center justify-center bg-white">
            <div className="mr-2 text-lg text-black">{isMobile ? "Please wait.." : "Please wait..."}</div>
            <MoonLoader color="#FFCF02" size={30} aria-label="Loading Spinner" />
        </div>
    )
}

export default Redirect
