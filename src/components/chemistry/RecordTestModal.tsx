"use client"

import React, { useState } from 'react'
import { XIcon } from 'lucide-react'

interface RecordTestModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  pools: Array<{ id: string; name: string }>
}

export default function RecordTestModal({ isOpen, onClose, onSubmit, pools }: RecordTestModalProps) {
  const [formData, setFormData] = useState({
    pool: '',
    parameters: {
      ph: '',
      chlorine: '',
      alkalinity: '',
      calcium: '',
      cyanuricAcid: '',
      tds: ''
    },
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.pool) {
      alert('Please select a pool')
      return
    }
    
    if (!formData.parameters.ph || !formData.parameters.chlorine) {
      alert('pH and Chlorine levels are required')
      return
    }

    // Add timestamp and status
    const testData = {
      ...formData,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: determineStatus(formData.parameters),
      testedBy: 'Current User' // TODO: Get from auth context
    }

    onSubmit(testData)
    onClose()
  }

  const determineStatus = (params: typeof formData.parameters) => {
    const ph = Number(params.ph)
    const chlorine = Number(params.chlorine)
    
    if (ph < 7.0 || ph > 7.8 || chlorine < 1.0 || chlorine > 3.0) {
      return 'critical'
    }
    if (ph < 7.2 || ph > 7.6 || chlorine < 1.5 || chlorine > 2.5) {
      return 'warning'
    }
    return 'normal'
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Record Test Results</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pool Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Pool</label>
              <select 
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

            {/* Test Parameters */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">pH Level</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="7.2"
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  value={formData.parameters.ph}
                  onChange={(e) => setFormData({
                    ...formData,
                    parameters: { ...formData.parameters, ph: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Chlorine (ppm)</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="2.0"
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  value={formData.parameters.chlorine}
                  onChange={(e) => setFormData({
                    ...formData,
                    parameters: { ...formData.parameters, chlorine: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Alkalinity (ppm)</label>
                <input
                  type="number"
                  placeholder="100"
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  value={formData.parameters.alkalinity}
                  onChange={(e) => setFormData({
                    ...formData,
                    parameters: { ...formData.parameters, alkalinity: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Calcium (ppm)</label>
                <input
                  type="number"
                  placeholder="250"
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  value={formData.parameters.calcium}
                  onChange={(e) => setFormData({
                    ...formData,
                    parameters: { ...formData.parameters, calcium: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">CYA (ppm)</label>
                <input
                  type="number"
                  placeholder="30"
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  value={formData.parameters.cyanuricAcid}
                  onChange={(e) => setFormData({
                    ...formData,
                    parameters: { ...formData.parameters, cyanuricAcid: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">TDS (ppm)</label>
                <input
                  type="number"
                  placeholder="1000"
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  value={formData.parameters.tds}
                  onChange={(e) => setFormData({
                    ...formData,
                    parameters: { ...formData.parameters, tds: e.target.value }
                  })}
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium mb-2">Notes</label>
              <textarea
                rows={3}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3">
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
                Save Results
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 