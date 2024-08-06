"use client"
import { useEffect, useRef, useState } from "react"
import ReactPlayer from "react-player"
import { useRouter } from "next/navigation"

const VideoCard = ({ url, videoId }) => {
    const containerRef = useRef(null)
    const [playing, setPlaying] = useState(false)
    const [hasMounted, setHasMounted] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setHasMounted(true)
    }, [])

    useEffect(() => {
        if (!hasMounted) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setPlaying(true)
                    router.push(`/video/${videoId}`, undefined, {
                        shallow: true,
                    })
                } else {
                    setPlaying(false)
                }
            },
            { threshold: 0.5 },
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current)
            }
        }
    }, [hasMounted, router, videoId])

    if (!hasMounted) {
        return <div className="h-screen w-full bg-black"> </div> // Tempatkan skeleton loading atau placeholder di sini
    }

    return (
        <div
            ref={containerRef}
            className="flex h-screen w-full items-center justify-center">
            <ReactPlayer
                url={url}
                playing={playing}
                loop
                muted
                width="100%"
                height="100%"
            />
        </div>
    )
}

export default VideoCard
