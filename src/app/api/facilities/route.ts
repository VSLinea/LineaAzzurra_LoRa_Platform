import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import type { Location } from '@/lib/auth/types'

interface SensorReading {
  type: string
  value: number
  timestamp: Date
}

interface LocationWithRelations extends Location {
  parent?: Location | null
  children?: Location[]
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

    // Get facilities based on user's access
    const facilities = await prisma.location.findMany({
      where: {
        type: 'FACILITY',
        OR: [
          { id: { in: userLocationIds } },
          { parentId: { in: userLocationIds } },
          {
            children: {
              some: {
                id: { in: userLocationIds }
              }
            }
          }
        ]
      },
      include: {
        parent: true,
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
    }) as LocationWithRelations[]

    const facilitiesWithStats = facilities.map((facility: LocationWithRelations) => {
      const pools = facility.children || []
      const readings = facility.sensorReadings || []
      
      const latestTemp = readings.find((r: SensorReading) => r.type === 'TEMPERATURE')?.value
      const latestPh = readings.find((r: SensorReading) => r.type === 'PH')?.value
      const latestChlorine = readings.find((r: SensorReading) => r.type === 'CHLORINE')?.value

      const hasAlerts = 
        (latestTemp && (latestTemp > 30 || latestTemp < 25)) ||
        (latestPh && (latestPh > 8 || latestPh < 6.5)) ||
        (latestChlorine && (latestChlorine > 3 || latestChlorine < 1))

      return {
        id: facility.id,
        name: facility.name,
        region: facility.parent?.name || 'Unknown Region',
        pools: pools.length,
        activeAlerts: hasAlerts ? 1 : 0,
        status: hasAlerts ? 'warning' : 'healthy'
      }
    })

    return NextResponse.json({
      success: true,
      data: facilitiesWithStats
    })
  } catch (error) {
    console.error('Error fetching facilities:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch facilities' },
      { status: 500 }
    )
  }
} 