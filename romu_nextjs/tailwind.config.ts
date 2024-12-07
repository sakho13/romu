import type { Config } from "tailwindcss"
import daisyui from "daisyui"
import typography from "@tailwindcss/typography"
import { getIconCollections, iconsPlugin } from "@egoist/tailwindcss-icons"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    typography,
    daisyui,
    iconsPlugin({
      collections: getIconCollections(["ic", "lucide", "fa", "fa-solid"]),
    }),
  ],

  daisyui: {
    themes: ["bumblebee"],
  },
}
export default config
