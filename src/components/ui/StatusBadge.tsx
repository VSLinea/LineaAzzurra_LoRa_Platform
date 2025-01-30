"use client"

import React from 'react'

type StatusType = 'success' | 'warning' | 'error' | 'info' | 'pending'

interface StatusBadgeProps {
  status: string
  type?: StatusType
  className?: string
}

const statusStyles = {
  success: 'bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-400',
  error: 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-400',
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400',
  pending: 'bg-gray-100 text-gray-800 dark:bg-gray-500/10 dark:text-gray-400'
}

export default function StatusBadge({ status, type = 'info', className = '' }: StatusBadgeProps) {
  return (
    <span className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
      ${statusStyles[type]}
      ${className}
    `}>
      {status}
    </span>
  )
} 