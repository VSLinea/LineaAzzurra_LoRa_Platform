"use client"

import React from 'react'
import { Calendar, Clock } from 'lucide-react'

const maintenanceTasks = [
  {
    id: 1,
    task: "Filter Cleaning",
    pool: "Main Pool",
    date: "Apr 25, 2024",
    time: "10:00 AM"
  },
  {
    id: 2,
    task: "Chemical Balance Check",
    pool: "Kids Pool",
    date: "Apr 26, 2024",
    time: "2:30 PM"
  },
  {
    id: 3,
    task: "Equipment Inspection",
    pool: "Spa Pool",
    date: "Apr 27, 2024",
    time: "9:00 AM"
  }
]

export default function UpcomingMaintenance() {
  return (
    <div className="p-5">
      <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-purple-500" />
        Upcoming Maintenance
      </h2>
      <div className="space-y-3">
        {maintenanceTasks.map((task) => (
          <div 
            key={task.id}
            className="relative group p-4 rounded-xl
                     backdrop-blur-xl backdrop-saturate-150
                     bg-gradient-to-r from-white/90 to-white/50 
                     dark:from-[#1E1E2D]/90 dark:to-[#1E1E2D]/50
                     border border-gray-100 dark:border-gray-800/50
                     hover:shadow-lg hover:shadow-purple-500/5
                     hover:-translate-y-0.5
                     transition-all duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {task.task}
                </h3>
                <div className="flex items-center space-x-3 mt-2">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="w-4 h-4 mr-1.5 text-purple-500/70" />
                    <span className="text-xs font-medium">{task.date}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Clock className="w-4 h-4 mr-1.5 text-purple-500/70" />
                    <span className="text-xs font-medium">{task.time}</span>
                  </div>
                </div>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full 
                           bg-purple-50 dark:bg-purple-500/20 
                           text-purple-600 dark:text-purple-400
                           border border-purple-100 dark:border-purple-500/30">
                {task.pool}
              </span>
            </div>

            {/* Highlight effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/5 via-transparent to-transparent 
                         opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
        ))}
      </div>
    </div>
  )
} 