import React, { useState } from 'react'
import FormField from '../ui/FormField'
import Input from '../ui/Input'
import Select from '../ui/Select'

export interface WorkOrderFormData {
  client: string
  serviceType: string
  priority: string
  assignedTo: string
  dueDate: string
  description: string
}

interface WorkOrderFormProps {
  onSubmit: (data: WorkOrderFormData) => void
  onCancel: () => void
  initialData?: Partial<WorkOrderFormData>
}

export default function WorkOrderForm({ onSubmit, onCancel, initialData }: WorkOrderFormProps) {
  const [formData, setFormData] = useState<WorkOrderFormData>({
    client: initialData?.client || '',
    serviceType: initialData?.serviceType || '',
    priority: initialData?.priority || '',
    assignedTo: initialData?.assignedTo || '',
    dueDate: initialData?.dueDate || '',
    description: initialData?.description || '',
  })

  const handleChange = (field: keyof WorkOrderFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="Client"
        required
      >
        <Select
          value={formData.client}
          onChange={(value) => handleChange('client', value)}
          options={[
            { label: 'Oceanview Resort', value: 'oceanview' },
            { label: 'Sunset Hotel', value: 'sunset' },
          ]}
          placeholder="Select client"
        />
      </FormField>

      <FormField
        label="Service Type"
        required
      >
        <Select
          value={formData.serviceType}
          onChange={(value) => handleChange('serviceType', value)}
          options={[
            { label: 'Weekly Maintenance', value: 'weekly' },
            { label: 'Equipment Repair', value: 'repair' },
            { label: 'Emergency Service', value: 'emergency' },
          ]}
          placeholder="Select service type"
        />
      </FormField>

      <FormField
        label="Priority"
        required
      >
        <Select
          value={formData.priority}
          onChange={(value) => handleChange('priority', value)}
          options={[
            { label: 'Low', value: 'low' },
            { label: 'Normal', value: 'normal' },
            { label: 'High', value: 'high' },
            { label: 'Urgent', value: 'urgent' },
          ]}
          placeholder="Select priority"
        />
      </FormField>

      <FormField
        label="Assigned To"
        required
      >
        <Select
          value={formData.assignedTo}
          onChange={(value) => handleChange('assignedTo', value)}
          options={[
            { label: 'John Smith', value: 'john' },
            { label: 'Mike Johnson', value: 'mike' },
            { label: 'Sarah Wilson', value: 'sarah' },
          ]}
          placeholder="Select staff member"
        />
      </FormField>

      <FormField
        label="Due Date"
        required
      >
        <Input
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleChange('dueDate', e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />
      </FormField>

      <FormField
        label="Description"
        required
      >
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          rows={4}
          placeholder="Enter work order description"
        />
      </FormField>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
        >
          {initialData ? 'Update Work Order' : 'Create Work Order'}
        </button>
      </div>
    </form>
  )
} 