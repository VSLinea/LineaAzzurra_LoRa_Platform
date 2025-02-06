"use client"

import React from 'react'
import {
  ThermometerIcon,
  DropletIcon,
  DropletsIcon,
  AlertCircleIcon,
  XIcon
} from 'lucide-react'

interface Pool {
  id: string
  name: string
  facility: string
  region: string
  temperature: number
  ph: number
  chlorine: number
  alkalinity: number
  status: 'active' | 'maintenance' | 'issue'
  lastChecked: string
  alerts?: string[]
}

interface PoolDetailsModalProps {
  pool: Pool
  isOpen: boolean
  onClose: () => void
}

export default function PoolDetailsModal({ pool, isOpen, onClose }: PoolDetailsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  {pool.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {pool.facility}, {pool.region}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <ThermometerIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Temperature
                      </span>
                    </div>
                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                      {pool.temperature}°C
                    </p>
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <DropletIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        pH Level
                      </span>
                    </div>
                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                      {pool.ph}
                    </p>
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <DropletsIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Chlorine
                      </span>
                    </div>
                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                      {pool.chlorine} ppm
                    </p>
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <DropletsIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Alkalinity
                      </span>
                    </div>
                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                      {pool.alkalinity} ppm
                    </p>
                  </div>
                </div>

                {pool.alerts && pool.alerts.length > 0 && (
                  <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertCircleIcon className="h-5 w-5 text-red-400" />
                      <h4 className="text-sm font-medium text-red-800 dark:text-red-200">
                        Active Alerts
                      </h4>
                    </div>
                    <div className="mt-2 space-y-2">
                      {pool.alerts.map((alert, index) => (
                        <p key={index} className="text-sm text-red-700 dark:text-red-300">
                          • {alert}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 text-sm text-gray-500">
                  Last updated: {new Date(pool.lastChecked).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 