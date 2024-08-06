import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import SidebarProfile from "@/components/SidebarProfile"
import Image from "next/image"
import Link from "next/link"

function Profile() {
    return (
        <div>
            <Navbar />
            <div className="mx-auto flex min-h-screen max-w-7xl">
                <div className="w-1/5 p-7">
                    <SidebarProfile />
                </div>
                <div className="w-4/5 p-7">
                    <div className="pb-1 text-2xl font-bold">Profil</div>
                    <div className="mt-10 flex items-center justify-center">
                        <Link
                            href="/profile"
                            className="item-center w-6/12 cursor-pointer border-b-4 border-[#007185] text-center font-bold text-[#007185] hover:border-[#007185] hover:text-[#007185]">
                            Biodata
                        </Link>
                        <Link
                            href="/address"
                            className="item-center w-6/12 cursor-pointer border-b-4 border-gray-100 text-center font-bold text-[#B1B1B1] hover:border-[#007185] hover:text-[#007185]">
                            Daftar Alamat
                        </Link>
                    </div>
                    <div className="my-7 flex w-full rounded-xl bg-white px-5 py-4 shadow">
                        <div>
                            <div className="w-80 rounded-lg bg-white px-5 py-4 shadow">
                                <Image
                                    src="/bio.png"
                                    width={300}
                                    height={300}
                                    alt="biodata"
                                />
                                <div className="my-4 cursor-pointer items-center justify-center rounded-lg border bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#B1B1B1]">
                                    Pilih Foto
                                </div>
                                <div className="text-sm font-light text-[#6D7588]">
                                    Besar file: maksimum 10.000.000 bytes (10
                                    Megabytes). Ekstensi file yang
                                    diperbolehkan: .JPG .JPEG .PNG
                                </div>
                            </div>
                            <div className="my-4 cursor-pointer items-center justify-center rounded-lg border bg-white px-6 py-2 text-center text-sm font-bold hover:bg-[#B1B1B1]">
                                Ubah Kata Sandi
                            </div>
                        </div>
                        <div className="flex-grow px-5 py-4">
                            <div className="mb-5 text-sm font-bold">
                                Ubah Biodata Diri
                            </div>
                            <div className="flex py-4">
                                <div className="w-1/3 text-sm font-light">
                                    Nama
                                </div>
                                <div className="w-2/3 text-sm font-light">
                                    Agung Nugroho
                                </div>
                            </div>
                            <div className="flex py-4">
                                <div className="w-1/3 text-sm font-light">
                                    Tanggal Lahir
                                </div>
                                <div className="w-2/3 text-sm font-light">
                                    Agung Nugroho
                                </div>
                            </div>
                            <div className="flex py-4">
                                <div className="w-1/3 text-sm font-light">
                                    Jenis Kelamin
                                </div>
                                <div className="w-2/3 text-sm font-light">
                                    Agung Nugroho
                                </div>
                            </div>
                            <div className="mb-5 text-sm font-bold">
                                Ubah Kontak
                            </div>
                            <div className="flex py-4">
                                <div className="w-1/3 text-sm font-light">
                                    Email
                                </div>
                                <div className="w-2/3 text-sm font-light">
                                    Agung Nugroho
                                </div>
                            </div>
                            <div className="flex py-4">
                                <div className="w-1/3 text-sm font-light">
                                    Nomor HP
                                </div>
                                <div className="w-2/3 text-sm font-light">
                                    Agung Nugroho
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile
