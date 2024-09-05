import {
    fetchCategories,
    fetchConditions,
    fetchStatuses,
    fetchWarehouses,
    setFilters,
} from "@/store/slices/filterSlice"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import { useDispatch, useSelector } from "react-redux"

function PopupFilter({ closePopup }) {
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedWarehouses, setSelectedWarehouses] = useState([])
    const [selectedConditions, setSelectedConditions] = useState([])
    const [selectedStatuses, setSelectedStatuses] = useState([])
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)

    // State untuk toggle "Lihat Semua"
    const [showAllCategories, setShowAllCategories] = useState(false)
    const [showAllWarehouses, setShowAllWarehouses] = useState(false)
    const [showAllConditions, setShowAllConditions] = useState(false)
    const [showAllStatuses, setShowAllStatuses] = useState(false)

    const dispatch = useDispatch()
    const categories = useSelector(state => state.filters.categories)
    const warehouses = useSelector(state => state.filters.warehouses)
    const conditions = useSelector(state => state.filters.conditions)
    const statuses = useSelector(state => state.filters.statuses)
    const loadingFilters = useSelector(state => state.filters.isLoading)

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchWarehouses())
        dispatch(fetchConditions())
        dispatch(fetchStatuses())
    }, [dispatch])

    const handleCategoryChange = (e, category) => {
        const updatedCategories = e.target.checked
            ? [...selectedCategories, category.slug]
            : selectedCategories.filter(slug => slug !== category.slug)
        setSelectedCategories(updatedCategories)
        dispatch(setFilters({ categories: updatedCategories }))
    }

    const handleWarehouseChange = (e, warehouse) => {
        const updatedWarehouses = e.target.checked
            ? [...selectedWarehouses, warehouse.id]
            : selectedWarehouses.filter(id => id !== warehouse.id)
        setSelectedWarehouses(updatedWarehouses)
        dispatch(setFilters({ warehouses: updatedWarehouses }))
    }

    const handleConditionChange = (e, condition) => {
        const updatedConditions = e.target.checked
            ? [...selectedConditions, condition.slug]
            : selectedConditions.filter(slug => slug !== condition.slug)
        setSelectedConditions(updatedConditions)
        dispatch(setFilters({ conditions: updatedConditions }))
    }

    const handleStatusChange = (e, status) => {
        const updatedStatuses = e.target.checked
            ? [...selectedStatuses, status.id]
            : selectedStatuses.filter(id => id !== status.id)
        setSelectedStatuses(updatedStatuses)
        dispatch(setFilters({ statuses: updatedStatuses }))
    }

    const handleMinPriceChange = e => {
        setMinPrice(e.target.value)
    }

    const handleMaxPriceChange = e => {
        setMaxPrice(e.target.value)
    }

    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 pt-20">
                <div className="w-full max-w-md rounded-lg bg-white p-6 pt-5 shadow-lg">
                    <div className="my-4 flex items-center justify-between">
                        <h2 className="text-base font-semibold">Filter</h2>
                        <XMarkIcon
                            className="h-6 w-6 cursor-pointer"
                            onClick={closePopup}
                        />
                    </div>

                    {/* Kategori */}
                    <div className="mb-4">
                        <div className="mt-2 flex justify-between py-5">
                            <div className="text-sm font-bold">Kategori</div>
                            <div
                                onClick={() =>
                                    setShowAllCategories(!showAllCategories)
                                }
                                className="cursor-pointer text-sm font-semibold text-[#007185]">
                                {showAllCategories
                                    ? "Lihat Lebih Sedikit"
                                    : "Lihat Semua"}
                            </div>
                        </div>
                        <div
                            className={`flex flex-wrap items-center overflow-hidden transition-all duration-300 ${
                                showAllCategories
                                    ? "max-h-full"
                                    : "max-h-32 overflow-y-auto"
                            }`}>
                            {loadingFilters ? (
                                <Skeleton count={3} />
                            ) : (
                                categories.map(category => (
                                    <div
                                        key={category.id}
                                        onClick={e =>
                                            handleCategoryChange(e, category)
                                        }
                                        className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                        {category.name}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Lokasi */}
                    <div className="mb-4">
                        <div className="mt-2 flex justify-between py-5">
                            <div className="text-sm font-bold">Lokasi</div>
                            <div
                                onClick={() =>
                                    setShowAllWarehouses(!showAllWarehouses)
                                }
                                className="cursor-pointer text-sm font-semibold text-[#007185]">
                                {showAllWarehouses
                                    ? "Lihat Lebih Sedikit"
                                    : "Lihat Semua"}
                            </div>
                        </div>
                        <div
                            className={`flex flex-wrap items-center overflow-hidden transition-all duration-300 ${
                                showAllWarehouses
                                    ? "max-h-full"
                                    : "max-h-32 overflow-y-auto"
                            }`}>
                            {loadingFilters ? (
                                <Skeleton count={3} />
                            ) : (
                                warehouses.map(warehouse => (
                                    <div
                                        key={warehouse.id}
                                        onClick={e =>
                                            handleWarehouseChange(e, warehouse)
                                        }
                                        className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                        {warehouse.name}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Harga */}
                    <div className="mb-4">
                        <div className="mt-2 flex justify-between py-5">
                            <div className="text-sm font-bold">Harga</div>
                        </div>
                        <div className="flex items-center">
                            {loadingFilters ? (
                                <Skeleton />
                            ) : (
                                <div className="flex">
                                    <input
                                        type="number"
                                        value={minPrice}
                                        onChange={handleMinPriceChange}
                                        className="ml-1 h-10 w-full rounded-xl border border-gray-300 p-2 pl-10 focus:ring-0"
                                        placeholder="Terendah"
                                    />
                                    <div className="absolute ml-2 h-10 cursor-pointer place-content-center rounded-l-lg px-2 text-sm font-extrabold text-[#31353BAD] hover:bg-[#F5F5F5]">
                                        Rp
                                    </div>
                                </div>
                            )}
                            {loadingFilters ? (
                                <Skeleton />
                            ) : (
                                <div className="flex">
                                    <input
                                        type="number"
                                        value={maxPrice}
                                        onChange={handleMaxPriceChange}
                                        className="ml-1 h-10 w-full rounded-xl border border-gray-300 p-2 pl-10 focus:ring-0"
                                        placeholder="Tertinggi"
                                    />
                                    <div className="absolute ml-2 h-10 cursor-pointer place-content-center rounded-l-lg px-2 text-sm font-extrabold text-[#31353BAD] hover:bg-[#F5F5F5]">
                                        Rp
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Kondisi */}
                    <div className="mb-4">
                        <div className="mt-2 flex justify-between py-5">
                            <div className="text-sm font-bold">Kondisi</div>
                            <div
                                onClick={() =>
                                    setShowAllConditions(!showAllConditions)
                                }
                                className="cursor-pointer text-sm font-semibold text-[#007185]">
                                {showAllConditions
                                    ? "Lihat Lebih Sedikit"
                                    : "Lihat Semua"}
                            </div>
                        </div>
                        <div
                            className={`flex flex-wrap items-center overflow-hidden transition-all duration-300 ${
                                showAllConditions
                                    ? "max-h-full"
                                    : "max-h-32 overflow-y-auto"
                            }`}>
                            {loadingFilters ? (
                                <Skeleton count={3} />
                            ) : (
                                conditions.map(condition => (
                                    <div
                                        key={condition.slug}
                                        onClick={e =>
                                            handleConditionChange(e, condition)
                                        }
                                        className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                        {condition.title}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Brand */}
                    <div className="mb-4">
                        <div className="mt-2 flex justify-between py-5">
                            <div className="text-sm font-bold">Brand</div>
                            <div
                                onClick={() =>
                                    setShowAllStatuses(!showAllStatuses)
                                }
                                className="cursor-pointer text-sm font-semibold text-[#007185]">
                                {showAllStatuses
                                    ? "Lihat Lebih Sedikit"
                                    : "Lihat Semua"}
                            </div>
                        </div>
                        <div
                            className={`flex flex-wrap items-center overflow-hidden transition-all duration-300 ${
                                showAllStatuses
                                    ? "max-h-full"
                                    : "max-h-32 overflow-y-auto"
                            }`}>
                            {loadingFilters ? (
                                <Skeleton count={3} />
                            ) : (
                                statuses.map(status => (
                                    <div
                                        key={status.id}
                                        onClick={e =>
                                            handleStatusChange(e, status)
                                        }
                                        className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                        {status.status}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="my-2 cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-3 text-center text-sm font-bold hover:bg-[#e8bc00]">
                        Gunakan Filter
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupFilter
