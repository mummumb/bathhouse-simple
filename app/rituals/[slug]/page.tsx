import Image from "next/image"
import { notFound } from "next/navigation"
import { getRitualBySlug } from "@/lib/data-utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calendar, Clock, MapPin, Zap } from "lucide-react"
import Link from "next/link"

export default async function RitualDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const ritual = await getRitualBySlug(slug)

    if (!ritual) {
      notFound()
    }

  const { title, subtitle, image, image_alt, full_description, date, location, instructor, schedule, faqs, benefits } =
    ritual

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-none shadow-lg bg-bathhouse-cream">
              {image && (
                <div className="relative h-64 md:h-96 w-full">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={image_alt || title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="font-heading text-4xl md:text-5xl">{title}</CardTitle>
                <p className="text-lg md:text-xl text-bathhouse-slate mt-2">{subtitle}</p>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: full_description || "" }}
                />

                {benefits && benefits.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-heading text-2xl mb-4">Key Benefits</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {benefits.map((benefit: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Zap className="h-5 w-5 text-bathhouse-peach mt-1 flex-shrink-0" />
                          <p className="text-bathhouse-slate">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card className="border-none shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">Ritual Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-3 text-bathhouse-slate" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-3 text-bathhouse-slate" />
                  <span>{location}</span>
                </div>
                {ritual.duration && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-3 text-bathhouse-slate" />
                    <span>{ritual.duration}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {instructor && (
              <Card className="border-none shadow-lg bg-white">
                <CardHeader className="flex flex-row items-center space-x-4">
                  {instructor.image && (
                    <Image
                      src={instructor.image || "/placeholder.svg"}
                      alt={instructor.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <CardTitle className="font-heading text-xl">{instructor.name}</CardTitle>
                    <p className="text-sm text-bathhouse-slate">{instructor.title}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-bathhouse-slate">{instructor.bio}</p>
                </CardContent>
              </Card>
            )}

            {schedule && schedule.length > 0 && (
              <Card className="border-none shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl">Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {schedule.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Badge variant="outline" className="mr-3 mt-1 whitespace-nowrap">
                          {item.time}
                        </Badge>
                        <span className="text-bathhouse-slate">{item.activity}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {faqs && faqs.length > 0 && (
              <Card className="border-none shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl">FAQs</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
  } catch (error) {
    console.error('Error loading ritual:', error)
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-heading text-bathhouse-black mb-4">Error Loading Ritual</h1>
            <p className="text-bathhouse-slate mb-8">We're having trouble loading this ritual. Please try again later.</p>
            <Link href="/rituals" className="button-primary">
              Back to Rituals
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
