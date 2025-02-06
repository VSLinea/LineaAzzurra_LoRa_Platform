'use client'

import { useEffect, useState } from 'react'
import { Building2, Waves, AlertTriangle } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import { useRouter } from 'next/navigation'
import Breadcrumb from '@/components/ui/Breadcrumb'

interface Facility {
  id: string
  name: string
  region: string
  pools: number
  activeAlerts: number
  status: 'healthy' | 'warning' | 'critical'
}

export default function FacilitiesPage() {
  const router = useRouter()
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFacilities() {
      try {
        const response = await fetch('/api/facilities')
        const result = await response.json()
        if (result.success) {
          setFacilities(result.data)
        }
      } catch (error) {
        console.error('Error fetching facilities:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFacilities()
  }, [])

  const breadcrumbItems = [
    { label: 'Global', href: '/dashboard' },
    { label: 'Facilities', href: '/facilities' }
  ]

  if (loading) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center h-screen">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <Breadcrumb items={breadcrumbItems} />
      
      <PageHeader
        icon={Building2}
        title="Facilities"
        subtitle="All Facilities Overview"
      />

      <div className="grid grid-cols-1 gap-4 mt-6">
        {facilities.map(facility => (
          <Card 
            key={facility.id}
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => router.push(`/facilities/${facility.id}`)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {facility.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {facility.region}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Waves className="w-4 h-4" />
                    <span>{facility.pools} Pools</span>
                  </div>
                  {facility.activeAlerts > 0 && (
                    <>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="text-red-500">{facility.activeAlerts} Alerts</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                facility.status === 'healthy'
                  ? 'text-green-500 bg-green-100 dark:bg-green-900/20'
                  : facility.status === 'warning'
                  ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
                  : 'text-red-500 bg-red-100 dark:bg-red-900/20'
              }`}>
                {facility.status.charAt(0).toUpperCase() + facility.status.slice(1)}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 