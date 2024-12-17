"use client"

import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { ChevronDownIcon } from "@heroicons/react/24/solid"
import Image from "next/image"

export default function LanguageSelector() {
    const [isOpen, setIsOpen] = useState(false)
    const [currentLocale, setCurrentLocale] = useState("id")

    const languages = [
        { code: "id", label: "ID", icon: "/ID.png" },
        { code: "en", label: "EN", icon: "/EN.png" },
    ]

    useEffect(() => {
        const languageCookie = Cookies.get("locale")
        setCurrentLocale(languageCookie || "id") // Default ke "id" jika tidak ada cookie
    }, [])

    const handleLanguageChange = locale => {
        Cookies.set("locale", locale, { path: "/", expires: 365 })
        window.location.reload()
    }

    return (
        <div className="relative inline-block lg:ml-2">
            {/* Trigger Dropdown */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center rounded-md text-lg text-black hover:shadow-md focus:outline-none lg:text-white">
                {/* Icon Bahasa */}
                <span className="mr-2">
                    <Image
                        src={
                            languages.find(lang => lang.code === currentLocale)
                                ?.icon
                        }
                        width={40}
                        height={40}
                        className={"w-10"}
                    />
                </span>
                {/* Label Bahasa */}
                <span className="mr-2">
                    {languages.find(lang => lang.code === currentLocale)
                        ?.label || "ID"}
                </span>
                {/* Chevron Icon */}
                <ChevronDownIcon className="h-4 w-4" />
            </button>

            {/* Popup List */}
            {isOpen && (
                <div className="absolute left-0 z-50 mt-2 w-20 rounded-md border border-gray-200 bg-white shadow-lg">
                    {languages.map(lang => (
                        <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className="flex w-full items-center px-3 py-2 text-left hover:bg-gray-100 focus:outline-none">
                            <span className="mr-2">
                                <Image
                                    src={lang.icon}
                                    width={40}
                                    height={40}
                                    className={"w-10"}
                                />
                            </span>
                            <span>{lang.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
