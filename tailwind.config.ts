import type { Config } from 'tailwindcss'

export default {
    content: [
        "./index.html",
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                jb3: {
                    light: "#66FF66",
                    navy: "#0A0C10",
                    slate: "#22324A",
                    muted: "#9AA3AD",
                    // Added from my own inferrence to handle likely usages
                    coolgray: "#9AA3AD",
                    accent: "#66FF66",
                    primary: "#66FF66",
                    teal: "#06b6d4",
                    surface: "#121620",
                    dark: "#0A0C10",
                    divider: "#27272a"
                }
            }
        }
    },
    plugins: []
} satisfies Config
