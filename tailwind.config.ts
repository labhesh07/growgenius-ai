
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Earth tones
				earth: {
					50: '#f6f5f1',
					100: '#e9e6d7',
					200: '#d5ceb8',
					300: '#bfb394',
					400: '#ab9a76',
					500: '#8c7a58',
					600: '#746348',
					700: '#5c4e3b',
					800: '#44392e',
					900: '#332a23',
					950: '#1a1613',
				},
				sage: {
					50: '#f4f7f4',
					100: '#e5ebe4',
					200: '#ccd8ca',
					300: '#aabca6',
					400: '#829b7d',
					500: '#637e5e',
					600: '#4c664a',
					700: '#3c513c',
					800: '#324132',
					900: '#2a362b',
					950: '#141e16',
				},
				stone: {
					50: '#f8f8f7',
					100: '#f0efed',
					200: '#e3e1dc',
					300: '#cdc9c0',
					400: '#b2aba0',
					500: '#9b938a',
					600: '#8c7f79',
					700: '#786b66',
					800: '#605955',
					900: '#524c49',
					950: '#2c2825',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' },
				},
				'fade-in-up': {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-in-down': {
					from: { opacity: '0', transform: 'translateY(-20px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' },
				},
				'scale-in': {
					from: { transform: 'scale(0.95)', opacity: '0' },
					to: { transform: 'scale(1)', opacity: '1' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-in-up': 'fade-in-up 0.7s ease-out',
				'fade-in-down': 'fade-in-down 0.7s ease-out',
				'pulse-slow': 'pulse-slow 3s infinite ease-in-out',
				'scale-in': 'scale-in 0.3s ease-out',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
			boxShadow: {
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
				'soft': '0 4px 28px 0 rgba(0, 0, 0, 0.03)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
