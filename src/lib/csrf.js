import crypto from "crypto"
import { serialize, parse } from "cookie"

export function generateCSRFToken() {
    try {
        return crypto.randomBytes(48).toString("hex")
    } catch (error) {
        console.error("Error generating CSRF token:", error)
        throw new Error("Error generating CSRF token")
    }
}

export function setCSRFCookie(res, token) {
    try {
        const cookie = serialize("XSRF-TOKEN", token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        })
        res.headers.set("Set-Cookie", cookie)
    } catch (error) {
        console.error("Error setting CSRF cookie:", error)
        throw new Error("Error setting CSRF cookie")
    }
}

export function validateCSRFToken(token, req) {
    try {
        const cookies = parse(req.headers.get("cookie") || "")
        const csrfCookie = cookies["XSRF-TOKEN"]
        return csrfCookie && token === csrfCookie
    } catch (error) {
        console.error("Error validating CSRF token:", error)
        return false
    }
}
