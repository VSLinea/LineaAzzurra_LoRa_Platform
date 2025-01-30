"use client"

import React from 'react'
import { UsersIcon, ClockIcon, BarChart2Icon } from 'lucide-react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { PoolData } from '../../../types/pools'

interface UsageTabProps {
  pool: PoolData
}

export default function UsageTab({ pool }: UsageTabProps) {
  return (
    <div className="space-y-6">
      {/* Current Usage Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-container p-4"
      >
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
          <UsersIcon className="w-4 h-4 mr-2" />
          Current Usage
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Current Occupancy</span>
              <span className="font-medium">{pool.usage.currentOccupancy} / {pool.usage.maxCapacity}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(pool.usage.currentOccupancy / pool.usage.maxCapacity) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Average Daily Users</span>
            <div className="text-2xl font-bold mt-1">{pool.usage.averageDailyUsers}</div>
          </div>
        </div>
      </motion.div>

      {/* Peak Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-container p-4"
      >
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
          <ClockIcon className="w-4 h-4 mr-2" />
          Peak Hours
        </h3>
        <div className="flex flex-wrap gap-2">
          {pool.usage.peakHours.map((hour, index) => (
            <span 
              key={hour}
              className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 
                       rounded-full text-sm"
            >
              {hour}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Weekly Usage Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-container p-4"
      >
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
          <BarChart2Icon className="w-4 h-4 mr-2" />
          Weekly Usage
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pool.usage.weeklyUsageStats}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
} 