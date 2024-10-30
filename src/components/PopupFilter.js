import {
    fetchBrands,
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
    const selectedFilters = useSelector(state => state.filters.selectedFilters)
    const [selectedCategories, setSelectedCategories] = useState(
        selectedFilters.categories || [],
    )
    const [selectedWarehouses, setSelectedWarehouses] = useState(
        selectedFilters.warehouses || [],
    )
    const [selectedConditions, setSelectedConditions] = useState(
        selectedFilters.conditions || [],
    )
    const [selectedStatuses, setSelectedStatuses] = useState(
        selectedFilters.statuses || [],
    )
    const [selectedBrands, setSelectedBrands] = useState(
        selectedFilters.brands || [],
    )
    const [minPrice, setMinPrice] = useState(selectedFilters.minPrice || null)
    const [maxPrice, setMaxPrice] = useState(selectedFilters.maxPrice || null)
    const [numericMinPrice, setNumericMinPrice] = useState(null)
    const [numericMaxPrice, setNumericMaxPrice] = useState(null)

    // State untuk toggle "Lihat Semua"
    const [showAllCategories, setShowAllCategories] = useState(false)
    const [showAllWarehouses, setShowAllWarehouses] = useState(false)
    const [showAllConditions, setShowAllConditions] = useState(false)
    const [showAllStatuses, setShowAllStatuses] = useState(false)
    const [showAllBrands, setShowAllBrands] = useState(false)

    const dispatch = useDispatch()
    const categories = useSelector(state => state.filters.categories)
    const warehouses = useSelector(state => state.filters.warehouses)
    const conditions = useSelector(state => state.filters.conditions)
    const statuses = useSelector(state => state.filters.statuses)
    const brands = useSelector(state => state.filters.brands)
    const loadingFilters = useSelector(state => state.filters.isLoading)

    const formatToIDR = number => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            currencyDisplay: "narrowSymbol",
        })
            .format(number)
            .replace("Rp", "")
            .trim() // Remove "Rp" prefix
    }

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchWarehouses())
        dispatch(fetchConditions())
        dispatch(fetchStatuses())
        dispatch(fetchBrands())
    }, [dispatch])

    const handleCategoryChange = (e, category) => {
        if (selectedCategories.includes(category.slug)) {
            // Unselect if already selected
            setSelectedCategories(
                selectedCategories.filter(catId => catId !== category.slug),
            )
        } else {
            // Select the category
            setSelectedCategories([...selectedCategories, category.slug])
        }
    }

    const handleWarehouseChange = (e, warehouse) => {
        if (selectedWarehouses.includes(warehouse.id)) {
            // Unselect if already selected
            setSelectedWarehouses(
                selectedWarehouses.filter(warId => warId !== warehouse.id),
            )
        } else {
            // Select the warehouse
            setSelectedWarehouses([...selectedWarehouses, warehouse.id])
        }
    }

    const handleConditionChange = (e, condition) => {
        if (selectedConditions.includes(condition.slug)) {
            // Unselect if already selected
            setSelectedConditions(
                selectedConditions.filter(
                    condSlug => condSlug !== condition.slug,
                ),
            )
        } else {
            // Select the condition
            setSelectedConditions([...selectedConditions, condition.slug])
        }
    }

    const handleStatusChange = (e, status) => {
        if (selectedStatuses.includes(status.id)) {
            // Unselect if already selected
            setSelectedStatuses(
                selectedStatuses.filter(statId => statId !== status.id),
            )
        } else {
            // Select the status
            setSelectedStatuses([...selectedStatuses, status.id])
        }
    }

    const handleBrandChange = (e, brand) => {
        if (selectedBrands.includes(brand.id)) {
            // Unselect if already selected
            setSelectedBrands(
                selectedBrands.filter(brandId => brandId !== brand.id),
            )
        } else {
            // Select the brand
            setSelectedBrands([...selectedBrands, brand.id])
        }
    }

    const handleMinPriceChange = e => {
        const rawMinValue = e.target.value.replace(/[^\d]/g, "")
        const numericMinValue = rawMinValue ? parseInt(rawMinValue, 10) : null
        const formattedMinValue = rawMinValue
            ? formatToIDR(numericMinValue)
            : ""

        setMinPrice(formattedMinValue) // Set the formatted value for display

        if (numericMinValue !== null) {
            if (maxPrice) {
                const numericMaxPrice = parseInt(
                    maxPrice.replace(/[^\d]/g, ""),
                    10,
                )
                // Validate min price against max price
                if (numericMinValue <= numericMaxPrice) {
                    setNumericMinPrice(numericMinValue)
                }
            } else {
                setNumericMinPrice(numericMinValue)
            }
        } else {
            setNumericMinPrice(null)
        }
    }

    const handleMaxPriceChange = e => {
        const rawMaxValue = e.target.value.replace(/[^\d]/g, "")
        const numericMaxValue = rawMaxValue ? parseInt(rawMaxValue, 10) : null
        const formattedMaxValue = rawMaxValue
            ? formatToIDR(numericMaxValue)
            : ""

        setMaxPrice(formattedMaxValue) // Set the formatted value for display

        if (numericMaxValue !== null) {
            const numericMinPrice = parseInt(minPrice.replace(/[^\d]/g, ""), 10)

            // Validate max price against min price
            if (minPrice && numericMaxValue < numericMinPrice) {
                // Optionally: handle error message for max < min
                console.error("Max price must be greater than min price")
                return // Stop if validation fails
            }

            // Validate max price against the minimum threshold
            if (numericMaxValue > 10000) {
                setNumericMaxPrice(numericMaxValue)
            }
        } else {
            setNumericMaxPrice(null)
        }
    }

    const handleFilter = () => {
        dispatch(
            setFilters({
                categories: selectedCategories,
                warehouses: selectedWarehouses,
                conditions: selectedConditions,
                statuses: selectedStatuses,
                brands: selectedBrands,
                minPrice: numericMinPrice,
                maxPrice: numericMaxPrice,
            }),
        )
        closePopup()
    }

    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
                <div className="max-h-[95vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-6 pt-5 shadow-lg">
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
                                    : "max-h-24 overflow-y-auto"
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
                                        className={`mb-1 mr-1 flex-shrink-0 rounded-3xl border px-6 py-2 text-base ${
                                            selectedCategories.includes(
                                                category.slug,
                                            )
                                                ? "border-[#007185] bg-[#0071850D] text-[#007185]"
                                                : "border-[#BFC9D9] text-[#6D7588]"
                                        }`}>
                                        {category.name}
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
                                onClick={() => setShowAllBrands(!showAllBrands)}
                                className="cursor-pointer text-sm font-semibold text-[#007185]">
                                {showAllBrands
                                    ? "Lihat Lebih Sedikit"
                                    : "Lihat Semua"}
                            </div>
                        </div>
                        <div
                            className={`flex flex-wrap items-center overflow-hidden transition-all duration-300 ${
                                showAllBrands
                                    ? "max-h-full"
                                    : "max-h-24 overflow-y-auto"
                            }`}>
                            {loadingFilters ? (
                                <Skeleton count={3} />
                            ) : (
                                brands.map(brand => (
                                    <div
                                        key={brand.id}
                                        onClick={e =>
                                            handleBrandChange(e, brand)
                                        }
                                        className={`mb-1 mr-1 flex-shrink-0 rounded-3xl border px-6 py-2 text-base ${
                                            selectedBrands.includes(brand.id)
                                                ? "border-[#007185] bg-[#0071850D] text-[#007185]"
                                                : "border-[#BFC9D9] text-[#6D7588]"
                                        }`}>
                                        {brand.name}
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
                                    : "max-h-24 overflow-y-auto"
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
                                        className={`mb-1 mr-1 flex-shrink-0 rounded-3xl border px-6 py-2 text-base ${
                                            selectedWarehouses.includes(
                                                warehouse.id,
                                            )
                                                ? "border-[#007185] bg-[#0071850D] text-[#007185]"
                                                : "border-[#BFC9D9] text-[#6D7588]"
                                        }`}>
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
                                <div className="relative flex">
                                    <div className="absolute left-3 top-1/2 flex h-10 -translate-y-1/2 items-center px-2 text-sm font-extrabold text-[#31353BAD]">
                                        Rp
                                    </div>
                                    <input
                                        type="text"
                                        value={minPrice}
                                        onChange={handleMinPriceChange}
                                        className="ml-1 h-10 w-full rounded-xl border border-gray-300 p-2 pl-10 focus:ring-0"
                                        placeholder="Terendah"
                                    />
                                </div>
                            )}
                            {loadingFilters ? (
                                <Skeleton />
                            ) : (
                                <div className="relative flex">
                                    <div className="absolute left-3 top-1/2 flex h-10 -translate-y-1/2 items-center px-2 text-sm font-extrabold text-[#31353BAD]">
                                        Rp
                                    </div>
                                    <input
                                        type="text"
                                        value={maxPrice}
                                        onChange={handleMaxPriceChange}
                                        className="ml-1 h-10 w-full rounded-xl border border-gray-300 p-2 pl-10 focus:ring-0"
                                        placeholder="Tertinggi"
                                    />
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
                                    : "max-h-24 overflow-y-auto"
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
                                        className={`mb-1 mr-1 flex-shrink-0 rounded-3xl border px-6 py-2 text-base ${
                                            selectedConditions.includes(
                                                condition.slug,
                                            )
                                                ? "border-[#007185] bg-[#0071850D] text-[#007185]"
                                                : "border-[#BFC9D9] text-[#6D7588]"
                                        }`}>
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
                                    : "max-h-24 overflow-y-auto"
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
                                        className={`mb-1 mr-1 flex-shrink-0 rounded-3xl border px-6 py-2 text-base ${
                                            selectedStatuses.includes(status.id)
                                                ? "border-[#007185] bg-[#0071850D] text-[#007185]"
                                                : "border-[#BFC9D9] text-[#6D7588]"
                                        }`}>
                                        {status.status}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div
                        onClick={handleFilter}
                        className="my-2 cursor-pointer items-center justify-center rounded-lg bg-secondary px-6 py-3 text-center text-sm font-bold hover:bg-[#e8bc00]">
                        Gunakan Filter
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupFilter
