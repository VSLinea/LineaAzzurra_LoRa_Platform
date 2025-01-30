"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Filter, ChevronDown, X } from 'lucide-react'
import ActionButton from './ActionButton'

interface FilterOption {
  field: string
  label: string
  type: 'select' | 'date' | 'text'
  options?: Array<{ value: string, label: string }>
}

interface FilterValue {
  field: string
  value: string
}

interface FilterPopoverProps {
  options: FilterOption[]
  onFilter: (filters: FilterValue[]) => void
  activeFilters?: FilterValue[]
}

export default function FilterPopover({ 
  options,
  onFilter,
  activeFilters = []
}: FilterPopoverProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterValue[]>(activeFilters)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleFilterChange = (field: string, value: string) => {
    const newFilters = filters.filter(f => f.field !== field)
    if (value) {
      newFilters.push({ field, value })
    }
    setFilters(newFilters)
  }

  const handleRemoveFilter = (field: string) => {
    setFilters(filters.filter(f => f.field !== field))
  }

  const handleApplyFilters = () => {
    onFilter(filters)
    setIsOpen(false)
  }

  const handleClearFilters = () => {
    setFilters([])
    onFilter([])
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          px-4 py-2 text-gray-600 dark:text-gray-400 
          hover:bg-gray-100 dark:hover:bg-gray-800/50
          rounded-lg text-sm font-medium transition-colors 
          flex items-center space-x-2
          ${filters.length > 0 ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : ''}
        `}
      >
        <Filter className="w-4 h-4" />
        <span>Filter{filters.length > 0 ? ` (${filters.length})` : ''}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 z-50">
          <div className="p-4 space-y-4">
            {options.map((option) => (
              <div key={option.field} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {option.label}
                </label>
                {option.type === 'select' && option.options && (
                  <select
                    value={filters.find(f => f.field === option.field)?.value || ''}
                    onChange={(e) => handleFilterChange(option.field, e.target.value)}
                    className="w-full pl-3 pr-10 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-lg"
                  >
                    <option value="">All</option>
                    {option.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}
                {option.type === 'text' && (
                  <input
                    type="text"
                    value={filters.find(f => f.field === option.field)?.value || ''}
                    onChange={(e) => handleFilterChange(option.field, e.target.value)}
                    className="w-full pl-3 pr-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-lg"
                    placeholder={`Filter by ${option.label.toLowerCase()}`}
                  />
                )}
                {option.type === 'date' && (
                  <input
                    type="date"
                    value={filters.find(f => f.field === option.field)?.value || ''}
                    onChange={(e) => handleFilterChange(option.field, e.target.value)}
                    className="w-full pl-3 pr-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-lg"
                  />
                )}
              </div>
            ))}
          </div>

          {filters.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => {
                  const option = options.find(o => o.field === filter.field)
                  const label = option?.options?.find(o => o.value === filter.value)?.label || filter.value
                  return (
                    <div
                      key={filter.field}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs
                               bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    >
                      <span>{option?.label}: {label}</span>
                      <button
                        onClick={() => handleRemoveFilter(filter.field)}
                        className="ml-1 p-0.5 hover:bg-blue-100 dark:hover:bg-blue-500/20 rounded-full"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800 rounded-b-lg flex justify-between">
            <ActionButton
              label="Clear"
              variant="secondary"
              onClick={handleClearFilters}
              disabled={filters.length === 0}
            />
            <ActionButton
              label="Apply Filters"
              variant="primary"
              onClick={handleApplyFilters}
              disabled={filters.length === 0}
            />
          </div>
        </div>
      )}
    </div>
  )
} 