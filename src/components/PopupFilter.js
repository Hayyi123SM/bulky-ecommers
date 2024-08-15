import { XMarkIcon } from "@heroicons/react/24/solid"

function PopupFilter({ closePopup }) {
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
                    <div className="mb-4">
                        <div className="mt-2 flex justify-between py-5">
                            <div className="text-sm font-bold">Kategori</div>
                            <div className="text-sm font-semibold text-[#007185]">
                                Lihat Semua
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center">
                            <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                Elektronik
                            </div>
                            <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                Fashion
                            </div>
                            <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                Rumah Tangga
                            </div>
                            <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                Olahraga
                            </div>
                            <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                Kecantikan
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="mt-2 flex justify-between py-5">
                            <div className="text-sm font-bold">Lokasi</div>
                            <div className="text-sm font-semibold text-[#007185]">
                                Lihat Semua
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center">
                            <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                DKI Jakarta
                            </div>
                            <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                Jabodetabek
                            </div>
                            <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                Bandung
                            </div>
                            <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                Medan
                            </div>
                            <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                Surabaya
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="mt-2 flex justify-between py-5">
                            <div className="text-sm font-bold">Kondisi</div>
                            <div className="text-sm font-semibold text-[#007185]">
                                Lihat Semua
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center">
                            <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                Baru
                            </div>
                            <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                Bekas 90-95%
                            </div>
                            <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                Bekas 80-90%
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="mt-2 flex justify-between py-5">
                            <div className="text-sm font-bold">Brand</div>
                            <div className="text-sm font-semibold text-[#007185]">
                                Lihat Semua
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center">
                            <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                Brand Name
                            </div>
                            <div className="mb-1 mr-1 flex-shrink-0 rounded-3xl border border-[#BFC9D9] px-6 py-2 text-base text-[#6D7588] hover:border-[#007185] hover:bg-[#0071850D] hover:text-[#007185]">
                                Brand Name
                            </div>
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
