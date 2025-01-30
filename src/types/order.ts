export type OrderStatus = 
  | 'draft'        // Initial state when creating order
  | 'pending'      // Submitted but not yet validated
  | 'validated'    // Checked by system/manager
  | 'processing'   // Being prepared in warehouse
  | 'shipped'      // On the way
  | 'delivered'    // Received by customer
  | 'cancelled'    // Cancelled at any point

export type OrderPriority = 'normal' | 'high' | 'urgent'

export interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  inStock?: boolean
  estimatedDelivery?: string
}

export interface Order {
  id: string
  pool: string
  items: OrderItem[]
  totalAmount: string
  status: OrderStatus
  priority: OrderPriority
  orderDate: string
  validatedDate?: string
  processedDate?: string
  shippedDate?: string
  deliveryDate?: string
  cancelledDate?: string
  notes?: string
  validatedBy?: string
  processedBy?: string
}

export interface OrderValidation {
  isValid: boolean
  errors: {
    stockAvailable?: boolean
    maxQuantityExceeded?: boolean
    budgetExceeded?: boolean
    priorityAllowed?: boolean
  }
  warnings: {
    estimatedDeliveryDelayed?: boolean
    partialStockAvailable?: boolean
    priceChanged?: boolean
  }
}

export interface OrderStatusTransition {
  from: OrderStatus
  to: OrderStatus
  requiredRole: 'customer' | 'manager' | 'warehouse' | 'system'
  validation?: (order: Order) => Promise<OrderValidation>
  autoTransition?: boolean
}

export const ORDER_STATUS_TRANSITIONS: OrderStatusTransition[] = [
  {
    from: 'draft',
    to: 'pending',
    requiredRole: 'customer',
    validation: async (order) => {
      // Basic validation
      return {
        isValid: true,
        errors: {},
        warnings: {}
      }
    }
  },
  {
    from: 'pending',
    to: 'validated',
    requiredRole: 'manager',
    validation: async (order) => {
      // Stock and budget validation
      return {
        isValid: true,
        errors: {},
        warnings: {}
      }
    }
  },
  {
    from: 'validated',
    to: 'processing',
    requiredRole: 'warehouse',
    validation: async (order) => {
      // Warehouse capacity validation
      return {
        isValid: true,
        errors: {},
        warnings: {}
      }
    }
  },
  {
    from: 'processing',
    to: 'shipped',
    requiredRole: 'warehouse',
    validation: async (order) => {
      // Shipping validation
      return {
        isValid: true,
        errors: {},
        warnings: {}
      }
    }
  },
  {
    from: 'shipped',
    to: 'delivered',
    requiredRole: 'customer',
    validation: async (order) => {
      // Delivery confirmation
      return {
        isValid: true,
        errors: {},
        warnings: {}
      }
    }
  }
]

export const CANCELLABLE_STATUSES: OrderStatus[] = ['draft', 'pending', 'validated', 'processing'] 