import React from 'react'
import PageHeader from '@/components/ui/PageHeader'
import SearchFilterBar from '@/components/ui/SearchFilterBar'
import DataTable from '@/components/ui/DataTable'
import ActionButton from '@/components/ui/ActionButton'
import { UserPlus } from 'lucide-react'

const columns = [
  { header: 'Client Name', accessorKey: 'name' },
  { header: 'Location', accessorKey: 'location' },
  { header: 'Service Type', accessorKey: 'serviceType' },
  { header: 'Last Service', accessorKey: 'lastService' },
  { header: 'Next Service', accessorKey: 'nextService' },
  { header: 'Status', accessorKey: 'status' },
]

const mockData = [
  {
    id: 1,
    name: 'Oceanview Resort',
    location: '123 Beach Road',
    serviceType: 'Weekly Maintenance',
    lastService: '2024-01-20',
    nextService: '2024-01-27',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Sunset Hotel',
    location: '456 Coast Drive',
    serviceType: 'Bi-weekly Maintenance',
    lastService: '2024-01-15',
    nextService: '2024-01-29',
    status: 'Active',
  },
]

export default function ClientsPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Clients"
        description="Manage your maintenance clients and their service schedules"
        action={
          <ActionButton
            label="Add Client"
            icon={<UserPlus className="w-4 h-4" />}
            onClick={() => {}}
          />
        }
      />
      
      <div className="mt-6">
        <SearchFilterBar
          onSearch={() => {}}
          filters={[
            { label: 'Service Type', options: ['Weekly', 'Bi-weekly', 'Monthly'] },
            { label: 'Status', options: ['Active', 'Inactive', 'Pending'] },
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