import Image from "next/image"

function VideoThumbnail({
    thumbnail,
    title,
    // user,
    bgColor = "bg-white",
    bgHover = "bg-[#F5F5F5]",
}) {
    return (
        <div
            className={`rounded-xl shadow ${bgColor} cursor-pointer hover:rounded-xl hover:${bgHover}`}>
            <Image
                src={thumbnail}
                alt="Product"
                width={500}
                height={500}
                className="rounded-t-xl"
                priority={false}
            />
            <div className="flex p-4">
                {/* <div className="w-3/12">
                    <Image
                        src={user}
                        alt="Product"
                        width={38}
                        height={38}
                        className="rounded-full"
                    />
                </div> */}
                <div className="text-sm font-bold">{title}</div>
            </div>
        </div>
    )
}

export default VideoThumbnail
