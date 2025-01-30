"use client"

import React, { useState } from 'react'
import { XIcon } from 'lucide-react'

interface AddLogEntryModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  pools: Array<{ id: string; name: string }>
  chemicals: Array<{ id: string; name: string; unit: string }>
}

export default function AddLogEntryModal({ isOpen, onClose, onSubmit, pools, chemicals }: AddLogEntryModalProps) {
  const [formData, setFormData] = useState({
    pool: '',
    chemical: '',
    amount: '',
    reason: '',
    currentLevel: '',
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.pool || !formData.chemical || !formData.amount || !formData.reason) {
      alert('Please fill in all required fields')
      return
    }

    const selectedChemical = chemicals.find(c => c.id === formData.chemical)
    
    const logData = {
      ...formData,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unit: selectedChemical?.unit || 'kg',
      addedBy: 'Current User' // TODO: Get from auth context
    }

    onSubmit(logData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Add Usage Log Entry</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Pool*</label>
              <select 
                required
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                value={formData.pool}
                onChange={(e) => setFormData({ ...formData, pool: e.target.value })}
              >
                <option value="">Select Pool</option>
                {pools.map(pool => (
                  <option key={pool.id} value={pool.id}>{pool.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Chemical*</label>
              <select
                required
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                value={formData.chemical}
                onChange={(e) => setFormData({ ...formData, chemical: e.target.value })}
              >
                <option value="">Select Chemical</option>
                {chemicals.map(chemical => (
                  <option key={chemical.id} value={chemical.id}>{chemical.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Amount*</label>
              <input
                type="number"
                required
                min="0"
                step="0.1"
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Reason*</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="e.g., Routine maintenance, pH adjustment"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Current Level</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                value={formData.currentLevel}
                onChange={(e) => setFormData({ ...formData, currentLevel: e.target.value })}
                placeholder="e.g., 2.0 ppm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Notes</label>
              <textarea
                rows={3}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
                Add Log Entry
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 