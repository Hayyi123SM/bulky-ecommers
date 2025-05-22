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

//DEBUG AXIOS FROM LOCAL
// import Axios from "axios"
//
// const axios = Axios.create({
//     baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
// })
//
// axios.interceptors.request.use(config => {
//     if (typeof window !== "undefined") {
//         const token = localStorage.getItem("token")
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`
//         }
//     }
//     return config
// })
//
// export default axios
