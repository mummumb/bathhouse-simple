export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-white/80">
          © {currentYear} Bathhouse Studio. All rights reserved.
        </p>
      </div>
    </footer>
  )
}