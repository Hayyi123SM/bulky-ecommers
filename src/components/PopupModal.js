import { XMarkIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useEffect, useState } from "react"

const PopupModal = ({
    isOpen,
    closeModal,
    type = "notification", // 'confirmation' / 'notification' / 'updateProfile
    title = "",
    message = "",
    onConfirm = null,
    confirmText = "Confirm",
    cancelText = "Cancel",
}) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true) // Mulai menampilkan modal dengan transisi
        } else {
            const timeout = setTimeout(() => setIsVisible(false), 300) // Tunggu sebelum modal menghilang sepenuhnya
            return () => clearTimeout(timeout)
        }
    }, [isOpen])

    if (!isOpen && !isVisible) return null

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 ${
                isOpen ? "opacity-100" : "opacity-0"
            }`}>
            <div
                className={`relative w-full max-w-md transform rounded-lg bg-white p-6 transition-all duration-300 ease-out ${
                    isOpen
                        ? "translate-y-0 scale-100 opacity-100"
                        : "translate-y-4 scale-95 opacity-0"
                }`}>
                <div className="my-4 flex items-center justify-between">
                    <h2 className="text-base font-semibold">{title}</h2>
                    {type === "confirmation" ||
                        (type === "updateProfile" && (
                            <XMarkIcon
                                className="h-6 w-6 cursor-pointer"
                                onClick={closeModal}
                            />
                        ))}
                </div>

                <p className="mb-6 text-gray-700">{message}</p>

                <div className="flex justify-end space-x-3">
                    {type === "confirmation" && (
                        <>
                            <button
                                className="w-1/2 rounded-lg border px-4 py-2 font-semibold hover:bg-[#f5f5f5]"
                                onClick={closeModal}>
                                {cancelText}
                            </button>
                            <button
                                className="w-1/2 rounded-lg bg-secondary px-4 py-2 font-semibold hover:bg-[#e8bc00]"
                                onClick={onConfirm}>
                                {confirmText}
                            </button>
                        </>
                    )}
                    {type === "notification" && (
                        <button
                            className="w-full rounded-lg bg-secondary px-4 py-2 font-semibold hover:bg-[#e8bc00]"
                            onClick={closeModal}>
                            OK
                        </button>
                    )}
                    {type === "updateProfile" && (
                        <>
                            <button
                                className="w-1/2 rounded-lg border px-4 py-2 font-semibold hover:bg-[#f5f5f5]"
                                onClick={closeModal}>
                                {cancelText}
                            </button>
                            <Link
                                href="/profile"
                                className="w-1/2 rounded-lg bg-secondary px-4 py-2 text-center font-semibold hover:bg-[#e8bc00]"
                                onClick={onConfirm}>
                                {confirmText}
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PopupModal
