import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'tangerine': {
					DEFAULT: '#f18a00',
					50: '#FFFFFF',
					100: '#FFFFFF',
					200: '#FDEBE7',
					300: '#FBCBC1',
					400: '#F8AC9B',
					500: '#ffad43',
					600: '#f18a00',
					700: '#E93811',
					800: '#B52B0D',
					900: '#801F09'
				},
      }
    },
  },
  plugins: [],
};
export default config;
