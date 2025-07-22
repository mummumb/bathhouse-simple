"use client"

import { useState } from "react"

export default function ContactFormSimple() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: 'amanda@bathhousestudio.com.au'
        }),
      })
      
      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => {
          setFormData({ name: "", email: "", message: "" })
          setSubmitted(false)
        }, 3000)
      } else {
        alert('There was an error sending your message. Please try again.')
      }
    } catch (error) {
      alert('There was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="bathhouse-section bg-white">
      <div className="bathhouse-container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="bathhouse-heading text-4xl md:text-5xl mb-6 text-bathhouse-black">Connect</h2>
          <p className="text-lg text-bathhouse-slate mb-12">
            Interested in joining a ritual or collaborating? Fill out the form below and Amanda will be in touch.
          </p>
          
          {submitted ? (
            <div className="bg-bathhouse-cream p-8 rounded-lg text-center">
              <p className="text-lg text-bathhouse-slate">Thank you for your message. We'll be in touch soon!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-bathhouse-slate mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-bathhouse-stone rounded-md focus:outline-none focus:ring-2 focus:ring-bathhouse-teal focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-bathhouse-slate mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-bathhouse-stone rounded-md focus:outline-none focus:ring-2 focus:ring-bathhouse-teal focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-bathhouse-slate mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-bathhouse-stone rounded-md focus:outline-none focus:ring-2 focus:ring-bathhouse-teal focus:border-transparent resize-none"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-block bg-bathhouse-black text-bathhouse-white px-8 py-3 rounded-md hover:bg-bathhouse-slate transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-normal tracking-wide"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}