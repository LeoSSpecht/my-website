/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "logo-background": "#48c78e",
        icon: "rgb(224, 224, 224)",
        "spartan-tutors": "rgb(25,69,59)",
      },
      boxShadow: {
        center: "0 0px 15px 4px rgba(0, 0, 0, 0.2)",
      },
    },
    screens: {
      "not-phone": "431px",
    },
  },
  plugins: [],
};
