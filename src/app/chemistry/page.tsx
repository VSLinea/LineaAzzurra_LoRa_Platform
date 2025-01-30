"use client"

import React, { useState } from 'react'
import { 
  FlaskConicalIcon,
  FileTextIcon,
  PlusIcon,
  SearchIcon,
  ClipboardListIcon,
  BeakerIcon,
  AlertCircleIcon
} from 'lucide-react'
import RecordTestModal from '../../components/chemistry/RecordTestModal'
import AddChemicalModal from '../../components/chemistry/AddChemicalModal'
import AddLogEntryModal from '../../components/chemistry/AddLogEntryModal'

interface ChemicalItem {
  id: string
  name: string
  currentStock: number
  unit: string
  reorderPoint: number
  lastOrdered: string
  supplier: string
  safetySheet: string
  status: 'ok' | 'low' | 'critical'
}

interface TestResult {
  id: string
  date: string
  time: string
  pool: string
  parameters: {
    ph: number
    chlorine: number
    alkalinity: number
    calcium: number
    cyanuricAcid: number
    tds: number
  }
  testedBy: string
  notes?: string
  status: 'normal' | 'warning' | 'critical'
}

interface UsageLog {
  id: string
  date: string
  time: string
  pool: string
  chemical: string
  amount: number
  unit: string
  reason: string
  addedBy: string
  currentLevel?: string
  notes?: string
}

const chemicalInventory: ChemicalItem[] = [
  {
    id: '1',
    name: 'Chlorine Tablets',
    currentStock: 50,
    unit: 'kg',
    reorderPoint: 20,
    lastOrdered: '2024-02-01',
    supplier: 'ChemCo Ltd',
    safetySheet: '/sds/chlorine.pdf',
    status: 'ok'
  },
  {
    id: '2',
    name: 'pH Minus',
    currentStock: 15,
    unit: 'L',
    reorderPoint: 25,
    lastOrdered: '2024-01-15',
    supplier: 'ChemCo Ltd',
    safetySheet: '/sds/ph-minus.pdf',
    status: 'low'
  },
  {
    id: '3',
    name: 'Alkalinity Up',
    currentStock: 5,
    unit: 'kg',
    reorderPoint: 10,
    lastOrdered: '2024-01-20',
    supplier: 'PoolChem Inc',
    safetySheet: '/sds/alkalinity.pdf',
    status: 'critical'
  },
  {
    id: '4',
    name: 'Calcium Hardness Plus',
    currentStock: 30,
    unit: 'kg',
    reorderPoint: 15,
    lastOrdered: '2024-02-10',
    supplier: 'PoolChem Inc',
    safetySheet: '/sds/calcium.pdf',
    status: 'ok'
  },
  {
    id: '5',
    name: 'Stabilizer (CYA)',
    currentStock: 25,
    unit: 'kg',
    reorderPoint: 20,
    lastOrdered: '2024-02-05',
    supplier: 'ChemCo Ltd',
    safetySheet: '/sds/cya.pdf',
    status: 'ok'
  }
]

const testResults: TestResult[] = [
  {
    id: '1',
    date: '2024-02-20',
    time: '09:00',
    pool: 'Main Pool',
    parameters: {
      ph: 7.2,
      chlorine: 2.0,
      alkalinity: 100,
      calcium: 250,
      cyanuricAcid: 30,
      tds: 1000
    },
    testedBy: 'John Smith',
    status: 'normal'
  },
  {
    id: '2',
    date: '2024-02-20',
    time: '14:00',
    pool: 'Kids Pool',
    parameters: {
      ph: 7.8,
      chlorine: 1.5,
      alkalinity: 90,
      calcium: 200,
      cyanuricAcid: 25,
      tds: 800
    },
    testedBy: 'Sarah Johnson',
    status: 'warning',
    notes: 'pH slightly high, adjusted with pH minus'
  },
  {
    id: '3',
    date: '2024-02-20',
    time: '17:00',
    pool: 'Lap Pool',
    parameters: {
      ph: 6.8,
      chlorine: 3.0,
      alkalinity: 80,
      calcium: 300,
      cyanuricAcid: 40,
      tds: 1200
    },
    testedBy: 'Mike Wilson',
    status: 'critical',
    notes: 'pH too low, chlorine high'
  }
]

const usageLogs: UsageLog[] = [
  {
    id: '1',
    date: '2024-02-20',
    time: '10:30',
    pool: 'Main Pool',
    chemical: 'Chlorine Tablets',
    amount: 2,
    unit: 'kg',
    reason: 'Routine maintenance',
    addedBy: 'John Smith',
    currentLevel: '2.0 ppm'
  },
  {
    id: '2',
    date: '2024-02-20',
    time: '15:30',
    pool: 'Kids Pool',
    chemical: 'pH Minus',
    amount: 0.5,
    unit: 'L',
    reason: 'pH adjustment',
    addedBy: 'Sarah Johnson',
    currentLevel: '7.4',
    notes: 'pH was high, adjusted down'
  },
  {
    id: '3',
    date: '2024-02-20',
    time: '16:45',
    pool: 'Lap Pool',
    chemical: 'Alkalinity Up',
    amount: 1.5,
    unit: 'kg',
    reason: 'Low alkalinity',
    addedBy: 'Mike Wilson',
    currentLevel: '90 ppm'
  }
]

const pools = [
  { id: '1', name: 'Main Pool' },
  { id: '2', name: 'Kids Pool' },
  { id: '3', name: 'Lap Pool' }
]

type ChemistryTab = 'inventory' | 'tests' | 'logs'

