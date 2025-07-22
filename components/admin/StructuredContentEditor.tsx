"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react"

interface StructuredContentEditorProps {
  content: string
  onChange: (content: string) => void
  section: string
}

export function StructuredContentEditor({ content, onChange, section }: StructuredContentEditorProps) {
  // Parse existing content or create default structure
  const parseContent = () => {
    if (!content || content === '') {
      // No content, will use default structure below
    } else {
      try {
        const parsed = JSON.parse(content)
        if (typeof parsed === 'object' && !Array.isArray(parsed) && 'elements' in parsed) {
          return parsed
        }
      } catch (e) {
        // If parsing fails, will use default structure below
      }
    }

    // Default structure for Aufguss/Values section
    if (section === 'values' || section === 'aufguss') {
      return {
        title: "The Aufguss Ritual",
        description: "A five-step, multi-sensory experience—steam, aromatherapy, curated music, towel work, and the mindful guidance of a master.",
        elements: [
          { icon: "steam", label: "Steam", description: "Carefully controlled heat and humidity" },
          { icon: "aromatherapy", label: "Aromatherapy", description: "Essential oils chosen for their therapeutic properties" },
          { icon: "music", label: "Curated Music", description: "Soundscapes that guide the journey" },
          { icon: "towel", label: "Towel Work", description: "Choreographed movements that distribute heat" },
          { icon: "heart", label: "Mindful Guidance", description: "The presence and expertise of a master" }
        ],
        benefits: [
          { icon: "detox", label: "Deep Detoxification" },
          { icon: "circulation", label: "Improved Circulation" },
          { icon: "clarity", label: "Calm & Clarity" },
          { icon: "presence", label: "Mindful Presence" }
        ],
        quote: {
          text: "A sauna master does with their rituals as a sommelier does with their wine.",
          author: "Amanda Berger"
        }
      }
    }

    // Return HTML content as is for other sections
    return null
  }

  const [structuredData, setStructuredData] = useState(parseContent())
  const [isStructured, setIsStructured] = useState(structuredData !== null)

  const handleStructuredChange = (newData: any) => {
    setStructuredData(newData)
    onChange(JSON.stringify(newData, null, 2))
  }

  const addElement = () => {
    const newData = {
      ...structuredData,
      elements: [...(structuredData.elements || []), { icon: "heart", label: "", description: "" }]
    }
    handleStructuredChange(newData)
  }

  const removeElement = (index: number) => {
    const newData = {
      ...structuredData,
      elements: structuredData.elements.filter((_: any, i: number) => i !== index)
    }
    handleStructuredChange(newData)
  }

  const moveElement = (index: number, direction: 'up' | 'down') => {
    const elements = [...structuredData.elements]
    if (direction === 'up' && index > 0) {
      [elements[index], elements[index - 1]] = [elements[index - 1], elements[index]]
    } else if (direction === 'down' && index < elements.length - 1) {
      [elements[index], elements[index + 1]] = [elements[index + 1], elements[index]]
    }
    handleStructuredChange({ ...structuredData, elements })
  }

  const updateElement = (index: number, field: string, value: string) => {
    const newData = {
      ...structuredData,
      elements: structuredData.elements.map((el: any, i: number) => 
        i === index ? { ...el, [field]: value } : el
      )
    }
    handleStructuredChange(newData)
  }

  const addBenefit = () => {
    const newData = {
      ...structuredData,
      benefits: [...(structuredData.benefits || []), { icon: "heart", label: "" }]
    }
    handleStructuredChange(newData)
  }

  const removeBenefit = (index: number) => {
    const newData = {
      ...structuredData,
      benefits: structuredData.benefits.filter((_: any, i: number) => i !== index)
    }
    handleStructuredChange(newData)
  }

  const updateBenefit = (index: number, field: string, value: string) => {
    const newData = {
      ...structuredData,
      benefits: structuredData.benefits.map((b: any, i: number) => 
        i === index ? { ...b, [field]: value } : b
      )
    }
    handleStructuredChange(newData)
  }

  const iconOptions = [
    { value: "steam", label: "Steam" },
    { value: "aromatherapy", label: "Aromatherapy" },
    { value: "music", label: "Music" },
    { value: "towel", label: "Towel" },
    { value: "heart", label: "Heart" },
    { value: "detox", label: "Detox" },
    { value: "circulation", label: "Circulation" },
    { value: "clarity", label: "Clarity" },
    { value: "presence", label: "Presence" }
  ]

  if (!isStructured || !structuredData) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Content Editor</Label>
          {(section === 'values' || section === 'aufguss') && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setIsStructured(true)
                setStructuredData(parseContent())
                handleStructuredChange(parseContent())
              }}
            >
              Switch to Structured Editor
            </Button>
          )}
        </div>
        <Textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          rows={10}
          className="font-mono text-sm"
          placeholder="Enter HTML content or JSON data..."
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Structured Content Editor</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setIsStructured(false)
            onChange(content)
          }}
        >
          Switch to HTML Editor
        </Button>
      </div>

      {/* Title and Description */}
      <Card>
        <CardHeader>
          <CardTitle>Main Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={structuredData.title || ""}
              onChange={(e) => handleStructuredChange({ ...structuredData, title: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={structuredData.description || ""}
              onChange={(e) => handleStructuredChange({ ...structuredData, description: e.target.value })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Elements */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Elements</CardTitle>
          <Button type="button" size="sm" onClick={addElement}>
            <Plus className="w-4 h-4 mr-1" /> Add Element
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {structuredData.elements?.map((element: any, index: number) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Element {index + 1}</span>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => moveElement(index, 'up')}
                    disabled={index === 0}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => moveElement(index, 'down')}
                    disabled={index === structuredData.elements.length - 1}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => removeElement(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label>Icon</Label>
                  <select
                    value={element.icon}
                    onChange={(e) => updateElement(index, 'icon', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    {iconOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Label</Label>
                  <Input
                    value={element.label}
                    onChange={(e) => updateElement(index, 'label', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input
                    value={element.description}
                    onChange={(e) => updateElement(index, 'description', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Benefits</CardTitle>
          <Button type="button" size="sm" onClick={addBenefit}>
            <Plus className="w-4 h-4 mr-1" /> Add Benefit
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {structuredData.benefits?.map((benefit: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
              <select
                value={benefit.icon}
                onChange={(e) => updateBenefit(index, 'icon', e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                {iconOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <Input
                value={benefit.label}
                onChange={(e) => updateBenefit(index, 'label', e.target.value)}
                placeholder="Benefit label"
                className="flex-1"
              />
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => removeBenefit(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quote */}
      <Card>
        <CardHeader>
          <CardTitle>Quote (Optional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="quote-text">Quote Text</Label>
            <Textarea
              id="quote-text"
              value={structuredData.quote?.text || ""}
              onChange={(e) => handleStructuredChange({
                ...structuredData,
                quote: { ...structuredData.quote, text: e.target.value }
              })}
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="quote-author">Author</Label>
            <Input
              id="quote-author"
              value={structuredData.quote?.author || ""}
              onChange={(e) => handleStructuredChange({
                ...structuredData,
                quote: { ...structuredData.quote, author: e.target.value }
              })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preview of JSON */}
      <details>
        <summary className="cursor-pointer text-sm text-gray-600">View JSON Data</summary>
        <pre className="mt-2 p-4 bg-gray-100 rounded-lg text-xs overflow-auto">
          {JSON.stringify(structuredData, null, 2)}
        </pre>
      </details>
    </div>
  )
}