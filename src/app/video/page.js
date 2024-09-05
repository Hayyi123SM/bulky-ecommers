"use client"

// import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import VideoThumbnail from "@/components/VideoThumbnail"
import SearchParamsHandler from "@/lib/searchParams"
import { fetchVideos } from "@/store/slices/videoSlice"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { Suspense, useMemo } from "react"
import { useSelector } from "react-redux"

function Video() {
    const videos = useSelector(state => state.videos.items)
    console.log("videos from Redux state:", videos)

    const memoizedActions = useMemo(
        () => [() => fetchVideos({ paginate: 1 })],
        [],
    )

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <SearchParamsHandler actions={memoizedActions} />
            </Suspense>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon className="h-6 w-6" />
                <div className="ml-2 font-semibold">Akademi Video</div>
            </div>
            <div className="flex min-h-screen flex-col bg-[#0F0F0F] text-white">
                <div className="mx-auto flex max-w-7xl flex-1">
                    <div className="flex w-full flex-col">
                        {/* Search bar */}
                        <div className="w-full bg-[#0F0F0F] pb-4 pt-6">
                            <div className="flex w-full items-center justify-center">
                                <div className="w-full px-4 lg:w-3/5 lg:px-0">
                                    <input
                                        className="w-full border-b border-[#3C3C3C] bg-[#0F0F0F] py-2 pl-14 text-white bg-search focus:border-secondary focus:ring-0"
                                        placeholder="Cari Video"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="px-4 pt-5 lg:pt-10">
                            {/* video list */}
                            <div className="flex-1 overflow-y-auto">
                                <div className="pb-4">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {videos.map((video, index) => (
                                            <Link
                                                href={`/video/${video.id}`}
                                                key={index}>
                                                <VideoThumbnail
                                                    thumbnail={video.thumbnail}
                                                    title={video.title}
                                                    bgColor="bg-[#0F0F0F]"
                                                    bgHover="bg-[#5a5a5a]"
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        </div>
    )
}

export default Video
