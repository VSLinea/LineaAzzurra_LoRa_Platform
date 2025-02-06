'use client'

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { time: '00:00', ph: 7.2, chlorine: 1.5, temp: 78 },
  { time: '04:00', ph: 7.3, chlorine: 1.4, temp: 77 },
  { time: '08:00', ph: 7.4, chlorine: 1.6, temp: 76 },
  { time: '12:00', ph: 7.2, chlorine: 1.7, temp: 79 },
  { time: '16:00', ph: 7.1, chlorine: 1.5, temp: 81 },
  { time: '20:00', ph: 7.2, chlorine: 1.4, temp: 80 }
]

interface PoolDetailClientProps {
  id: string
}

export default function PoolDetailClient({ id }: PoolDetailClientProps) {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Pool #{id} Details</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Current Readings</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">pH Level</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">7.2</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">Chlorine</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-300">1.5 ppm</p>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">Temperature</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">78°F</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">ORP</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-300">750mV</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">24h Trends</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ph" stroke="#8884d8" />
                <Line type="monotone" dataKey="chlorine" stroke="#82ca9d" />
                <Line type="monotone" dataKey="temp" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
} 