"use client"

import React, { useState } from 'react'
import { 
  ShoppingCart,
  Package,
  Clock,
  AlertTriangle,
  Truck,
  CheckCircle2,
  Eye,
  Calendar,
  DollarSign,
  X,
  LucideIcon
} from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import TabNavigation from '../../components/ui/TabNavigation'
import SearchFilterBar from '../../components/ui/SearchFilterBar'
import StatusBadge from '../../components/ui/StatusBadge'
import KPICard from '../../components/ui/KPICard'
import DataTable from '../../components/ui/DataTable'
import Modal from '../../components/ui/Modal'
import ActionButton from '../../components/ui/ActionButton'
import Card from '../../components/ui/Card'
import FilterPopover from '../../components/ui/FilterPopover'
import FormField from '../../components/ui/FormField'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import AddItemForm from '../../components/ui/AddItemForm'
import { orderService } from '../../services/orderService'
import { Order as OrderType, OrderStatus, OrderValidation } from '../../types/order'

interface NewOrderForm {
  pool: string
  priority: string
  items: Array<{
    id: string
    name: string
    quantity: number
    price: number
  }>
}

interface FormErrors {
  pool?: string
  priority?: string
  items?: string
}

const orders: OrderType[] = [
  {
    id: 'ORD-2024-001',
    pool: 'Main Pool',
    items: [
      { id: '1', name: 'Chlorine Tablets', quantity: 2, price: 45.99 },
      { id: '2', name: 'pH Increaser', quantity: 1, price: 24.99 }
    ],
    totalAmount: '$116.97',
    status: 'delivered',
    orderDate: '2024-03-15',
    deliveryDate: '2024-03-18',
    priority: 'normal'
  },
  {
    id: 'ORD-2024-002',
    pool: 'Spa Area',
    items: [
      { id: '3', name: 'Filter Cartridge', quantity: 1, price: 89.99 },
      { id: '4', name: 'Test Strips', quantity: 2, price: 15.99 }
    ],
    totalAmount: '$121.97',
    status: 'processing',
    orderDate: '2024-03-17',
    priority: 'high'
  },
  {
    id: 'ORD-2024-003',
    pool: 'Kids Pool',
    items: [
      { id: '5', name: 'Pool Shock', quantity: 3, price: 19.99 },
      { id: '6', name: 'Algaecide', quantity: 1, price: 34.99 }
    ],
    totalAmount: '$94.96',
    status: 'pending',
    orderDate: '2024-03-18',
    priority: 'urgent'
  }
]

const orderHistory: OrderType[] = [
  {
    id: 'ORD-2024-000',
    pool: 'Main Pool',
    items: [
      { id: '7', name: 'Pool Shock', quantity: 5, price: 19.99 },
      { id: '8', name: 'Test Kit', quantity: 1, price: 49.99 }
    ],
    totalAmount: '$149.94',
    status: 'delivered',
    orderDate: '2024-03-01',
    deliveryDate: '2024-03-03',
    priority: 'normal'
  },
  {
    id: 'ORD-2023-099',
    pool: 'Kids Pool',
    items: [
      { id: '9', name: 'Filter Sand', quantity: 2, price: 29.99 },
      { id: '10', name: 'Skimmer Net', quantity: 1, price: 15.99 }
    ],
    totalAmount: '$75.97',
    status: 'cancelled',
    orderDate: '2024-02-28',
    priority: 'normal'
  }
]