export default function ChemistryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<ChemistryTab>('inventory')
  const [isRecordTestOpen, setIsRecordTestOpen] = useState(false)
  const [isAddChemicalOpen, setIsAddChemicalOpen] = useState(false)
  const [isAddLogEntryOpen, setIsAddLogEntryOpen] = useState(false)

  const handleRecordTest = (testData: any) => {
    // Add the new test to testResults array
    const newTest = {
      id: (testResults.length + 1).toString(),
      ...testData
    }
    
    // In a real app, this would be an API call
    testResults.push(newTest)
    
    // Close modal and refresh view
    setIsRecordTestOpen(false)
  }

  const handleAddChemical = (chemicalData: any) => {
    // Add the new chemical to inventory array
    const newChemical = {
      ...chemicalData,
      id: (chemicalInventory.length + 1).toString()
    }
    
    // In a real app, this would be an API call
    chemicalInventory.push(newChemical)
    
    // Close modal and refresh view
    setIsAddChemicalOpen(false)
  }

  const handleAddLogEntry = (logData: any) => {
    // Add the new log to usageLogs array
    const newLog = {
      ...logData,
      id: (usageLogs.length + 1).toString()
    }
    
    // In a real app, this would be an API call
    usageLogs.push(newLog)
    
    // Close modal and refresh view
    setIsAddLogEntryOpen(false)
  }

  // Update the Add button click handler
  const handleAddClick = () => {
    if (activeTab === 'tests') {
      setIsRecordTestOpen(true)
    } else if (activeTab === 'inventory') {
      setIsAddChemicalOpen(true)
    } else if (activeTab === 'logs') {
      setIsAddLogEntryOpen(true)
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <BeakerIcon className="w-7 h-7 text-blue-500" />
        <span>Chemistry Management</span>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-800">
        {[
          { id: 'inventory', label: 'Inventory', icon: BeakerIcon },
          { id: 'tests', label: 'Test Results', icon: ClipboardListIcon },
          { id: 'logs', label: 'Usage Logs', icon: FileTextIcon }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as ChemistryTab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center space-x-2
              ${activeTab === tab.id 
                ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800
                     rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
          />
        </div>

        <button onClick={handleAddClick} className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium 
                       hover:bg-blue-600 transition-colors flex items-center space-x-2">
          <PlusIcon className="w-4 h-4" />
          <span>
            {activeTab === 'inventory' ? 'Add Chemical' : 
             activeTab === 'tests' ? 'Record Test' : 
             'Add Log Entry'}
          </span>
        </button>
      </div>

      {/* Content based on active tab */}
      <div className="space-y-6">
        {activeTab === 'inventory' && <InventoryTab />}
        {activeTab === 'tests' && <TestResultsTab />}
        {activeTab === 'logs' && <UsageLogsTab />}
      </div>

      {/* Add all modals */}
      <RecordTestModal
        isOpen={isRecordTestOpen}
        onClose={() => setIsRecordTestOpen(false)}
        onSubmit={handleRecordTest}
        pools={pools}
      />
      <AddChemicalModal
        isOpen={isAddChemicalOpen}
        onClose={() => setIsAddChemicalOpen(false)}
        onSubmit={handleAddChemical}
      />
      <AddLogEntryModal
        isOpen={isAddLogEntryOpen}
        onClose={() => setIsAddLogEntryOpen(false)}
        onSubmit={handleAddLogEntry}
        pools={pools}
        chemicals={chemicalInventory.map(c => ({
          id: c.id,
          name: c.name,
          unit: c.unit
        }))}
      />
    </div>
  )
}

function InventoryTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {chemicalInventory.map((chemical) => (
        <div key={chemical.id} className="card-container p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {chemical.name}
            </h3>
            <span className={`status-badge ${
              chemical.status === 'ok' ? 'status-completed' :
              chemical.status === 'low' ? 'status-pending' :
              'status-in-progress'
            }`}>
              {chemical.status}
            </span>
          </div>

          <div className="space-y-4">
            {/* Stock Level */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Current Stock</span>
                <span className="font-medium">{chemical.currentStock} {chemical.unit}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    chemical.currentStock > chemical.reorderPoint * 2 ? 'bg-green-500' :
                    chemical.currentStock > chemical.reorderPoint ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${(chemical.currentStock / (chemical.reorderPoint * 3)) * 100}%` }}
                />
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Reorder Point</span>
                <span className="float-right font-medium">{chemical.reorderPoint} {chemical.unit}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Last Ordered</span>
                <span className="float-right font-medium">{chemical.lastOrdered}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
              <span className="text-sm text-gray-600 dark:text-gray-400">{chemical.supplier}</span>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg" title="View SDS">
                  <FileTextIcon className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg" title="Order">
                  <AlertCircleIcon className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function TestResultsTab() {
  return (
    <div className="space-y-6">
      {/* Recent Tests Table */}
      <div className="card-container overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Recent Test Results</h3>
          <button className="text-sm text-blue-500 hover:text-blue-600">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pool</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">pH</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chlorine</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alkalinity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tested By</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {testResults.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div>{test.date}</div>
                    <div className="text-gray-500">{test.time}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{test.pool}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{test.parameters.ph}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{test.parameters.chlorine}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{test.parameters.alkalinity}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${test.status === 'normal' ? 'bg-green-100 text-green-800' :
                        test.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{test.testedBy}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                    <button className="text-blue-500 hover:text-blue-600">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function UsageLogsTab() {
  return (
    <div className="space-y-6">
      {/* Usage Logs Table */}
      <div className="card-container overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Chemical Usage Logs</h3>
          <button className="text-sm text-blue-500 hover:text-blue-600">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pool</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chemical</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added By</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Level</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {usageLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div>{log.date}</div>
                    <div className="text-gray-500">{log.time}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{log.pool}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{log.chemical}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{log.amount} {log.unit}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{log.reason}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{log.addedBy}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{log.currentLevel}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                    <button className="text-blue-500 hover:text-blue-600">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 