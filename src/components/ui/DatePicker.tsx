import React, { useState, useRef, useEffect } from 'react'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import Input from './Input'

interface DatePickerProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: boolean
  min?: string
  max?: string
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function DatePicker({
  value,
  onChange,
  placeholder = 'Select date',
  error = false,
  min,
  max
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => value ? new Date(value) : new Date())
  const [isYearSelectOpen, setIsYearSelectOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setIsYearSelectOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          setViewDate(prev => new Date(prev.setDate(prev.getDate() - 1)))
          break
        case 'ArrowRight':
          e.preventDefault()
          setViewDate(prev => new Date(prev.setDate(prev.getDate() + 1)))
          break
        case 'ArrowUp':
          e.preventDefault()
          setViewDate(prev => new Date(prev.setDate(prev.getDate() - 7)))
          break
        case 'ArrowDown':
          e.preventDefault()
          setViewDate(prev => new Date(prev.setDate(prev.getDate() + 7)))
          break
        case 'Enter':
          e.preventDefault()
          if (!isDateDisabled(viewDate)) {
            handleDateSelect(viewDate)
          }
          break
        case 'Escape':
          e.preventDefault()
          setIsOpen(false)
          setIsYearSelectOpen(false)
          break
        case 'Tab':
          if (!e.shiftKey) {
            e.preventDefault()
            handleNextMonth()
          } else {
            e.preventDefault()
            handlePrevMonth()
          }
          break
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, viewDate])

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const isDateDisabled = (date: Date) => {
    const dateStr = formatDate(date)
    if (min && dateStr < min) return true
    if (max && dateStr > max) return true
    return false
  }

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1))
  }

  const handleDateSelect = (date: Date) => {
    if (!isDateDisabled(date)) {
      onChange(formatDate(date))
      setIsOpen(false)
    }
  }

  const handleYearSelect = (year: number) => {
    setViewDate(new Date(year, viewDate.getMonth(), 1))
    setIsYearSelectOpen(false)
  }

  const renderYearSelect = () => {
    const currentYear = new Date().getFullYear()
    const years: JSX.Element[] = []
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push(
        <button
          key={i}
          onClick={() => handleYearSelect(i)}
          className={`
            w-full px-4 py-2 text-sm text-left
            ${viewDate.getFullYear() === i 
              ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }
          `}
        >
          {i}
        </button>
      )
    }
    return years
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(viewDate)
    const firstDay = getFirstDayOfMonth(viewDate)
    const days: JSX.Element[] = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8" />)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
      const isSelected = value === formatDate(date)
      const isDisabled = isDateDisabled(date)

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(date)}
          disabled={isDisabled}
          className={`
            h-8 w-8 rounded-full flex items-center justify-center text-sm
            ${isSelected 
              ? 'bg-blue-500 text-white' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }
            ${isDisabled 
              ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' 
              : 'text-gray-700 dark:text-gray-300'
            }
          `}
        >
          {day}
        </button>
      )
    }

    return days
  }

  return (
    <div className="relative" ref={containerRef}>
      <div onClick={() => setIsOpen(true)}>
        <Input
          value={value}
          placeholder={placeholder}
          readOnly
          icon={CalendarIcon}
          error={error}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-4 w-64">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevMonth}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setIsYearSelectOpen(!isYearSelectOpen)}
              className="text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded"
            >
              {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
            </button>
            
            <button
              onClick={handleNextMonth}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {isYearSelectOpen ? (
            <div className="max-h-48 overflow-y-auto">
              {renderYearSelect()}
            </div>
          ) : (
            <>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Day headers */}
                {DAYS.map(day => (
                  <div
                    key={day}
                    className="h-8 flex items-center justify-center text-xs text-gray-500"
                  >
                    {day}
                  </div>
                ))}
                
                {/* Calendar days */}
                {renderCalendar()}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
} 