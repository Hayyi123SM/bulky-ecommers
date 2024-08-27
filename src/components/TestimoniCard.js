import Image from "next/image"
import React from "react"

function TestimoniCard({ review, name, image, title }) {
    return (
        <div className="rounded-xl bg-white shadow">
            <div className="">
                <div className="px-10 py-5 text-lg font-semibold leading-6">
                    “{review}"
                </div>
                <div className="mb-[-25px] flex justify-center pt-5">
                    <Image
                        src={image}
                        alt="Product"
                        width={70}
                        height={70}
                        className="rounded-full"
                        priority={false}
                    />
                </div>
                <div className="bg-[#F5F5F5] py-5 text-center">
                    <div className="pt-5 text-base font-bold">{name}</div>
                    <div className="text-sm font-normal">{title}</div>
                </div>
            </div>
        </div>
    )
}

export default TestimoniCard
