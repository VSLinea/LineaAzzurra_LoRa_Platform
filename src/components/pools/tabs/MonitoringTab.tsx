"use client"

import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { ActivityIcon, ThermometerIcon, DropletsIcon, BeakerIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PoolData } from '../../../types/pools'

interface MonitoringTabProps {
  pool: PoolData
}

export default function MonitoringTab({ pool }: MonitoringTabProps) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-container p-4"
      >
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
          <ActivityIcon className="w-4 h-4 mr-2" />
          Real-time Readings
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={pool.sensorData.last24Hours}>
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={false}
                animationDuration={1000}
              />
              <Line 
                type="monotone" 
                dataKey="ph" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={false}
                animationDuration={1000}
              />
              <Line 
                type="monotone" 
                dataKey="chlorine" 
                stroke="#f59e0b" 
                strokeWidth={2}
                dot={false}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { 
            icon: ThermometerIcon, 
            label: 'Temperature', 
            value: `${pool.temperature}°F`,
            color: 'blue'
          },
          { 
            icon: DropletsIcon, 
            label: 'pH Level', 
            value: pool.ph,
            color: 'green'
          },
          { 
            icon: BeakerIcon, 
            label: 'Chlorine', 
            value: `${pool.chlorine} ppm`,
            color: 'amber'
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="card-container p-4"
          >
            <div className="flex items-center space-x-2">
              <metric.icon className={`w-4 h-4 text-${metric.color}-500`} />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {metric.label}
              </span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {metric.value}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 