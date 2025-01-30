import React from 'react'
import { Search, Filter } from 'lucide-react'

const products = [
  { id: 1, name: 'pH Test Kit', category: 'Testing', price: '$24.99', stock: 45 },
  { id: 2, name: 'Chlorine Tablets', category: 'Chemicals', price: '$34.99', stock: 32 },
  { id: 3, name: 'Pool Brush', category: 'Equipment', price: '$19.99', stock: 28 },
  { id: 4, name: 'Water Balancer', category: 'Chemicals', price: '$29.99', stock: 15 }
]

export default function ProductList() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-medium text-gray-200">Product</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 bg-gray-900 rounded-lg text-gray-300 text-sm 
                       placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-700"
            />
          </div>
          <button className="p-2 bg-gray-900 rounded-lg text-gray-400 hover:text-gray-300">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {products.map((product) => (
          <div 
            key={product.id}
            className="flex items-center justify-between p-4 bg-gray-900 rounded-lg"
          >
            <div>
              <h3 className="text-sm font-medium text-gray-200">{product.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{product.category}</p>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-400">{product.price}</span>
              <span className="text-sm text-gray-400">{product.stock} units</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 