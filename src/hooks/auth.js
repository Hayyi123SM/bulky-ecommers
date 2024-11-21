import axios from "@/lib/axios"
import { setUser } from "@/store/slices/authSlice"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import useSWR from "swr"

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()
    // const dispatch = useDispatch()

    const {
        data: user,
        error,
        mutate,
    } = useSWR("/api/user", () =>
        axios
            .get("/api/user")
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push("/verify-email")
            }),
    )

    const csrf = () => axios.get("/sanctum/csrf-cookie")

    const register = async ({
        setErrors,
        redirectOnSuccess = "/",
        ...props
    }) => {
        await csrf()

        setErrors([])

        try {
            await axios.post("/api/auth/web/register", props)
            mutate() // Perbarui data user
            router.push(redirectOnSuccess) // Redirect setelah sukses
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors) // Error validasi
            } else {
                console.error("An unexpected error occurred:", error)
            }
        }
    }

    const login = async ({ setErrors, setStatus, ...props }, dispatch) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post("/api/auth/web/login", props)
            .then(response => {
                // Assuming the user data is in response.data.user
                const userData = response.data.data

                // Dispatch setUser to store user data in Redux
                dispatch(setUser(userData))

                localStorage.setItem("user", JSON.stringify(userData))

                // Optionally trigger any additional side effects like navigation or refetching data
                mutate() // Call mutate or any other functions as needed
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post("/api/auth/forgot-password", { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post("/api/auth/reset-password", { token: params.token, ...props })
            .then(response =>
                router.push("/login?reset=" + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post("/email/verification-notification")
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post("/api/auth/web/logout").then(() => mutate())

            localStorage.removeItem("user")
        }

        window.location.pathname = "/login"
    }

    const verifyEmail = async (id, hash) => {
        await csrf()

        await axios
            .get(`/api/auth/email-verification/${id}/${hash}`)
            .then(response => {
                // Handle success response, e.g., redirect user or show a success message
                console.log("Email verification successful:", response.data)
                if (response.data.status === "success") {
                    router.push("/profile")
                } else {
                    router.push("/login")
                }
            })
            .catch(error => {
                // Handle error response
                console.error("Email verification failed:", error)
                router.push("/login")
            })
    }

    useEffect(() => {
        if (middleware === "guest" && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (
            window.location.pathname === "/verify-email" &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated)
        if (middleware === "auth" && error) logout()
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
        verifyEmail,
    }
}
