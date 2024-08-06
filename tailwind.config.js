import plugin from "tailwindcss/plugin"

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#020203",
                secondary: "#FFCF02",
                third: "#1D9EFF",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            lineClamp: {
                3: "3",
            },
        },
    },
    plugins: [
        require("@tailwindcss/line-clamp"),
        require("@tailwindcss/forms"),
        plugin(function ({ addUtilities }) {
            const newUtilities = {
                ".bg-search": {
                    backgroundImage: "url(/search.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "20px 50%",
                    backgroundSize: "20px",
                },
                ".bg-calendar": {
                    backgroundImage: "url(/calendar.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "20px 50%",
                    backgroundSize: "20px",
                },
            }

            addUtilities(newUtilities)
        }),
    ],
}
