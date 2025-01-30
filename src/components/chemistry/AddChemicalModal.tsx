"use client"

import React, { useState } from 'react'
import { XIcon } from 'lucide-react'

interface AddChemicalModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export default function AddChemicalModal({ isOpen, onClose, onSubmit }: AddChemicalModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    currentStock: '',
    unit: 'kg',
    reorderPoint: '',
    supplier: '',
    safetySheet: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.currentStock || !formData.reorderPoint) {
      alert('Please fill in all required fields')
      return
    }

    const chemicalData = {
      ...formData,
      id: Date.now().toString(),
      currentStock: Number(formData.currentStock),
      reorderPoint: Number(formData.reorderPoint),
      lastOrdered: new Date().toISOString().split('T')[0],
      status: 'ok'
    }

    onSubmit(chemicalData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Add New Chemical</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Chemical Name*</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Current Stock*</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.1"
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  value={formData.currentStock}
                  onChange={(e) => setFormData({ ...formData, currentStock: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Unit</label>
                <select
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                >
                  <option value="kg">Kilograms (kg)</option>
                  <option value="L">Liters (L)</option>
                  <option value="g">Grams (g)</option>
                  <option value="mL">Milliliters (mL)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Reorder Point*</label>
              <input
                type="number"
                required
                min="0"
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                value={formData.reorderPoint}
                onChange={(e) => setFormData({ ...formData, reorderPoint: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Supplier</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Safety Data Sheet URL</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                value={formData.safetySheet}
                onChange={(e) => setFormData({ ...formData, safetySheet: e.target.value })}
                placeholder="/sds/chemical-name.pdf"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add Chemical
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 