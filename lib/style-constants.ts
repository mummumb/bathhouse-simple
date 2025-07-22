/**
 * Consistent style classes for the Bathhouse Studio theme
 */

export const styles = {
  // Typography
  heading: {
    h1: "text-4xl md:text-5xl font-heading text-bathhouse-black font-light leading-tight",
    h2: "text-3xl md:text-4xl font-heading text-bathhouse-black font-light",
    h3: "text-xl md:text-2xl font-heading text-bathhouse-black",
    h4: "text-lg md:text-xl font-heading text-bathhouse-black",
  },
  
  text: {
    body: "text-bathhouse-slate leading-relaxed",
    bodyLarge: "text-lg text-bathhouse-slate leading-relaxed",
    small: "text-sm text-bathhouse-slate",
    accent: "text-bathhouse-teal",
  },
  
  // Sections
  section: {
    base: "py-12 md:py-24",
    light: "py-12 md:py-24 bg-bathhouse-cream",
    white: "py-12 md:py-24 bg-white",
  },
  
  // Containers
  container: "container mx-auto px-4",
  
  // Cards
  card: {
    base: "bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300",
    image: "relative h-48 bg-bathhouse-stone",
    content: "p-6",
  },
  
  // Buttons
  button: {
    primary: "bg-bathhouse-teal hover:bg-bathhouse-slate text-white px-6 py-3 rounded-md transition-colors",
    secondary: "border border-bathhouse-teal text-bathhouse-teal hover:bg-bathhouse-teal hover:text-white px-6 py-3 rounded-md transition-colors",
  },
  
  // Grid
  grid: {
    cols3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
    cols2: "grid grid-cols-1 md:grid-cols-2 gap-8",
  },
}

// Utility function to combine classes
export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}