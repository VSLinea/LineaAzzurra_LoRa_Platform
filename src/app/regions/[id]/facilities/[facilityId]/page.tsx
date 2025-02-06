'use client'

import { Building2, Waves, AlertTriangle } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import { useRouter } from 'next/navigation'
import Breadcrumb from '@/components/ui/Breadcrumb'

interface Pool {
  id: string
  name: string
  type: string
  status: 'healthy' | 'warning' | 'critical'
  waterQuality: {
    ph: number
    chlorine: number
    temperature: number
  }
}

interface FacilityDetails {
  id: string
  name: string
  region: {
    id: string
    name: string
  }
  totalPools: number
  healthyPools: number
  pools: Pool[]
}

export default function FacilityPage({ params }: { params: { id: string; facilityId: string } }) {
  const router = useRouter()

  // This would come from an API call using the id and facilityId
  const facility: FacilityDetails = {
    id: params.facilityId,
    name: 'Milano Central',
    region: {
      id: params.id,
      name: 'North Italy'
    },
    totalPools: 4,
    healthyPools: 3,
    pools: [
      {
        id: 'olympic-pool',
        name: 'Olympic Pool',
        type: 'Competition',
        status: 'warning',
        waterQuality: {
          ph: 7.8,
          chlorine: 1.5,
          temperature: 27
        }
      },
      {
        id: 'training-pool',
        name: 'Training Pool',
        type: 'Training',
        status: 'healthy',
        waterQuality: {
          ph: 7.2,
          chlorine: 2.0,
          temperature: 28
        }
      }
    ]
  }

  const breadcrumbItems = [
    { label: 'Global', href: '/dashboard' },
    { label: 'Regions', href: '/regions' },
    { label: facility.region.name, href: `/regions/${facility.region.id}` },
    { label: facility.name, href: `/regions/${facility.region.id}/facilities/${facility.id}` }
  ]

  return (
    <div className="page-container">
      <Breadcrumb items={breadcrumbItems} />
      
      <PageHeader
        icon={Building2}
        title={facility.name}
        subtitle="Facility Overview"
      />

      {/* Facility Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Waves className="w-5 h-5 text-cyan-500" />
                <p className="text-sm text-gray-500">Pools</p>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {facility.totalPools}
              </h3>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              facility.healthyPools === facility.totalPools
                ? 'text-green-500 bg-green-100 dark:bg-green-900/20'
                : 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
            }`}>
              {Math.round((facility.healthyPools / facility.totalPools) * 100)}% Healthy
            </div>
          </div>
        </Card>
      </div>

      {/* Pools List */}
      <Card className="mt-6 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Pools
        </h2>
        <div className="space-y-4">
          {facility.pools.map(pool => (
            <div 
              key={pool.id}
              className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/70"
              onClick={() => router.push(`/pools/${pool.id}`)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    {pool.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {pool.type}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <span>pH {pool.waterQuality.ph}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <span>Chlorine {pool.waterQuality.chlorine} ppm</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <span>{pool.waterQuality.temperature}°C</span>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  pool.status === 'healthy'
                    ? 'text-green-500 bg-green-100 dark:bg-green-900/20'
                    : pool.status === 'warning'
                    ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
                    : 'text-red-500 bg-red-100 dark:bg-red-900/20'
                }`}>
                  {pool.status.charAt(0).toUpperCase() + pool.status.slice(1)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 