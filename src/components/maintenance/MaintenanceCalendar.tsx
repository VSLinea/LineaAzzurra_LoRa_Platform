import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const currentDate = new Date()
const daysInMonth = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 1,
  0
).getDate()

const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)

// Mock data for maintenance tasks
const maintenanceDays = [5, 12, 15, 20, 25]

export default function MaintenanceCalendar() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Maintenance Calendar
        </h2>
        <div className="flex items-center space-x-2">
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2"
          >
            {day}
          </div>
        ))}
        
        {Array(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay())
          .fill(null)
          .map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}
        
        {calendarDays.map((day) => {
          const isToday = day === currentDate.getDate()
          const hasMaintenance = maintenanceDays.includes(day)
          
          return (
            <div
              key={day}
              className={`
                aspect-square p-1 relative
                ${isToday ? 'bg-blue-50 dark:bg-blue-500/10 rounded-lg' : ''}
              `}
            >
              <div className={`
                w-full h-full flex items-center justify-center rounded-lg
                text-sm ${isToday ? 'font-semibold text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}
                ${hasMaintenance ? 'bg-gray-100 dark:bg-gray-800' : ''}
                ${!isToday && hasMaintenance ? 'hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer' : ''}
              `}>
                {day}
                {hasMaintenance && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full" />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 