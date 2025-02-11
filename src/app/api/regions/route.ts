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

    const regions = await prisma.location.findMany({
      where: {
        type: LocationType.REGION
      },
      include: {
        children: {
          where: {
            type: LocationType.FACILITY
          },
          include: {
            children: {
              where: {
                type: LocationType.POOL
              }
            }
          }
        }
      }
    })

    const mappedRegions = regions.map(region => ({
      id: region.id,
      name: region.name,
      totalFacilities: region.children.length,
      healthyFacilities: region.children.length, // Placeholder, implement actual health check
      totalPools: region.children.reduce((acc, facility) => acc + facility.children.length, 0),
      healthyPools: region.children.reduce((acc, facility) => acc + facility.children.length, 0), // Placeholder
      status: 'healthy' as const // Placeholder, implement actual status calculation
    }))

    return NextResponse.json({ success: true, data: mappedRegions })
  } catch (error) {
    console.error('Error fetching regions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch regions' },
      { status: 500 }
    )
  }
} 