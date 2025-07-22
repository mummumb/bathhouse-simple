import ContactFormSimple from "@/components/contact-form-simple"

export default function BookPage() {
  return (
    <main className="pt-20">
      <section className="bathhouse-section bg-bathhouse-cream">
        <div className="bathhouse-container">
          <h1 className="bathhouse-heading text-4xl md:text-5xl text-center mb-8 text-bathhouse-black">Book Your Experience</h1>
          <p className="text-lg text-center max-w-2xl mx-auto text-bathhouse-slate">
            Ready to begin your wellness journey? Contact us to reserve your spot for our upcoming events.
          </p>
        </div>
      </section>
      <ContactFormSimple />
    </main>
  )
}