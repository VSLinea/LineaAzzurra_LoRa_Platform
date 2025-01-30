"use client"

import React from 'react'
import { Waves, AlertTriangle, WifiOff, Activity } from "lucide-react"

const kpiData = [
  {
    title: "Total Pools",
    subtitle: "All registered pools",
    value: "48",
    change: "+2",
    icon: Waves,
    status: 'normal',
    bgClass: "bg-gradient-to-br from-blue-600/10 via-blue-500/5 to-transparent"
  },
  {
    title: "Active Pools",
    subtitle: "Currently monitored",
    value: "42",
    change: "+1",
    icon: Activity,
    status: 'active',
    bgClass: "bg-gradient-to-br from-emerald-600/20 via-emerald-500/10 to-transparent border-emerald-500/20"
  },
  {
    title: "Need Attention",
    subtitle: "Requires maintenance",
    value: "5",
    change: "-2",
    icon: AlertTriangle,
    status: 'warning',
    bgClass: "bg-gradient-to-br from-amber-600/10 via-amber-500/5 to-transparent"
  },
  {
    title: "Offline Sensors",
    subtitle: "Connection lost",
    value: "3",
    change: "+1",
    icon: WifiOff,
    status: 'error',
    bgClass: "bg-gradient-to-br from-rose-600/10 via-rose-500/5 to-transparent"
  }
]

const statusColors = {
  normal: "text-blue-600 dark:text-blue-400",
  active: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  error: "text-rose-600 dark:text-rose-400"
}

export default function KPICards() {
  return (
    <>
      {kpiData.map((kpi) => (
        <div 
          key={kpi.title} 
          className={`
            relative group
            backdrop-blur-xl backdrop-saturate-150
            bg-white/80 dark:bg-[#1E1E2D]/80
            ${kpi.bgClass}
            rounded-2xl p-5
            border border-gray-100 dark:border-gray-800/50
            shadow-lg shadow-gray-200/50 dark:shadow-none
            hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-none
            hover:-translate-y-0.5
            transition-all duration-200 ease-out
          `}
        >
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <h3 className={`text-sm font-semibold ${statusColors[kpi.status]}`}>
                  {kpi.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  {kpi.subtitle}
                </p>
              </div>
              <div className={`p-2 rounded-xl bg-gradient-to-br ${kpi.bgClass}`}>
                <kpi.icon className={`w-5 h-5 ${statusColors[kpi.status]}`} />
              </div>
            </div>
            
            <div className="mt-4 flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {kpi.value}
              </span>
              <span className={`
                text-sm font-medium px-1.5 py-0.5 rounded-full
                ${kpi.change.startsWith('+') 
                  ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10' 
                  : 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10'}
              `}>
                {kpi.change}
              </span>
            </div>
          </div>

          {/* Highlight effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      ))}
    </>
  )
} 