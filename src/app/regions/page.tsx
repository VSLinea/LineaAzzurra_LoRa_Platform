'use client'

import { useEffect, useState } from 'react'
import { Globe, Building2, Waves } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import { useRouter } from 'next/navigation'
import Breadcrumb from '@/components/ui/Breadcrumb'

interface Region {
  id: string
  name: string
  totalFacilities: number
  healthyFacilities: number
  totalPools: number
  healthyPools: number
  status: 'healthy' | 'warning' | 'critical'
}

export default function RegionsPage() {
  const router = useRouter()
  const [regions, setRegions] = useState<Region[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRegions() {
      try {
        const response = await fetch('/api/regions')
        const result = await response.json()
        if (result.success) {
          setRegions(result.data)
        }
      } catch (error) {
        console.error('Error fetching regions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRegions()
  }, [])

  const breadcrumbItems = [
    { label: 'Global', href: '/dashboard' },
    { label: 'Regions', href: '/regions' }
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
        icon={Globe}
        title="Regions"
        subtitle="All Regions Overview"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-indigo-500" />
                <p className="text-sm text-gray-500">Total Regions</p>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {regions.length}
              </h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-blue-500" />
                <p className="text-sm text-gray-500">Total Facilities</p>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {regions.reduce((sum, region) => sum + region.totalFacilities, 0)}
              </h3>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              regions.reduce((sum, region) => sum + region.healthyFacilities, 0) === regions.reduce((sum, region) => sum + region.totalFacilities, 0)
                ? 'text-green-500 bg-green-100 dark:bg-green-900/20'
                : 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
            }`}>
              {Math.round((regions.reduce((sum, region) => sum + region.healthyFacilities, 0) / regions.reduce((sum, region) => sum + region.totalFacilities, 0)) * 100)}% Healthy
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Waves className="w-5 h-5 text-cyan-500" />
                <p className="text-sm text-gray-500">Total Pools</p>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {regions.reduce((sum, region) => sum + region.totalPools, 0)}
              </h3>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              regions.reduce((sum, region) => sum + region.healthyPools, 0) === regions.reduce((sum, region) => sum + region.totalPools, 0)
                ? 'text-green-500 bg-green-100 dark:bg-green-900/20'
                : 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
            }`}>
              {Math.round((regions.reduce((sum, region) => sum + region.healthyPools, 0) / regions.reduce((sum, region) => sum + region.totalPools, 0)) * 100)}% Healthy
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <div className="space-y-4">
          {regions.map(region => (
            <Card
              key={region.id}
              className="p-6 cursor-pointer hover:scale-[1.02] transition-transform"
              onClick={() => router.push(`/regions/${region.id}`)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {region.name}
                  </h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{region.totalFacilities} Facilities</span>
                      <span className="text-sm text-gray-400">({region.healthyFacilities} Healthy)</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center space-x-2">
                      <Waves className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{region.totalPools} Pools</span>
                      <span className="text-sm text-gray-400">({region.healthyPools} Healthy)</span>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  region.status === 'healthy'
                    ? 'text-green-500 bg-green-100 dark:bg-green-900/20'
                    : region.status === 'warning'
                    ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
                    : 'text-red-500 bg-red-100 dark:bg-red-900/20'
                }`}>
                  {region.status.charAt(0).toUpperCase() + region.status.slice(1)}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 