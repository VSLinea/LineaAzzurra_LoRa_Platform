import { LocationType } from '@/lib/auth/types'

export const UNIT_LEVELS: Record<LocationType, string> = {
  [LocationType.GLOBAL]: 'A',
  [LocationType.REGION]: 'B',
  [LocationType.FACILITY]: 'C',
  [LocationType.POOL]: 'D'
} as const

export const getLocationLevel = (type: LocationType): string => {
  return UNIT_LEVELS[type] || 'Z'
}

export const isHigherLevel = (type1: LocationType, type2: LocationType): boolean => {
  const level1 = UNIT_LEVELS[type1] || 'Z'
  const level2 = UNIT_LEVELS[type2] || 'Z'
  return level1 < level2
}

export const getParentTypes = (type: LocationType): LocationType[] => {
  switch (type) {
    case LocationType.POOL:
      return [LocationType.FACILITY, LocationType.REGION, LocationType.GLOBAL]
    case LocationType.FACILITY:
      return [LocationType.REGION, LocationType.GLOBAL]
    case LocationType.REGION:
      return [LocationType.GLOBAL]
    default:
      return []
  }
}

export type UnitLevel = LocationType
export type UnitIndex = string // Format: A1 or A1.B2 or A1.B2.C3 or A1.B2.C3.D1

export interface OrganizationUnit {
  id: string
  name: string
  code: string
  type: UnitLevel
  index: UnitIndex
  parentId?: string
}

export function generateUnitIndex(
  level: UnitLevel,
  sequence: number,
  parentIndex?: string
): UnitIndex {
  const newIndex = `${UNIT_LEVELS[level]}${sequence}`
  return parentIndex ? `${parentIndex}.${newIndex}` : newIndex
}

export function parseUnitIndex(index: UnitIndex): {
  level: UnitLevel,
  sequence: number,
  parentIndex?: string
} {
  const parts = index.split('.')
  const currentPart = parts[parts.length - 1]
  const level = Object.entries(UNIT_LEVELS).find(
    ([_, prefix]) => prefix === currentPart[0]
  )?.[0] as UnitLevel
  const sequence = parseInt(currentPart.slice(1))
  const parentIndex = parts.length > 1 ? parts.slice(0, -1).join('.') : undefined

  return { level, sequence, parentIndex }
}

export function getUnitLevel(index: UnitIndex): UnitLevel {
  return parseUnitIndex(index).level
}

export function isAncestorOf(ancestorIndex: UnitIndex, descendantIndex: UnitIndex): boolean {
  return descendantIndex.startsWith(ancestorIndex + '.')
}

export function isDescendantOf(descendantIndex: UnitIndex, ancestorIndex: UnitIndex): boolean {
  return isAncestorOf(ancestorIndex, descendantIndex)
}

export function getAncestors(index: UnitIndex): UnitIndex[] {
  const parts = index.split('.')
  return parts.map((_, i) => parts.slice(0, i + 1).join('.'))
}

export function getUnitDepth(index: UnitIndex): number {
  return index.split('.').length
}

export const INITIAL_UNITS: OrganizationUnit[] = [
  {
    id: 'italy',
    name: 'Italy',
    code: 'IT',
    type: LocationType.GLOBAL,
    index: 'A1'
  },
  {
    id: 'north-italy',
    name: 'North Italy',
    code: 'NIT',
    type: LocationType.REGION,
    index: 'A1.B1',
    parentId: 'italy'
  },
  {
    id: 'milano-central',
    name: 'Milano Central',
    code: 'MIL',
    type: LocationType.FACILITY,
    index: 'A1.B1.C1',
    parentId: 'north-italy'
  },
  {
    id: 'main-pool',
    name: 'Main Pool',
    code: 'MP01',
    type: LocationType.POOL,
    index: 'A1.B1.C1.D1',
    parentId: 'milano-central'
  }
] 