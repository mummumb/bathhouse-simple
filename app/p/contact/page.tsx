"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, MessageCircle } from "lucide-react"
import { useCSRFToken } from "@/hooks/use-csrf-token"

export default function ContactPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { csrfToken } = useCSRFToken()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      newsletter: formData.get("newsletter") === "on"
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken || ""
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you as soon as possible.",
        })
        e.currentTarget.reset()
      } else {
        throw new Error(result.error || "Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: Mail,
      title: "Email",
      content: "hello@bathhousestudio.com",
      link: "mailto:hello@bathhousestudio.com"
    },
    {
      icon: MapPin,
      title: "Location",
      content: "123 Wellness Way, Portland, OR 97201",
      link: "https://maps.google.com"
    },
    {
      icon: Clock,
      title: "Hours",
      content: "Mon-Sun: 7:00 AM - 10:00 PM",
      link: null
    }
  ]

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/bathhousestudio", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/bathhousestudio", label: "Facebook" },
    { icon: MessageCircle, href: "https://wa.me/15551234567", label: "WhatsApp" }
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-bathhouse-cream py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-bathhouse-black mb-6">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-bathhouse-slate max-w-3xl mx-auto">
            We're here to help you on your wellness journey. Reach out with questions, booking inquiries, or just to say hello.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-heading text-bathhouse-black mb-8">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      className="mt-1"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-1"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="mt-1"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    required
                    className="mt-1"
                    placeholder="How can we help?"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="mt-1"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    id="newsletter"
                    name="newsletter"
                    type="checkbox"
                    className="h-4 w-4 text-bathhouse-teal focus:ring-bathhouse-teal border-gray-300 rounded"
                  />
                  <Label htmlFor="newsletter" className="ml-2 cursor-pointer">
                    Subscribe to our newsletter for wellness tips and event updates
                  </Label>
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-bathhouse-teal hover:bg-bathhouse-slate text-white"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-heading text-bathhouse-black mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-6 mb-12">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-bathhouse-cream rounded-full p-3 mr-4">
                      <info.icon className="w-5 h-5 text-bathhouse-teal" />
                    </div>
                    <div>
                      <h3 className="font-heading text-bathhouse-black mb-1">
                        {info.title}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-bathhouse-slate hover:text-bathhouse-teal transition-colors"
                          target={info.link.startsWith("http") ? "_blank" : undefined}
                          rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-bathhouse-slate">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-heading text-bathhouse-black mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-bathhouse-cream rounded-full p-3 hover:bg-bathhouse-teal hover:text-white transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-12 bg-bathhouse-cream rounded-lg h-64 flex items-center justify-center">
                <p className="text-bathhouse-slate">Interactive map coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-bathhouse-cream">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-heading text-bathhouse-black mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-heading text-bathhouse-black mb-2">
                What should I bring to my first visit?
              </h3>
              <p className="text-bathhouse-slate">
                We provide towels, robes, and sandals. Just bring yourself, a water bottle, and an open mind. 
                Don't forget to bring a swimsuit if you prefer to wear one.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-heading text-bathhouse-black mb-2">
                Do I need to book in advance?
              </h3>
              <p className="text-bathhouse-slate">
                We recommend booking at least 24 hours in advance, especially for weekend sessions and special 
                ceremonies. Walk-ins are welcome based on availability.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-heading text-bathhouse-black mb-2">
                Are there any health restrictions?
              </h3>
              <p className="text-bathhouse-slate">
                Please consult with your doctor if you have cardiovascular conditions, are pregnant, or have 
                other health concerns. We're happy to discuss modifications to accommodate your needs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-heading text-bathhouse-black mb-2">
                What's your cancellation policy?
              </h3>
              <p className="text-bathhouse-slate">
                We offer full refunds for cancellations made at least 24 hours before your scheduled session. 
                Late cancellations may be subject to a fee.
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <p className="text-bathhouse-slate mb-4">Have more questions?</p>
            <Link href="/p/book">
              <Button className="bg-bathhouse-teal hover:bg-bathhouse-slate text-white">
                Book a Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}