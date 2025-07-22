"use client"

import DataTable from "./DataTable"
import { formatDate } from "@/lib/utils"

interface JournalTableProps {
  data: any[]
  onDelete: (id: string) => Promise<{ success: boolean; message: string }>
}

export default function JournalTable({ data, onDelete }: JournalTableProps) {
  // Define render functions as components to avoid serialization issues
  const DateCell = ({ date }: { date: string }) => <span>{formatDate(date)}</span>
  const ReadTimeCell = ({ time }: { time: number }) => <span>{time} min</span>

  const columns = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "date",
      label: "Date",
      render: (date: string) => <DateCell date={date} />,
    },
    {
      key: "author_name",
      label: "Author",
    },
    {
      key: "read_time",
      label: "Read Time",
      render: (time: number) => <ReadTimeCell time={time} />,
    },
  ]

  return (
    <DataTable 
      data={data} 
      columns={columns}
      searchKey="title"
      editPath="/admin/dashboard/journal"
      deleteAction={onDelete}
    />
  )
}