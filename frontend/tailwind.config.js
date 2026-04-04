// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    colors: {
        brandNavy: '#0B1C33',       // Primary Dark (Headers, Footer, Text)
        brandRed: '#DC2626',        // Primary Accent (Buttons, Highlights)
        brandRedHover: '#b91c1c',   // Button Hover State
        brandRedLight: '#FEF2F2',   // Light Red Backgrounds
        surface: '#F8FAFC',         // Page Background (Light Slate)
        textMain: '#334155',        // Standard Body Text
        textLight: '#64748B',       // Muted Text
      },
      // 2. Typography
      fontFamily: {
        // 'Outfit' for Headings, Nav, Buttons (Modern & Bold)
        outfit: ['Outfit', 'sans-serif'], 
        // 'Poppins' for Body text, Paragraphs (Clean & Readable)
        sans: ['Poppins', 'sans-serif'],   
      },
      // 3. Shadows (Premium Feel)
      boxShadow: {
        'nav': '0 2px 12px rgba(0,0,0,0.06)',
        'card': '0 1px 3px rgba(0,0,0,0.02)',
        'mega': '0 20px 60px rgba(0,0,0,0.12)',
        'float': '0 10px 30px -10px rgba(0,0,0,0.2)',
      },
      // 4. Border Radius (Soft & Modern)
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      }
    },
  },

  plugins: [],
}
