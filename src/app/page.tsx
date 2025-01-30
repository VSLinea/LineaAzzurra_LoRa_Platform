import React from 'react'
import UpcomingMaintenance from '../components/maintenance/UpcomingMaintenance'
import WorkOrderStats from '../components/maintenance/WorkOrderStats'
import MaintenanceCalendar from '../components/maintenance/MaintenanceCalendar'

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Maintenance Dashboard
      </h1>

      <div className="grid gap-6">
        <WorkOrderStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <UpcomingMaintenance />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <MaintenanceCalendar />
          </div>
        </div>
      </div>
    </div>
  )
} 