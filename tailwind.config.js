/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Primary brand colors
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Custom filter colors
        'filter-blue': {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      boxShadow: {
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
        'filter': '0 4px 6px -1px rgba(59, 130, 246, 0.1)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'modal-appear': 'modalAppear 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        modalAppear: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      zIndex: {
        'modal': '1000',
        'dropdown': '1001',
        'tooltip': '1002',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // Custom plugin for component classes
    function({ addComponents, theme }) {
      addComponents({
        // Button components
        '.btn': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: theme('borderRadius.md'),
          fontSize: theme('fontSize.sm'),
          fontWeight: theme('fontWeight.medium'),
          transition: 'all 0.2s ease-in-out',
          cursor: 'pointer',
          '&:disabled': {
            opacity: '0.5',
            cursor: 'not-allowed',
          },
        },
        '.btn-primary': {
          backgroundColor: theme('colors.primary.600'),
          color: theme('colors.white'),
          paddingTop: theme('spacing.2'),
          paddingBottom: theme('spacing.2'),
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          '&:hover:not(:disabled)': {
            backgroundColor: theme('colors.primary.700'),
          },
          '&:focus': {
            outline: '2px solid transparent',
            outlineOffset: '2px',
            boxShadow: `0 0 0 2px ${theme('colors.primary.500')}`,
          },
        },
        '.btn-secondary': {
          backgroundColor: theme('colors.gray.100'),
          color: theme('colors.gray.900'),
          border: `1px solid ${theme('colors.gray.300')}`,
          paddingTop: theme('spacing.2'),
          paddingBottom: theme('spacing.2'),
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          '&:hover:not(:disabled)': {
            backgroundColor: theme('colors.gray.200'),
          },
        },
        // Form components
        '.form-input': {
          width: '100%',
          paddingTop: theme('spacing.2'),
          paddingBottom: theme('spacing.2'),
          paddingLeft: theme('spacing.3'),
          paddingRight: theme('spacing.3'),
          border: `1px solid ${theme('colors.gray.300')}`,
          borderRadius: theme('borderRadius.md'),
          fontSize: theme('fontSize.sm'),
          '&:focus': {
            outline: '2px solid transparent',
            outlineOffset: '2px',
            borderColor: theme('colors.primary.500'),
            boxShadow: `0 0 0 1px ${theme('colors.primary.500')}`,
          },
          '&::placeholder': {
            color: theme('colors.gray.400'),
          },
        },
        // Card components
        '.card': {
          backgroundColor: theme('colors.white'),
          borderRadius: theme('borderRadius.lg'),
          boxShadow: theme('boxShadow.card'),
          border: `1px solid ${theme('colors.gray.200')}`,
        },
        // Filter chip
        '.filter-chip': {
          display: 'inline-flex',
          alignItems: 'center',
          backgroundColor: theme('colors.filter-blue.100'),
          color: theme('colors.filter-blue.800'),
          paddingTop: theme('spacing.1'),
          paddingBottom: theme('spacing.1'),
          paddingLeft: theme('spacing.3'),
          paddingRight: theme('spacing.3'),
          borderRadius: theme('borderRadius.full'),
          fontSize: theme('fontSize.sm'),
          fontWeight: theme('fontWeight.medium'),
        },
      });
    },
  ],
  darkMode: 'class',
};
