import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import type { Location } from '@/lib/auth/types'
import type { Prisma } from '@prisma/client'

type SensorReading = Prisma.SensorReadingGetPayload<{}>

interface LocationWithChildren extends Location {
  children?: LocationWithChildren[]
  sensorReadings?: SensorReading[]
}

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

    // Get regions based on user's access
    const regions = await prisma.location.findMany({
      where: {
        type: 'REGION',
        OR: [
          { id: { in: userLocationIds } },
          { 
            children: {
              some: {
                id: { in: userLocationIds }
              }
            }
          },
          {
            children: {
              some: {
                children: {
                  some: {
                    id: { in: userLocationIds }
                  }
                }
              }
            }
          }
        ]
      },
      include: {
        children: {
          include: {
            children: true,
            sensorReadings: {
              where: {
                type: {
                  in: ['TEMPERATURE', 'PH', 'CHLORINE']
                }
              },
              orderBy: {
                timestamp: 'desc'
              },
              take: 3
            }
          }
        }
      }
    }) as LocationWithChildren[]

    const regionsWithStats = regions.map((region: LocationWithChildren) => {
      const facilities = region.children || []
      const pools = facilities.flatMap(f => f.children || [])

      // Calculate health status based on sensor readings
      const hasAlerts = facilities.some((f: LocationWithChildren) => {
        const readings = f.sensorReadings || []
        const latestTemp = readings.find((r: SensorReading) => r.type === 'TEMPERATURE')?.value
        const latestPh = readings.find((r: SensorReading) => r.type === 'PH')?.value
        const latestChlorine = readings.find((r: SensorReading) => r.type === 'CHLORINE')?.value

        return (
          (latestTemp && (latestTemp > 30 || latestTemp < 25)) ||
          (latestPh && (latestPh > 8 || latestPh < 6.5)) ||
          (latestChlorine && (latestChlorine > 3 || latestChlorine < 1))
        )
      })

      return {
        id: region.id,
        name: region.name,
        totalFacilities: facilities.length,
        healthyFacilities: hasAlerts ? facilities.length - 1 : facilities.length,
        totalPools: pools.length,
        healthyPools: pools.length, // For now, assuming all pools are healthy
        status: hasAlerts ? 'warning' : 'healthy'
      }
    })

    return NextResponse.json({
      success: true,
      data: regionsWithStats
    })
  } catch (error) {
    console.error('Error fetching regions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch regions' },
      { status: 500 }
    )
  }
} 