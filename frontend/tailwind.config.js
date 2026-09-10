/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F0F4F8",
        card: "#FFFFFF",
        border: "#D1D9E6",
        borderStrong: "#B0BEC5",
        navy: {
          50: "#EEF2F7",
          100: "#D9E2EC",
          200: "#BCCCDC",
          300: "#94A3B8",
          400: "#6B7C93",
          500: "#4A5568",
          700: "#2D3748",
          800: "#1A202C",
          900: "#0D1321",
        },
        weather: {
          sky: "#0077CC",
          cyan: "#0891B2",
          light: "#DBEAFE",
        },
        alert: {
          critical: "#C62828",
          criticalBg: "#FFEBEE",
          warning: "#E65100",
          warningBg: "#FFF3E0",
          verified: "#2E7D32",
          verifiedBg: "#E8F5E9",
          satellite: "#6A1B9A",
          satelliteBg: "#F3E5F5",
        },
        accent: {
          blue: "#1565C0",
          teal: "#00838F",
          orange: "#E65100",
          red: "#C62828",
          green: "#2E7D32",
          purple: "#6A1B9A",
          amber: "#FF8F00",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.06)",
        panel: "0 4px 12px -2px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)",
        elevated: "0 8px 24px -4px rgba(0, 0, 0, 0.12), 0 4px 8px -4px rgba(0, 0, 0, 0.08)",
        inner: "inset 0 1px 2px rgba(0, 0, 0, 0.06)",
      }
    },
  },
  plugins: [],
}
