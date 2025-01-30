"use client"

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Activity } from 'lucide-react'

const data = [
  { time: '00:00', ph: 7.2, chlorine: 1.5, temp: 78 },
  { time: '04:00', ph: 7.3, chlorine: 1.4, temp: 77 },
  { time: '08:00', ph: 7.4, chlorine: 1.6, temp: 76 },
  { time: '12:00', ph: 7.2, chlorine: 1.7, temp: 79 },
  { time: '16:00', ph: 7.1, chlorine: 1.5, temp: 81 },
  { time: '20:00', ph: 7.2, chlorine: 1.4, temp: 80 }
]

export default function MonitoringSummary() {
  return (
    <div className="p-4">
      <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
        <Activity className="w-5 h-5 mr-2 text-purple-500" />
        Monitoring Summary
      </h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="var(--border-color)" 
              vertical={false}
            />
            <XAxis 
              dataKey="time" 
              stroke="var(--text-secondary)"
              tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--border-color)' }}
            />
            <YAxis 
              stroke="var(--text-secondary)"
              tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--border-color)' }}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'var(--bg-card)',
                border: 'none',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
              }}
            />
            <Legend 
              verticalAlign="top"
              wrapperStyle={{
                color: 'var(--text-secondary)',
                fontSize: '12px',
                paddingBottom: '20px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="ph" 
              stroke="#00B0FF" 
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="chlorine" 
              stroke="#00E676" 
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="temp" 
              stroke="#FFEA00" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 