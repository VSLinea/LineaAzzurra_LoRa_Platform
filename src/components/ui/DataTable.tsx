"use client"

import React from 'react'

interface Column<T> {
  key: string
  header: string
  cell: (item: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  className?: string
}

export default function DataTable<T>({ data, columns, className = '' }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className={`data-table ${className}`}>
        <thead className="table-header">
          <tr>
            {columns.map((column) => (
              <th 
                key={column.key}
                className={`px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800/50">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
              {columns.map((column) => (
                <td key={column.key} className={`px-6 py-4 ${column.className || ''}`}>
                  {column.cell(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 