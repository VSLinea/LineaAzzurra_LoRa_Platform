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

    const facilities = await prisma.location.findMany({
      where: {
        type: LocationType.FACILITY
      },
      include: {
        parent: true,
        children: {
          where: {
            type: LocationType.POOL
          }
        }
      }
    })

    const mappedFacilities = facilities.map(facility => ({
      id: facility.id,
      name: facility.name,
      region: facility.parent?.name || 'Unknown',
      pools: facility.children.length,
      activeAlerts: 0, // Placeholder, implement actual alerts count
      status: 'healthy' as const // Placeholder, implement actual status calculation
    }))

    return NextResponse.json({ success: true, data: mappedFacilities })
  } catch (error) {
    console.error('Error fetching facilities:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch facilities' },
      { status: 500 }
    )
  }
} 