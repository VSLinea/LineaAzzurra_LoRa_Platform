import React from 'react'
import PageHeader from '@/components/ui/PageHeader'
import SearchFilterBar from '@/components/ui/SearchFilterBar'
import DataTable from '@/components/ui/DataTable'
import ActionButton from '@/components/ui/ActionButton'
import { UserPlus } from 'lucide-react'

const columns = [
  { header: 'Name', accessorKey: 'name' },
  { header: 'Role', accessorKey: 'role' },
  { header: 'Specialization', accessorKey: 'specialization' },
  { header: 'Current Tasks', accessorKey: 'currentTasks' },
  { header: 'Location', accessorKey: 'location' },
  { header: 'Status', accessorKey: 'status' },
]

const mockData = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Senior Technician',
    specialization: 'Equipment Repair',
    currentTasks: 2,
    location: 'North Zone',
    status: 'Available',
  },
  {
    id: 2,
    name: 'Mike Johnson',
    role: 'Maintenance Technician',
    specialization: 'General Maintenance',
    currentTasks: 3,
    location: 'South Zone',
    status: 'On Task',
  },
]

export default function StaffPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Staff"
        description="Manage your maintenance team members"
        action={
          <ActionButton
            label="Add Staff Member"
            icon={<UserPlus className="w-4 h-4" />}
            onClick={() => {}}
          />
        }
      />
      
      <div className="mt-6">
        <SearchFilterBar
          onSearch={() => {}}
          filters={[
            { label: 'Role', options: ['Senior Technician', 'Maintenance Technician', 'Apprentice'] },
            { label: 'Specialization', options: ['Equipment Repair', 'General Maintenance', 'Chemical Treatment'] },
            { label: 'Status', options: ['Available', 'On Task', 'Off Duty'] },
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