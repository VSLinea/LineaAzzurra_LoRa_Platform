"use client"

import React, { useState } from 'react'
import { WrenchIcon, ActivityIcon } from 'lucide-react'
import { PoolData } from '../../../types/pools'

interface EquipmentStatus {
  id: string
  name: string
  status: 'running' | 'stopped' | 'maintenance'
  lastUpdated: string
}

interface EquipmentTabProps {
  pool: PoolData
  onStatusChange?: (equipmentId: string, newStatus: string) => void
}

export default function EquipmentTab({ pool, onStatusChange }: EquipmentTabProps) {
  const [equipmentStatuses, setEquipmentStatuses] = useState<EquipmentStatus[]>([
    { 
      id: 'pump',
      name: pool.equipment.pump,
      status: 'running',
      lastUpdated: 'Just now'
    },
    {
      id: 'filter',
      name: pool.equipment.filter,
      status: 'running',
      lastUpdated: '5 min ago'
    },
    {
      id: 'heater',
      name: pool.equipment.heater,
      status: 'running',
      lastUpdated: '10 min ago'
    },
    {
      id: 'chlorinator',
      name: pool.equipment.chlorinator,
      status: 'running',
      lastUpdated: '15 min ago'
    }
  ])

  const toggleEquipmentStatus = (id: string) => {
    setEquipmentStatuses(current =>
      current.map(eq => {
        if (eq.id === id) {
          const nextStatus = {
            'running': 'stopped',
            'stopped': 'maintenance',
            'maintenance': 'running'
          }[eq.status] as EquipmentStatus['status']
          
          onStatusChange?.(id, nextStatus)
          
          return {
            ...eq,
            status: nextStatus,
            lastUpdated: 'Just now'
          }
        }
        return eq
      })
    )
  }

  return (
    <div className="space-y-6">
      <div className="card-container p-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
          <WrenchIcon className="w-4 h-4 mr-2" />
          Equipment Status
        </h3>
        <div className="space-y-4">
          {equipmentStatuses.map(eq => (
            <div key={eq.id} className="card-container p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">{eq.name}</span>
                <button
                  onClick={() => toggleEquipmentStatus(eq.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    eq.status === 'running' ? 'bg-green-100 text-green-700' :
                    eq.status === 'stopped' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {eq.status.charAt(0).toUpperCase() + eq.status.slice(1)}
                </button>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Last updated: {eq.lastUpdated}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-container p-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
          <ActivityIcon className="w-4 h-4 mr-2" />
          Performance Metrics
        </h3>
        {/* Add performance metrics here */}
      </div>
    </div>
  )
} 