const statusTypeMap = {
  draft: 'info',
  pending: 'warning',
  validated: 'success',
  processing: 'info',
  shipped: 'info',
  delivered: 'success',
  cancelled: 'error'
} as const

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('active')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null)
  const [showNewOrderModal, setShowNewOrderModal] = useState(false)
  const [filters, setFilters] = useState<Array<{ field: string, value: string }>>([])
  const [newOrder, setNewOrder] = useState<NewOrderForm>({
    pool: '',
    priority: '',
    items: []
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ordersList, setOrdersList] = useState<OrderType[]>(orders)

  const tabs = [
    { id: 'active', label: 'Active Orders' },
    { id: 'history', label: 'Order History' }
  ]

  const columns = [
    {
      key: 'id',
      header: 'Order ID',
      cell: (order: OrderType) => (
        <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
          {order.id}
        </div>
      )
    },
    {
      key: 'pool',
      header: 'Pool',
      cell: (order: OrderType) => (
        <div className="text-sm text-gray-500">
          {order.pool}
        </div>
      )
    },
    {
      key: 'items',
      header: 'Items',
      cell: (order: OrderType) => (
        <div className="text-sm text-gray-500">
          {order.items.map(item => item.name).join(', ')}
        </div>
      )
    },
    {
      key: 'total',
      header: 'Total',
      cell: (order: OrderType) => (
        <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
          {order.totalAmount}
        </div>
      )
    },
    {
      key: 'date',
      header: 'Order Date',
      cell: (order: OrderType) => (
        <div>
          <div className="text-sm text-gray-500">{order.orderDate}</div>
          {order.deliveryDate && (
            <div className="text-xs text-gray-400">
              Delivered: {order.deliveryDate}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      cell: (order: OrderType) => (
        <StatusBadge 
          status={order.status}
          type={statusTypeMap[order.status]}
        />
      )
    },
    {
      key: 'priority',
      header: 'Priority',
      cell: (order: OrderType) => (
        <StatusBadge 
          status={order.priority}
          type={order.priority === 'urgent' ? 'error' : 
                order.priority === 'high' ? 'warning' : 'info'}
        />
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (order: OrderType) => (
        <button 
          onClick={() => setSelectedOrder(order)}
          className="text-blue-500 hover:text-blue-600 font-medium text-sm inline-flex items-center space-x-1"
        >
          <Eye className="w-4 h-4" />
          <span>View</span>
        </button>
      )
    }
  ]

  const filterOptions = [
    {
      field: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'processing', label: 'Processing' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'cancelled', label: 'Cancelled' }
      ]
    },
    {
      field: 'priority',
      label: 'Priority',
      type: 'select' as const,
      options: [
        { value: 'normal', label: 'Normal' },
        { value: 'high', label: 'High' },
        { value: 'urgent', label: 'Urgent' }
      ]
    },
    {
      field: 'date',
      label: 'Order Date',
      type: 'date' as const
    }
  ]

  const filteredOrders = React.useMemo(() => {
    let result = activeTab === 'active' ? orders : orderHistory

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(order => 
        order.id.toLowerCase().includes(query) ||
        order.pool.toLowerCase().includes(query) ||
        order.items.some(item => item.name.toLowerCase().includes(query))
      )
    }

    // Apply filters
    filters.forEach(filter => {
      switch (filter.field) {
        case 'status':
          result = result.filter(order => order.status === filter.value)
          break
        case 'priority':
          result = result.filter(order => order.priority === filter.value)
          break
        case 'date':
          result = result.filter(order => order.orderDate === filter.value)
          break
      }
    })

    return result
  }, [activeTab, searchQuery, filters, orders, orderHistory])

  const validateForm = () => {
    const errors: FormErrors = {}
    
    if (!newOrder.pool) {
      errors.pool = 'Pool is required'
    }
    
    if (!newOrder.priority) {
      errors.priority = 'Priority is required'
    }
    
    if (newOrder.items.length === 0) {
      errors.items = 'At least one item is required'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmitOrder = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Create new order
      const orderToCreate = {
        pool: newOrder.pool,
        items: newOrder.items.map(({ id, name, quantity, price }) => ({ 
          id, name, quantity, price 
        })),
        totalAmount: `$${newOrder.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}`,
        priority: newOrder.priority as 'normal' | 'high' | 'urgent'
      }

      // Create order in draft state
      const createdOrder = await orderService.createOrder(orderToCreate)
      
      // Validate stock availability
      const stockValidation = await orderService.validateStock(createdOrder.items)
      if (!stockValidation.isValid) {
        setFormErrors(prev => ({
          ...prev,
          items: 'Some items are out of stock'
        }))
        return
      }

      // Validate budget
      const budgetValidation = await orderService.validateBudget(createdOrder)
      if (!budgetValidation.isValid) {
        setFormErrors(prev => ({
          ...prev,
          items: 'Order exceeds budget limit'
        }))
        return
      }

      // Submit order
      const submitValidation = await orderService.submitOrder(createdOrder)
      if (!submitValidation.isValid) {
        setFormErrors(prev => ({
          ...prev,
          items: 'Failed to submit order'
        }))
        return
      }

      // Add to orders list
      setOrdersList(prev => [createdOrder, ...prev])
      
      // Reset form
      setNewOrder({
        pool: '',
        priority: '',
        items: []
      })
      setShowNewOrderModal(false)
    } catch (error) {
      console.error('Failed to submit order:', error)
      setFormErrors(prev => ({
        ...prev,
        items: 'An unexpected error occurred'
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  // Update the order action handler
  const handleOrderAction = async (order: OrderType, action: OrderStatus) => {
    try {
      let validation: OrderValidation

      switch (action) {
        case 'validated':
          validation = await orderService.validateOrder(order, 'MANAGER-001')
          break
        case 'processing':
          validation = await orderService.startProcessing(order, 'WAREHOUSE-001')
          break
        case 'shipped':
          validation = await orderService.shipOrder(order)
          break
        case 'delivered':
          validation = await orderService.confirmDelivery(order)
          break
        case 'cancelled':
          validation = await orderService.cancelOrder(order)
          break
        default:
          return
      }

      if (!validation.isValid) {
        // Handle validation errors
        console.error('Action validation failed:', validation.errors)
        return
      }

      // Update orders list
      setOrdersList(prev => [...prev])
    } catch (error) {
      console.error('Failed to perform action:', error)
    }
  }

  // Update the action renderer
  const renderOrderActions = (order: OrderType) => {
    const availableActions = orderService.getAvailableActions(order, 'customer')

    return (
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-800">
        {order.status !== 'cancelled' && order.status !== 'delivered' && (
          <ActionButton
            label="Cancel Order"
            variant="danger"
            onClick={() => handleOrderAction(order, 'cancelled')}
          />
        )}
        
        {availableActions.map(action => {
          let actionLabel = ''
          let actionIcon: LucideIcon | undefined

          switch (action) {
            case 'validated':
              actionLabel = 'Validate Order'
              break
            case 'processing':
              actionLabel = 'Start Processing'
              actionIcon = Package
              break
            case 'shipped':
              actionLabel = 'Mark as Shipped'
              actionIcon = Truck
              break
            case 'delivered':
              actionLabel = 'Confirm Delivery'
              actionIcon = CheckCircle2
              break
          }

          return (
            <ActionButton
              key={action}
              label={actionLabel}
              icon={actionIcon}
              variant="primary"
              onClick={() => handleOrderAction(order, action)}
            />
          )
        })}
      </div>
    )
  }

  const handleAddItem = (item: string, quantity: number) => {
    const itemOption = itemOptions.find(opt => opt.value === item)
    if (!itemOption) return

    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: itemOption.label,
      quantity,
      price: itemOption.price
    }

    setNewOrder(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }))
  }

  const handleRemoveItem = (itemId: string) => {
    setNewOrder(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }))
  }

  const itemOptions = [
    { value: 'chlorine', label: 'Chlorine Tablets', price: 45.99 },
    { value: 'ph-up', label: 'pH Increaser', price: 24.99 },
    { value: 'filter', label: 'Filter Cartridge', price: 89.99 },
    { value: 'test-strips', label: 'Test Strips', price: 15.99 },
    { value: 'shock', label: 'Pool Shock', price: 19.99 },
    { value: 'algaecide', label: 'Algaecide', price: 34.99 }
  ]

  return (
    <div className="page-container">
      <PageHeader 
        icon={ShoppingCart}
        title="Orders"
        subtitle="Manage chemical and equipment orders"
      />

      <div className="grid grid-cols-4 gap-4 mb-6">
        <KPICard
          title="Total Orders"
          value="24"
          icon={Package}
          gradient="blue"
          change={{ value: "+3", trend: "up" }}
        />
        <KPICard
          title="Pending"
          value="5"
          icon={Clock}
          gradient="amber"
        />
        <KPICard
          title="Processing"
          value="8"
          icon={Truck}
          gradient="emerald"
        />
        <KPICard
          title="Issues"
          value="2"
          icon={AlertTriangle}
          gradient="rose"
        />
      </div>

      <div className="flex items-center justify-between mb-6">
        <TabNavigation 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="flex items-center space-x-3">
          <SearchFilterBar
            searchPlaceholder="Search orders..."
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            showFilter={false}
          />

          <FilterPopover
            options={filterOptions}
            onFilter={setFilters}
            activeFilters={filters}
          />

          <ActionButton
            label="New Order"
            icon={ShoppingCart}
            variant="primary"
            onClick={() => setShowNewOrderModal(true)}
          />
        </div>
      </div>

      <Card gradient="blue">
        <DataTable
          data={filteredOrders}
          columns={columns}
        />
      </Card>

      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`Order Details - ${selectedOrder?.id}`}
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Order Info */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Pool</div>
                  <div className="text-base font-medium text-gray-900 dark:text-gray-100">
                    {selectedOrder.pool}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Status</div>
                  <div className="mt-1">
                    <StatusBadge 
                      status={selectedOrder.status}
                      type={statusTypeMap[selectedOrder.status]}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Priority</div>
                  <div className="mt-1">
                    <StatusBadge 
                      status={selectedOrder.priority}
                      type={selectedOrder.priority === 'urgent' ? 'error' : 
                            selectedOrder.priority === 'high' ? 'warning' : 'info'}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Order Date</div>
                  <div className="text-base font-medium text-gray-900 dark:text-gray-100">
                    {selectedOrder.orderDate}
                  </div>
                </div>
                {selectedOrder.deliveryDate && (
                  <div>
                    <div className="text-sm text-gray-500">Delivery Date</div>
                    <div className="text-base font-medium text-gray-900 dark:text-gray-100">
                      {selectedOrder.deliveryDate}
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-gray-500">Total Amount</div>
                  <div className="text-base font-medium text-gray-900 dark:text-gray-100">
                    {selectedOrder.totalAmount}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <Card
              header={{
                title: 'Order Items',
                icon: Package
              }}
              gradient="none"
              className="bg-gray-50 dark:bg-gray-800/50"
            >
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {selectedOrder.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200">{item.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{item.quantity}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-200">
                        ${(item.quantity * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            {/* Replace the existing actions section with the new one */}
            {renderOrderActions(selectedOrder)}
          </div>
        )}
      </Modal>

      {/* New Order Modal */}
      <Modal
        isOpen={showNewOrderModal}
        onClose={() => setShowNewOrderModal(false)}
        title="Create New Order"
        size="lg"
      >
        <div className="space-y-6">
          <FormField 
            label="Pool" 
            required 
            error={formErrors.pool}
          >
            <Select
              value={newOrder.pool}
              onChange={(value) => setNewOrder(prev => ({ ...prev, pool: value }))}
              options={[
                { value: 'main-pool', label: 'Main Pool' },
                { value: 'spa-area', label: 'Spa Area' },
                { value: 'kids-pool', label: 'Kids Pool' }
              ]}
              placeholder="Select pool"
              error={!!formErrors.pool}
            />
          </FormField>

          <FormField 
            label="Priority" 
            required
            error={formErrors.priority}
          >
            <Select
              value={newOrder.priority}
              onChange={(value) => setNewOrder(prev => ({ ...prev, priority: value }))}
              options={[
                { value: 'normal', label: 'Normal' },
                { value: 'high', label: 'High' },
                { value: 'urgent', label: 'Urgent' }
              ]}
              placeholder="Select priority"
              error={!!formErrors.priority}
            />
          </FormField>

          <Card
            header={{
              title: 'Order Items',
              subtitle: 'Add items to your order'
            }}
          >
            <div className="space-y-4">
              <AddItemForm
                itemOptions={itemOptions}
                onAddItem={handleAddItem}
              />

              {formErrors.items && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {formErrors.items}
                </p>
              )}

              {newOrder.items.length > 0 ? (
                <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                  <table className="w-full">
                    <thead>
                      <tr className="text-sm text-gray-500">
                        <th className="text-left font-medium">Item</th>
                        <th className="text-right font-medium">Quantity</th>
                        <th className="text-right font-medium">Price</th>
                        <th className="text-right font-medium">Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {newOrder.items.map((item) => (
                        <tr key={item.id} className="text-sm">
                          <td className="py-2">{item.name}</td>
                          <td className="text-right">{item.quantity}</td>
                          <td className="text-right">${item.price.toFixed(2)}</td>
                          <td className="text-right font-medium">
                            ${(item.quantity * item.price).toFixed(2)}
                          </td>
                          <td className="text-right">
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr className="font-medium">
                        <td colSpan={3} className="py-2 text-right">Total:</td>
                        <td className="text-right">
                          ${newOrder.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                  <div className="text-sm text-gray-500">No items added yet</div>
                </div>
              )}
            </div>
          </Card>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <ActionButton
              label="Cancel"
              variant="secondary"
              onClick={() => setShowNewOrderModal(false)}
            />
            <ActionButton
              label="Create Order"
              variant="primary"
              onClick={handleSubmitOrder}
              loading={isSubmitting}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
} 