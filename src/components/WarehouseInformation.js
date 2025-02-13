"use client"

import { getStatusColor } from "@/lib/helper"
import { ClockIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getPickupInformation } from "@/store/slices/orderSlice"

const WarehouseInformation = ({ type }) => {
    const information = useSelector(state => state.orders.information)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPickupInformation())
    }, [dispatch])
    console.log("information", information)
    console.log("type", type)
    return (
        <div className="rounded-xl bg-secondary px-5 py-4 text-sm lg:shadow">
            <div className="flex items-center">
                <div className="mb-5 text-sm leading-6">
                    <div className="text-sm font-bold">{type === "Self Pickup" ? "Informasi Pickup Gudang" : "Informasi pengiriman via Deliveree"}</div>
                </div>
            </div>
            <div className="py-2 text-sm">
                {type === "Self Pickup"
                    ? "Anda bisa mengambil barang yang sudah anda beli di gudang kami yang beralamat di :"
                    : "Pesanan anda dapat di proses oleh admin dan di kirim di hari dan jam operasional gudang. Jika pesanan di proses di luar jam operasional maka akan di jalankan di waktu tercepat saat gudang buka kembali. "}{" "}
                :
            </div>
            <div className="py-2 text-sm font-bold">{information?.address}</div>
            <div className="pt-2 text-sm">Jam Operasional Gudang :</div>
            <div className="flex items-center pb-2 text-sm font-bold">
                {information?.operational_hours}
                <div className={`ml-2 flex w-fit items-center gap-1 rounded-lg bg-white px-2 py-1 ${getStatusColor()}`}>
                    <ClockIcon className="h-4 w-4" />
                    {getStatusColor() === "text-green-500" ? "Gudang Buka" : "Gudang Tutup"}
                </div>
            </div>
            <div className="py-2 text-sm font-bold">
                Atau anda juga bisa menghubungi admin kami dengan klik tombol{" "}
                <Link href="/contact-us" className="text-[#2E84F6] underline">
                    WA ADMIN
                </Link>{" "}
                untuk menjadwalkan pickup.
            </div>
        </div>
    )
}

export default WarehouseInformation
