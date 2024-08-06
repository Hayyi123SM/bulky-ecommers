// components/ScrollHandler.js
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const dataArray = [
    "/text/1",
    "/text/2",
    "/text/3",
    "/text/4",
    "/text/5",
    "/text/6",
    "/text/7",
] // Tambahkan URL sesuai kebutuhan

const ScrollHandler = () => {
    const [lastScrollTop, setLastScrollTop] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [scrolling, setScrolling] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const handleScroll = () => {
            if (scrolling) return

            setScrolling(true)

            const scrollTop = document.documentElement.scrollTop
            if (scrollTop > lastScrollTop) {
                // Scroll down
                if (currentIndex < dataArray.length - 1) {
                    setCurrentIndex(prevIndex => prevIndex + 1)
                    router.push(dataArray[currentIndex + 1], undefined, {
                        shallow: true,
                    })
                    console.log("Scrolling down")
                }
            } else if (scrollTop < lastScrollTop) {
                // Scroll up
                if (currentIndex > 0) {
                    setCurrentIndex(prevIndex => prevIndex - 1)
                    router.push(dataArray[currentIndex - 1], undefined, {
                        shallow: true,
                    })
                    console.log("Scrolling up")
                }
            }
            setLastScrollTop(scrollTop)

            // Reset scrolling flag after a short delay
            setTimeout(() => {
                setScrolling(false)
            }, 100) // Adjust timeout duration if needed
        }

        window.addEventListener("scroll", handleScroll)

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [lastScrollTop, currentIndex, router, scrolling])

    return (
        <div className="min-h-screen">
            {/* Konten lainnya */}
            <div style={{ height: "101vh", backgroundColor: "#f0f0f0" }}>
                Scroll to see the log in console
            </div>
        </div>
    )
}

export default ScrollHandler
