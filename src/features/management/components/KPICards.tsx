import React from 'react'
import { useFeature } from '../../../hooks/useFeature'

interface KPICardsProps {
  data: Array<{
    title: string
    value: string
    change: string
    trend: 'up' | 'down'
  }>
}

export default function KPICards({ data }: KPICardsProps) {
  const isManagementEnabled = useFeature('MANAGEMENT_MODULE')

  if (!isManagementEnabled) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((kpi, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
        >
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {kpi.title}
          </h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {kpi.value}
            </p>
            <p className={`ml-2 text-sm font-medium ${
              kpi.trend === 'up' 
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {kpi.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
} 