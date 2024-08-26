"use client"

import AuthSessionStatus from "@/components/AuthSessionStatus"
import AreaSelect from "@/components/AreaSelect"
import InputError from "@/components/InputError"
import { useAuth } from "@/hooks/auth"
import {
    fetchCities,
    fetchDistricts,
    fetchProvinces,
    fetchSubDistricts,
} from "@/store/slices/areaSlice"
import { ArrowLeftIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function Register() {
    const { register } = useAuth({
        middleware: "guest",
        redirectIfAuthenticated: "/",
    })

    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [provinceId, setProvinceId] = useState("")
    const [cityId, setCityId] = useState("")
    const [districtId, setDistrictId] = useState("")
    const [subDistrictId, setSubDistrictId] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        dispatch(fetchProvinces())
    }, [dispatch])

    const provinces = useSelector(state => state.area.provinces)
    const cities = useSelector(state => state.area.cities)
    const districts = useSelector(state => state.area.districts)
    const subDistricts = useSelector(state => state.area.subDistricts)

    console.log("Provinces:", provinces)
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

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

    const submitForm = async event => {
        if (password !== passwordConfirmation) {
            setErrors({ password: "The password confirmation does not match." })
            return
        }

        event.preventDefault()

        await register(
            {
                email,
                password,
                password_confirmation: passwordConfirmation,
                name,
                province_id: provinceId,
                city_id: cityId,
                district_id: districtId,
                sub_district_id: subDistrictId,
                address,
                phone_number: phoneNumber,
                setErrors,
                setStatus,
            },
            dispatch,
            setErrors,
            setStatus,
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-cover bg-center lg:bg-[url('/bg-login.png')]">
            <div className="flex-1">
                <div className="flex items-center justify-center pt-10">
                    <Link href="/">
                        <Image
                            src="/bulky-black.svg"
                            width={180}
                            height={60}
                            alt="Logo"
                            className="h-auto w-auto cursor-pointer"
                        />
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-center py-5">
                    <div className="h-fit w-full max-w-md rounded-xl border-[#BFC9D9] bg-white p-8 lg:border">
                        <AuthSessionStatus className="mb-4" status={status} />

                        <form onSubmit={submitForm}>
                            <div className="flex items-center py-6">
                                <ArrowLeftIcon className="h-5 w-5" />
                                <div className="ml-3 text-2xl font-bold">
                                    Buat Akun
                                </div>
                            </div>
                            <div className="py-2">
                                <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                    Nama Lengkap
                                </div>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                    placeholder="Nama Lengkap"
                                />
                                <InputError
                                    messages={errors.name}
                                    className={"mt-2"}
                                />
                            </div>
                            <div className="py-2">
                                <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                    Username
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                    placeholder="cth: jhondoe123"
                                />
                                <InputError
                                    messages={errors.name}
                                    className={"mt-2"}
                                />
                            </div>
                            <div className="py-2">
                                <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                    Alamat
                                </div>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                    className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                    placeholder="Alamat"
                                />
                                <InputError
                                    messages={errors.address}
                                    className={"mt-2"}
                                />
                            </div>
                            <div className="flex py-2">
                                <div className="mr-5 w-1/2">
                                    <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                        Provinsi
                                    </div>
                                    <AreaSelect
                                        options={provinces}
                                        onSelect={handleSelectProvince}
                                    />
                                    <InputError
                                        messages={errors.provinceId}
                                        className={"mt-2"}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                        Kota / Kabupaten
                                    </div>
                                    <AreaSelect
                                        options={cities}
                                        onSelect={handleSelectCity}
                                    />
                                    <InputError
                                        messages={errors.cityId}
                                        className={"mt-2"}
                                    />
                                </div>
                            </div>
                            <div className="flex py-2">
                                <div className="mr-5 w-1/2">
                                    <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                        Kecamatan
                                    </div>
                                    <AreaSelect
                                        options={districts}
                                        onSelect={handleSelectDistrict}
                                    />
                                    <InputError
                                        messages={errors.districtId}
                                        className={"mt-2"}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                        Kode Pos
                                    </div>
                                    <AreaSelect
                                        options={subDistricts}
                                        onSelect={handleSelectSubDistrict}
                                    />
                                    <InputError
                                        messages={errors.subDistrictId}
                                        className={"mt-2"}
                                    />
                                </div>
                            </div>
                            <div className="py-2">
                                <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                    Email
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                    placeholder="Email"
                                />
                                <InputError
                                    messages={errors.email}
                                    className={"mt-2"}
                                />
                            </div>
                            <div className="py-2">
                                <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                    No Telepon
                                </div>
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={e =>
                                        setPhoneNumber(e.target.value)
                                    }
                                    className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                    placeholder="No Telepon"
                                />
                                <InputError
                                    messages={errors.phoneNumber}
                                    className={"mt-2"}
                                />
                            </div>
                            <div className="py-2">
                                <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                    Jenis Kelamin
                                </div>
                                <div className="flex items-center">
                                    <div className="mr-5 flex items-center">
                                        <input
                                            id="sms"
                                            name="notification-method"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-[#007185] focus:ring-[#007185]"
                                        />
                                        <label className="ml-3 block text-sm font-medium leading-6 text-[#6D7588]">
                                            Laki-Laki
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="push"
                                            name="notification-method"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-[#007185] focus:ring-[#007185]"
                                        />
                                        <label className="ml-3 block text-sm font-medium leading-6 text-[#6D7588]">
                                            Perempuan
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="py-2">
                                <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                    Kata Sandi
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    defaultValue={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="h-10 w-full rounded-lg border border-gray-300 p-2 pl-10 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                    placeholder="Password"
                                />
                                <InputError
                                    messages={errors.password}
                                    className={"mt-2"}
                                />
                                <div
                                    className="absolute mt-[-40px] h-10 cursor-pointer place-content-center rounded-l-lg px-2 hover:bg-[#F5F5F5]"
                                    onClick={togglePasswordVisibility}>
                                    {!showPassword ? (
                                        <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-500" />
                                    )}
                                </div>
                            </div>
                            <div className="py-2">
                                <div className="mb-2 text-sm font-bold text-[#6D7588]">
                                    Konfirmasi Kata Sandi
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    defaultValue={passwordConfirmation}
                                    onChange={e =>
                                        setPasswordConfirmation(e.target.value)
                                    }
                                    className="h-10 w-full rounded-lg border border-gray-300 p-2 pl-10 focus:border-black focus:bg-[#0071850D] focus:ring-4 focus:ring-[#00D5FB33]"
                                    placeholder="Password"
                                />
                                <InputError
                                    messages={errors.passwordConfirmation}
                                    className={"mt-2"}
                                />
                                <div
                                    className="absolute mt-[-40px] h-10 cursor-pointer place-content-center rounded-l-lg px-2 hover:bg-[#F5F5F5]"
                                    onClick={togglePasswordVisibility}>
                                    {!showPassword ? (
                                        <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-500" />
                                    )}
                                </div>
                            </div>
                            <div className="mb-2 py-2 text-sm text-[#6D7588]">
                                Dengan mendaftar, kamu menyetujui
                                <Link
                                    href="/terms-and-condition"
                                    className="ml-1 cursor-pointer font-bold text-[#007185]">
                                    Syarat & Ketentuan
                                </Link>
                                , serta
                                <Link
                                    href="/privacy-policy"
                                    className="ml-1 cursor-pointer font-bold text-[#007185]">
                                    Kebijakan Privasi
                                </Link>
                                yang berlaku.
                            </div>
                            <button
                                type="submit"
                                className="mt-3 w-full cursor-pointer rounded-xl bg-secondary py-3 text-center text-lg font-bold hover:bg-[#e8bc00]">
                                Daftar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
