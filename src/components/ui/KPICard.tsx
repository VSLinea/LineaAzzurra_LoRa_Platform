"use client"

import React from 'react'
import { LucideIcon } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string | number
  icon: LucideIcon
  gradient: 'blue' | 'emerald' | 'amber' | 'rose'
  change?: {
    value: string
    trend: 'up' | 'down'
  }
}

const gradientStyles = {
  blue: 'card-gradient-blue',
  emerald: 'card-gradient-emerald',
  amber: 'card-gradient-amber',
  rose: 'card-gradient-rose'
}

const iconBackgrounds = {
  blue: 'bg-blue-500/10',
  emerald: 'bg-emerald-500/10',
  amber: 'bg-amber-500/10',
  rose: 'bg-rose-500/10'
}

const iconColors = {
  blue: 'text-blue-500',
  emerald: 'text-emerald-500',
  amber: 'text-amber-500',
  rose: 'text-rose-500'
}

export default function KPICard({ title, value, icon: Icon, gradient, change }: KPICardProps) {
  return (
    <div className={`card-container ${gradientStyles[gradient]} p-4`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">{title}</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {value}
            {change && (
              <span className={`
                ml-2 text-sm font-medium px-1.5 py-0.5 rounded-full
                ${change.trend === 'up' 
                  ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10' 
                  : 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10'}
              `}>
                {change.value}
              </span>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-lg ${iconBackgrounds[gradient]}`}>
          <Icon className={`w-5 h-5 ${iconColors[gradient]}`} />
        </div>
      </div>
    </div>
  )
} 