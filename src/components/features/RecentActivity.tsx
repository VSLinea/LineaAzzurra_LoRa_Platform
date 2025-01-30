"use client"

import React from 'react'
import { Circle } from 'lucide-react'

const activities = [
  {
    id: 1,
    user: "John Smith",
    action: "adjusted chlorine levels",
    pool: "Main Pool",
    time: "5m ago"
  },
  {
    id: 2,
    user: "Sarah Johnson",
    action: "completed maintenance",
    pool: "Kids Pool",
    time: "15m ago"
  },
  {
    id: 3,
    user: "Mike Wilson",
    action: "checked water temperature",
    pool: "Spa Pool",
    time: "30m ago"
  },
  {
    id: 4,
    user: "Emily Brown",
    action: "updated chemical balance",
    pool: "Main Pool",
    time: "1h ago"
  }
]

export default function RecentActivity() {
  return (
    <div className="p-4">
      <h2 className="text-base font-medium text-gray-900 dark:text-gray-200 mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-gray-50 dark:bg-[#151521] rounded-lg p-3 transition-colors duration-200">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <Circle size={6} className="text-blue-400" fill="currentColor" />
              </div>
              <div>
                <p className="text-sm text-gray-900 dark:text-gray-200">
                  <span className="font-medium">{activity.user}</span>
                  {" "}{activity.action}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500">{activity.pool}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 