import React from 'react'
import { ClipboardList, Calendar, Users, CheckCircle } from 'lucide-react'

const stats = [
  {
    title: 'Active Work Orders',
    value: '24',
    icon: ClipboardList,
    color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10'
  },
  {
    title: 'Scheduled Today',
    value: '8',
    icon: Calendar,
    color: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10'
  },
  {
    title: 'Staff Available',
    value: '6',
    icon: Users,
    color: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10'
  },
  {
    title: 'Completion Rate',
    value: '94%',
    icon: CheckCircle,
    color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10'
  }
]

export default function WorkOrderStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.title}
              </h3>
            </div>
            <p className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
              {stat.value}
            </p>
          </div>
        )
      })}
    </div>
  )
} 