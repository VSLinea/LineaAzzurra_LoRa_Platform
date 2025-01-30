"use client"

import React from 'react'

const stockItems = [
  { name: 'pH Buffer Solution', current: 75, total: 100 },
  { name: 'High-Wear Denim Jeans', current: 45, total: 80 },
  { name: 'Women\'s Wool Cardigan', current: 30, total: 60 },
  { name: 'Kids\' Graphic Sweatshirt', current: 40, total: 100 }
]

export default function StockLevel() {
  return (
    <div className="p-4">
      <h2 className="text-base font-medium text-gray-900 dark:text-gray-200 mb-4">Stock Level</h2>
      <div className="space-y-4">
        {stockItems.map((item) => (
          <div key={item.name} className="group">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700 dark:text-gray-400 truncate">{item.name}</span>
              <span className="text-gray-500">{item.current} of {item.total} remaining</span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-[#151521] rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all group-hover:bg-emerald-400"
                style={{ width: `${(item.current / item.total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 