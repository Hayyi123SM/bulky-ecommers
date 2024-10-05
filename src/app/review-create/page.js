"use client"

import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import { createReview } from "@/store/slices/orderSlice"
import { ArrowLeftIcon, PlusIcon, StarIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Suspense, useState } from "react"
import { useDispatch } from "react-redux"

function ReviewCreate() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [rating, setRating] = useState(0)
    const [selectedFiles, setSelectedFiles] = useState([])
    const [comment, setComment] = useState("")
    const orderId = "9d19c232-1d5d-4ffa-bba3-30c72f24c7e2"
    const productId = "9d13b573-fb99-4765-9ce5-a37a429bac8a"

    const handleClick = index => {
        setRating(index + 1)
    }

    const handleFileChange = e => {
        const files = Array.from(e.target.files) // Convert FileList to an array
        const previews = files.map(file => ({
            file,
            preview: URL.createObjectURL(file), // Create a preview URL
        }))
        setSelectedFiles(prevFiles => [...prevFiles, ...previews]) // Add to existing files
    }

    const handleSubmit = async () => {
        const formData = new FormData()

        // Append form data fields
        formData.append("comment", comment)
        formData.append("orderId", orderId)
        formData.append("product_id", productId)
        formData.append("rating", rating)

        // Check if selectedFiles is an array and append files to formData
        if (selectedFiles && selectedFiles.length > 0) {
            selectedFiles.forEach((fileObj, index) => {
                formData.append(`images[${index}]`, fileObj.file) // Append the actual file, not the object containing the file
            })
        }

        // Log FormData contents
        console.log("FormData content:")
        formData.forEach((value, key) => {
            if (value instanceof File) {
                // Log file details
                console.log(`${key}:`, {
                    name: value.name,
                    size: value.size,
                    type: value.type,
                })
            } else {
                // Log non-file fields
                console.log(`${key}:`, value)
            }
        })

        // Handle the async dispatch and error catching
        try {
            await dispatch(createReview({ formData, orderId })).unwrap()
            console.log("Review created successfully!")
        } catch (error) {
            console.error("Error creating review:", error)
        }
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <Navbar visibleOn="desktop" />
                <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                    <ArrowLeftIcon
                        className="h-6 w-6"
                        onClick={() => router.back()}
                    />
                    <div className="ml-2 font-semibold">Ulasan</div>
                </div>
                <div className="mx-auto min-h-screen max-w-7xl lg:flex">
                    <div className="hidden w-1/5 p-7 lg:block">
                        <SidebarProfile />
                    </div>
                    <div className="w-5/5 px-4 py-4 lg:w-4/5 lg:p-7">
                        <div className="hidden pb-1 text-2xl font-bold lg:block">
                            Ulasan
                        </div>
                        <div className="mt-5">
                            <div className="item-center w-full text-sm font-semibold text-[#6D7588]">
                                Rating Penjual
                            </div>
                            <div className="item-center flex pt-4">
                                {[...Array(5)].map((_, index) => (
                                    <StarIcon
                                        key={index}
                                        onClick={() => handleClick(index)}
                                        className={`mr-1 h-8 w-8 cursor-pointer ${
                                            index < rating
                                                ? "text-secondary"
                                                : "text-[#BFC9D9]"
                                        }`}
                                    />
                                ))}
                            </div>
                            <div className="item-center w-full pt-8 text-sm font-semibold text-[#6D7588]">
                                Upload Gambar / Video
                            </div>
                            <div className="item-center mt-4 grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8">
                                {/* Plus icon to trigger file input */}
                                <label
                                    htmlFor="file-upload"
                                    className="w-fit cursor-pointer rounded-lg border border-[#BFC9D9] p-7 hover:bg-[#F5F5F5]">
                                    <PlusIcon className="h-4 w-4" />
                                </label>

                                {/* File input (hidden) */}
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={handleFileChange}
                                />

                                {/* Preview uploaded files */}
                                {selectedFiles.map((fileObj, index) => (
                                    <div key={index} className="w-fit">
                                        {fileObj.file.type.startsWith(
                                            "image",
                                        ) && (
                                            // Image preview
                                            <div
                                                className="h-20 w-20 rounded-lg"
                                                style={{
                                                    backgroundImage: `url(${fileObj.preview})`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition:
                                                        "center",
                                                }}>
                                                {" "}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="item-center mt-5 w-full text-sm font-semibold text-[#6D7588]">
                                Berikan Ulasan
                            </div>
                            <textarea
                                className="mt-2 w-full rounded-lg border border-[#BFC9D9] p-4 text-sm focus:border-[#007185] focus:ring-0"
                                rows="5"
                                placeholder="Ulasan..."
                                defaultValue=""
                                onChange={e => setComment(e.target.value)}
                            />
                            <div className="mt-1 w-full text-xs text-[#6D7588]">
                                Dengan memberikan ulasan Anda berkontribusi
                                terhadap reputasi penjual terima kasih
                            </div>
                            <div
                                onClick={() => handleSubmit()}
                                className="mt-8 cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                Berikan Ulasan
                            </div>
                            <Link href="/review">
                                <div className="mt-3 cursor-pointer items-center justify-center rounded-lg border bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#F5F5F5]">
                                    Batalkan
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        </Suspense>
    )
}

export default ReviewCreate
