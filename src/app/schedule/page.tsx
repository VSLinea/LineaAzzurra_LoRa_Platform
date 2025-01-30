import React from 'react'
import PageHeader from '@/components/ui/PageHeader'
import SearchFilterBar from '@/components/ui/SearchFilterBar'
import DataTable from '@/components/ui/DataTable'
import ActionButton from '@/components/ui/ActionButton'
import { CalendarPlus } from 'lucide-react'

const columns = [
  { header: 'Date', accessorKey: 'date' },
  { header: 'Time', accessorKey: 'time' },
  { header: 'Client', accessorKey: 'client' },
  { header: 'Service Type', accessorKey: 'serviceType' },
  { header: 'Location', accessorKey: 'location' },
  { header: 'Assigned To', accessorKey: 'assignedTo' },
  { header: 'Status', accessorKey: 'status' },
]

const mockData = [
  {
    id: 1,
    date: '2024-01-27',
    time: '09:00 AM',
    client: 'Oceanview Resort',
    serviceType: 'Weekly Maintenance',
    location: '123 Beach Road',
    assignedTo: 'John Smith',
    status: 'Scheduled',
  },
  {
    id: 2,
    date: '2024-01-27',
    time: '11:00 AM',
    client: 'Sunset Hotel',
    serviceType: 'Equipment Check',
    location: '456 Coast Drive',
    assignedTo: 'Mike Johnson',
    status: 'In Progress',
  },
]

export default function SchedulePage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Schedule"
        description="Manage maintenance appointments and staff schedules"
        action={
          <ActionButton
            label="Add Appointment"
            icon={<CalendarPlus className="w-4 h-4" />}
            onClick={() => {}}
          />
        }
      />
      
      <div className="mt-6">
        <SearchFilterBar
          onSearch={() => {}}
          filters={[
            { label: 'Service Type', options: ['Weekly Maintenance', 'Equipment Check', 'Repair', 'Installation'] },
            { label: 'Status', options: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'] },
            { label: 'Staff', options: ['John Smith', 'Mike Johnson', 'Sarah Wilson'] },
          ]}
        />
      </div>

      <div className="mt-6">
        <DataTable
          columns={columns}
          data={mockData}
          onRowClick={(row) => {}}
        />
      </div>
    </div>
  )
} 