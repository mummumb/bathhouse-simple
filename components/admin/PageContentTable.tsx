"use client"

import DataTable from "./DataTable"
import type { PageContent } from "@/lib/types"

interface PageContentTableProps {
  data: PageContent[]
  onDelete: (id: string) => Promise<{ success: boolean; message: string }>
}

export function PageContentTable({ data, onDelete }: PageContentTableProps) {
  // Define render functions as components to avoid serialization issues
  const ContentPreviewCell = ({ content }: { content: string }) => {
    const plainText = content.replace(/<[^>]*>/g, '')
    return <span>{plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText}</span>
  }

  const StatusCell = ({ published }: { published: boolean }) => (
    <span className={`px-2 py-1 rounded-full text-xs ${
      published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
    }`}>
      {published ? 'Published' : 'Draft'}
    </span>
  )

  const columns = [
    {
      key: "section",
      label: "Section",
    },
    {
      key: "title",
      label: "Title",
    },
    {
      key: "content",
      label: "Content Preview",
      render: (content: string) => <ContentPreviewCell content={content} />
    },
    {
      key: "published",
      label: "Status",
      render: (published: boolean) => <StatusCell published={published} />,
    },
  ]

  return (
    <DataTable 
      data={data} 
      columns={columns}
      searchKey="title"
      editPath="/admin/dashboard/page-content"
      deleteAction={onDelete}
    />
  )
}