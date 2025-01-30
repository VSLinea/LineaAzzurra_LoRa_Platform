"use client"

import React, { useState } from 'react'
import { 
  ThermometerIcon, 
  DropletsIcon, 
  ClockIcon, 
  AlertCircleIcon,
  XIcon,
  RulerIcon,
  GaugeIcon,
  SettingsIcon,
  HistoryIcon,
  TimerIcon,
  ShieldCheckIcon,
  TabletIcon,
  BellIcon,
  WrenchIcon
} from 'lucide-react'
import { PoolData } from '../../types/pools'
import StaffTab from './tabs/StaffTab'
import UsageTab from './tabs/UsageTab'
import DocumentationTab from './tabs/DocumentationTab'

interface PoolDetailsModalProps {
  pool: PoolData
  isOpen: boolean
  onClose: () => void
}

export default function PoolDetailsModal({ pool, isOpen, onClose }: PoolDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'chemistry' | 'equipment' | 'history' | 'safety' | 'staff' | 'usage' | 'docs'>('overview')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-[#1E1E2D] rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {pool.name}
              </h2>
              <span className={`status-badge mt-2 ${
                pool.status === 'active' ? 'status-completed' :
                pool.status === 'maintenance' ? 'status-pending' :
                'status-in-progress'
              }`}>
                {pool.status}
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-800">
            {(['overview', 'chemistry', 'equipment', 'history', 'safety', 'staff', 'usage', 'docs'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors
                  ${activeTab === tab 
                    ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Basic Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="card-container p-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <ThermometerIcon className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-600 dark:text-gray-400">Temperature</span>
                      <span className="font-medium">{pool.temperature}°F</span>
                    </div>
                  </div>
                  <div className="card-container p-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <DropletsIcon className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-600 dark:text-gray-400">pH Level</span>
                      <span className="font-medium">{pool.ph}</span>
                    </div>
                  </div>
                </div>

                {/* Dimensions */}
                <div className="card-container p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                    <RulerIcon className="w-4 h-4 mr-2" />
                    Pool Dimensions
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Length</span>
                      <span className="float-right font-medium">{pool.dimensions.length}m</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Width</span>
                      <span className="float-right font-medium">{pool.dimensions.width}m</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Depth</span>
                      <span className="float-right font-medium">{pool.dimensions.depth}m</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Volume</span>
                      <span className="float-right font-medium">{pool.dimensions.volume}m³</span>
                    </div>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="card-container p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                    <TimerIcon className="w-4 h-4 mr-2" />
                    Operating Schedule
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Hours</span>
                      <span className="font-medium">{pool.operatingHours.start} - {pool.operatingHours.end}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Filter Cycles</span>
                      <div className="mt-1">
                        {pool.operatingHours.filterCycles.map((cycle, index) => (
                          <span key={index} className="inline-block bg-blue-50 dark:bg-blue-500/10 
                                                     text-blue-600 dark:text-blue-400 rounded-full px-2 py-1 
                                                     text-xs mr-2 mb-2">
                            {cycle}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alerts */}
                {pool.alerts && pool.alerts.length > 0 && (
                  <div className="card-container p-4 bg-amber-50 dark:bg-amber-500/10">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">
                      Active Alerts
                    </h3>
                    <div className="space-y-2">
                      {pool.alerts.map((alert, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <AlertCircleIcon className="w-4 h-4 text-amber-500 mt-0.5" />
                          <span className="text-sm text-amber-800 dark:text-amber-400">{alert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timestamps */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="w-4 h-4" />
                    <span>Last checked: {pool.lastChecked}</span>
                  </div>
                  <span>Next maintenance: {pool.nextMaintenance}</span>
                </div>
              </>
            )}

            {activeTab === 'chemistry' && (
              <div className="space-y-6">
                {/* Detailed Chemical Levels */}
                <div className="card-container p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                    <TabletIcon className="w-4 h-4 mr-2" />
                    Chemical Analysis
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Free Chlorine</span>
                        <span className="float-right font-medium">{pool.chemicalLevels.freeChlorine} ppm</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Combined Chlorine</span>
                        <span className="float-right font-medium">{pool.chemicalLevels.combinedChlorine} ppm</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Cyanuric Acid</span>
                        <span className="float-right font-medium">{pool.chemicalLevels.cyanuricAcid} ppm</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Calcium</span>
                        <span className="float-right font-medium">{pool.chemicalLevels.calcium} ppm</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">TDS</span>
                        <span className="float-right font-medium">{pool.chemicalLevels.tds} ppm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'equipment' && (
              <div className="space-y-6">
                {/* Equipment Details */}
                <div className="card-container p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                    <WrenchIcon className="w-4 h-4 mr-2" />
                    Equipment Details
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Pump</span>
                        <span className="float-right font-medium">{pool.equipment.pump}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Filter</span>
                        <span className="float-right font-medium">{pool.equipment.filter}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Heater</span>
                        <span className="float-right font-medium">{pool.equipment.heater}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Chlorinator</span>
                        <span className="float-right font-medium">{pool.equipment.chlorinator}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-600 dark:text-gray-400">Last Serviced</span>
                        <span className="float-right font-medium">{pool.equipment.lastServiced}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-6">
                {/* Maintenance History */}
                <div className="card-container p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                    <HistoryIcon className="w-4 h-4 mr-2" />
                    Maintenance History
                  </h3>
                  <div className="space-y-4">
                    {pool.maintenanceHistory.map((record, index) => (
                      <div key={index} className="border-b border-gray-200 dark:border-gray-800 last:border-0 pb-4 last:pb-0">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-900 dark:text-gray-100">{record.type}</span>
                          <span className="text-gray-500">{record.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{record.description}</p>
                        <div className="flex justify-between text-sm mt-2">
                          <span className="text-gray-500">By: {record.performedBy}</span>
                          {record.cost && (
                            <span className="text-gray-500">Cost: ${record.cost}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'safety' && (
              <div className="space-y-6">
                {/* Safety Equipment */}
                <div className="card-container p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                    <ShieldCheckIcon className="w-4 h-4 mr-2" />
                    Safety Equipment
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Life Buoys</span>
                        <span className="float-right font-medium">{pool.safetyEquipment.lifebuoys}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">First Aid Kit</span>
                        <span className="float-right font-medium">
                          {pool.safetyEquipment.firstAidKits ? '✓' : '✗'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Emergency Phone</span>
                        <span className="float-right font-medium">
                          {pool.safetyEquipment.emergencyPhone ? '✓' : '✗'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Safety Signage</span>
                        <span className="float-right font-medium">
                          {pool.safetyEquipment.safetySignage ? '✓' : '✗'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'staff' && (
              <StaffTab pool={pool} />
            )}

            {activeTab === 'usage' && <UsageTab pool={pool} />}
            {activeTab === 'docs' && <DocumentationTab />}
          </div>
        </div>
      </div>
    </div>
  )
} 