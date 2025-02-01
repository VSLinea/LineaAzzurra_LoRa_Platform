"use client"

import React, { useState } from 'react'
import { 
  Wrench, 
  Calendar, 
  Clock, 
  Droplets as Pool,
  CheckCircle2, 
  Timer,
  History,
  FileText,
  Filter,
  Search,
  ChevronDown,
  PlusIcon
} from 'lucide-react'
import PDFDownloadButton from '../../components/PDFDownloadButton'
import ErrorBoundary from '../../components/ErrorBoundary'
import MaintenanceReport from '../../components/reports/MaintenanceReport'
import PageHeader from '../../components/ui/PageHeader'

interface MaintenanceTask {
  id: string
  pool: string
  type: 'routine' | 'repair' | 'inspection'
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  description: string
  assignedTo: string
  dueDate: string
  completedDate?: string
}

const maintenanceTasks: MaintenanceTask[] = [
  {
    id: '1',
    pool: 'Main Pool',
    type: 'routine',
    status: 'pending',
    priority: 'medium',
    description: 'Weekly filter cleaning',
    assignedTo: 'John Smith',
    dueDate: '2024-02-25'
  },
  // Add more tasks...
]

const maintenanceHistory = [
  {
    id: 1,
    task: 'Filter Cleaning',
    pool: 'Pool #1',
    completedOn: '2024-03-15',
    completedBy: 'John Smith',
    notes: 'Replaced filter cartridge and backwashed system',
    reportUrl: '/reports/maintenance-1.pdf'
  },
  {
    id: 2,
    task: 'Chemical Balance Adjustment',
    pool: 'Pool #3',
    completedOn: '2024-03-14',
    completedBy: 'Sarah Johnson',
    notes: 'Adjusted pH and chlorine levels',
    reportUrl: '/reports/maintenance-2.pdf'
  },
  {
    id: 3,
    task: 'Pump Maintenance',
    pool: 'Pool #2',
    completedOn: '2024-03-13',
    completedBy: 'Mike Wilson',
    notes: 'Cleaned pump basket, checked pressure',
    reportUrl: '/reports/maintenance-3.pdf'
  }
]

const priorityClasses = {
  High: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20',
  Medium: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20',
  Low: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20'
} as const

const sampleReportData = {
  completedTasks: [
    {
      date: '2024-03-01',
      task: 'Filter Cleaning',
      pool: 'Pool #1',
      assignee: 'John Smith',
      notes: 'Replaced filter cartridge'
    },
    // ... more tasks
  ],
  statistics: {
    totalTasks: 12,
    completedTasks: 5,
    pendingTasks: 7,
    averageCompletionTime: '2.5 hours'
  }
}

export default function MaintenancePage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history' | 'reports'>('upcoming')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="page-container">
      <PageHeader 
        icon={Wrench}
        title="Maintenance"
        subtitle="Manage maintenance tasks and schedules"
      />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card-container card-gradient-blue p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Total Tasks</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">12</div>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Wrench className="w-5 h-5 text-blue-500" />
            </div>
          </div>
        </div>
        <div className="card-container card-gradient-emerald p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Completed</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">5</div>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
        </div>
        <div className="card-container card-gradient-amber p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Pending</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">7</div>
            </div>
            <div className="p-3 bg-amber-500/10 rounded-lg">
              <Timer className="w-5 h-5 text-amber-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${activeTab === 'upcoming' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50'}`}
          >
            Upcoming Tasks
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${activeTab === 'history' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50'}`}
          >
            Maintenance History
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${activeTab === 'reports' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50'}`}
          >
            Reports
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800
                       rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
            />
          </div>

          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium 
                           hover:bg-blue-600 transition-colors flex items-center space-x-2">
            <PlusIcon className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      <div className="card-container card-gradient-blue">
        {activeTab === 'upcoming' && (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead className="table-header">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Task</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Pool</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Date & Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Assignee</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Priority</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800/50">
                {maintenanceTasks.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{item.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Pool className="w-4 h-4 mr-2" />
                        {item.pool}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {item.dueDate}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{item.assignedTo}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{item.type}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityClasses[item.priority.charAt(0).toUpperCase() + item.priority.slice(1) as keyof typeof priorityClasses]}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`status-badge ${
                        item.status === 'pending' ? 'status-pending' :
                        item.status === 'completed' ? 'status-completed' :
                        'status-in-progress'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead className="table-header">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Task</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Pool</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Completed On</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">By</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Notes</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Report</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800/50">
                {maintenanceHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{item.task}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Pool className="w-4 h-4 mr-2" />
                        {item.pool}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{item.completedOn}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{item.completedBy}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{item.notes}</div>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => window.open(item.reportUrl, '_blank')}
                        className="text-sm text-blue-500 hover:text-blue-600 font-medium"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-500">March 2024</span>
                </div>
                <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
                  Monthly Maintenance Report
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Summary of all maintenance activities
                </p>
                <ErrorBoundary>
                  <PDFDownloadButton
                    document={
                      <MaintenanceReport
                        month="March"
                        year="2024"
                        data={sampleReportData}
                      />
                    }
                    fileName="maintenance-report-march-2024.pdf"
                  />
                </ErrorBoundary>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 