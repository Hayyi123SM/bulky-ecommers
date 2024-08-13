import {
    ArchiveBoxIcon,
    Bars3BottomRightIcon,
    BellIcon,
} from "@heroicons/react/24/outline"
import { ChevronDownIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"

function Navbar({ togglePopupMenu }) {
    const isLogin = true

    return (
        <div>
            <nav className="sticky top-0 z-50 block h-[134px] bg-primary px-4 py-3 lg:hidden">
                <div className="flex items-center justify-between">
                    <Image
                        src="/bulky.svg"
                        width={100}
                        height={30}
                        alt="Logo"
                        className="cursor-pointer"
                    />
                    <Bars3BottomRightIcon
                        className="h-8 w-8 font-bold text-white"
                        onClick={togglePopupMenu}
                    />
                </div>
                <div className="mt-2">
                    <input
                        className="w-full rounded-3xl py-2 pl-14 text-black bg-search focus:border-secondary focus:ring-0"
                        placeholder="Cari barang"
                    />
                </div>
                <div className="mt-2 w-full overflow-x-auto text-sm">
                    <ul className="inline-flex items-center space-x-4 whitespace-nowrap">
                        <li className="text-white">Elektronik</li>
                        <li className="text-white">Fashion</li>
                        <li className="text-white">Rumah Tangga</li>
                        <li className="text-white">Olahraga</li>
                        <li className="text-white">Kecantikan</li>
                    </ul>
                </div>
            </nav>

            <nav className="sticky top-0 z-50 hidden h-[120px] bg-primary px-10 py-3 md:hidden lg:block">
                <div className="item-center flex">
                    <div className="item-center flex w-1/12">
                        <Image
                            src="/bulky.svg"
                            width={100}
                            height={30}
                            alt="Logo"
                            className="cursor-pointer"
                        />
                    </div>
                    <div className="item-center flex pl-10 lg:w-7/12 xl:w-8/12 2xl:w-9/12">
                        <input
                            className="mr-14 w-full rounded-lg py-2 pl-14 text-black bg-search focus:border-secondary focus:ring-0"
                            placeholder="Cari barang bundlemu di bulky aja..."
                        />
                    </div>
                    <div className="flex lg:w-4/12 xl:w-3/12 2xl:w-2/12">
                        <div className="flex w-full items-center justify-between">
                            <BellIcon className="mr-2 h-9 w-9 font-bold text-white" />
                            <div className="flex items-center">
                                <ArchiveBoxIcon className="h-9 w-9 font-bold text-white" />
                                <div className="ml-3 text-center text-white">
                                    <div className="text-sm">Pesanan</div>
                                    <div className="text-sm font-bold">
                                        0 Items
                                    </div>
                                </div>
                            </div>
                            {!isLogin ? (
                                <Link
                                    href="/login"
                                    className="ml-5 cursor-pointer rounded-lg bg-secondary px-14 py-3 text-center text-lg font-bold hover:bg-[#e8bc00]">
                                    Masuk
                                </Link>
                            ) : (
                                <div className="flex items-center py-2">
                                    <div className="ml-3 text-white">
                                        <div className="text-sm">Welcome</div>
                                        <div className="flex cursor-pointer items-center">
                                            <div className="mr-2 text-sm font-bold">
                                                Agung Nugroho
                                            </div>
                                            <ChevronDownIcon className="h-5 w-5 font-bold text-white" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-3 flex justify-between text-sm">
                    <div className="w-2/3">
                        <ul className="inline-flex items-center">
                            {/* <li className="mr-5 text-white">
                                <Bars3BottomRightIcon className="h-8 w-8 font-bold text-white" />
                            </li> */}
                            <li className="mr-5 text-white">Elektronik</li>
                            <li className="mr-5 text-white">Fashion</li>
                            <li className="mr-5 text-white">Rumah Tangga</li>
                            <li className="mr-5 text-white">Olahraga</li>
                            <li className="mr-5 text-white">Kecantikan</li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
