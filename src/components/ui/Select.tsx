"use client"

import React from 'react'
import { ChevronDown } from 'lucide-react'

interface Option {
  value: string
  label: string
}

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: Option[]
  placeholder?: string
  className?: string
  error?: boolean
}

export default function Select({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  className = '',
  error = false
}: SelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full pl-3 pr-10 py-2 text-sm
          bg-white dark:bg-gray-800
          border rounded-lg
          appearance-none
          focus:outline-none focus:ring-2 focus:ring-blue-500/20
          ${error 
            ? 'border-red-300 dark:border-red-500/50' 
            : 'border-gray-200 dark:border-gray-800'
          }
          ${className}
        `}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  )
} 