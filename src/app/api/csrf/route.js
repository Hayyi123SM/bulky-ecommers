import { generateCSRFToken, setCSRFCookie } from "../../../lib/csrf"

export async function GET() {
    try {
        const csrfToken = generateCSRFToken()
        const res = new Response(JSON.stringify({ token: csrfToken }), {
            headers: {
                "Content-Type": "application/json",
            },
        })
        setCSRFCookie(res, csrfToken)
        return res
    } catch (error) {
        // console.error("Error generating CSRF token:", error)
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500 },
        )
    }
}
