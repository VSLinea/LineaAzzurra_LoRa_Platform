import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/authOptions'
import { LocationType } from '@/lib/auth/types'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch counts for different location types
    const [regions, facilities, pools] = await Promise.all([
      prisma.location.count({
        where: { type: LocationType.REGION }
      }),
      prisma.location.count({
        where: { type: LocationType.FACILITY }
      }),
      prisma.location.count({
        where: { type: LocationType.POOL }
      })
    ])

    // For now, we'll assume all locations are healthy
    // In a real application, you would check actual health status
    const dashboardData = {
      stats: {
        regions: {
          total: regions,
          healthy: regions,
          healthyPercentage: regions > 0 ? 100 : 0
        },
        facilities: {
          total: facilities,
          operational: facilities,
          operationalPercentage: facilities > 0 ? 100 : 0
        },
        pools: {
          total: pools,
          healthy: pools,
          healthyPercentage: pools > 0 ? 100 : 0
        }
      },
      recentActivity: [],
      alerts: []
    }

    return NextResponse.json({ success: true, data: dashboardData })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
} 