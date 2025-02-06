'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'

interface PageHeaderProps {
  icon: LucideIcon
  title: string
  subtitle?: string
  navigation?: React.ReactNode
  action?: React.ReactNode
}

export default function PageHeader({
  icon: Icon,
  title,
  subtitle,
  navigation,
  action
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        {navigation && (
          <div className="mb-4">
            {navigation}
          </div>
        )}
        <div className="flex items-center">
          <div className="mr-4">
            <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  )
} 