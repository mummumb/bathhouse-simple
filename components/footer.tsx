export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-bathhouse-black text-bathhouse-white py-12">
      <div className="bathhouse-container text-center">
        <p className="text-sm text-bathhouse-white/80">
          © {currentYear} Bathhouse Studio. All rights reserved.
        </p>
      </div>
    </footer>
  )
}