"use client"

import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { UsersIcon, GripIcon, ShieldIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { PoolData } from '../../../types/pools'

interface StaffMember {
  id: string
  name: string
  role: string
  shift: string
  permissions: string[]
}

const mockStaff: StaffMember[] = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Pool Manager',
    shift: '9:00 AM - 5:00 PM',
    permissions: ['full_access', 'chemical_management', 'staff_management']
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Lifeguard',
    shift: '8:00 AM - 4:00 PM',
    permissions: ['pool_access', 'emergency_controls']
  },
  // Add more staff members...
]

export default function StaffTab({ pool }: { pool: PoolData }) {
  const [staff, setStaff] = useState(mockStaff)
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null)

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(staff)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setStaff(items)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-container p-4"
      >
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
          <UsersIcon className="w-4 h-4 mr-2" />
          Staff Schedule
        </h3>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="staff">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {staff.map((member, index) => (
                  <Draggable key={member.id} draggableId={member.id} index={index}>
                    {(provided) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="card-container p-4 mb-2 cursor-move hover:shadow-md"
                        onClick={() => setSelectedMember(member)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div {...provided.dragHandleProps}>
                              <GripIcon className="w-4 h-4 text-gray-400" />
                            </div>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-gray-500">{member.role}</div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">{member.shift}</div>
                        </div>
                      </motion.div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </motion.div>

      {selectedMember && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-container p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center">
              <ShieldIcon className="w-4 h-4 mr-2" />
              Access Permissions
            </h3>
          </div>
          <div className="space-y-2">
            {selectedMember.permissions.map((permission, index) => (
              <motion.div
                key={permission}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-2"
              >
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {permission.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
} 