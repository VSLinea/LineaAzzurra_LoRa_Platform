"use client"

import React from 'react'
import { LucideIcon } from 'lucide-react'

interface FormFieldProps {
  label: string
  error?: string
  required?: boolean
  icon?: LucideIcon
  className?: string
  children: React.ReactNode
  helpText?: string
}

export default function FormField({
  label,
  error,
  required,
  icon: Icon,
  className = '',
  children,
  helpText
}: FormFieldProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
        {children}
      </div>

      {helpText && !error && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {helpText}
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
} 