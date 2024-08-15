import Axios from "axios"

const axios = Axios.create({
    baseURL: "https://dummyjson.com/",
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
    withXSRFToken: true,
})

export default axios
