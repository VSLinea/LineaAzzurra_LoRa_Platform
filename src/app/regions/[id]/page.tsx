'use client'

import { Globe, Building2, Waves, AlertTriangle } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import { useRouter } from 'next/navigation'
import Breadcrumb from '@/components/ui/Breadcrumb'

interface Facility {
  id: string
  name: string
  totalPools: number
  healthyPools: number
  activeAlerts: number
  status: 'healthy' | 'warning' | 'critical'
}

interface RegionDetails {
  id: string
  name: string
  totalFacilities: number
  healthyFacilities: number
  totalPools: number
  healthyPools: number
  facilities: Facility[]
}

export default function RegionPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // This would come from an API call using the id
  const region: RegionDetails = {
    id: params.id,
    name: 'North Italy',
    totalFacilities: 3,
    healthyFacilities: 2,
    totalPools: 12,
    healthyPools: 10,
    facilities: [
      {
        id: 'milano-central',
        name: 'Milano Central',
        totalPools: 4,
        healthyPools: 3,
        activeAlerts: 1,
        status: 'warning'
      },
      {
        id: 'torino-east',
        name: 'Torino East',
        totalPools: 5,
        healthyPools: 5,
        activeAlerts: 0,
        status: 'healthy'
      },
      {
        id: 'genova-west',
        name: 'Genova West',
        totalPools: 3,
        healthyPools: 2,
        activeAlerts: 2,
        status: 'critical'
      }
    ]
  }

  const breadcrumbItems = [
    { label: 'Global', href: '/dashboard' },
    { label: 'Regions', href: '/regions' },
    { label: region.name, href: `/regions/${region.id}` }
  ]

  return (
    <div className="page-container">
      <Breadcrumb items={breadcrumbItems} />
      
      <PageHeader
        icon={Globe}
        title={region.name}
        subtitle="Region Overview"
      />

      {/* Region Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-blue-500" />
                <p className="text-sm text-gray-500">Facilities</p>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {region.totalFacilities}
              </h3>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              region.healthyFacilities === region.totalFacilities
                ? 'text-green-500 bg-green-100 dark:bg-green-900/20'
                : 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
            }`}>
              {Math.round((region.healthyFacilities / region.totalFacilities) * 100)}% Healthy
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Waves className="w-5 h-5 text-cyan-500" />
                <p className="text-sm text-gray-500">Pools</p>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {region.totalPools}
              </h3>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              region.healthyPools === region.totalPools
                ? 'text-green-500 bg-green-100 dark:bg-green-900/20'
                : 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
            }`}>
              {Math.round((region.healthyPools / region.totalPools) * 100)}% Healthy
            </div>
          </div>
        </Card>
      </div>

      {/* Facilities List */}
      <Card className="mt-6 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Facilities
        </h2>
        <div className="space-y-4">
          {region.facilities.map(facility => (
            <div 
              key={facility.id}
              className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/70"
              onClick={() => router.push(`/regions/${region.id}/facilities/${facility.id}`)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    {facility.name}
                  </h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Waves className="w-4 h-4" />
                      <span>{facility.totalPools} Pools</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <AlertTriangle className="w-4 h-4" />
                      <span>{facility.activeAlerts} Alerts</span>
                    </div>
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
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 