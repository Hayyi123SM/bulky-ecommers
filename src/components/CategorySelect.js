import React, { useEffect, useRef, useState } from "react"
import { Bars3Icon } from "@heroicons/react/24/solid"

const CategorySelect = ({ options, onSelect, selectedId }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(
        options.find(option => option.id === selectedId) || null,
    )
    const dropdownRef = useRef(null)

    // Handle outside click
    useEffect(() => {
        const handleOutsideClick = event => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleOutsideClick)
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
        }
    }, [])

    const handleSelect = option => {
        setSelectedOption(option)
        setIsOpen(false)
        if (onSelect) {
            onSelect(option)
        }
    }

    useEffect(() => {
        if (selectedId) {
            const preselectedOption = options.find(
                option => option.id === selectedId,
            )
            setSelectedOption(preselectedOption || null)
        }
    }, [selectedId, options])

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="flex cursor-pointer items-center justify-between bg-[#4E471E] px-4 py-2 text-sm text-white hover:opacity-90"
                onClick={() => setIsOpen(!isOpen)}>
                <div className="flex items-center">
                    <Bars3Icon className="mr-2 h-6 w-6" />
                    <span>
                        {selectedOption
                            ? selectedOption.postal_code
                                ? selectedOption.name +
                                  " - " +
                                  selectedOption.postal_code
                                : selectedOption.name
                            : "All Categories"}
                    </span>
                </div>
                <svg
                    className={`h-4 w-4 transform transition-transform ${
                        isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
            {isOpen && (
                <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white text-sm shadow-lg">
                    {options.map(option => (
                        <div
                            key={option.id}
                            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                            onClick={() => handleSelect(option)}>
                            {option.postal_code
                                ? option.name + " - " + option.postal_code
                                : option.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CategorySelect
