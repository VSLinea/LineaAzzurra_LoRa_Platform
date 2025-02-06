import { UnitLevel } from '@/lib/organization'

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

export interface LocationResponse {
  id: string
  name: string
  code: string
  type: UnitLevel
  index: string
  parentId?: string
  children?: LocationResponse[]
}

export interface LocationsQueryParams {
  type?: UnitLevel
  parentId?: string
  includeChildren?: boolean
} 