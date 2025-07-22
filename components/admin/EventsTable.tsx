"use client"

import DataTable from "./DataTable"
import { formatDate } from "@/lib/utils"

interface EventsTableProps {
  data: any[]
  onDelete: (id: string) => Promise<{ success: boolean; message: string }>
}

export function EventsTable({ data, onDelete }: EventsTableProps) {
  // Define render functions as components to avoid serialization issues
  const DateCell = ({ date }: { date: string }) => <span>{formatDate(date)}</span>
  const PriceCell = ({ price }: { price: number }) => <span>${price}</span>

  const TimeCell = ({ time }: { time: string }) => <span>{time}</span>

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
      key: "time",
      label: "Time",
      render: (time: string) => <TimeCell time={time} />,
    },
    {
      key: "location",
      label: "Location",
    },
    {
      key: "capacity",
      label: "Capacity",
    },
    {
      key: "price",
      label: "Price",
      render: (price: number) => <PriceCell price={price} />,
    },
  ]

  return (
    <DataTable 
      data={data} 
      columns={columns}
      searchKey="title"
      editPath="/admin/dashboard/events"
      deleteAction={onDelete}
    />
  )
}