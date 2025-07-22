"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Link,
  Heading2,
  Quote,
  Image,
  Minus,
  Code,
  Eye,
  Edit
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EnhancedEditorProps {
  content: string
  onContentChange: (content: string) => void
  placeholder?: string
  minHeight?: string
}

export function EnhancedEditor({ 
  content, 
  onContentChange, 
  placeholder = "Write your content here...",
  minHeight = "400px"
}: EnhancedEditorProps) {
  const [isPreview, setIsPreview] = useState(false)
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imageAlt, setImageAlt] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertText = (before: string, after: string = '', selectionOffset = 0) => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end)
    
    onContentChange(newText)
    
    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus()
      const newPosition = selectedText ? start + before.length + selectedText.length + selectionOffset : start + before.length + selectionOffset
      textarea.setSelectionRange(newPosition, newPosition)
    }, 0)
  }

  const insertLink = () => {
    if (linkUrl) {
      const linkMarkdown = `[${linkText || linkUrl}](${linkUrl})`
      insertText(linkMarkdown, '', 0)
      setShowLinkDialog(false)
      setLinkUrl("")
      setLinkText("")
    }
  }

  const insertImage = () => {
    if (imageUrl) {
      const imageMarkdown = `![${imageAlt || 'Image'}](${imageUrl})`
      insertText(imageMarkdown, '', 0)
      setShowImageDialog(false)
      setImageUrl("")
      setImageAlt("")
    }
  }

  const formatButtons = [
    { icon: Bold, label: "Bold", action: () => insertText('**', '**') },
    { icon: Italic, label: "Italic", action: () => insertText('*', '*') },
    { icon: Heading2, label: "Heading", action: () => insertText('## ') },
    { icon: Quote, label: "Quote", action: () => insertText('> ') },
    { icon: List, label: "Bullet List", action: () => insertText('- ') },
    { icon: ListOrdered, label: "Numbered List", action: () => insertText('1. ') },
    { icon: Minus, label: "Divider", action: () => insertText('\n---\n') },
    { icon: Code, label: "Code", action: () => insertText('`', '`') },
  ]

  // Convert markdown to HTML for preview
  const renderMarkdown = (text: string) => {
    return text
      // Headers
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Images
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width: 100%;" />')
      // Lists
      .replace(/^\s*- (.*$)/gm, '<li>$1</li>')
      .replace(/^\s*\d+\. (.*$)/gm, '<li>$1</li>')
      // Blockquotes
      .replace(/^\> (.*$)/gm, '<blockquote>$1</blockquote>')
      // Code
      .replace(/`(.*?)`/g, '<code>$1</code>')
      // Horizontal rule
      .replace(/^---$/gm, '<hr />')
      // Paragraphs
      .replace(/\n\n/g, '</p><p>')
      // Line breaks
      .replace(/\n/g, '<br />')
  }

  return (
    <div className="border rounded-md bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gray-50">
        <TooltipProvider>
          {formatButtons.map(({ icon: Icon, label, action }) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={action}
                  className="h-8 w-8 p-0"
                >
                  <Icon className="h-4 w-4" />
                  <span className="sr-only">{label}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          ))}

          {/* Link Dialog */}
          <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Link className="h-4 w-4" />
                <span className="sr-only">Insert Link</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Insert Link</DialogTitle>
                <DialogDescription>Add a hyperlink to your content</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="link-text">Link Text</Label>
                  <Input
                    id="link-text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    placeholder="Click here"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link-url">URL</Label>
                  <Input
                    id="link-url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <DialogClose asChild>
                  <Button variant="outline" className="mr-2">Cancel</Button>
                </DialogClose>
                <Button onClick={insertLink}>Insert Link</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Image Dialog */}
          <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Image className="h-4 w-4" />
                <span className="sr-only">Insert Image</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Insert Image</DialogTitle>
                <DialogDescription>Add an image to your content</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="image-url">Image URL</Label>
                  <Input
                    id="image-url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image-alt">Alt Text</Label>
                  <Input
                    id="image-alt"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    placeholder="Description of image"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <DialogClose asChild>
                  <Button variant="outline" className="mr-2">Cancel</Button>
                </DialogClose>
                <Button onClick={insertImage}>Insert Image</Button>
              </div>
            </DialogContent>
          </Dialog>

          <div className="ml-auto">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={isPreview ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsPreview(!isPreview)}
                  className="gap-1"
                >
                  {isPreview ? <Edit className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {isPreview ? "Edit" : "Preview"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isPreview ? "Switch to editor" : "Preview your content"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      {/* Editor/Preview */}
      {isPreview ? (
        <div 
          className="p-4 prose prose-sm max-w-none overflow-auto"
          style={{ minHeight }}
          dangerouslySetInnerHTML={{ __html: `<p>${renderMarkdown(content)}</p>` }}
        />
      ) : (
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="min-h-[400px] border-0 resize-none focus:ring-0 font-mono text-sm"
          placeholder={placeholder}
          style={{ minHeight }}
        />
      )}
    </div>
  )
}