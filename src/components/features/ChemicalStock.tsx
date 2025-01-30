"use client"

import React from 'react'
import { ArrowDown } from 'lucide-react'

const stockData = [
  {
    name: 'Chlorine',
    current: 75,
    status: 'Good',
    lastUpdated: '2h ago',
    trend: -2.4
  },
  {
    name: 'pH Balancer',
    current: 32,
    status: 'Low',
    lastUpdated: '4h ago',
    trend: -5.1
  },
  {
    name: 'Algaecide',
    current: 60,
    status: 'Medium',
    lastUpdated: '1h ago',
    trend: -1.2
  },
  {
    name: 'Clarifier',
    current: 45,
    status: 'Medium',
    lastUpdated: '3h ago',
    trend: -3.4
  }
]

export default function ChemicalStock() {
  return (
    <div className="p-4">
      <h2 className="text-base font-medium text-gray-900 dark:text-gray-200 mb-4">Chemical Stock</h2>
      <div className="space-y-4">
        {stockData.map((item) => (
          <div 
            key={item.name}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#151521] rounded-lg"
          >
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200">{item.name}</h3>
              <div className="flex items-center mt-1 space-x-2">
                <div className="text-xs text-gray-700 dark:text-gray-400">{item.status}</div>
                <div className="text-xs text-gray-500">•</div>
                <div className="text-xs text-gray-500">{item.lastUpdated}</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${item.current}%` }}
                />
              </div>
              <div className="flex items-center space-x-1 text-red-400">
                <ArrowDown size={16} />
                <span className="text-sm">{item.trend}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 