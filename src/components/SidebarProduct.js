import {
    fetchCategories,
    fetchConditions,
    fetchStatuses,
    fetchWarehouses,
    setFilters,
} from "../store/slices/filterSlice"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"
import React, { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import { useDispatch, useSelector } from "react-redux"

function SidebarProduct({ category }) {
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedWarehouses, setSelectedWarehouses] = useState([])
    const [selectedConditions, setSelectedConditions] = useState([])
    const [selectedStatuses, setSelectedStatuses] = useState([])
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)

    const [showFilterGroup, setShowFilterGroup] = useState(true)
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

    useEffect(() => {
        if (category) {
            setSelectedCategories([category])
            dispatch(setFilters({ categories: [category] }))
        }
    }, [category])

    const toggleShowGroup = () => {
        setShowFilterGroup(!showFilterGroup)
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

    const handleMinPriceChange = e => {
        setMinPrice(e.target.value)
    }

    const handleMaxPriceChange = e => {
        setMaxPrice(e.target.value)
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
                                        {category.name}
                                    </label>
                                </div>
                            </div>
                        ))
                    )}
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
                    {loadingFilters ? (
                        <Skeleton />
                    ) : (
                        <div className="flex px-4 py-1">
                            <input
                                type="number"
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
                                type="number"
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
                                        {condition.title}
                                    </label>
                                </div>
                            </div>
                        ))
                    )}
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
                                        {status.status}
                                    </label>
                                </div>
                            </div>
                        ))
                    )}
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
