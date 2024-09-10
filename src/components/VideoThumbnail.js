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
            <div
                className="h-48 w-full rounded-t-xl bg-cover bg-center"
                style={{ backgroundImage: `url(${thumbnail})` }}>
                {/* The aspect-square ensures the div stays square */}
            </div>
            <div className="flex h-20 p-4">
                <div className="line-clamp-2 text-base font-bold">{title}</div>
            </div>
        </div>
    )
}

export default VideoThumbnail
