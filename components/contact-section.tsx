export default function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-20 bg-bathhouse-slate">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-heading text-white mb-8">Get In Touch</h2>
        <p className="text-bathhouse-cream mb-12 text-responsive-lg max-w-2xl mx-auto">
          Ready to experience the transformative power of authentic sauna rituals? 
          Join us for a journey of wellness and renewal.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <a
            href="mailto:info@bathhousestudio.berlin"
            className="bg-bathhouse-teal hover:bg-bathhouse-slate text-white font-medium py-3 px-6 sm:px-8 rounded-md transition-colors duration-200 w-full sm:w-auto text-responsive-base"
          >
            Email Us
          </a>
          <a
            href="/p/book"
            className="bg-bathhouse-stone hover:bg-bathhouse-slate text-bathhouse-black hover:text-white font-medium py-3 px-6 sm:px-8 rounded-md transition-all duration-200 w-full sm:w-auto text-responsive-base"
          >
            Book a Session
          </a>
          <a
            href="https://www.instagram.com/bathhousestudio.berlin/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-bathhouse-pink hover:bg-bathhouse-slate text-white font-medium py-3 px-6 sm:px-8 rounded-md transition-colors duration-200 w-full sm:w-auto text-responsive-base"
          >
            Follow Us
          </a>
        </div>
        <div className="mt-12 text-bathhouse-cream">
          <p className="mb-2">Flughafenstraße 52, 12053 Berlin</p>
          <p>Open Tuesday - Sunday</p>
        </div>
      </div>
    </section>
  )
}
