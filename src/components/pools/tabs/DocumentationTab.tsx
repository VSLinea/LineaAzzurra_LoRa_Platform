"use client"

import React from 'react'
import { FileTextIcon, AlertTriangleIcon, BookOpenIcon, DownloadIcon, FileIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface Document {
  id: string
  name: string
  type: 'manual' | 'emergency' | 'maintenance' | 'form'
  lastUpdated: string
  size: string
}

const documents: Document[] = [
  {
    id: '1',
    name: 'Pool Operations Manual',
    type: 'manual',
    lastUpdated: '2024-01-15',
    size: '2.4 MB'
  },
  {
    id: '2',
    name: 'Emergency Response Protocol',
    type: 'emergency',
    lastUpdated: '2024-02-01',
    size: '1.1 MB'
  },
  {
    id: '3',
    name: 'Maintenance Schedule Template',
    type: 'maintenance',
    lastUpdated: '2024-01-30',
    size: '521 KB'
  },
  {
    id: '4',
    name: 'Chemical Handling Guidelines',
    type: 'manual',
    lastUpdated: '2024-01-20',
    size: '1.8 MB'
  },
  {
    id: '5',
    name: 'Incident Report Form',
    type: 'form',
    lastUpdated: '2024-02-10',
    size: '245 KB'
  }
]

export default function DocumentationTab() {
  return (
    <div className="space-y-6">
      {/* Document Categories */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: FileTextIcon, label: 'Manuals', count: 2 },
          { icon: AlertTriangleIcon, label: 'Emergency', count: 1 },
          { icon: BookOpenIcon, label: 'Maintenance', count: 1 },
          { icon: FileIcon, label: 'Forms', count: 1 }
        ].map((category, index) => (
          <motion.div
            key={category.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="card-container p-4"
          >
            <div className="flex items-center space-x-3">
              <category.icon className="w-5 h-5 text-blue-500" />
              <div>
                <div className="font-medium">{category.label}</div>
                <div className="text-sm text-gray-500">{category.count} documents</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Document List */}
      <div className="card-container p-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">
          All Documents
        </h3>
        <div className="space-y-2">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 
                       rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <FileTextIcon className="w-4 h-4 text-gray-400" />
                <div>
                  <div className="font-medium text-sm">{doc.name}</div>
                  <div className="text-xs text-gray-500">
                    Updated {doc.lastUpdated} • {doc.size}
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <DownloadIcon className="w-4 h-4 text-gray-500" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 