"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Link,
  Heading2,
  Quote
} from "lucide-react"

interface SimpleEditorProps {
  content: string
  onContentChange: (content: string) => void
}

export function SimpleEditor({ content, onContentChange }: SimpleEditorProps) {
  const [isPreview, setIsPreview] = useState(false)

  const insertText = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea[data-editor="true"]') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end)
    onContentChange(newText)
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }

  const formatButtons = [
    { icon: Bold, label: "Bold", before: "**", after: "**" },
    { icon: Italic, label: "Italic", before: "*", after: "*" },
    { icon: Heading2, label: "Heading", before: "## ", after: "" },
    { icon: Quote, label: "Quote", before: "> ", after: "" },
    { icon: List, label: "Bullet List", before: "- ", after: "" },
    { icon: ListOrdered, label: "Numbered List", before: "1. ", after: "" },
    { icon: Link, label: "Link", before: "[", after: "](url)" },
  ]

  return (
    <div className="border rounded-md bg-white">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b bg-gray-50">
        {formatButtons.map(({ icon: Icon, label, before, after }) => (
          <Button
            key={label}
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertText(before, after)}
            title={label}
          >
            <Icon className="h-4 w-4" />
          </Button>
        ))}
        <div className="ml-auto">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsPreview(!isPreview)}
          >
            {isPreview ? "Edit" : "Preview"}
          </Button>
        </div>
      </div>

      {/* Editor/Preview */}
      {isPreview ? (
        <div className="p-4 min-h-[300px] prose prose-sm max-w-none">
          <div dangerouslySetInnerHTML={{ 
            __html: content
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/^## (.*$)/gm, '<h2>$1</h2>')
              .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
              .replace(/^- (.*$)/gm, '<li>$1</li>')
              .replace(/^1\. (.*$)/gm, '<li>$1</li>')
              .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
              .replace(/\n/g, '<br>')
          }} />
        </div>
      ) : (
        <Textarea
          data-editor="true"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="min-h-[300px] border-0 resize-none focus:ring-0"
          placeholder="Start writing... Use the toolbar buttons for formatting, or type:
          
**bold text** for bold
*italic text* for italic  
## Heading for headings
> Quote for blockquotes
- List item for bullets
[Link text](url) for links"
        />
      )}
    </div>
  )
}