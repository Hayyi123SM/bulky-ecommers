import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const maxVisiblePages = 7

    const generatePageNumbers = () => {
        let startPage, endPage

        if (totalPages <= maxVisiblePages) {
            startPage = 1
            endPage = totalPages
        } else {
            if (currentPage <= 4) {
                startPage = 1
                endPage = 7
            } else if (currentPage >= totalPages - 3) {
                startPage = totalPages - 6
                endPage = totalPages
            } else {
                startPage = currentPage - 3
                endPage = currentPage + 3
            }
        }

        const pageNumbers = []
        if (startPage > 1) {
            pageNumbers.push(1)
            pageNumbers.push("...")
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i)
        }

        if (endPage < totalPages) {
            pageNumbers.push("...")
            pageNumbers.push(totalPages)
        }

        return pageNumbers
    }

    const pages = generatePageNumbers()

    return (
        <div className="my-6 flex justify-center space-x-2">
            {currentPage > 1 && (
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    className="rounded-lg px-3 py-1 text-[#6B7280] hover:bg-[#F5F5F5]">
                    <ChevronLeftIcon className="h-4 w-4" />
                </button>
            )}

            {pages.map((page, index) => (
                <button
                    key={index}
                    onClick={() => page !== "..." && onPageChange(page)}
                    className={`rounded-lg px-3 py-1 text-xs ${
                        page === currentPage
                            ? "bg-[#FFCF02] text-[#212121]"
                            : page === "..."
                              ? "text-[#6B7280]"
                              : "text-[#6B7280] hover:bg-[#F5F5F5]"
                    }`}
                    disabled={page === "..."}>
                    {page}
                </button>
            ))}

            {currentPage < totalPages && (
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    className="rounded-lg px-3 py-1 text-[#6B7280] hover:bg-[#F5F5F5]">
                    <ChevronRightIcon className="h-4 w-4" />
                </button>
            )}
        </div>
    )
}

export default Pagination
