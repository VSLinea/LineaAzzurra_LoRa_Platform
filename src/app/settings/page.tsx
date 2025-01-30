"use client"

import React, { useState } from 'react'
import { 
  Settings as SettingsIcon,
  Waves,
  Package,
  DollarSign,
  Bell,
  Trash2,
  Plus,
  Edit,
  Save
} from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import TabNavigation from '../../components/ui/TabNavigation'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import ActionButton from '../../components/ui/ActionButton'
import FormField from '../../components/ui/FormField'

// Mock data
const poolsData = [
  {
    id: 'pool-1',
    name: 'Main Pool',
    type: 'olympic',
    capacity: '50,000 L',
    location: 'Main Building',
    maintenanceDay: 'Monday',
    status: 'active'
  },
  {
    id: 'pool-2',
    name: 'Kids Pool',
    type: 'recreational',
    capacity: '20,000 L',
    location: 'East Wing',
    maintenanceDay: 'Wednesday',
    status: 'active'
  },
  {
    id: 'pool-3',
    name: 'Spa Area',
    type: 'spa',
    capacity: '5,000 L',
    location: 'Wellness Center',
    maintenanceDay: 'Friday',
    status: 'maintenance'
  }
]

const productsData = [
  {
    id: 'prod-1',
    name: 'Chlorine Tablets',
    category: 'chemicals',
    unit: 'kg',
    price: 45.99,
    minStock: 10,
    currentStock: 25
  },
  {
    id: 'prod-2',
    name: 'pH Increaser',
    category: 'chemicals',
    unit: 'kg',
    price: 24.99,
    minStock: 5,
    currentStock: 8
  },
  {
    id: 'prod-3',
    name: 'Filter Cartridge',
    category: 'equipment',
    unit: 'piece',
    price: 89.99,
    minStock: 2,
    currentStock: 4
  }
]

