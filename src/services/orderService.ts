import { 
  Order, 
  OrderStatus, 
  OrderValidation,
  OrderStatusTransition,
  ORDER_STATUS_TRANSITIONS,
  CANCELLABLE_STATUSES
} from '../types/order'

class OrderService {
  private async validateTransition(
    order: Order,
    fromStatus: OrderStatus,
    toStatus: OrderStatus,
    userRole: string
  ): Promise<OrderValidation> {
    const transition = ORDER_STATUS_TRANSITIONS.find(
      t => t.from === fromStatus && t.to === toStatus
    )

    if (!transition) {
      return {
        isValid: false,
        errors: {},
        warnings: {}
      }
    }

    if (transition.requiredRole !== userRole) {
      return {
        isValid: false,
        errors: {
          priorityAllowed: false
        },
        warnings: {}
      }
    }

    if (transition.validation) {
      return await transition.validation(order)
    }

    return {
      isValid: true,
      errors: {},
      warnings: {}
    }
  }

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    // In a real app, this would call an API
    const order: Order = {
      id: `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      status: 'draft',
      orderDate: new Date().toISOString().split('T')[0],
      ...orderData
    } as Order

    return order
  }

  async submitOrder(order: Order): Promise<OrderValidation> {
    const validation = await this.validateTransition(order, 'draft', 'pending', 'customer')
    
    if (validation.isValid) {
      order.status = 'pending'
    }

    return validation
  }

  async validateOrder(order: Order, managerId: string): Promise<OrderValidation> {
    const validation = await this.validateTransition(order, 'pending', 'validated', 'manager')
    
    if (validation.isValid) {
      order.status = 'validated'
      order.validatedDate = new Date().toISOString().split('T')[0]
      order.validatedBy = managerId
    }

    return validation
  }

  async startProcessing(order: Order, warehouseId: string): Promise<OrderValidation> {
    const validation = await this.validateTransition(order, 'validated', 'processing', 'warehouse')
    
    if (validation.isValid) {
      order.status = 'processing'
      order.processedDate = new Date().toISOString().split('T')[0]
      order.processedBy = warehouseId
    }

    return validation
  }

  async shipOrder(order: Order): Promise<OrderValidation> {
    const validation = await this.validateTransition(order, 'processing', 'shipped', 'warehouse')
    
    if (validation.isValid) {
      order.status = 'shipped'
      order.shippedDate = new Date().toISOString().split('T')[0]
    }

    return validation
  }

  async confirmDelivery(order: Order): Promise<OrderValidation> {
    const validation = await this.validateTransition(order, 'shipped', 'delivered', 'customer')
    
    if (validation.isValid) {
      order.status = 'delivered'
      order.deliveryDate = new Date().toISOString().split('T')[0]
    }

    return validation
  }

  async cancelOrder(order: Order): Promise<OrderValidation> {
    if (!CANCELLABLE_STATUSES.includes(order.status)) {
      return {
        isValid: false,
        errors: {},
        warnings: {
          estimatedDeliveryDelayed: true
        }
      }
    }

    order.status = 'cancelled'
    order.cancelledDate = new Date().toISOString().split('T')[0]

    return {
      isValid: true,
      errors: {},
      warnings: {}
    }
  }

  getAvailableActions(order: Order, userRole: string): OrderStatus[] {
    return ORDER_STATUS_TRANSITIONS
      .filter(t => t.from === order.status && t.requiredRole === userRole)
      .map(t => t.to)
  }

  async validateStock(items: Order['items']): Promise<OrderValidation> {
    // In a real app, this would check against actual inventory
    const stockCheck = items.every(item => Math.random() > 0.2)
    
    return {
      isValid: stockCheck,
      errors: {
        stockAvailable: stockCheck
      },
      warnings: {
        partialStockAvailable: !stockCheck
      }
    }
  }

  async validateBudget(order: Order): Promise<OrderValidation> {
    // In a real app, this would check against budget limits
    const totalAmount = order.items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
    const withinBudget = totalAmount <= 5000 // Example budget limit
    
    return {
      isValid: withinBudget,
      errors: {
        budgetExceeded: !withinBudget
      },
      warnings: {}
    }
  }
}

export const orderService = new OrderService() 