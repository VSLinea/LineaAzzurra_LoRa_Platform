"use client"

import React, { useState } from 'react'
import { CheckIcon, XIcon, PencilIcon } from 'lucide-react'
import { PoolData } from '../../../types/pools'

interface ChemistryTabProps {
  pool: PoolData
  onUpdate?: (chemical: string, value: number) => void
}

export default function ChemistryTab({ pool, onUpdate }: ChemistryTabProps) {
  const [editingChemical, setEditingChemical] = useState<string | null>(null)
  const [newValue, setNewValue] = useState<number>(0)

  const handleChemicalUpdate = (chemical: string, value: number) => {
    onUpdate?.(chemical, value)
    setEditingChemical(null)
  }

  return (
    <div className="space-y-6">
      <div className="card-container p-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">
          Chemical Levels
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {Object.entries(pool.chemicalLevels).map(([chemical, value]) => (
            <div key={chemical} className="card-container p-3">
              {editingChemical === chemical ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={newValue}
                    onChange={(e) => setNewValue(Number(e.target.value))}
                    className="w-20 px-2 py-1 border rounded"
                  />
                  <button 
                    onClick={() => handleChemicalUpdate(chemical, newValue)}
                    className="text-green-500 hover:text-green-600"
                  >
                    <CheckIcon className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setEditingChemical(null)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    {chemical.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{value} ppm</span>
                    <button 
                      onClick={() => {
                        setEditingChemical(chemical)
                        setNewValue(value)
                      }}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 