/** @type {import('tailwindcss').Config} */
import { withUt } from 'uploadthing/tw';

module.exports = withUt({
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        container: {
        center: true,
        padding: '2rem',
        screens: {
            '2xl': '1400px',
        },
        },
        extend: {
        colors: {
            primary: {
            500: '#8D6241',
            400: '#A57B4D',
            300: '#B38B59',
            200: '#C5A97F',
            100: '#DBCAAD',
            },
            secondary: {
            400: '#062D14',
            300: '#113E21',
            200: '#196232',
            100: '#197C3A', 
            },
            grey: {
            400: '#545454', // Subdued
            300: '#757575',
            200: '#AFAFAF', // Disabled
            100: '#F1F1F1', // White Grey
            },
            danger: "#D7191C",
            black: '#000000',
            white: '#FEFEFE',
            border: 'hsl(var(--border))',
            input: 'hsl(var(--input))',
            ring: 'hsl(var(--ring))',
            foreground: 'hsl(var(--foreground))',
            destructive: {
            DEFAULT: 'hsl(var(--destructive))',
            foreground: 'hsl(var(--destructive-foreground))',
            },
            muted: {
            DEFAULT: 'hsl(var(--muted))',
            foreground: 'hsl(var(--muted-foreground))',
            },
            accent: {
            DEFAULT: 'hsl(var(--accent))',
            foreground: 'hsl(var(--accent-foreground))',
            },
            popover: {
            DEFAULT: 'hsl(var(--popover))',
            foreground: 'hsl(var(--popover-foreground))',
            },
            card: {
            DEFAULT: 'hsl(var(--card))',
            foreground: 'hsl(var(--card-foreground))',
            },
        },
        fontFamily: {
            poppins: ['var(--font-poppins)'],
            playfair: ['var(--font-playfair_display)'],
            aleo: ['var(--font-aleo)'],
        },
        backgroundImage: {
            'dotted-pattern': "url('/assets/images/dotted-pattern.png')"
        },
        borderRadius: {
            lg: 'var(--radius)',
            md: 'calc(var(--radius) - 2px)',
            sm: 'calc(var(--radius) - 4px)',
        },
        keyframes: {
            'accordion-down': {
            from: { height: '0' },
            to: { height: 'var(--radix-accordion-content-height)' },
            },
            'accordion-up': {
            from: { height: 'var(--radix-accordion-content-height)' },
            to: { height: '0' },
            },
        },
        animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',
        },
        },
    },
    plugins: [require('tailwindcss-animate')],
});