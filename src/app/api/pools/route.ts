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

    const pools = await prisma.location.findMany({
      where: {
        type: LocationType.POOL
      },
      include: {
        parent: {
          include: {
            parent: true
          }
        },
        sensorReadings: {
          orderBy: {
            timestamp: 'desc'
          },
          take: 1
        }
      }
    })

    const mappedPools = pools.map(pool => ({
      id: pool.id,
      name: pool.name,
      facility: pool.parent?.name || 'Unknown',
      region: pool.parent?.parent?.name || 'Unknown',
      temperature: pool.sensorReadings[0]?.value || 0,
      ph: 7.2, // Placeholder
      chlorine: 1.5, // Placeholder
      alkalinity: 80, // Placeholder
      status: 'active' as const,
      lastChecked: pool.sensorReadings[0]?.timestamp?.toISOString() || new Date().toISOString(),
      alerts: [] // Placeholder
    }))

    return NextResponse.json({ success: true, data: mappedPools })
  } catch (error) {
    console.error('Error fetching pools:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pools' },
      { status: 500 }
    )
  }
} 