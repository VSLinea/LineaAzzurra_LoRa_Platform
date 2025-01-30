import React from 'react'
import { Clock, MapPin } from 'lucide-react'

const upcomingTasks = [
  {
    id: 1,
    title: 'Weekly Pool Maintenance',
    location: 'Oceanview Resort',
    time: '10:00 AM',
    assignee: 'John Smith'
  },
  {
    id: 2,
    title: 'Filter Replacement',
    location: 'Sunset Hotel',
    time: '2:00 PM',
    assignee: 'Sarah Wilson'
  },
  {
    id: 3,
    title: 'Chemical Balance Check',
    location: 'Palm Beach Club',
    time: '4:30 PM',
    assignee: 'Mike Johnson'
  }
]

export default function UpcomingMaintenance() {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Upcoming Maintenance
      </h2>
      
      <div className="space-y-4">
        {upcomingTasks.map((task) => (
          <div
            key={task.id}
            className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {task.title}
                </h3>
                <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{task.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{task.time}</span>
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {task.assignee}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 