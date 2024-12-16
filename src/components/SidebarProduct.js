import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import { useDispatch, useSelector } from "react-redux"
import {
    fetchBrands,
    fetchCategories,
    fetchConditions,
    fetchStatuses,
    fetchWarehouses,
    setFilters,
} from "../store/slices/filterSlice"
import { useTranslations } from "next-intl"
import Cookies from "js-cookie"

function SidebarProduct({ category }) {
    const t = useTranslations()
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedWarehouses, setSelectedWarehouses] = useState([])
    const [selectedConditions, setSelectedConditions] = useState([])
    const [selectedStatuses, setSelectedStatuses] = useState([])
    const [selectedBrands, setSelectedBrands] = useState([])
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)

    // State untuk toggle t("filter.showMore")}
    const [showAllCategories, setShowAllCategories] = useState(false)
    const [showAllWarehouses, setShowAllWarehouses] = useState(false)
    const [showAllConditions, setShowAllConditions] = useState(false)
    const [showAllStatuses, setShowAllStatuses] = useState(false)
    const [showAllBrands, setShowAllBrands] = useState(false)

    const [showFilterCategories, setShowFilterCategories] = useState(true)
    const [showFilterWarehouses, setShowFilterWarehouses] = useState(true)
    const [showFilterPrices, setShowFilterPrices] = useState(true)
    const [showFilterConditions, setShowFilterConditions] = useState(true)
    const [showFilterStatuses, setShowFilterStatuses] = useState(true)
    const [showFilterBrands, setShowFilterBrands] = useState(true)

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

    useEffect(() => {
        if (category) {
            setSelectedCategories([category])
            dispatch(setFilters({ categories: [category] }))
        }
    }, [category])

    const toggleShowGroup = filter => {
        if (filter === "categories") {
            setShowFilterCategories(!showFilterCategories)
        }
        if (filter === "warehouses") {
            setShowFilterWarehouses(!showFilterWarehouses)
        }
        if (filter === "prices") {
            setShowFilterPrices(!showFilterPrices)
        }
        if (filter === "conditions") {
            setShowFilterConditions(!showFilterConditions)
        }
        if (filter === "statuses") {
            setShowFilterStatuses(!showFilterStatuses)
        }
        if (filter === "brands") {
            setShowFilterBrands(!showFilterBrands)
        }
    }

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

    const handleBrandChange = (e, brand) => {
        const updatedBrands = e.target.checked
            ? [...selectedBrands, brand.slug]
            : selectedBrands.filter(slug => slug !== brand.slug)
        setSelectedBrands(updatedBrands)
        dispatch(setFilters({ brands: updatedBrands }))
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
                    dispatch(setFilters({ minPrice: numericMinValue }))
                }
            } else {
                dispatch(setFilters({ minPrice: numericMinValue }))
            }
        } else {
            dispatch(setFilters({ minPrice: null }))
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
                dispatch(setFilters({ maxPrice: numericMaxValue }))
            }
        } else {
            dispatch(setFilters({ maxPrice: null }))
        }
    }

    const handleResetFilter = () => {
        dispatch(
            setFilters({
                categories: [],
                warehouses: [],
                conditions: [],
                statuses: [],
                brands: [],
                minPrice: null,
                maxPrice: null,
            }),
        )
        setSelectedCategories([])
        setSelectedWarehouses([])
        setSelectedConditions([])
        setSelectedStatuses([])
        setSelectedBrands([])
        setMinPrice(null)
        setMaxPrice(null)
    }

    return (
        <div className="hidden w-1/5 lg:block">
            <div className="p-4 font-bold"> {t("other.filter")}</div>

            <div className="border-b py-2">
                <div
                    className="mx-2 flex cursor-pointer items-center justify-center rounded-lg bg-secondary p-2 hover:opacity-80"
                    onClick={handleResetFilter}>
                    {t("other.resetFilter")}
                </div>
            </div>
            <div className="border-b py-2">
                <div
                    className="mx-2 flex cursor-pointer items-center justify-between p-2 hover:rounded-lg hover:bg-gray-100"
                    onClick={() => toggleShowGroup("categories")}>
                    <div className="font-bold">{t("filter.category")}</div>
                    {showFilterCategories ? (
                        <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                    )}
                </div>
                {/* {showFilterCategories && ( */}
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        showFilterCategories && showAllCategories
                            ? "max-h-full opacity-100"
                            : showFilterCategories
                              ? "max-h-32 overflow-y-auto opacity-100"
                              : "max-h-0 opacity-0"
                    }`}>
                    {loadingFilters ? (
                        <Skeleton count={3} />
                    ) : (
                        categories.map(category => (
                            <div className="flex px-4 py-1" key={category.slug}>
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        checked={selectedCategories.includes(
                                            category.slug,
                                        )}
                                        onChange={e =>
                                            handleCategoryChange(e, category)
                                        }
                                        className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 text-sm leading-6">
                                    <label className="font-xs">
                                        {Cookies.get("locale") === "id"
                                            ? category?.name_trans?.id
                                            : category?.name_trans?.en}
                                    </label>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className={`mx-2 cursor-pointer p-2 text-sm font-semibold text-[#007185] ${showFilterCategories ? "visible" : "hidden"}`}>
                    {showAllCategories
                        ? t("filter.showLess")
                        : t("filter.showMore")}
                </div>
                {/* )} */}
            </div>
            <div className="border-b py-2">
                <div
                    className="mx-2 flex cursor-pointer items-center justify-between p-2 hover:rounded-lg hover:bg-gray-100"
                    onClick={() => toggleShowGroup("brands")}>
                    <div className="font-bold">{t("filter.brand")}</div>
                    {showFilterBrands ? (
                        <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                    )}
                </div>
                {/* {showFilterBrands && ( */}
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        showFilterBrands && showAllBrands
                            ? "max-h-full opacity-100"
                            : showFilterBrands
                              ? "max-h-32 overflow-y-auto opacity-100"
                              : "max-h-0 opacity-0"
                    }`}>
                    {loadingFilters ? (
                        <Skeleton count={3} />
                    ) : (
                        brands.map(brand => (
                            <div className="flex px-4 py-1" key={brand.slug}>
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        checked={selectedBrands.includes(
                                            brand.slug,
                                        )}
                                        onChange={e =>
                                            handleBrandChange(e, brand)
                                        }
                                        className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 text-sm leading-6">
                                    <label className="font-xs">
                                        {brand.name}
                                    </label>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div
                    onClick={() => setShowAllBrands(!showAllBrands)}
                    className={`mx-2 cursor-pointer p-2 text-sm font-semibold text-[#007185] ${showFilterBrands ? "visible" : "hidden"}`}>
                    {showAllBrands
                        ? t("filter.showLess")
                        : t("filter.showMore")}
                </div>
                {/* )} */}
            </div>
            <div className="border-b py-2">
                <div
                    className="mx-2 flex cursor-pointer items-center justify-between p-2 hover:rounded-lg hover:bg-gray-100"
                    onClick={() => toggleShowGroup("warehouses")}>
                    <div className="font-bold">{t("filter.warehouse")}</div>
                    {showFilterWarehouses ? (
                        <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                    )}
                </div>
                {/* {showFilterWarehouses && ( */}
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        showFilterWarehouses && showAllWarehouses
                            ? "max-h-full opacity-100"
                            : showFilterWarehouses
                              ? "max-h-32 overflow-y-auto opacity-100"
                              : "max-h-0 opacity-0"
                    }`}>
                    {loadingFilters ? (
                        <Skeleton count={3} />
                    ) : (
                        warehouses.map(warehouse => (
                            <div className="flex px-4 py-1" key={warehouse.id}>
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        checked={selectedWarehouses.includes(
                                            warehouse.id,
                                        )}
                                        onChange={e =>
                                            handleWarehouseChange(e, warehouse)
                                        }
                                        className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 text-sm leading-6">
                                    <label className="font-xs">
                                        {warehouse.name}
                                    </label>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {warehouses.length > 5 && (
                    <div
                        onClick={() => setShowAllWarehouses(!showAllWarehouses)}
                        className={`mx-2 cursor-pointer p-2 text-sm font-semibold text-[#007185] ${showFilterWarehouses ? "visible" : "hidden"}`}>
                        {showAllWarehouses
                            ? t("filter.showLess")
                            : t("filter.showMore")}
                    </div>
                )}
                {/* )} */}
            </div>
            <div className="border-b py-2">
                <div
                    className="mx-2 flex cursor-pointer items-center justify-between p-2 hover:rounded-lg hover:bg-gray-100"
                    onClick={() => toggleShowGroup("prices")}>
                    <div className="font-bold">{t("filter.price")}</div>
                    {showFilterPrices ? (
                        <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                    )}
                </div>
                {/* {showFilterPrices && ( */}
                <div
                    className={`transition-all duration-500 ease-in-out ${showFilterPrices ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                    {loadingFilters ? (
                        <Skeleton />
                    ) : (
                        <div className="flex px-4 py-1">
                            <input
                                type="text"
                                value={minPrice}
                                onChange={handleMinPriceChange}
                                className="ml-1 h-10 w-full rounded-lg border border-gray-300 p-2 pl-10 focus:ring-0"
                                placeholder="Terendah"
                            />
                            <div className="absolute h-10 cursor-pointer place-content-center rounded-l-lg bg-[#F3F4F5] px-2 text-sm font-extrabold text-[#31353BAD] hover:bg-[#F5F5F5]">
                                Rp
                            </div>
                        </div>
                    )}
                    {loadingFilters ? (
                        <Skeleton />
                    ) : (
                        <div className="flex px-4 py-1">
                            <input
                                type="text"
                                value={maxPrice}
                                onChange={handleMaxPriceChange}
                                className="ml-1 h-10 w-full rounded-lg border border-gray-300 p-2 pl-10 focus:ring-0"
                                placeholder="Tertinggi"
                            />
                            <div className="absolute h-10 cursor-pointer place-content-center rounded-l-lg bg-[#F3F4F5] px-2 text-sm font-extrabold text-[#31353BAD] hover:bg-[#F5F5F5]">
                                Rp
                            </div>
                        </div>
                    )}
                </div>
                {/* )} */}
            </div>
            <div className="border-b py-2">
                <div
                    className="mx-2 flex cursor-pointer items-center justify-between p-2 hover:rounded-lg hover:bg-gray-100"
                    onClick={() => toggleShowGroup("conditions")}>
                    <div className="font-bold">{t("filter.condition")}</div>
                    {showFilterConditions ? (
                        <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                    )}
                </div>
                {/* {showFilterConditions && ( */}
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        showFilterConditions && showAllConditions
                            ? "max-h-full opacity-100"
                            : showFilterConditions
                              ? "max-h-32 overflow-y-auto opacity-100"
                              : "max-h-0 opacity-0"
                    }`}>
                    {loadingFilters ? (
                        <Skeleton count={3} />
                    ) : (
                        conditions.map(condition => (
                            <div
                                className="flex px-4 py-1"
                                key={condition.slug}>
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        checked={selectedConditions.includes(
                                            condition.slug,
                                        )}
                                        onChange={e =>
                                            handleConditionChange(e, condition)
                                        }
                                        className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 text-sm leading-6">
                                    <label className="font-xs">
                                        {Cookies.get("locale") === "id"
                                            ? condition?.title_trans?.id
                                            : condition?.title_trans?.en}
                                    </label>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {conditions.length > 5 && (
                    <div
                        onClick={() => setShowAllConditions(!showAllConditions)}
                        className={`mx-2 cursor-pointer p-2 text-sm font-semibold text-[#007185] ${showFilterConditions ? "visible" : "hidden"}`}>
                        {showAllConditions
                            ? t("filter.showLess")
                            : t("filter.showMore")}
                    </div>
                )}
                {/* )} */}
            </div>
            <div className="border-b py-2">
                <div
                    className="mx-2 flex cursor-pointer items-center justify-between p-2 hover:rounded-lg hover:bg-gray-100"
                    onClick={() => toggleShowGroup("statuses")}>
                    <div className="font-bold">Status</div>
                    {showFilterStatuses ? (
                        <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                    )}
                </div>
                {/* {showFilterStatuses && ( */}
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        showFilterStatuses && showAllStatuses
                            ? "max-h-full opacity-100"
                            : showFilterStatuses
                              ? "max-h-32 overflow-y-auto opacity-100"
                              : "max-h-0 opacity-0"
                    }`}>
                    {loadingFilters ? (
                        <Skeleton count={3} />
                    ) : (
                        statuses.map(status => (
                            <div className="flex px-4 py-1" key={status.id}>
                                <div className="flex items-center">
                                    <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        checked={selectedStatuses.includes(
                                            status.id,
                                        )}
                                        onChange={e =>
                                            handleStatusChange(e, status)
                                        }
                                        className="border-3 h-5 w-5 rounded border-black checked:bg-yellow-500 checked:text-yellow-500 focus:ring-0"
                                    />
                                </div>
                                <div className="ml-2 text-sm leading-6">
                                    <label className="font-xs">
                                        {Cookies.get("locale") === "id"
                                            ? status?.status_trans?.id
                                            : status?.status_trans?.en}
                                    </label>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {statuses.length > 5 && (
                    <div
                        onClick={() => setShowAllStatuses(!showAllStatuses)}
                        className={`mx-2 cursor-pointer p-2 text-sm font-semibold text-[#007185] ${showFilterStatuses ? "visible" : "hidden"}`}>
                        {showAllStatuses
                            ? t("filter.showLess")
                            : t("filter.showMore")}
                    </div>
                )}
                {/* )} */}
            </div>
            {/*<div className="border-b py-2">
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
