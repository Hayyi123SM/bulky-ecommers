import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { MapIcon } from "@heroicons/react/24/solid"
import {
    Autocomplete,
    GoogleMap,
    Marker,
    useLoadScript,
} from "@react-google-maps/api"
import { useRef, useState, useEffect } from "react"

const libraries = ["places"]
const mapContainerStyle = {
    width: "100%",
    height: "100%",
}

function PopupAddress({ closePopup, onSave }) {
    const coords = { lat: -6.4361817, lng: 106.8459034 }
    const [searchQuery, setSearchQuery] = useState("")
    const [autocomplete, setAutocomplete] = useState(null)
    const [mapCenter, setMapCenter] = useState(coords)
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [address, setAddress] = useState("") // State for the address
    const inputRef = useRef(null)
    const [showMaps, setShowMaps] = useState(false)
    const [popupHeight, setPopupHeight] = useState("auto")

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBOUImZah_ZZ6q4M6Jg-oihQZL9agtMCbw",
        libraries,
    })

    const handleSearchInputChange = e => {
        setSearchQuery(e.target.value)
    }

    const handlePlaceChanged = () => {
        try {
            if (autocomplete !== null) {
                const place = autocomplete.getPlace()
                if (place.geometry && place.geometry.location) {
                    const lat = place.geometry.location.lat()
                    const lng = place.geometry.location.lng()
                    setLatitude(lat)
                    setLongitude(lng)
                    setMapCenter({ lat, lng })
                    setShowMaps(true)

                    // Extracting formatted address
                    if (place.formatted_address) {
                        setAddress(place.formatted_address)
                    }
                }
            }
        } catch (error) {
            console.error("Error processing place selection:", error)
        }
    }

    const onLoadAutocomplete = autocompleteInstance => {
        setAutocomplete(autocompleteInstance)
    }

    useEffect(() => {
        if (autocomplete) {
            const listener = autocomplete.addListener("place_changed", () => {
                const predictions = document.querySelectorAll(".pac-item")
                if (predictions.length > 0) {
                    setPopupHeight("90vh") // Adjust the popup height when suggestions appear
                } else {
                    setPopupHeight("auto") // Reset when no suggestions
                }
            })
            return () => listener.remove()
        }
    }, [autocomplete])

    // Geocoder to get address based on latitude and longitude
    const geocodeLatLng = (lat, lng) => {
        const geocoder = new window.google.maps.Geocoder()
        const latlng = { lat, lng }
        geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === "OK") {
                if (results[0]) {
                    setAddress(results[0].formatted_address) // Update address state with formatted address
                } else {
                    console.error("No results found")
                }
            } else {
                console.error("Geocoder failed due to: " + status)
            }
        })
    }

    // Handle marker drag event to update the marker's coordinates and get address
    const handleMarkerDragEnd = e => {
        const newLat = e.latLng.lat()
        const newLng = e.latLng.lng()
        setLatitude(newLat)
        setLongitude(newLng)
        setMapCenter({ lat: newLat, lng: newLng })

        // Fetch the address from the new latitude and longitude
        geocodeLatLng(newLat, newLng)
    }

    // Function to use the user's current location
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const lat = position.coords.latitude
                    const lng = position.coords.longitude
                    setLatitude(lat)
                    setLongitude(lng)
                    setMapCenter({ lat, lng })
                    setShowMaps(true)

                    // Fetch the address for the current location
                    geocodeLatLng(lat, lng)
                },
                error => {
                    console.error("Error getting current location: ", error)
                    alert("Unable to retrieve your location.")
                },
            )
        } else {
            alert("Geolocation is not supported by your browser.")
        }
    }

    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
                <div
                    className="max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6 pt-5 shadow-lg"
                    style={{ height: popupHeight }}>
                    <div className="my-4 flex items-center justify-between">
                        <h2 className="text-base font-semibold">
                            Ubah Pin Poin
                        </h2>
                        <XMarkIcon
                            className="h-6 w-6 cursor-pointer"
                            onClick={closePopup}
                        />
                    </div>

                    {!showMaps ? (
                        <div>
                            {isLoaded ? (
                                <Autocomplete
                                    onLoad={onLoadAutocomplete}
                                    onPlaceChanged={handlePlaceChanged}>
                                    <input
                                        ref={inputRef}
                                        className="w-full rounded-xl border py-2 pl-14 text-black bg-search focus:border-secondary focus:ring-0"
                                        placeholder="Cari lokasi"
                                        value={searchQuery}
                                        onChange={handleSearchInputChange}
                                    />
                                </Autocomplete>
                            ) : (
                                <input
                                    className="w-full rounded-xl border py-2 pl-14 text-black bg-search focus:border-secondary focus:ring-0"
                                    placeholder="Loading..."
                                    disabled
                                />
                            )}
                        </div>
                    ) : (
                        <div>
                            <input type="text" value={latitude} hidden />
                            <input type="text" value={longitude} hidden />

                            {isLoaded ? (
                                <>
                                    <div
                                        className="overflow-hidden rounded-t-xl shadow"
                                        style={{ height: "400px" }}>
                                        <GoogleMap
                                            mapContainerStyle={
                                                mapContainerStyle
                                            }
                                            center={mapCenter}
                                            zoom={19}>
                                            <Marker
                                                position={mapCenter}
                                                draggable={true} // Enable dragging
                                                onDragEnd={handleMarkerDragEnd} // Handle marker drag end
                                            />
                                        </GoogleMap>
                                    </div>
                                    <div className="rounded-b-xl p-4 shadow">
                                        <label className="font-semibold">
                                            Alamat yang dipilih:
                                        </label>
                                        <p>{address}</p>{" "}
                                        {/* Displaying the selected or dragged address */}
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}

                            <div className="mt-5 flex justify-end">
                                <div className="flex w-full items-center justify-between">
                                    <div
                                        onClick={() => setShowMaps(false)}
                                        className="flex cursor-pointer items-center rounded-lg border px-4 py-2">
                                        <MagnifyingGlassIcon className="mr-2 h-6 w-6" />
                                        Cari Ulang Alamat
                                    </div>
                                    <div
                                        onClick={getCurrentLocation}
                                        className="flex cursor-pointer items-center rounded-lg border px-4 py-2 text-[#007185]">
                                        <MapIcon className="mr-2 h-6 w-6" />
                                        Gunakan Lokasi Saat Ini
                                    </div>
                                </div>
                            </div>
                            <div
                                className="mt-3 flex cursor-pointer items-center justify-center rounded-lg bg-secondary px-4 py-2 font-semibold"
                                onClick={() =>
                                    onSave(latitude, longitude, address)
                                }>
                                {" "}
                                {/* Use onSave to pass the data */}
                                Simpan
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PopupAddress
