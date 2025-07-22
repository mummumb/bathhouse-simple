const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
      "*.{js,ts,jsx,tsx,mdx}"
],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			sans: [
  				'var(--font-inter)',
                    ...fontFamily.sans
                ],
  			heading: [
  				'var(--font-outfit)',
  				...fontFamily.sans
  			]
  		},
  		colors: {
  			'bathhouse-black': '#000000',
  			'bathhouse-white': '#FFFFFF',
  			'bathhouse-cream': '#F2EBDE',
  			'bathhouse-slate': '#5A6870',
  			'bathhouse-stone': '#CEBDAA',
  			'bathhouse-teal': '#598C82',
  			'bathhouse-rose': '#B59597',
  			'bathhouse-sage': '#78909C',
  			'bathhouse-peach': '#E2BE9C',
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
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			fadeIn: {
  				from: {
  					opacity: '0'
  				},
  				to: {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				from: {
  					transform: 'translateY(20px)',
  					opacity: '0'
  				},
  				to: {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			fadeIn: 'fadeIn 0.5s ease-out',
  			slideUp: 'slideUp 0.5s ease-out'
  		},
  		typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "h1, h2, h3, h4, h5, h6": {
              fontFamily: theme("fontFamily.heading").join(", "),
              color: theme("colors.bathhouse-black"),
              fontWeight: "300",
              letterSpacing: "-0.025em",
            },
            p: {
              color: theme("colors.bathhouse-slate"),
              lineHeight: "1.75",
            },
            a: {
              color: theme("colors.bathhouse-teal"),
              textDecoration: "none",
              "&:hover": {
                color: theme("colors.bathhouse-black"),
              },
            },
            img: {
              borderRadius: theme("borderRadius.lg"),
              marginTop: "2em",
              marginBottom: "2em",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            },
            blockquote: {
              borderLeftColor: theme("colors.bathhouse-stone"),
              color: theme("colors.bathhouse-slate"),
              fontStyle: "italic",
            },
            code: {
              backgroundColor: theme("colors.bathhouse-cream"),
              color: theme("colors.bathhouse-black"),
              padding: "0.25rem 0.5rem",
              borderRadius: "0.25rem",
            },
          },
        },
      })
  	}
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
