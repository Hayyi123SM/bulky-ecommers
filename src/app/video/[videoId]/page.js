"use client"

import Navbar from "@/components/Navbar"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import ReactPlayer from "react-player"

function Video() {
    return (
        <div>
            <div className="hidden lg:block">
                <Navbar />
            </div>
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon className="h-6 w-6" />
                <div className="ml-2 font-semibold">Akademi Video</div>
            </div>
            <div className="flex min-h-screen flex-col bg-[#0F0F0F] text-white">
                <div className="mx-auto flex max-w-7xl">
                    {/* <Sidebar /> */}
                    <div className="flex w-full items-center justify-center pt-10">
                        <ReactPlayer
                            url={`/1.mp4`} // Assuming video files are stored in a /public/videos directory
                            playing={false}
                            controls
                            loop
                            muted
                            width="80%"
                            height="auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Video
