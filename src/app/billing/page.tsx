"use client"

import React, { useState } from 'react'
import { 
  CreditCard, 
  Receipt, 
  History, 
  Download,
  CreditCardIcon,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Search,
  Filter
} from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'

interface Invoice {
  id: string
  pool: string
  amount: string
  date: string
  status: 'paid' | 'pending' | 'overdue'
  dueDate: string
  items: Array<{
    description: string
    quantity: number
    rate: number
    amount: number
  }>
}

const invoices: Invoice[] = [
  {
    id: 'INV-2024-001',
    pool: 'Main Pool',
    amount: '$450.00',
    date: '2024-03-15',
    status: 'paid',
    dueDate: '2024-03-30',
    items: [
      {
        description: 'Monthly Maintenance',
        quantity: 1,
        rate: 300,
        amount: 300
      },
      {
        description: 'Chemical Supply',
        quantity: 2,
        rate: 75,
        amount: 150
      }
    ]
  },
  {
    id: 'INV-2024-002',
    pool: 'Spa Area',
    amount: '$275.00',
    date: '2024-03-10',
    status: 'pending',
    dueDate: '2024-03-25',
    items: [
      {
        description: 'Filter Replacement',
        quantity: 1,
        rate: 175,
        amount: 175
      },
      {
        description: 'Water Testing',
        quantity: 2,
        rate: 50,
        amount: 100
      }
    ]
  },
  {
    id: 'INV-2024-003',
    pool: 'Kids Pool',
    amount: '$525.00',
    date: '2024-03-05',
    status: 'overdue',
    dueDate: '2024-03-20',
    items: [
      {
        description: 'Emergency Repair',
        quantity: 1,
        rate: 400,
        amount: 400
      },
      {
        description: 'Parts and Materials',
        quantity: 1,
        rate: 125,
        amount: 125
      }
    ]
  }
]

const subscriptionDetails = {
  plan: 'Professional',
  status: 'Active',
  amount: '$299/month',
  nextBilling: '2024-04-01',
  paymentMethod: {
    type: 'Credit Card',
    last4: '4242',
    expiry: '12/25'
  },
  features: [
    'Unlimited Pool Monitoring',
    'Real-time Alerts',
    'Chemical Management',
    'Maintenance Scheduling',
    'Advanced Analytics',
    'Priority Support'
  ]
}

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<'invoices' | 'subscription'>('invoices')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="page-container">
      <PageHeader 
        icon={CreditCard}
        title="Billing & Payments"
        subtitle="Manage your billing, invoices and subscription"
      />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card-container card-gradient-blue p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Total Outstanding</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">$800.00</div>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Receipt className="w-5 h-5 text-blue-500" />
            </div>
          </div>
        </div>
        <div className="card-container card-gradient-emerald p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Last Payment</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">$450.00</div>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
        </div>
        <div className="card-container card-gradient-amber p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Next Payment Due</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">Mar 25</div>
            </div>
            <div className="p-3 bg-amber-500/10 rounded-lg">
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${activeTab === 'invoices' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50'}`}
          >
            Invoices & History
          </button>
          <button
            onClick={() => setActiveTab('subscription')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${activeTab === 'subscription' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50'}`}
          >
            Subscription
          </button>
        </div>

        {activeTab === 'invoices' && (
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800
                         rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
              />
            </div>

            <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50
                             rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="card-container card-gradient-blue">
        {activeTab === 'invoices' && (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead className="table-header">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Invoice</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Pool</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Due Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800/50">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{invoice.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{invoice.pool}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{invoice.amount}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{invoice.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{invoice.dueDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${invoice.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400' :
                          invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-400' :
                          'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-400'}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-500 hover:text-blue-600 font-medium text-sm inline-flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'subscription' && (
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Current Plan */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Current Plan</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Plan</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{subscriptionDetails.plan}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Status</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400">
                        {subscriptionDetails.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Amount</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{subscriptionDetails.amount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Next Billing</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{subscriptionDetails.nextBilling}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Payment Method</h3>
                  <div className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <CreditCardIcon className="w-6 h-6 text-gray-500" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {subscriptionDetails.paymentMethod.type} ending in {subscriptionDetails.paymentMethod.last4}
                      </div>
                      <div className="text-sm text-gray-500">
                        Expires {subscriptionDetails.paymentMethod.expiry}
                      </div>
                    </div>
                    <button className="ml-auto text-blue-500 hover:text-blue-600 text-sm font-medium">
                      Update
                    </button>
                  </div>
                </div>
              </div>

              {/* Plan Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Plan Features</h3>
                <div className="space-y-3">
                  {subscriptionDetails.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium 
                                   hover:bg-blue-600 transition-colors">
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 