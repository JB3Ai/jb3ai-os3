module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./layouts/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "jb3-primary": "#6AFF7E",
                "jb3-teal": "#54E0E0",
                "jb3-coolgray": "#CED5E0",
                "jb3-light": "#F8F8F8",
                "jb3-subtle": "#B0B8C0",
                "jb3-divider": "#1E2A4C",
            },
        },
    },
    plugins: [],
}
