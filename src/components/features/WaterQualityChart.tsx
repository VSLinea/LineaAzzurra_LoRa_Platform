"use client"

import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

interface WaterQualityParameter {
  name: string
  value: number
  total: number
  color: string
  current: string
  target: string
  status: 'optimal' | 'good' | 'warning'
}

const parameters: WaterQualityParameter[] = [
  {
    name: 'pH Level',
    value: 72,
    total: 100,
    color: '#00B0FF',
    current: '7.2',
    target: '7.0-7.6',
    status: 'optimal'
  },
  {
    name: 'Chlorine',
    value: 85,
    total: 100,
    color: '#00E676',
    current: '0.8',
    target: '0.4-1.0',
    status: 'good'
  },
  {
    name: 'Alkalinity',
    value: 65,
    total: 100,
    color: '#FFEA00',
    current: '95',
    target: '80-120',
    status: 'warning'
  },
  {
    name: 'Hardness',
    value: 90,
    total: 100,
    color: '#FF9100',
    current: '280',
    target: '200-400',
    status: 'good'
  }
]

function DonutChart({ data }: { data: WaterQualityParameter }) {
  const pieData = [
    { value: data.value },
    { value: data.total - data.value }
  ]

  return (
    <div className="relative group p-3 rounded-lg
                    bg-white/60 dark:bg-gray-800/40 
                    border border-gray-200 dark:border-gray-800/50
                    shadow-sm hover:shadow-md dark:shadow-none
                    hover:-translate-y-0.5
                    transition-all duration-200">
      <div className="flex items-center space-x-3">
        <div className="w-[80px] h-[80px] flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={35}
                startAngle={180}
                endAngle={-180}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                <Cell fill={data.color} />
                <Cell fill={'#1E1E2D20'} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ width: '80px' }}>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {data.current}
            </span>
          </div>
        </div>

        <div className="flex-1">
          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {data.name}
          </div>
          <div className={`text-xs font-medium px-2 py-0.5 rounded-full inline-flex mt-1
            ${data.status === 'optimal' ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' :
              data.status === 'good' ? 'bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' :
              'bg-amber-50 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400'
            }`}>
            Target: {data.target}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WaterQualityChart() {
  return (
    <div className="p-4">
      <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
        <span className="w-5 h-5 mr-2 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500" />
        Water Quality Parameters
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {parameters.map((param) => (
          <DonutChart key={param.name} data={param} />
        ))}
      </div>
    </div>
  )
} 