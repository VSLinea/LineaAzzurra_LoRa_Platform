"use client"

import React from 'react'
import { LucideIcon } from 'lucide-react'

interface CardProps {
  children: React.ReactNode
  gradient?: 'blue' | 'emerald' | 'amber' | 'rose' | 'none'
  className?: string
  header?: {
    title: string
    subtitle?: string
    icon?: LucideIcon
    action?: React.ReactNode
  }
  footer?: React.ReactNode
  onClick?: () => void
  hoverable?: boolean
}

const gradientStyles = {
  blue: 'card-gradient-blue',
  emerald: 'card-gradient-emerald',
  amber: 'card-gradient-amber',
  rose: 'card-gradient-rose',
  none: ''
}

export default function Card({
  children,
  gradient = 'none',
  className = '',
  header,
  footer,
  onClick,
  hoverable = false
}: CardProps) {
  return (
    <div 
      className={`
        card-container ${gradientStyles[gradient]}
        ${hoverable ? 'cursor-pointer hover:scale-[1.02] transition-transform' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {header && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            {header.icon && (
              <div className={`p-2 rounded-lg bg-${gradient}-500/10`}>
                <header.icon className={`w-5 h-5 text-${gradient}-500`} />
              </div>
            )}
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {header.title}
              </h3>
              {header.subtitle && (
                <p className="text-sm text-gray-500">
                  {header.subtitle}
                </p>
              )}
            </div>
          </div>
          {header.action && (
            <div>{header.action}</div>
          )}
        </div>
      )}

      <div className="p-4">
        {children}
      </div>

      {footer && (
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
          {footer}
        </div>
      )}
    </div>
  )
} 