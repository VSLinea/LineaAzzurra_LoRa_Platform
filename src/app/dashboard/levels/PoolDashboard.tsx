'use client'

import { Shield, AlertTriangle, Thermometer, Droplet, Activity, Clock, WrenchIcon } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface Alert {
  id: string
  type: 'critical' | 'warning'
  message: string
  timestamp: string
}

interface MaintenanceTask {
  id: string
  title: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in-progress' | 'completed'
}

interface WaterQuality {
  ph: number
  chlorine: number
  temperature: number
  lastUpdated: string
}

interface PoolStats {
  waterQuality: WaterQuality
  maintenanceTasks: MaintenanceTask[]
  alerts: Alert[]
}

export default function PoolDashboard() {
  const router = useRouter()
  const { data: session } = useSession()

  // This would come from an API call based on user's assigned pool
  const stats: PoolStats = {
    waterQuality: {
      ph: 7.2,
      chlorine: 1.5,
      temperature: 28,
      lastUpdated: '2024-02-20T11:30:00Z'
    },
    maintenanceTasks: [
      {
        id: '1',
        title: 'Clean pool filters',
        dueDate: '2024-02-21T09:00:00Z',
        priority: 'high',
        status: 'pending'
      },
      {
        id: '2',
        title: 'Check chemical balance',
        dueDate: '2024-02-20T14:00:00Z',
        priority: 'medium',
        status: 'in-progress'
      }
    ],
    alerts: [
      {
        id: '1',
        type: 'critical',
        message: 'pH levels critical - Immediate action required',
        timestamp: '2024-02-20T10:30:00Z'
      },
      {
        id: '2',
        type: 'warning',
        message: 'Chlorine levels above threshold',
        timestamp: '2024-02-20T09:15:00Z'
      }
    ]
  }

  const getMaintenancePriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-100 dark:bg-red-900/20'
      case 'medium':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
      default:
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900/20'
    }
  }

  const getMaintenanceStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-100 dark:bg-green-900/20'
      case 'in-progress':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900/20'
      default:
        return 'text-gray-500 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  return (
    <div className="page-container">
      <PageHeader
        icon={Shield}
        title="Pool Operations"
        subtitle={`${session?.user?.locations?.[0]?.name || 'Pool'} Dashboard`}
      />

      {/* Water Quality Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Thermometer className="w-5 h-5 text-blue-500" />
            <p className="text-sm text-gray-500">Temperature</p>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.waterQuality.temperature}°C
            </h3>
            <div className="px-3 py-1 rounded-full text-sm font-medium text-blue-500 bg-blue-100 dark:bg-blue-900/20">
              Normal
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Droplet className="w-5 h-5 text-indigo-500" />
            <p className="text-sm text-gray-500">pH Level</p>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.waterQuality.ph}
            </h3>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              stats.waterQuality.ph >= 7.2 && stats.waterQuality.ph <= 7.6
                ? 'text-green-500 bg-green-100 dark:bg-green-900/20'
                : 'text-red-500 bg-red-100 dark:bg-red-900/20'
            }`}>
              {stats.waterQuality.ph >= 7.2 && stats.waterQuality.ph <= 7.6 ? 'Normal' : 'Critical'}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="w-5 h-5 text-emerald-500" />
            <p className="text-sm text-gray-500">Chlorine</p>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.waterQuality.chlorine} ppm
            </h3>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              stats.waterQuality.chlorine >= 1 && stats.waterQuality.chlorine <= 3
                ? 'text-green-500 bg-green-100 dark:bg-green-900/20'
                : 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
            }`}>
              {stats.waterQuality.chlorine >= 1 && stats.waterQuality.chlorine <= 3 ? 'Normal' : 'Warning'}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Maintenance Tasks */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <WrenchIcon className="w-5 h-5 mr-2 text-indigo-500" />
            Maintenance Tasks
          </h2>
          <div className="space-y-4">
            {stats.maintenanceTasks.map(task => (
              <div 
                key={task.id}
                className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {task.title}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className={`px-2 py-0.5 rounded text-xs font-medium ${getMaintenancePriorityColor(task.priority)}`}>
                        {task.priority}
                      </div>
                      <div className={`px-2 py-0.5 rounded text-xs font-medium ${getMaintenanceStatusColor(task.status)}`}>
                        {task.status}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(task.dueDate).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Active Alerts */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
            Active Alerts
          </h2>
          <div className="space-y-4">
            {stats.alerts.map(alert => (
              <div 
                key={alert.id}
                className={`p-4 ${
                  alert.type === 'critical'
                    ? 'bg-red-50 dark:bg-red-900/20'
                    : 'bg-yellow-50 dark:bg-yellow-900/20'
                } rounded-lg`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`text-sm font-medium ${
                      alert.type === 'critical'
                        ? 'text-red-800 dark:text-red-200'
                        : 'text-yellow-800 dark:text-yellow-200'
                    }`}>
                      {alert.message}
                    </p>
                  </div>
                  <span className={`text-xs ${
                    alert.type === 'critical'
                      ? 'text-red-700 dark:text-red-300'
                      : 'text-yellow-700 dark:text-yellow-300'
                  }`}>
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-4 text-xs text-gray-500 flex items-center justify-end">
        <Clock className="w-4 h-4 mr-1" />
        Last updated: {new Date(stats.waterQuality.lastUpdated).toLocaleString()}
      </div>
    </div>
  )
} 