import React from 'react'
import KPICards from '../components/features/KPICards'
import WaterQualityChart from '../components/features/WaterQualityChart'
import MonitoringSummary from '../components/features/MonitoringSummary'
import ChemicalStock from '../components/features/ChemicalStock'
import UpcomingMaintenance from '../components/features/UpcomingMaintenance'
import SensorMetrics from '../components/features/SensorMetrics'
import RecentActivity from '../components/features/RecentActivity'
import StockLevel from '../components/features/StockLevel'

export default function DashboardPage() {
  return (
    <div className="h-[calc(100vh-4rem)] p-2 grid grid-cols-[1fr_280px] gap-2">
      {/* Main Content */}
      <div className="space-y-2">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-2">
          <KPICards />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-2">
          <div className="card-container card-gradient-blue">
            <WaterQualityChart />
          </div>
          <div className="card-container card-gradient-purple">
            <MonitoringSummary />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-2">
          <div className="card-container card-gradient-emerald">
            <StockLevel />
          </div>
          <div className="card-container card-gradient-amber">
            <ChemicalStock />
          </div>
          <div className="card-container card-gradient-blue">
            <RecentActivity />
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="space-y-2">
        <div className="card-container card-gradient-purple">
          <UpcomingMaintenance />
        </div>
        <div className="card-container card-gradient-emerald">
          <SensorMetrics />
        </div>
      </div>
    </div>
  )
} 