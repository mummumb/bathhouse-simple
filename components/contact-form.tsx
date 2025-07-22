"use client"

import { useState, type FormEvent } from "react"
import { supabaseBrowser } from "@/lib/supabase-browser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [feedbackMessage, setFeedbackMessage] = useState("")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("submitting")
    setFeedbackMessage("")

    const { error } = await supabaseBrowser.from("contacts").insert([{ name, email, message }])

    if (error) {
      setStatus("error")
      setFeedbackMessage(`Error: ${error.message}`)
    } else {
      setStatus("success")
      setFeedbackMessage("Thank you for your message! We will get back to you soon.")
      // Reset form
      setName("")
      setEmail("")
      setMessage("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg mx-auto">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Your Name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your.email@example.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="How can we help?"
          rows={5}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <Button type="submit" disabled={status === "submitting"} className="w-full">
          {status === "submitting" ? "Sending..." : "Send Message"}
        </Button>
        {status === "success" && <p className="text-green-600 text-sm">{feedbackMessage}</p>}
        {status === "error" && <p className="text-red-600 text-sm">{feedbackMessage}</p>}
      </div>
    </form>
  )
}
