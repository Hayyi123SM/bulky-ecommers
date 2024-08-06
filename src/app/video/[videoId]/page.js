// "use client"

// import { useEffect, useState, useRef, useCallback } from "react"
// import { useRouter, usePathname } from "next/navigation"
// import Navbar from "@/components/Navbar"
// import ReactPlayer from "react-player"
// import Sidebar from "../Sidebar"

// function Video() {
//     const router = useRouter()
//     const pathname = usePathname()
//     const [currentVideoId, setCurrentVideoId] = useState(null)
//     const [videos, setVideos] = useState([1, 2]) // List of video IDs
//     const observer = useRef()

//     // Get the ID from the URL pathname
//     useEffect(() => {
//         const id = parseInt(pathname.split("/").pop()) || 1
//         setCurrentVideoId(id)
//     }, [pathname])

//     const lastVideoElementRef = useCallback(
//         node => {
//             if (observer.current) observer.current.disconnect()
//             observer.current = new IntersectionObserver(entries => {
//                 if (entries[0].isIntersecting) {
//                     loadMoreVideos()
//                 }
//             })
//             if (node) observer.current.observe(node)
//         },
//         [currentVideoId],
//     )

//     const loadMoreVideos = () => {
//         const nextVideoId = currentVideoId + 1
//         if (videos.includes(nextVideoId)) {
//             // Update the URL to the next video
//             router.push(`/video/${nextVideoId}`, undefined, { shallow: true })
//         }
//     }

//     return (
//         <div className="flex min-h-screen flex-col bg-[#0F0F0F] text-white">
//             <Navbar />
//             <div className="mx-auto flex max-w-7xl flex-1">
//                 <Sidebar />
//                 <div className="ml-64 flex w-4/5 flex-col">
//                     <div className="top-30 fixed z-10 w-[1200px] bg-[#0F0F0F] pb-4 pt-6">
//                         <div className="flex w-full items-center justify-center">
//                             <div className="w-3/5">
//                                 <input
//                                     className="w-full border-b border-[#3C3C3C] bg-[#0F0F0F] py-2 pl-14 text-white bg-search focus:border-secondary focus:ring-0"
//                                     placeholder="Cari Video"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="w-[1200px] pt-20">
//                         {currentVideoId && (
//                             <div className="flex justify-center pb-6">
//                                 <div
//                                     className="flex w-full max-w-3xl justify-center"
//                                     ref={lastVideoElementRef}>
//                                     <ReactPlayer
//                                         url={`/${currentVideoId}.mp4`} // Assuming video files are stored in a /public/videos directory
//                                         playing={true}
//                                         controls
//                                         loop
//                                         muted
//                                         width="50%"
//                                         height="auto"
//                                         className="rounded-3xl"
//                                     />
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Video
"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import ReactPlayer from "react-player"

const videos = [
    { id: "video1", url: "/1.mp4" },
    { id: "video2", url: "/2.mp4" },
    { id: "video3", url: "/3.mp4" },
    { id: "video4", url: "/4.mp4" },
    { id: "video5", url: "/5.mp4" },
    { id: "video6", url: "/6.mp4" },
    { id: "video7", url: "/7.mp4" },
    { id: "video8", url: "/8.mp4" },
    { id: "video9", url: "/9.mp4" },
    { id: "video10", url: "/10.mp4" },
    // Tambahkan video lainnya di sini
]

export default function Short() {
    const router = useRouter()
    const [id, setId] = useState(null) // Inisialisasi dengan true agar URL diperbarui pada load pertama
    const currentVideoRef = useRef(null)
    const observerRef = useRef(null)

    useEffect(() => {
        const { pathname } = window.location
        const idFromUrl = pathname.split("/").pop()
        setId(idFromUrl)
    }, [])

    const currentVideoIndex = videos.findIndex(v => v.id === id)
    const currentVideo = videos[currentVideoIndex]
    const nextVideo = videos[currentVideoIndex + 1]
    const prevVideo = videos[currentVideoIndex - 1]

    const handleIntersection = useCallback(
        entries => {
            entries.forEach(entry => {
                if (
                    entry.isIntersecting &&
                    entry.boundingClientRect.y < window.innerHeight * 0.25
                ) {
                    const direction = entry.target.dataset.direction
                    if (direction === "next" && nextVideo) {
                        setId(nextVideo.id)
                    } else if (direction === "prev" && prevVideo) {
                        setId(prevVideo.id)
                    }
                }
            })
        },
        [nextVideo, prevVideo],
    )

    useEffect(() => {
        if (!id || !currentVideo) return

        if (observerRef.current) {
            observerRef.current.disconnect()
        }

        observerRef.current = new IntersectionObserver(handleIntersection, {
            threshold: 0.25,
        })

        if (currentVideoRef.current) {
            observerRef.current.observe(currentVideoRef.current)
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [id, currentVideo, handleIntersection])

    useEffect(() => {
        if (id && currentVideo) {
            router.push(`/video/${id}`, undefined, { shallow: true })
        }
    }, [id, router])

    if (!currentVideo) {
        return <div>Video not found</div>
    }

    return (
        <div className="h-screen snap-y snap-mandatory overflow-scroll">
            {prevVideo && (
                <div
                    className="flex h-screen w-full snap-start items-center justify-center"
                    data-direction="prev">
                    <ReactPlayer
                        url={prevVideo.url}
                        playing={false}
                        loop={false}
                        muted
                        controls
                        width="100%"
                        height="100%"
                    />
                </div>
            )}
            <div
                className="flex h-screen w-full snap-start items-center justify-center"
                ref={currentVideoRef}
                data-direction="current">
                <ReactPlayer
                    url={currentVideo.url}
                    playing={true}
                    loop={!nextVideo}
                    muted
                    controls
                    width="100%"
                    height="100%"
                    onEnded={() => {
                        if (nextVideo) {
                            setId(nextVideo.id)
                        }
                    }}
                />
            </div>
            {nextVideo && (
                <div
                    className="flex h-screen w-full snap-start items-center justify-center"
                    data-direction="next">
                    <ReactPlayer
                        url={nextVideo.url}
                        playing={false}
                        loop={false}
                        muted
                        controls
                        width="100%"
                        height="100%"
                    />
                </div>
            )}
        </div>
    )
}
