"use client"

import { useEffect, useRef, useState } from "react"
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Redo, 
  Strikethrough, 
  Underline, 
  Undo,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Link,
  Image,
  Code,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  FileText,
  Youtube,
  ExternalLink,
  Zap
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface WysiwygEditorProps {
  content: string
  onContentChange: (content: string) => void
}

export function WysiwygEditor({ content, onContentChange }: WysiwygEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [showEmbedDialog, setShowEmbedDialog] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imageAlt, setImageAlt] = useState("")
  const [embedCode, setEmbedCode] = useState("")

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content
    }
  }, [content])

  const handleInput = () => {
    if (editorRef.current) {
      onContentChange(editorRef.current.innerHTML)
    }
  }

  const applyFormat = (command: string, value: string | null = null) => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      onContentChange(editorRef.current.innerHTML)
    }
    editorRef.current?.focus()
  }

  const insertLink = () => {
    if (linkUrl && linkText) {
      const link = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="text-bathhouse-teal hover:underline">${linkText}</a>`
      document.execCommand('insertHTML', false, link)
      setShowLinkDialog(false)
      setLinkUrl("")
      setLinkText("")
      if (editorRef.current) {
        onContentChange(editorRef.current.innerHTML)
      }
    }
  }

  const insertImage = () => {
    if (imageUrl) {
      const img = `<img src="${imageUrl}" alt="${imageAlt}" class="rounded-lg my-4 max-w-full" />`
      document.execCommand('insertHTML', false, img)
      setShowImageDialog(false)
      setImageUrl("")
      setImageAlt("")
      if (editorRef.current) {
        onContentChange(editorRef.current.innerHTML)
      }
    }
  }

  const insertEmbed = () => {
    if (embedCode) {
      const div = `<div class="my-4">${embedCode}</div>`
      document.execCommand('insertHTML', false, div)
      setShowEmbedDialog(false)
      setEmbedCode("")
      if (editorRef.current) {
        onContentChange(editorRef.current.innerHTML)
      }
    }
  }

  const insertDivider = () => {
    const hr = `<hr class="my-8 border-bathhouse-stone" />`
    document.execCommand('insertHTML', false, hr)
    if (editorRef.current) {
      onContentChange(editorRef.current.innerHTML)
    }
  }

  const insertCTA = () => {
    const cta = `<div class="bg-bathhouse-cream rounded-lg p-6 my-8 text-center">
      <h3 class="text-xl font-heading text-bathhouse-black mb-2">Ready to get started?</h3>
      <p class="text-bathhouse-slate mb-4">Book your first session today.</p>
      <a href="/p/book" class="inline-block bg-bathhouse-teal hover:bg-bathhouse-slate text-white px-6 py-3 rounded-md transition-colors">Book Now</a>
    </div>`
    document.execCommand('insertHTML', false, cta)
    if (editorRef.current) {
      onContentChange(editorRef.current.innerHTML)
    }
  }

  return (
    <div className="rounded-md border bg-white">
      <div className="flex flex-wrap gap-1 border-b p-2 bg-gray-50">
        {/* Text formatting */}
        <div className="flex gap-1 pr-2 border-r">
          <Button onClick={() => applyFormat("bold")} size="icon" type="button" variant="ghost" className="hover:bg-gray-200">
            <Bold className="h-4 w-4" />
            <span className="sr-only">Bold</span>
          </Button>
          <Button onClick={() => applyFormat("italic")} size="icon" type="button" variant="ghost" className="hover:bg-gray-200">
            <Italic className="h-4 w-4" />
            <span className="sr-only">Italic</span>
          </Button>
          <Button onClick={() => applyFormat("underline")} size="icon" type="button" variant="ghost" className="hover:bg-gray-200">
            <Underline className="h-4 w-4" />
            <span className="sr-only">Underline</span>
          </Button>
          <Button onClick={() => applyFormat("strikeThrough")} size="icon" type="button" variant="ghost" className="hover:bg-gray-200">
            <Strikethrough className="h-4 w-4" />
            <span className="sr-only">Strikethrough</span>
          </Button>
        </div>
        
        {/* Headings */}
        <div className="flex gap-1 pr-2 border-r">
          <Button onClick={() => applyFormat("formatBlock", "<h1>")} size="icon" type="button" variant="ghost" className="hover:bg-gray-200">
            <Heading1 className="h-4 w-4" />
            <span className="sr-only">Heading 1</span>
          </Button>
          <Button onClick={() => applyFormat("formatBlock", "<h2>")} size="icon" type="button" variant="ghost" className="hover:bg-gray-200">
            <Heading2 className="h-4 w-4" />
            <span className="sr-only">Heading 2</span>
          </Button>
          <Button onClick={() => applyFormat("formatBlock", "<h3>")} size="icon" type="button" variant="ghost" className="hover:bg-gray-200">
            <Heading3 className="h-4 w-4" />
            <span className="sr-only">Heading 3</span>
          </Button>
        </div>
        
        {/* Lists and alignment */}
        <div className="flex gap-1 pr-2 border-r">
          <Button onClick={() => applyFormat("insertUnorderedList")} size="icon" type="button" variant="ghost" className="hover:bg-gray-200">
            <List className="h-4 w-4" />
            <span className="sr-only">Unordered List</span>
          </Button>
          <Button onClick={() => applyFormat("insertOrderedList")} size="icon" type="button" variant="ghost" className="hover:bg-gray-200">
            <ListOrdered className="h-4 w-4" />
            <span className="sr-only">Ordered List</span>
          </Button>
          <Button onClick={() => applyFormat("formatBlock", "<blockquote>")} size="icon" type="button" variant="ghost" className="hover:bg-gray-200">
            <Quote className="h-4 w-4" />
            <span className="sr-only">Quote</span>
          </Button>
        </div>
        
        {/* Insert elements */}
        <div className="flex gap-1 pr-2 border-r">
          <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
            <DialogTrigger asChild>
              <Button size="icon" type="button" variant="ghost" className="hover:bg-gray-200">
                <Link className="h-4 w-4" />
                <span className="sr-only">Insert Link</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Insert Link</DialogTitle>
                <DialogDescription>Add a hyperlink to your content</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="link-text">Link Text</Label>
                  <Input
                    id="link-text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    placeholder="Click here"
                  />
                </div>
                <div>
                  <Label htmlFor="link-url">URL</Label>
                  <Input
                    id="link-url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
                <Button onClick={insertLink} className="w-full">Insert Link</Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
            <DialogTrigger asChild>
              <Button size="icon" type="button" variant="ghost" className="hover:bg-gray-200">
                <Image className="h-4 w-4" />
                <span className="sr-only">Insert Image</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Insert Image</DialogTitle>
                <DialogDescription>Add an image to your content</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="image-url">Image URL</Label>
                  <Input
                    id="image-url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="image-alt">Alt Text</Label>
                  <Input
                    id="image-alt"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    placeholder="Description of image"
                  />
                </div>
                <Button onClick={insertImage} className="w-full">Insert Image</Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button onClick={insertDivider} size="icon" type="button" variant="ghost" className="hover:bg-gray-200">
            <Minus className="h-4 w-4" />
            <span className="sr-only">Insert Divider</span>
          </Button>
          
          <Dialog open={showEmbedDialog} onOpenChange={setShowEmbedDialog}>
            <DialogTrigger asChild>
              <Button size="icon" type="button" variant="ghost" className="hover:bg-gray-200">
                <Code className="h-4 w-4" />
                <span className="sr-only">Embed Code</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Embed Code</DialogTitle>
                <DialogDescription>Add an iframe or embed code</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="embed-code">Embed Code</Label>
                  <Textarea
                    id="embed-code"
                    value={embedCode}
                    onChange={(e) => setEmbedCode(e.target.value)}
                    placeholder="<iframe src='...'></iframe>"
                    rows={4}
                  />
                </div>
                <Button onClick={insertEmbed} className="w-full">Insert Embed</Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button onClick={insertCTA} size="icon" type="button" variant="ghost" className="hover:bg-gray-200">
            <Zap className="h-4 w-4" />
            <span className="sr-only">Insert CTA</span>
          </Button>
        </div>
        
        {/* Undo/Redo */}
        <div className="flex gap-1">
          <Button onClick={() => applyFormat("undo")} size="icon" type="button" variant="ghost" className="hover:bg-gray-200">
            <Undo className="h-4 w-4" />
            <span className="sr-only">Undo</span>
          </Button>
          <Button onClick={() => applyFormat("redo")} size="icon" type="button" variant="ghost" className="hover:bg-gray-200">
            <Redo className="h-4 w-4" />
            <span className="sr-only">Redo</span>
          </Button>
        </div>
      </div>
      <div
        contentEditable
        className="min-h-[300px] p-6 focus:outline-none bg-white text-gray-900 prose prose-sm max-w-none"
        onInput={handleInput}
        ref={editorRef}
        suppressContentEditableWarning
        style={{
          color: '#1a1a1a',
          lineHeight: '1.6'
        }}
      />
    </div>
  )
}
