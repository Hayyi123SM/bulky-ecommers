// app/api/serpdog/route.js
import fetch from "node-fetch"

export async function GET() {
    const apiKey = "66d95908f1a7f1a1e401278d" // Replace with your SERPdog API key
    const query = "coffee"
    const latitude = 40.7455096
    const longitude = -74.0083012

    const url = `https://api.serpdog.io/maps_search?api_key=${apiKey}&q=${query}&ll=${latitude},${longitude},15.1z`

    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("Error in API Call")
        }

        const data = await response.json()

        // Extract location data from response
        const locations =
            data.places?.map(place => ({
                name: place.name,
                address: place.address,
                rating: place.rating,
            })) || []

        return new Response(JSON.stringify(locations), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        })
    } catch (error) {
        console.error("Error fetching data:", error)
        return new Response(JSON.stringify([]), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        })
    }
}