const systemSettings = {
  orderSettings: {
    requireApproval: true,
    autoReorder: true,
    reorderThreshold: 20,
    maxOrderAmount: 5000
  },
  notificationSettings: {
    lowStockAlert: true,
    orderStatusUpdates: true,
    maintenanceReminders: true,
    dailyReports: false
  },
  maintenanceSettings: {
    scheduleReminders: true,
    autoSchedule: true,
    reminderDays: 2,
    emergencyContacts: '+1 (555) 999-9999'
  }
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('pools')
  const [editingPool, setEditingPool] = useState<string | null>(null)
  const [editingProduct, setEditingProduct] = useState<string | null>(null)

  const tabs = [
    { id: 'pools', label: 'Pool Management' },
    { id: 'products', label: 'Product Catalog' },
    { id: 'system', label: 'System Settings' }
  ]

  const poolTypes = [
    { value: 'olympic', label: 'Olympic' },
    { value: 'recreational', label: 'Recreational' },
    { value: 'spa', label: 'Spa' },
    { value: 'therapy', label: 'Therapy' }
  ]

  const productCategories = [
    { value: 'chemicals', label: 'Chemicals' },
    { value: 'equipment', label: 'Equipment' },
    { value: 'tools', label: 'Tools' },
    { value: 'accessories', label: 'Accessories' }
  ]

  return (
    <div className="page-container">
      <PageHeader 
        icon={SettingsIcon}
        title="Settings"
        subtitle="Configure system settings and manage resources"
      />

      <TabNavigation 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="mt-6">
        {activeTab === 'pools' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <ActionButton
                label="Add Pool"
                icon={Plus}
                variant="primary"
              />
            </div>

            <Card>
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                <div className="grid grid-cols-7 gap-4 px-4 py-3 text-sm font-medium text-gray-500">
                  <div>Name</div>
                  <div>Type</div>
                  <div>Capacity</div>
                  <div>Location</div>
                  <div>Maintenance Day</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>

                {poolsData.map((pool) => (
                  <div 
                    key={pool.id}
                    className="grid grid-cols-7 gap-4 px-4 py-3 text-sm items-center"
                  >
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {pool.name}
                    </div>
                    <div className="text-gray-500">
                      {pool.type}
                    </div>
                    <div className="text-gray-500">
                      {pool.capacity}
                    </div>
                    <div className="text-gray-500">
                      {pool.location}
                    </div>
                    <div className="text-gray-500">
                      {pool.maintenanceDay}
                    </div>
                    <div>
                      <span className={`
                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${pool.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400'
                        }
                      `}>
                        {pool.status}
                      </span>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button className="text-gray-500 hover:text-gray-700">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <ActionButton
                label="Add Product"
                icon={Plus}
                variant="primary"
              />
            </div>

            <Card>
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                <div className="grid grid-cols-7 gap-4 px-4 py-3 text-sm font-medium text-gray-500">
                  <div>Name</div>
                  <div>Category</div>
                  <div>Unit</div>
                  <div>Price</div>
                  <div>Min Stock</div>
                  <div>Current Stock</div>
                  <div className="text-right">Actions</div>
                </div>

                {productsData.map((product) => (
                  <div 
                    key={product.id}
                    className="grid grid-cols-7 gap-4 px-4 py-3 text-sm items-center"
                  >
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {product.name}
                    </div>
                    <div className="text-gray-500">
                      {product.category}
                    </div>
                    <div className="text-gray-500">
                      {product.unit}
                    </div>
                    <div className="text-gray-500">
                      ${product.price}
                    </div>
                    <div className="text-gray-500">
                      {product.minStock}
                    </div>
                    <div className={`font-medium ${
                      product.currentStock <= product.minStock
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-900 dark:text-gray-100'
                    }`}>
                      {product.currentStock}
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button className="text-gray-500 hover:text-gray-700">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-6">
            {/* Order Settings */}
            <Card
              header={{
                title: 'Order Settings',
                icon: Package,
                subtitle: 'Configure order processing rules'
              }}
            >
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <FormField label="Maximum Order Amount">
                    <Input
                      type="number"
                      value={systemSettings.orderSettings.maxOrderAmount}
                      prefix="$"
                    />
                  </FormField>

                  <FormField label="Reorder Threshold">
                    <Input
                      type="number"
                      value={systemSettings.orderSettings.reorderThreshold}
                    />
                  </FormField>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      Require Approval
                    </div>
                    <div className="text-sm text-gray-500">
                      Require manager approval for orders
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={systemSettings.orderSettings.requireApproval}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      Auto Reorder
                    </div>
                    <div className="text-sm text-gray-500">
                      Automatically create orders when stock is low
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={systemSettings.orderSettings.autoReorder}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </Card>

            {/* Notification Settings */}
            <Card
              header={{
                title: 'Notification Settings',
                icon: Bell,
                subtitle: 'Configure system notifications'
              }}
            >
              <div className="p-6 space-y-4">
                {Object.entries(systemSettings.notificationSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </div>
                      <div className="text-sm text-gray-500">
                        Enable notifications for {key.toLowerCase().replace(/([A-Z])/g, ' $1')}
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={value}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </Card>

            {/* Maintenance Settings */}
            <Card
              header={{
                title: 'Maintenance Settings',
                icon: Waves,
                subtitle: 'Configure maintenance schedules'
              }}
            >
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <FormField label="Reminder Days Before">
                    <Input
                      type="number"
                      value={systemSettings.maintenanceSettings.reminderDays}
                    />
                  </FormField>

                  <FormField label="Emergency Contact">
                    <Input
                      value={systemSettings.maintenanceSettings.emergencyContacts}
                    />
                  </FormField>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      Schedule Reminders
                    </div>
                    <div className="text-sm text-gray-500">
                      Send reminders for scheduled maintenance
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={systemSettings.maintenanceSettings.scheduleReminders}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      Auto Schedule
                    </div>
                    <div className="text-sm text-gray-500">
                      Automatically schedule routine maintenance
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={systemSettings.maintenanceSettings.autoSchedule}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
} 