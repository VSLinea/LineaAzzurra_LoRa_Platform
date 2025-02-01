"use client"

import React, { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Package, 
  Calendar,
  Download
} from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import TabNavigation from '../../components/ui/TabNavigation'
import ActionButton from '../../components/ui/ActionButton'
import Select from '../../components/ui/Select'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { Bar, Line, Pie } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

// Mock data
const monthlyOrders = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Orders',
      data: [65, 59, 80, 81, 56, 90],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1
    }
  ]
}

const chemicalUsage = {
  labels: ['Chlorine', 'pH Up', 'pH Down', 'Algaecide', 'Stabilizer'],
  datasets: [
    {
      data: [300, 150, 100, 200, 250],
      backgroundColor: [
        'rgba(59, 130, 246, 0.5)',
        'rgba(34, 197, 94, 0.5)',
        'rgba(239, 68, 68, 0.5)',
        'rgba(168, 85, 247, 0.5)',
        'rgba(234, 179, 8, 0.5)'
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(34, 197, 94)',
        'rgb(239, 68, 68)',
        'rgb(168, 85, 247)',
        'rgb(234, 179, 8)'
      ],
      borderWidth: 1
    }
  ]
}

const budgetTrend = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Budget',
      data: [5000, 4800, 5200, 5100, 4900, 5300],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      tension: 0.4
    },
    {
      label: 'Actual',
      data: [4800, 4600, 5300, 4900, 4700, 5100],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.5)',
      tension: 0.4
    }
  ]
}

const poolStats = [
  {
    pool: 'Main Pool',
    orders: 45,
    budget: '$12,500',
    chemicals: '850 units',
    efficiency: '94%'
  },
  {
    pool: 'Kids Pool',
    orders: 32,
    budget: '$8,200',
    chemicals: '620 units',
    efficiency: '91%'
  },
  {
    pool: 'Spa Area',
    orders: 28,
    budget: '$6,800',
    chemicals: '480 units',
    efficiency: '96%'
  }
]

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState('6m')
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'orders', label: 'Orders' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'budget', label: 'Budget' },
    { id: 'pools', label: 'Pool Statistics' }
  ]

  const timeRangeOptions = [
    { value: '1m', label: 'Last Month' },
    { value: '3m', label: 'Last 3 Months' },
    { value: '6m', label: 'Last 6 Months' },
    { value: '1y', label: 'Last Year' }
  ]

  const renderOverviewTab = () => (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Monthly Orders */}
        <Card
          header={{
            title: 'Monthly Orders',
            icon: TrendingUp
          }}
          gradient="blue"
        >
          <div className="h-[200px] p-4">
            <Bar 
              data={monthlyOrders}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }}
            />
          </div>
        </Card>

        {/* Chemical Usage */}
        <Card
          header={{
            title: 'Chemical Usage Distribution',
            icon: Package
          }}
          gradient="emerald"
        >
          <div className="h-[200px] p-4">
            <Pie 
              data={chemicalUsage}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Budget Analysis */}
        <Card
          header={{
            title: 'Budget vs Actual',
            icon: DollarSign
          }}
          gradient="amber"
        >
          <div className="h-[200px] p-4">
            <Line 
              data={budgetTrend}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
        </Card>

        {/* Pool Statistics */}
        <Card
          header={{
            title: 'Pool Statistics',
            icon: Calendar,
            subtitle: 'Performance metrics by pool'
          }}
        >
          <div className="divide-y divide-gray-200 dark:divide-gray-800 max-h-[200px] overflow-y-auto">
            <div className="grid grid-cols-5 gap-4 px-4 py-2 text-xs font-medium text-gray-500">
              <div>Pool</div>
              <div>Orders</div>
              <div>Budget</div>
              <div>Chemicals</div>
              <div>Efficiency</div>
            </div>
            {poolStats.map((stat, index) => (
              <div 
                key={index}
                className="grid grid-cols-5 gap-4 px-4 py-2 text-xs"
              >
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {stat.pool}
                </div>
                <div className="text-gray-500">
                  {stat.orders}
                </div>
                <div className="text-gray-500">
                  {stat.budget}
                </div>
                <div className="text-gray-500">
                  {stat.chemicals}
                </div>
                <div className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {stat.efficiency}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )

  const renderOrdersTab = () => (
    <Card
      header={{
        title: 'Monthly Orders',
        icon: TrendingUp
      }}
      gradient="blue"
    >
      <div className="h-[500px] p-4">
        <Bar 
          data={monthlyOrders}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            }
          }}
        />
      </div>
    </Card>
  )

  const renderInventoryTab = () => (
    <Card
      header={{
        title: 'Chemical Usage Distribution',
        icon: Package
      }}
      gradient="emerald"
    >
      <div className="h-[500px] p-4">
        <Pie 
          data={chemicalUsage}
          options={{
            responsive: true,
            maintainAspectRatio: false
          }}
        />
      </div>
    </Card>
  )

  const renderBudgetTab = () => (
    <Card
      header={{
        title: 'Budget vs Actual',
        icon: DollarSign
      }}
      gradient="amber"
    >
      <div className="h-[500px] p-4">
        <Line 
          data={budgetTrend}
          options={{
            responsive: true,
            maintainAspectRatio: false
          }}
        />
      </div>
    </Card>
  )

  const renderPoolStatisticsTab = () => (
    <Card
      header={{
        title: 'Pool Statistics',
        icon: Calendar,
        subtitle: 'Detailed performance metrics by pool'
      }}
    >
      <div className="p-4">
        <div className="mb-6">
          <div className="grid grid-cols-3 gap-4">
            {poolStats.map((stat, index) => (
              <div key={index} className="card-container p-4">
                <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {stat.pool}
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Orders</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{stat.orders}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Budget</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{stat.budget}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Chemical Usage</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{stat.chemicals}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Efficiency</span>
                    <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{stat.efficiency}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">Chemical Usage by Pool</h3>
              <div className="h-[300px]">
                <Bar 
                  data={{
                    labels: poolStats.map(stat => stat.pool),
                    datasets: [{
                      label: 'Chemical Usage',
                      data: poolStats.map(stat => parseInt(stat.chemicals)),
                      backgroundColor: 'rgba(59, 130, 246, 0.5)',
                      borderColor: 'rgb(59, 130, 246)',
                      borderWidth: 1
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    }
                  }}
                />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">Efficiency Comparison</h3>
              <div className="h-[300px]">
                <Bar 
                  data={{
                    labels: poolStats.map(stat => stat.pool),
                    datasets: [{
                      label: 'Efficiency',
                      data: poolStats.map(stat => parseInt(stat.efficiency)),
                      backgroundColor: 'rgba(34, 197, 94, 0.5)',
                      borderColor: 'rgb(34, 197, 94)',
                      borderWidth: 1
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        min: 80,
                        max: 100
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="page-container">
      <PageHeader 
        icon={BarChart3}
        title="Reports & Analytics"
        subtitle="View insights and track performance"
      />

      <div className="flex items-center justify-between mb-6">
        <TabNavigation 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="flex items-center space-x-3">
          <Select
            value={timeRange}
            onChange={setTimeRange}
            options={timeRangeOptions}
            className="w-40"
          />

          <ActionButton
            label="Export Data"
            icon={Download}
            variant="secondary"
          />
        </div>
      </div>

      {activeTab === 'overview' && renderOverviewTab()}
      {activeTab === 'orders' && renderOrdersTab()}
      {activeTab === 'inventory' && renderInventoryTab()}
      {activeTab === 'budget' && renderBudgetTab()}
      {activeTab === 'pools' && renderPoolStatisticsTab()}
    </div>
  )
} 