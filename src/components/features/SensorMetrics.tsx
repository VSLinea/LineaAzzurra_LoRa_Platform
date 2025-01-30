"use client"

import React from 'react'
import { Droplets, Thermometer, Beaker, Gauge } from 'lucide-react'

const sensorData = [
  {
    type: "pH Sensors",
    status: "Active",
    value: "7.2",
    trend: "+0.1",
    icon: Beaker,
    color: "text-blue-400"
  },
  {
    type: "Temperature",
    status: "Active",
    value: "78°F",
    trend: "-0.5",
    icon: Thermometer,
    color: "text-yellow-400"
  },
  {
    type: "Chlorine",
    status: "Warning",
    value: "2.1",
    trend: "-0.3",
    icon: Droplets,
    color: "text-emerald-400"
  },
  {
    type: "Pressure",
    status: "Active",
    value: "14.7",
    trend: "+0.2",
    icon: Gauge,
    color: "text-purple-400"
  }
]

export default function SensorMetrics() {
  return (
    <div className="p-4">
      <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
        <Gauge className="w-5 h-5 mr-2 text-emerald-500" />
        Sensor Metrics
      </h2>
      <div className="space-y-3">
        {sensorData.map((sensor) => (
          <div 
            key={sensor.type}
            className="relative group p-3 rounded-lg
                     bg-white/40 dark:bg-gray-800/40 
                     border border-gray-100 dark:border-gray-800/50
                     hover:-translate-y-0.5
                     transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2.5 rounded-xl 
                  ${sensor.status === 'Warning'
                    ? 'bg-gradient-to-br from-amber-500/20 to-amber-500/5 dark:from-amber-500/20 dark:to-amber-500/5'
                    : sensor.status === 'Active'
                      ? 'bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 dark:from-emerald-500/20 dark:to-emerald-500/5'
                      : 'bg-gradient-to-br from-blue-500/20 to-blue-500/5 dark:from-blue-500/20 dark:to-blue-500/5'
                  }`}
                >
                  <sensor.icon className={`w-6 h-6 ${sensor.color}`} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {sensor.type}
                  </div>
                  <div className={`text-xs font-medium mt-0.5 ${
                    sensor.status === 'Warning' ? 'text-amber-600 dark:text-amber-400' :
                    sensor.status === 'Active' ? 'text-emerald-600 dark:text-emerald-400' :
                    'text-blue-600 dark:text-blue-400'
                  }`}>
                    {sensor.status}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{sensor.value}</div>
                <span className={`
                  inline-flex items-center text-sm font-medium px-2 py-0.5 rounded-full
                  ${sensor.trend.startsWith('+') 
                    ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20' 
                    : 'text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-500/20'}
                `}>
                  {sensor.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 