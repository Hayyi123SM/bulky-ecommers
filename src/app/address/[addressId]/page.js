"use client"

import AreaSelect from "@/components/AreaSelect"
import AuthSessionStatus from "@/components/AuthSessionStatus"
import InputError from "@/components/InputError"
import Navbar from "@/components/Navbar"
import PopupModal from "@/components/PopupModal"
import SidebarProfile from "@/components/SidebarProfile"
import { fetchAddressDetail, updateAddress } from "@/store/slices/addressSlice"
import {
    fetchCities,
    fetchDistricts,
    fetchProvinces,
    fetchSubDistricts,
} from "@/store/slices/areaSlice"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function AddressUpdate({ params }) {
    const addressId = params.addressId
    const dispatch = useDispatch()
    const [label, setlabel] = useState("")
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const [provinceId, setProvinceId] = useState("")
    const [cityId, setCityId] = useState("")
    const [districtId, setDistrictId] = useState("")
    const [subDistrictId, setSubDistrictId] = useState("")
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const errors = useSelector(state => state.address.error)
    const [isShow, setIsShow] = useState(false)

    const addressDetail = useSelector(state => state.address.detailAddress)

    useEffect(() => {
        dispatch(fetchAddressDetail(addressId))
    }, [dispatch, addressId])

    useEffect(() => {
        if (addressDetail) {
            setlabel(addressDetail.label)
            setName(addressDetail.name)
            setPhoneNumber(addressDetail.phone_number)
            setAddress(addressDetail.address)
            setProvinceId(addressDetail.province_id)
            setCityId(addressDetail.city_id)
            setDistrictId(addressDetail.district_id)
            setSubDistrictId(addressDetail.sub_district_id)
            setLatitude(addressDetail.latitude)
            setLongitude(addressDetail.longitude)
        }
    }, [addressDetail])

    useEffect(() => {
        dispatch(fetchProvinces())
        if (cityId) dispatch(fetchCities(provinceId))
        if (districtId) dispatch(fetchDistricts(cityId))
        if (subDistrictId) dispatch(fetchSubDistricts(districtId))
    }, [dispatch, provinceId, cityId, districtId, subDistrictId])

    const provinces = useSelector(state => state.area.provinces)
    const cities = useSelector(state => state.area.cities)
    const districts = useSelector(state => state.area.districts)
    const subDistricts = useSelector(state => state.area.subDistricts)

    const handleSelectProvince = option => {
        setProvinceId(option.id)
        dispatch(fetchCities(option.id))
    }

    const handleSelectCity = option => {
        setCityId(option.id)
        dispatch(fetchDistricts(option.id))
    }

    const handleSelectDistrict = option => {
        setDistrictId(option.id)
        dispatch(fetchSubDistricts(option.id))
    }

    const handleSelectSubDistrict = option => {
        setSubDistrictId(option.id)
    }

    const submitForm = e => {
        e.preventDefault()
        const data = {
            addressId,
            label,
            name,
            phoneNumber,
            address,
            provinceId,
            cityId,
            districtId,
            subDistrictId,
            latitude,
            longitude,
            isPrimary: false,
        }
        dispatch(updateAddress(data))

        // Redirect to profile page
        if (errors) {
            return
        } else {
            setIsShow(true)
            setTimeout(() => {
                window.location.href = "/address"
            }, 1000)
        }
    }

    return (
        <div>
            <Navbar visibleOn="desktop" />
            <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                <ArrowLeftIcon className="h-6 w-6" />
                <div className="ml-2 font-semibold">Update Alamat</div>
            </div>
            <div className="mx-auto min-h-screen max-w-7xl lg:flex">
                <div className="hidden w-1/5 p-7 lg:block">
                    <SidebarProfile />
                </div>
                <div className="w-5/5 px-4 py-4 lg:w-4/5 lg:p-7 lg:px-4">
                    <div className="hidden items-center border-[#F0F3F7] lg:flex">
                        <ArrowLeftIcon className="h-6 w-6" />
                        <div className="ml-2 font-semibold">Update Alamat</div>
                    </div>
                    <AuthSessionStatus className="mb-4" status={status} />

                    <form onSubmit={submitForm}>
                        <div className="items-center justify-between lg:mt-10 lg:flex">
                            <div className="item-center lg:w-5/12">
                                <div className="mb-1 font-semibold text-[#B1B1B1]">
                                    Label
                                </div>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                    placeholder="Cth: Perusahaan"
                                    onChange={e => setlabel(e.target.value)}
                                    defaultValue={label}
                                />
                                <InputError
                                    messages={errors && errors.label}
                                    className={"mt-2"}
                                />
                            </div>
                        </div>
                        <div className="mt-3 items-center justify-between lg:flex">
                            <div className="item-center lg:w-5/12">
                                <div className="mb-1 font-semibold text-[#B1B1B1]">
                                    Nama
                                </div>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                    placeholder="Nama"
                                    onChange={e => setName(e.target.value)}
                                    defaultValue={name}
                                />
                                <InputError
                                    messages={errors && errors.name}
                                    className={"mt-2"}
                                />
                            </div>
                        </div>
                        <div className="mt-3 items-center justify-between lg:flex">
                            <div className="item-center lg:w-5/12">
                                <div className="mb-1 font-semibold text-[#B1B1B1]">
                                    Nomor Telepon
                                </div>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                    placeholder="Nomor Telepon"
                                    onChange={e =>
                                        setPhoneNumber(e.target.value)
                                    }
                                    defaultValue={phoneNumber}
                                />
                                <InputError
                                    messages={errors && errors.phone_number}
                                    className={"mt-2"}
                                />
                            </div>
                        </div>
                        <div className="mt-3 items-center justify-between lg:flex">
                            <div className="item-center lg:w-5/12">
                                <div className="mb-1 font-semibold text-[#B1B1B1]">
                                    Alamat
                                </div>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                    placeholder="Alamat"
                                    onChange={e => setAddress(e.target.value)}
                                    defaultValue={address}
                                />
                                <InputError
                                    messages={errors && errors.address}
                                    className={"mt-2"}
                                />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                            <div className="item-center flex w-full lg:w-5/12">
                                <div className="item-center w-1/2 pr-2">
                                    <div className="mb-1 font-semibold text-[#B1B1B1]">
                                        Provinsi
                                    </div>
                                    <AreaSelect
                                        options={provinces}
                                        onSelect={handleSelectProvince}
                                        selectedId={provinceId}
                                    />
                                    <InputError
                                        messages={errors && errors.province_id}
                                        className={"mt-2"}
                                    />
                                </div>
                                <div className="item-center w-1/2 pl-2">
                                    <div className="mb-1 font-semibold text-[#B1B1B1]">
                                        Kota / Kabupaten
                                    </div>
                                    <AreaSelect
                                        options={cities}
                                        onSelect={handleSelectCity}
                                        selectedId={cityId}
                                    />
                                    <InputError
                                        messages={errors && errors.city_id}
                                        className={"mt-2"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                            <div className="item-center flex w-full lg:w-5/12">
                                <div className="item-center w-1/2 pr-2">
                                    <div className="mb-1 font-semibold text-[#B1B1B1]">
                                        Kecamatan
                                    </div>
                                    <AreaSelect
                                        options={districts}
                                        onSelect={handleSelectDistrict}
                                        selectedId={districtId}
                                    />
                                    <InputError
                                        messages={errors && errors.district_id}
                                        className={"mt-2"}
                                    />
                                </div>
                                <div className="item-center w-1/2 pl-2">
                                    <div className="mb-1 font-semibold text-[#B1B1B1]">
                                        Kode Pos
                                    </div>
                                    <AreaSelect
                                        options={subDistricts}
                                        onSelect={handleSelectSubDistrict}
                                        selectedId={subDistrictId}
                                    />
                                    <InputError
                                        messages={
                                            errors && errors.sub_district_id
                                        }
                                        className={"mt-2"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                            <div className="item-center flex w-full lg:w-5/12">
                                <div className="item-center w-1/2 pr-2">
                                    <div className="mb-1 font-semibold text-[#B1B1B1]">
                                        Latitude
                                    </div>
                                    <input
                                        type="text"
                                        className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                        placeholder="Latitude"
                                        onChange={e =>
                                            setLatitude(e.target.value)
                                        }
                                        value={latitude}
                                    />
                                    <InputError
                                        messages={
                                            errors && errors && errors.latitude
                                        }
                                        className={"mt-2"}
                                    />
                                </div>
                                <div className="item-center w-1/2 pl-2">
                                    <div className="mb-1 font-semibold text-[#B1B1B1]">
                                        Longitude
                                    </div>
                                    <input
                                        type="text"
                                        className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                        placeholder="Longitude"
                                        onChange={e =>
                                            setLongitude(e.target.value)
                                        }
                                        value={longitude}
                                    />
                                    <InputError
                                        messages={
                                            errors && errors && errors.longitude
                                        }
                                        className={"mt-2"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-14 hidden items-center justify-between lg:flex">
                            <div className="item-center flex flex-col lg:w-5/12">
                                <button
                                    type="submit"
                                    className="mb-4 w-full cursor-pointer rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                    Simpan
                                </button>
                                <Link
                                    href="/address"
                                    className="w-full cursor-pointer rounded-lg border border-[#BFC9D9] bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#f5f5f5]">
                                    Batalkan
                                </Link>
                            </div>
                        </div>
                        <div className="fixed bottom-0 left-0 right-0 block w-full px-5 py-5 shadow-lg lg:hidden">
                            <div className="mt-10">
                                <button type="submit">
                                    <div className="w-full cursor-pointer rounded-lg bg-secondary px-6 py-2 text-center text-sm font-bold hover:bg-[#e8bc00]">
                                        Simpan
                                    </div>
                                </button>
                            </div>
                            <div className="mt-3">
                                <Link href="/profile">
                                    <div className="w-full cursor-pointer rounded-lg border border-[#BFC9D9] bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#f5f5f5]">
                                        Batalkan
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <PopupModal
                isOpen={isShow}
                type={"notification"}
                title={"Pemberitahuan"}
                message={`Selamat, alamat anda telah diperbarui.`}
            />
            {/* <Footer /> */}
        </div>
    )
}

export default AddressUpdate
