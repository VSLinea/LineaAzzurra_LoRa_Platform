import React from 'react'
import Modal from '../ui/Modal'
import WorkOrderForm, { WorkOrderFormData } from './WorkOrderForm'

interface WorkOrderModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: WorkOrderFormData) => void
  initialData?: Partial<WorkOrderFormData>
}

export default function WorkOrderModal({
  isOpen,
  onClose,
  onSubmit,
  initialData
}: WorkOrderModalProps) {
  const handleSubmit = (data: WorkOrderFormData) => {
    onSubmit(data)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Work Order' : 'Create Work Order'}
    >
      <WorkOrderForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        initialData={initialData}
      />
    </Modal>
  )
} 