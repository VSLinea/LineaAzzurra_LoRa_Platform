"use client"

import React from 'react'
import { Search, Filter, ChevronDown } from 'lucide-react'

interface SearchFilterBarProps {
  searchPlaceholder: string
  searchQuery: string
  onSearchChange: (value: string) => void
  showFilter?: boolean
}

export default function SearchFilterBar({ 
  searchPlaceholder,
  searchQuery,
  onSearchChange,
  showFilter = true
}: SearchFilterBarProps) {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-4 py-2 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800
                   rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
        />
      </div>

      {showFilter && (
        <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50
                         rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      )}
    </div>
  )
} 