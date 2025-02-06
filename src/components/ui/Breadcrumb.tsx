'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          )}
          <Link
            href={item.href}
            className={`hover:text-gray-700 dark:hover:text-gray-300 ${
              index === items.length - 1
                ? 'text-gray-900 dark:text-white font-medium'
                : ''
            }`}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  )
} 