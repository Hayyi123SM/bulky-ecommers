const getBaseApiUrl = () => {
    if (typeof window !== "undefined") {
        if (window.location.origin === "http://localhost:3000") {
            return "http://octagon.test/api"
        } else {
            return "https://bulky.id/api"
        }
    }
    return "https://bulky.id/api"
}

export const BASE_API_URL = getBaseApiUrl()
