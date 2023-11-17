import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        "xs": "325px",
        "sm": "375px",
        "md": "425px",
        "lg": "660px",
        "xl": "768px",
        "2xl": "991px",
        "3xl": "1024px",
        "4xl": "1180px",
        "5xl": "1268px"
      }
    },
  },
  daisyui: {
    themes: ["light", "black"]
  },
  plugins: [require("daisyui")],
}
export default config
