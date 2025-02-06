import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import type { Location } from '@/lib/auth/types'

interface LocationWithRelations extends Location {
  parent?: Location | null
  children?: Location[]
  sensorReadings?: Array<{
    type: string
    value: number
    timestamp: Date
  }>
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

    // Get pools based on user's access
    const pools = await prisma.location.findMany({
      where: {
        type: 'POOL',
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
        parent: {
          include: {
            parent: true
          }
        },
        sensorReadings: {
          where: {
            type: {
              in: ['TEMPERATURE', 'PH', 'CHLORINE', 'ALKALINITY']
            }
          },
          orderBy: {
            timestamp: 'desc'
          },
          take: 4 // One reading for each type
        }
      }
    }) as LocationWithRelations[]

    const poolsWithStats = pools.map((pool: LocationWithRelations) => {
      const readings = pool.sensorReadings || []
      
      const latestTemp = readings.find(r => r.type === 'TEMPERATURE')?.value
      const latestPh = readings.find(r => r.type === 'PH')?.value
      const latestChlorine = readings.find(r => r.type === 'CHLORINE')?.value
      const latestAlkalinity = readings.find(r => r.type === 'ALKALINITY')?.value

      const hasAlerts = 
        (latestTemp && (latestTemp > 30 || latestTemp < 25)) ||
        (latestPh && (latestPh > 8 || latestPh < 6.5)) ||
        (latestChlorine && (latestChlorine > 3 || latestChlorine < 1))

      const alerts = []
      if (latestTemp && (latestTemp > 30 || latestTemp < 25)) alerts.push('Temperature out of range')
      if (latestPh && (latestPh > 8 || latestPh < 6.5)) alerts.push('pH out of range')
      if (latestChlorine && (latestChlorine > 3 || latestChlorine < 1)) alerts.push('Chlorine level critical')

      return {
        id: pool.id,
        name: pool.name,
        facility: pool.parent?.name || 'Unknown Facility',
        region: pool.parent?.parent?.name || 'Unknown Region',
        temperature: latestTemp || 0,
        ph: latestPh || 0,
        chlorine: latestChlorine || 0,
        alkalinity: latestAlkalinity || 0,
        status: hasAlerts ? 'issue' : 'active',
        lastChecked: readings.length > 0 ? readings[0].timestamp.toISOString() : 'Never',
        alerts: alerts.length > 0 ? alerts : undefined
      }
    })

    return NextResponse.json({
      success: true,
      data: poolsWithStats
    })
  } catch (error) {
    console.error('Error fetching pools:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pools' },
      { status: 500 }
    )
  }
} 