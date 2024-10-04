"use client"

import Navbar from "@/components/Navbar"
import { fetchVideoDetail } from "@/store/slices/videoSlice"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import ReactPlayer from "react-player"
import { useDispatch, useSelector } from "react-redux"

function VideoDetail({ params }) {
    const videoId = params.videoId
    const router = useRouter()
    const dispatch = useDispatch()
    const videos = useSelector(state => state.videos.items)
    console.log("videos from Redux state:", videos)

    useEffect(() => {
        dispatch(fetchVideoDetail(videoId))
    }, [dispatch])

    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon
                    className="h-6 w-6"
                    onClick={() => router.back()}
                />
                <div className="ml-2 font-semibold">Akademi Video</div>
            </div>
            <div className="flex min-h-screen flex-col bg-[#0F0F0F] text-white">
                <div className="mx-auto flex max-w-7xl">
                    {/* <Sidebar /> */}
                    <div className="flex w-full items-center justify-center pt-5">
                        <ReactPlayer
                            url={videos.path}
                            playing={false}
                            fullscreen
                            controls
                            loop
                            width="100%" // Set width to 100% of the container
                            height="80vh" // Set height to fill the viewport height
                            style={{ maxWidth: "100%", maxHeight: "80vh" }} // Ensure video scales properly
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoDetail
