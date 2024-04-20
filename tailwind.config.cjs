const daisyui = require('daisyui');
const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');

/** @type {import('tailwindcss').Config}*/
const config = {
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#4e8fd1',
					secondary: '#ff0000',
					accent: '#00ab00',
					neutral: '#3c2829',
					'base-100': '#f3f4f6',
					info: '#00ffff',
					success: '#58f665',
					warning: '#ffa900',
					error: '#ff7d92'
				}
			}
		]
	},

	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				display: ['Death From Above']
			}
		}
	},

	plugins: [forms, typography, daisyui]
};

module.exports = config;
