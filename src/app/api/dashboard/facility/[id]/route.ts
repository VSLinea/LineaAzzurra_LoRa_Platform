import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../auth/[...nextauth]/authOptions'
import { LocationType } from '@/lib/auth/types'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    // Verify user has access to this facility
    const hasAccess = session.user.locations.some(
      loc => loc.id === params.id && loc.type === LocationType.FACILITY
    )

    if (!hasAccess) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }

    // Fetch facility data
    const facility = await prisma.location.findUnique({
      where: { id: params.id },
      include: {
        children: {
          where: { type: LocationType.POOL },
          include: {
            sensorReadings: {
              orderBy: { timestamp: 'desc' },
              take: 1
            }
          }
        }
      }
    })

    if (!facility) {
      return NextResponse.json({ success: false, error: 'Facility not found' }, { status: 404 })
    }

    // Calculate stats
    const pools = facility.children
    const healthyPools = pools.filter(pool => 
      pool.sensorReadings.every(reading => reading.status === 'normal')
    )

    const stats = {
      pools: {
        total: pools.length,
        healthy: healthyPools.length,
        maintenance: pools.length - healthyPools.length,
        offline: 0 // This would come from actual status tracking
      },
      staff: {
        total: 24, // This would come from staff management system
        active: 20,
        onLeave: 4
      },
      waterQuality: {
        ph: 7.2, // Average from sensor readings
        chlorine: 1.5,
        temperature: 28
      },
      alerts: {
        critical: pools.filter(p => 
          p.sensorReadings.some(r => r.status === 'critical')
        ).length,
        warning: pools.filter(p => 
          p.sensorReadings.some(r => r.status === 'warning')
        ).length
      }
    }

    return NextResponse.json({ success: true, data: stats })
  } catch (error) {
    console.error('Error fetching facility dashboard data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch facility dashboard data' },
      { status: 500 }
    )
  }
} 