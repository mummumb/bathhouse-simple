import ContactSection from "@/components/contact-section"

export default function BookPage() {
  return (
    <main className="pt-20">
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-light text-center mb-8">Book Your Experience</h1>
          <p className="text-lg text-center max-w-2xl mx-auto text-gray-700">
            Ready to begin your wellness journey? Contact us to reserve your spot for our upcoming events.
          </p>
        </div>
      </section>
      <ContactSection />
    </main>
  )
}