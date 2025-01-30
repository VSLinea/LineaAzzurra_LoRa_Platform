"use client"

import React from 'react'
import { LucideIcon } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon
  error?: boolean
  className?: string
}

export default function Input({
  icon: Icon,
  error = false,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}
      
      <input
        {...props}
        className={`
          w-full py-2 text-sm
          bg-white dark:bg-gray-800
          border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500/20
          ${Icon ? 'pl-10' : 'pl-3'} pr-3
          ${error 
            ? 'border-red-300 dark:border-red-500/50' 
            : 'border-gray-200 dark:border-gray-800'
          }
          ${className}
        `}
      />
    </div>
  )
} 