import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: "#404040", // primary
        secondary: "#c2410c", // orange-700
      },
      fontFamily: {
        sans: [
          "ui-serif",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
        serif: ["sans-serif"],
      },
    },
  },
  variants: {},
  plugins: [],
};
