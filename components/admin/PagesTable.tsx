"use client"

import DataTable from "./DataTable"

interface PagesTableProps {
  data: any[]
  onDelete: (id: string) => Promise<{ success: boolean; message: string }>
}

export default function PagesTable({ data, onDelete }: PagesTableProps) {
  // Define render functions as components to avoid serialization issues
  const StatusCell = ({ published }: { published: boolean }) => (
    <span className={`px-2 py-1 rounded-full text-xs ${
      published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
    }`}>
      {published ? 'Published' : 'Draft'}
    </span>
  )

  const columns = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "slug",
      label: "Slug",
    },
    {
      key: "is_published",
      label: "Status",
      render: (published: boolean) => <StatusCell published={published} />,
    },
  ]

  return (
    <DataTable 
      data={data} 
      columns={columns}
      searchKey="title"
      editPath="/admin/dashboard/pages"
      deleteAction={onDelete}
    />
  )
}