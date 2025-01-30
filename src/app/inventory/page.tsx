import React from 'react'
import PageHeader from '@/components/ui/PageHeader'
import SearchFilterBar from '@/components/ui/SearchFilterBar'
import DataTable from '@/components/ui/DataTable'
import ActionButton from '@/components/ui/ActionButton'
import { PackagePlus } from 'lucide-react'

const columns = [
  { header: 'Item Name', accessorKey: 'name' },
  { header: 'Category', accessorKey: 'category' },
  { header: 'Stock Level', accessorKey: 'stockLevel' },
  { header: 'Unit', accessorKey: 'unit' },
  { header: 'Last Restocked', accessorKey: 'lastRestocked' },
  { header: 'Status', accessorKey: 'status' },
]

const mockData = [
  {
    id: 1,
    name: 'Chlorine Tablets',
    category: 'Chemicals',
    stockLevel: 50,
    unit: 'kg',
    lastRestocked: '2024-01-15',
    status: 'In Stock',
  },
  {
    id: 2,
    name: 'Pool Brush',
    category: 'Equipment',
    stockLevel: 10,
    unit: 'pieces',
    lastRestocked: '2024-01-10',
    status: 'Low Stock',
  },
]

export default function InventoryPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Inventory"
        description="Manage your maintenance supplies and equipment"
        action={
          <ActionButton
            label="Add Item"
            icon={<PackagePlus className="w-4 h-4" />}
            onClick={() => {}}
          />
        }
      />
      
      <div className="mt-6">
        <SearchFilterBar
          onSearch={() => {}}
          filters={[
            { label: 'Category', options: ['Chemicals', 'Equipment', 'Tools', 'Supplies'] },
            { label: 'Status', options: ['In Stock', 'Low Stock', 'Out of Stock'] },
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