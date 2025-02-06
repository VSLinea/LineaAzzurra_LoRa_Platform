import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import type { Location } from '@/lib/auth/types'

export async function GET() {
  try {
    // Get user session
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's accessible locations
    const userLocations = session.user.locations
    const userLocationIds = userLocations.map(loc => loc.id)

    // Get all locations with relationships, filtered by user access
    const locations = await prisma.location.findMany({
      where: {
        OR: [
          { id: { in: userLocationIds } },
          { parentId: { in: userLocationIds } },
          {
            parent: {
              parentId: { in: userLocationIds }
            }
          }
        ]
      },
      include: {
        children: {
          select: { id: true }
        },
        parent: true,
        sensorReadings: {
          select: { id: true }
        },
        users: {
          select: { id: true }
        }
      }
    })
    
    // Calculate statistics based on filtered locations
    const regions = locations.filter((loc: Location) => loc.type === 'REGION')
    const facilities = locations.filter((loc: Location) => loc.type === 'FACILITY')
    const pools = locations.filter((loc: Location) => loc.type === 'POOL')

    // Get latest sensor readings for health status
    const latestReadings = await prisma.sensorReading.findMany({
      where: {
        locationId: {
          in: pools.map((p: Location) => p.id)
        }
      },
      orderBy: {
        timestamp: 'desc'
      }
    })

    // Calculate health metrics
    const healthyRegions = regions.length
    const operationalFacilities = facilities.length
    const healthyPools = pools.length

    // Group facilities and pools by region
    const regionalStats = regions.map((region: Location) => {
      const regionFacilities = facilities.filter((f: Location) => f.parentId === region.id)
      const regionPools = pools.filter((p: Location) => {
        const facility = facilities.find((f: Location) => f.id === p.parentId)
        return facility && facility.parentId === region.id
      })

      return {
        id: region.id,
        name: region.name,
        facilitiesCount: regionFacilities.length,
        poolsCount: regionPools.length,
        status: 'healthy'
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          regions: {
            total: regions.length,
            healthy: healthyRegions,
            healthyPercentage: regions.length ? Math.round((healthyRegions / regions.length) * 100) : 0
          },
          facilities: {
            total: facilities.length,
            operational: operationalFacilities,
            operationalPercentage: facilities.length ? Math.round((operationalFacilities / facilities.length) * 100) : 0
          },
          pools: {
            total: pools.length,
            healthy: healthyPools,
            healthyPercentage: pools.length ? Math.round((healthyPools / pools.length) * 100) : 0
          }
        },
        regionalOverview: regionalStats
      }
    })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
} 