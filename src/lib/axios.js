import Axios from "axios"

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
    },
    withCredentials: true,
    withXSRFToken: true,
})

export default axios
