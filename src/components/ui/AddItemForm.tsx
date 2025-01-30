import React, { useState } from 'react'
import FormField from './FormField'
import Select from './Select'
import Input from './Input'
import ActionButton from './ActionButton'

interface ItemOption {
  value: string
  label: string
  price: number
}

interface AddItemFormProps {
  itemOptions: ItemOption[]
  onAddItem: (item: string, quantity: number) => void
}

export default function AddItemForm({ itemOptions, onAddItem }: AddItemFormProps) {
  const [selectedItem, setSelectedItem] = useState('')
  const [quantity, setQuantity] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = () => {
    if (!selectedItem) {
      setError('Please select an item')
      return
    }

    const qty = parseInt(quantity)
    if (!qty || qty < 1) {
      setError('Please enter a valid quantity')
      return
    }

    onAddItem(selectedItem, qty)
    setSelectedItem('')
    setQuantity('')
    setError(null)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-[1fr,120px,120px] gap-4">
        <FormField label="Item" error={error || undefined}>
          <Select
            value={selectedItem}
            onChange={setSelectedItem}
            options={itemOptions}
            placeholder="Select item"
            error={!!error}
          />
        </FormField>

        <FormField label="Quantity">
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Qty"
          />
        </FormField>

        <div className="flex items-end">
          <ActionButton
            label="Add"
            variant="secondary"
            size="sm"
            className="w-full"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
} 