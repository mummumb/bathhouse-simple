"use client"

import { useState } from 'react'
import Link from 'next/link'
import PublishButton from './PublishButton'
import StatusIndicator from './StatusIndicator'

interface Column {
  key: string
  label?: string
  header?: string
  render?: (value: any, row: any) => React.ReactNode
  sortable?: boolean
}

interface DataTableProps {
  data: any[]
  columns: Column[]
  itemType?: 'event' | 'ritual' | 'journal' | 'page' | 'post'
  basePath?: string
  editPath?: string
  searchKey?: string
  deleteAction?: (id: string) => Promise<{ success: boolean; message: string }>
  emptyMessage?: string
  onDelete?: (id: string) => void
}

export default function DataTable({
  data,
  columns,
  itemType,
  basePath,
  editPath,
  searchKey,
  deleteAction,
  emptyMessage = 'No items found',
  onDelete
}: DataTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  
  // Filter data based on search
  const filteredData = searchKey && searchQuery 
    ? data.filter(item => 
        item[searchKey]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data
  
  // Handle sorting
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }
  
  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0
    
    const aValue = a[sortKey]
    const bValue = b[sortKey]
    
    if (aValue === bValue) return 0
    
    if (aValue === null || aValue === undefined) return 1
    if (bValue === null || bValue === undefined) return -1
    
    const result = aValue < bValue ? -1 : 1
    return sortDirection === 'asc' ? result : -result
  })
  
  // Handle selection
  const toggleSelectAll = () => {
    if (selectedItems.length === filteredData.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredData.map(item => item.id))
    }
  }
  
  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }
  
  // Handle bulk actions
  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedItems.length} items?`)) {
      selectedItems.forEach(id => {
        if (onDelete) onDelete(id)
      })
      setSelectedItems([])
    }
  }
  
  return (
    <div className="admin-data-table">
      {/* Search bar */}
      {searchKey && (
        <div className="mb-4">
          <input
            type="text"
            placeholder={`Search by ${searchKey}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md w-full max-w-xs"
          />
        </div>
      )}
      
      {/* Bulk actions */}
      {selectedItems.length > 0 && (
        <div className="bulk-actions bg-gray-50 p-3 rounded-t-lg flex items-center justify-between">
          <span className="text-sm text-gray-700">
            {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'} selected
          </span>
          <div className="flex space-x-2">
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
            >
              Delete Selected
            </button>
            <button
              onClick={() => setSelectedItems([])}
              className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="w-12 px-3 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedItems.length === data.length && data.length > 0}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
                />
              </th>
              {columns.map(column => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1 cursor-pointer">
                    <span>{column.label || column.header}</span>
                    {column.sortable && sortKey === column.key && (
                      <span>
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.length > 0 ? (
              sortedData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-3 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(row.id)}
                      onChange={() => toggleSelectItem(row.id)}
                      className="h-4 w-4 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
                    />
                  </td>
                  {columns.map(column => (
                    <td key={column.key} className="px-3 py-4 whitespace-nowrap">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                  <td className="px-3 py-4 whitespace-nowrap">
                    <StatusIndicator isPublished={row.is_published || row.isPublished} id={row.id} />
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <PublishButton
                        id={row.id}
                        type={itemType}
                        isPublished={row.is_published || row.isPublished}
                        className="text-xs"
                      />
                      <Link
                        href={`${editPath || basePath}/${row.id}/edit`}
                        className="text-teal-600 hover:text-teal-900 bg-teal-50 px-2 py-1 rounded text-xs"
                      >
                        Edit
                      </Link>
                      {(onDelete || deleteAction) && (
                        <button
                          onClick={async () => {
                            if (window.confirm('Are you sure you want to delete this item?')) {
                              if (deleteAction) {
                                const result = await deleteAction(row.id)
                                if (!result.success) {
                                  alert(result.message)
                                }
                              } else if (onDelete) {
                                onDelete(row.id)
                              }
                            }
                          }}
                          className="text-red-600 hover:text-red-900 bg-red-50 px-2 py-1 rounded text-xs"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 3} className="px-3 py-4 text-center text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}