"use client"

import { useState, useEffect } from "react"
import Cookies from "js-cookie"

export default function LanguageSelectorMobile() {
    const [isOpen, setIsOpen] = useState(false)
    const [currentLocale, setCurrentLocale] = useState("id")

    const languages = [
        { code: "id", label: "ID", icon: "🇮🇩" },
        { code: "en", label: "EN", icon: "🇺🇸" },
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
        <div className="relative w-full">
            {/* Trigger Dropdown */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex cursor-pointer items-center">
                <div className="flex h-6 w-6 items-center justify-center text-lg">
                    {languages.find(lang => lang.code === currentLocale)
                        ?.icon || "🌍"}
                </div>
                <div className="ml-3 text-sm">
                    {currentLocale.toUpperCase()}
                </div>
            </div>

            {/* Popup List */}
            {isOpen && (
                <div className="absolute left-0 z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                    {languages.map(lang => (
                        <div
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100">
                            <span className="mr-2">{lang.icon}</span>
                            <span>{lang.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
