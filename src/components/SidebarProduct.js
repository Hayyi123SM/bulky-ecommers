import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"
import React, { useState } from "react"

function SidebarProduct() {
    const [showFilterGroup, setShowFilterGroup] = useState(true)

    const toggleShowGroup = () => {
        setShowFilterGroup(!showFilterGroup)
    }
    return (
        <div className="hidden w-1/5 lg:block">
            <div className="mb-2 p-4 font-bold">Filter</div>
            <div className="pb-4">
                <div
                    className="mx-2 flex cursor-pointer items-center justify-between p-2 hover:rounded-lg hover:bg-gray-100"
                    onClick={toggleShowGroup}>
                    <div className="font-bold">Kategori</div>
                    {showFilterGroup ? (
                        <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                    )}
                </div>
                {/* {showFilterGroup && ( */}
                <div
                    className={`transition-all duration-500 ease-in-out ${showFilterGroup ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                    <div className="flex px-4 py-1">
                        <div className="flex items-center">
                            <input
                                id="comments"
                                aria-describedby="comments-description"
                                name="comments"
                                type="checkbox"
                                className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                            />
                        </div>
                        <div className="ml-2 text-sm leading-6">
                            <label className="font-xs">Elektronik</label>
                        </div>
                    </div>
                    <div className="flex px-4 py-1">
                        <div className="flex items-center">
                            <input
                                id="comments"
                                aria-describedby="comments-description"
                                name="comments"
                                type="checkbox"
                                className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                            />
                        </div>
                        <div className="ml-2 text-sm leading-6">
                            <label className="font-xs">Fashion</label>
                        </div>
                    </div>
                    <div className="flex px-4 py-1">
                        <div className="flex items-center">
                            <input
                                id="comments"
                                aria-describedby="comments-description"
                                name="comments"
                                type="checkbox"
                                className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                            />
                        </div>
                        <div className="ml-2 text-sm leading-6">
                            <label className="font-xs">Rumah Tangga</label>
                        </div>
                    </div>
                    <div className="flex px-4 py-1">
                        <div className="flex items-center">
                            <input
                                id="comments"
                                aria-describedby="comments-description"
                                name="comments"
                                type="checkbox"
                                className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                            />
                        </div>
                        <div className="ml-2 text-sm leading-6">
                            <label className="font-xs">Olahraga</label>
                        </div>
                    </div>
                    <div className="flex px-4 py-1">
                        <div className="flex items-center">
                            <input
                                id="comments"
                                aria-describedby="comments-description"
                                name="comments"
                                type="checkbox"
                                className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                            />
                        </div>
                        <div className="ml-2 text-sm leading-6">
                            <label className="font-xs">Kecantikan</label>
                        </div>
                    </div>
                </div>
                {/* )} */}
            </div>
            <div className="pb-4">
                <div
                    className="mx-2 flex cursor-pointer items-center justify-between p-2 hover:rounded-lg hover:bg-gray-100"
                    onClick={toggleShowGroup}>
                    <div className="font-bold">Lokasi</div>
                    {showFilterGroup ? (
                        <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                    )}
                </div>
                {/* {showFilterGroup && ( */}
                <div
                    className={`transition-all duration-500 ease-in-out ${showFilterGroup ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                    <div className="flex px-4 py-1">
                        <div className="flex items-center">
                            <input
                                id="comments"
                                aria-describedby="comments-description"
                                name="comments"
                                type="checkbox"
                                className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                            />
                        </div>
                        <div className="ml-2 text-sm leading-6">
                            <label className="font-xs">DKI Jakarta</label>
                        </div>
                    </div>
                    <div className="flex px-4 py-1">
                        <div className="flex items-center">
                            <input
                                id="comments"
                                aria-describedby="comments-description"
                                name="comments"
                                type="checkbox"
                                className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                            />
                        </div>
                        <div className="ml-2 text-sm leading-6">
                            <label className="font-xs">Jabodetabek</label>
                        </div>
                    </div>
                    <div className="flex px-4 py-1">
                        <div className="flex items-center">
                            <input
                                id="comments"
                                aria-describedby="comments-description"
                                name="comments"
                                type="checkbox"
                                className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                            />
                        </div>
                        <div className="ml-2 text-sm leading-6">
                            <label className="font-xs">Bandung</label>
                        </div>
                    </div>
                    <div className="flex px-4 py-1">
                        <div className="flex items-center">
                            <input
                                id="comments"
                                aria-describedby="comments-description"
                                name="comments"
                                type="checkbox"
                                className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                            />
                        </div>
                        <div className="ml-2 text-sm leading-6">
                            <label className="font-xs">Medan</label>
                        </div>
                    </div>
                    <div className="flex px-4 py-1">
                        <div className="flex items-center">
                            <input
                                id="comments"
                                aria-describedby="comments-description"
                                name="comments"
                                type="checkbox"
                                className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                            />
                        </div>
                        <div className="ml-2 text-sm leading-6">
                            <label className="font-xs">Surabaya</label>
                        </div>
                    </div>
                </div>
                {/* )} */}
            </div>
            <div className="pb-4">
                <div
                    className="mx-2 flex cursor-pointer items-center justify-between p-2 hover:rounded-lg hover:bg-gray-100"
                    onClick={toggleShowGroup}>
                    <div className="font-bold">Harga</div>
                    {showFilterGroup ? (
                        <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                    )}
                </div>
                {/* {showFilterGroup && ( */}
                <div
                    className={`transition-all duration-500 ease-in-out ${showFilterGroup ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                    <div className="flex px-4 py-1">
                        <input
                            type="number"
                            defaultValue="0"
                            className="ml-1 h-10 w-full rounded-lg border border-gray-300 p-2 pl-10 focus:ring-0"
                            placeholder="Harga Minimum"
                        />
                        <div className="absolute h-10 cursor-pointer place-content-center rounded-l-lg bg-[#F3F4F5] px-2 text-sm font-extrabold text-[#31353BAD] hover:bg-[#F5F5F5]">
                            Rp
                        </div>
                    </div>
                    <div className="flex px-4 py-1">
                        <input
                            type="number"
                            defaultValue="0"
                            className="ml-1 h-10 w-full rounded-lg border border-gray-300 p-2 pl-10 focus:ring-0"
                            placeholder="Harga Maksimum"
                        />
                        <div className="absolute h-10 cursor-pointer place-content-center rounded-l-lg bg-[#F3F4F5] px-2 text-sm font-extrabold text-[#31353BAD] hover:bg-[#F5F5F5]">
                            Rp
                        </div>
                    </div>
                </div>
                {/* )} */}
            </div>
            <div className="pb-4">
                <div
                    className="mx-2 flex cursor-pointer items-center justify-between p-2 hover:rounded-lg hover:bg-gray-100"
                    onClick={toggleShowGroup}>
                    <div className="font-bold">Kondisi</div>
                    {showFilterGroup ? (
                        <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                    )}
                </div>
                {/* {showFilterGroup && ( */}
                <div
                    className={`transition-all duration-500 ease-in-out ${showFilterGroup ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                    <div className="flex px-4 py-1">
                        <div className="flex items-center">
                            <input
                                id="comments"
                                aria-describedby="comments-description"
                                name="comments"
                                type="checkbox"
                                className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                            />
                        </div>
                        <div className="ml-2 text-sm leading-6">
                            <label className="font-xs">Baru</label>
                        </div>
                    </div>
                    <div className="flex px-4 py-1">
                        <div className="flex items-center">
                            <input
                                id="comments"
                                aria-describedby="comments-description"
                                name="comments"
                                type="checkbox"
                                className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                            />
                        </div>
                        <div className="ml-2 text-sm leading-6">
                            <label className="font-xs">Bekas 90-95%</label>
                        </div>
                    </div>
                    <div className="flex px-4 py-1">
                        <div className="flex items-center">
                            <input
                                id="comments"
                                aria-describedby="comments-description"
                                name="comments"
                                type="checkbox"
                                className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                            />
                        </div>
                        <div className="ml-2 text-sm leading-6">
                            <label className="font-xs">Bekas 80-90%</label>
                        </div>
                    </div>
                </div>
                {/* )} */}
            </div>
            <div className="pb-4">
                <div
                    className="mx-2 flex cursor-pointer items-center justify-between p-2 hover:rounded-lg hover:bg-gray-100"
                    onClick={toggleShowGroup}>
                    <div className="font-bold">Brand</div>
                    {showFilterGroup ? (
                        <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                    )}
                </div>
                {/* {showFilterGroup && ( */}
                <div
                    className={`transition-all duration-500 ease-in-out ${showFilterGroup ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                    <div className="flex px-4 py-1">
                        <div className="flex items-center">
                            <input
                                id="comments"
                                aria-describedby="comments-description"
                                name="comments"
                                type="checkbox"
                                className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                            />
                        </div>
                        <div className="ml-2 text-sm leading-6">
                            <label className="font-xs">Brand Name</label>
                        </div>
                    </div>
                    <div className="flex px-4 py-1">
                        <div className="flex items-center">
                            <input
                                id="comments"
                                aria-describedby="comments-description"
                                name="comments"
                                type="checkbox"
                                className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                            />
                        </div>
                        <div className="ml-2 text-sm leading-6">
                            <label className="font-xs">Brand Name</label>
                        </div>
                    </div>
                </div>
                {/* )} */}
            </div>
            {/* <div className="pb-4">
                        <div
                            className="mx-2 flex cursor-pointer items-center justify-between p-2 hover:rounded-lg hover:bg-gray-100"
                            onClick={toggleShowGroup}>
                            <div className="font-bold">Rating</div>
                            {showFilterGroup ? (
                                <ChevronUpIcon className="h-5 w-5" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5" />
                            )}
                        </div>
                        <div
                            className={`transition-all duration-500 ease-in-out ${showFilterGroup ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                            <div className="flex px-4 py-1">
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 flex items-center text-sm leading-6">
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className="flex px-4 py-1">
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 flex items-center text-sm leading-6">
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className="flex px-4 py-1">
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 flex items-center text-sm leading-6">
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className="flex px-4 py-1">
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 flex items-center text-sm leading-6">
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className="flex px-4 py-1">
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 flex items-center text-sm leading-6">
                                    <Image
                                        src="/star.svg"
                                        width={15}
                                        height={15}
                                        alt="Logo"
                                        className="cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div> */}
        </div>
    )
}

export default SidebarProduct
