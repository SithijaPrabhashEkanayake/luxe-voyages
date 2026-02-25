/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['"Playfair Display"', 'Georgia', 'serif'],
                body: ['"DM Sans"', '-apple-system', 'sans-serif'],
                mono: ['"DM Mono"', '"Courier New"', 'monospace'],
            },
            colors: {
                gold: {
                    rich: '#C8902E',
                    base: '#D4A96A',
                    light: '#F0CFA0',
                    pale: '#FAE8CC',
                },
                bali: '#0D9488',
                santorini: '#2563EB',
                kyoto: '#BE185D',
                maldives: '#0891B2',
                kerala: '#16A34A',
                volcano: '#9A3412',
                thailand: '#D97706',
            },
            borderRadius: {
                'sm-glass': '8px',
                'md-glass': '14px',
                'lg-glass': '20px',
                'xl-glass': '28px',
                '2xl-glass': '40px',
                'pill': '100px',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
            },
            screens: {
                'xs': '320px',
                '3xl': '1920px',
            },
        },
    },
    plugins: [],
}
