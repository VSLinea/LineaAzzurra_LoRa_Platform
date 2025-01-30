export interface PoolData {
  id: number
  name: string
  status: 'active' | 'maintenance' | 'issue'
  temperature: number
  ph: number
  chlorine: number
  alkalinity: number
  lastChecked: string
  nextMaintenance: string
  alerts?: string[]
  dimensions: {
    length: number
    width: number
    depth: number
    volume: number
  }
  equipment: {
    pump: string
    filter: string
    heater: string
    chlorinator: string
    lastServiced: string
  }
  chemicalLevels: {
    freeChlorine: number
    combinedChlorine: number
    cyanuricAcid: number
    calcium: number
    tds: number
    alkalinity: number
  }
  maintenanceHistory: Array<{
    date: string
    type: string
    description: string
    performedBy: string
    cost?: number
  }>
  operatingHours: {
    start: string
    end: string
    filterCycles: string[]
  }
  safetyEquipment: {
    lifebuoys: number
    firstAidKits: boolean
    emergencyPhone: boolean
    safetySignage: boolean
  }
  sensorData: {
    last24Hours: Array<{
      timestamp: string
      temperature: number
      ph: number
      chlorine: number
    }>
  }
  usage: {
    currentOccupancy: number
    maxCapacity: number
    peakHours: string[]
    averageDailyUsers: number
    weeklyUsageStats: Array<{
      day: string
      users: number
    }>
  }
} 