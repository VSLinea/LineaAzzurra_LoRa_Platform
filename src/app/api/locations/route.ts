import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { ApiResponse, LocationResponse, LocationsQueryParams } from '@/types/api'
import { LocationType } from '@/lib/auth/types'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    console.log('Current session:', session)

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') as LocationsQueryParams['type']
    const parentId = searchParams.get('parentId') as string | undefined
    const includeChildren = searchParams.get('includeChildren') === 'true'

    console.log('Query params:', { type, parentId, includeChildren })

    const locations = await prisma.location.findMany({
      where: {
        ...(type && { type }),
        ...(parentId && { parentId })
      },
      include: {
        children: includeChildren
      }
    })

    console.log('Found locations:', locations)

    const mappedLocations: LocationResponse[] = locations.map(loc => ({
      id: loc.id,
      name: loc.name,
      code: loc.code,
      type: loc.type as LocationType,
      index: loc.index,
      parentId: loc.parentId || undefined,
      children: loc.children?.map(child => ({
        id: child.id,
        name: child.name,
        code: child.code,
        type: child.type as LocationType,
        index: child.index,
        parentId: child.parentId || undefined
      }))
    }))

    console.log('Mapped locations:', mappedLocations)

    const response: ApiResponse<LocationResponse[]> = {
      success: true,
      data: mappedLocations
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching locations:', error)
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch locations'
    }
    return NextResponse.json(response, { status: 500 })
  }
} 