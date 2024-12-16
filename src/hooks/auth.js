import axios from "@/lib/axios"
import { setUser } from "@/store/slices/authSlice"
import { useParams, usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import useSWR from "swr"

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()
    const pathname = usePathname()
    // const dispatch = useDispatch()

    const {
        data: user,
        error,
        mutate,
        isValidating,
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

    const login = async (
        { setErrors, setStatus, redirectTo, ...props },
        dispatch,
    ) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post("/api/auth/web/login", props)
            .then(response => {
                const userData = response.data.data

                // Simpan user ke Redux store dan localStorage
                dispatch(setUser(userData))
                localStorage.setItem("user", JSON.stringify(userData))

                // Perbarui data user dan redirect ke halaman tujuan
                mutate()
                // console.log("redirectTo:", redirectTo)
                router.push(redirectTo || "/")
            })
            .catch(error => {
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors)
                } else {
                    console.error("Login error:", error)
                }
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
        if (!middleware) return // You can still conditionally run logic inside the useEffect, but not the hook itself.

        if (middleware === "guest" && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated)
        }

        if (middleware === "auth") {
            if (!isValidating && !user && error?.status === 401) {
                router.push(`/login?redirect=${pathname}`)
            }
        }
    }, [
        isValidating,
        user,
        error,
        pathname,
        middleware,
        redirectIfAuthenticated,
    ])

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
