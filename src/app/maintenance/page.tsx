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
  PlusIcon,
  ClipboardPlus
} from 'lucide-react'
import PDFDownloadButton from '../../components/PDFDownloadButton'
import ErrorBoundary from '../../components/ErrorBoundary'
import MaintenanceReport from '../../components/reports/MaintenanceReport'
import PageHeader from '../../components/ui/PageHeader'
import SearchFilterBar from '../../components/ui/SearchFilterBar'
import DataTable from '../../components/ui/DataTable'
import ActionButton from '../../components/ui/ActionButton'
import WorkOrderModal from '../../components/maintenance/WorkOrderModal'
import { WorkOrderFormData } from '../../components/maintenance/WorkOrderForm'

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

interface WorkOrder {
  id: string
  client: string
  serviceType: string
  priority: string
  assignedTo: string
  dueDate: string
  status: string
}

const columns = [
  { header: 'Order ID', accessorKey: 'id' as keyof WorkOrder },
  { header: 'Client', accessorKey: 'client' as keyof WorkOrder },
  { header: 'Service Type', accessorKey: 'serviceType' as keyof WorkOrder },
  { header: 'Priority', accessorKey: 'priority' as keyof WorkOrder },
  { header: 'Assigned To', accessorKey: 'assignedTo' as keyof WorkOrder },
  { header: 'Due Date', accessorKey: 'dueDate' as keyof WorkOrder },
  { header: 'Status', accessorKey: 'status' as keyof WorkOrder },
]

const mockData: WorkOrder[] = [
  {
    id: 'WO-2024-001',
    client: 'Oceanview Resort',
    serviceType: 'Weekly Maintenance',
    priority: 'Normal',
    assignedTo: 'John Smith',
    dueDate: '2024-01-27',
    status: 'In Progress',
  },
  {
    id: 'WO-2024-002',
    client: 'Sunset Hotel',
    serviceType: 'Equipment Repair',
    priority: 'High',
    assignedTo: 'Mike Johnson',
    dueDate: '2024-01-26',
    status: 'Pending',
  },
]

export default function MaintenancePage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history' | 'reports'>('upcoming')
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null)

  const handleSearch = (query: string) => {
    console.log('Searching:', query)
  }

  const handleCreateWorkOrder = (data: WorkOrderFormData) => {
    console.log('Creating work order:', data)
    // Add API call here
  }

  const handleEditWorkOrder = (data: WorkOrderFormData) => {
    console.log('Editing work order:', data)
    // Add API call here
  }

  const handleRowClick = (row: WorkOrder) => {
    setSelectedWorkOrder(row)
    setIsModalOpen(true)
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Work Orders"
        description="Manage and track maintenance work orders"
        action={
          <ActionButton
            label="Create Work Order"
            icon={ClipboardPlus}
            onClick={() => {
              setSelectedWorkOrder(null)
              setIsModalOpen(true)
            }}
          />
        }
      />
      
      <div className="mt-6">
        <SearchFilterBar
          onSearch={handleSearch}
          filters={[
            { label: 'Service Type', options: ['Weekly Maintenance', 'Equipment Repair', 'Emergency Service'] },
            { label: 'Priority', options: ['Low', 'Normal', 'High', 'Urgent'] },
            { label: 'Status', options: ['Pending', 'In Progress', 'Completed', 'Cancelled'] },
            { label: 'Assigned To', options: ['John Smith', 'Mike Johnson', 'Sarah Wilson'] },
          ]}
        />
      </div>

      <div className="mt-6">
        <DataTable<WorkOrder>
          columns={columns}
          data={mockData}
          onRowClick={handleRowClick}
        />
      </div>

      <WorkOrderModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedWorkOrder(null)
        }}
        onSubmit={selectedWorkOrder ? handleEditWorkOrder : handleCreateWorkOrder}
        initialData={selectedWorkOrder}
      />
    </div>
  )
} 