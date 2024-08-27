"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export default function SearchParamsHandler({ actions = [], onPageChange }) {
    const searchParams = useSearchParams()
    const currentPage = parseInt(searchParams.get("page")) || 1
    const dispatch = useDispatch()

    useEffect(() => {
        actions.forEach(action => {
            dispatch(action(currentPage))
        })

        if (onPageChange) {
            onPageChange(currentPage)
        }
    }, [dispatch, currentPage, actions, onPageChange])

    return null
}
