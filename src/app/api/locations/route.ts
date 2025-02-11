import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { ApiResponse, LocationResponse, LocationsQueryParams } from '@/types/api'
import { LocationType } from '@/lib/auth/types'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/authOptions'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') as LocationsQueryParams['type']
    const parentId = searchParams.get('parentId') as string | undefined
    const includeChildren = searchParams.get('includeChildren') === 'true'

    const locations = await prisma.location.findMany({
      where: {
        ...(type && { type }),
        ...(parentId && { parentId })
      },
      include: {
        children: includeChildren
      }
    })

    const mappedLocations: LocationResponse[] = locations.map(loc => ({
      id: loc.id,
      name: loc.name,
      code: loc.code || '',
      type: loc.type as LocationType,
      index: loc.index || '',
      parentId: loc.parentId || undefined,
      children: loc.children?.map(child => ({
        id: child.id,
        name: child.name,
        code: child.code || '',
        type: child.type as LocationType,
        index: child.index || '',
        parentId: child.parentId || undefined
      }))
    }))

    return NextResponse.json({ success: true, data: mappedLocations })
  } catch (error) {
    console.error('Error fetching locations:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch locations' },
      { status: 500 }
    )
  }
} 