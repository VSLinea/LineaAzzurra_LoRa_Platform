import { PrismaClient } from '.prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create roles
  const globalAdmin = await prisma.userRole.upsert({
    where: { name: 'GLOBAL_ADMIN' },
    update: {},
    create: {
      name: 'GLOBAL_ADMIN',
      index: '1'
    }
  })

  const regionalManager = await prisma.userRole.upsert({
    where: { name: 'REGIONAL_MANAGER' },
    update: {},
    create: {
      name: 'REGIONAL_MANAGER',
      index: '2'
    }
  })

  const maintenanceCompany = await prisma.userRole.upsert({
    where: { name: 'MAINTENANCE_COMPANY' },
    update: {},
    create: {
      name: 'MAINTENANCE_COMPANY',
      index: '9'
    }
  })

  const facilityManager = await prisma.userRole.upsert({
    where: { name: 'FACILITY_MANAGER' },
    update: {},
    create: {
      name: 'FACILITY_MANAGER',
      index: '3'
    }
  })

  const poolManager = await prisma.userRole.upsert({
    where: { name: 'POOL_MANAGER' },
    update: {},
    create: {
      name: 'POOL_MANAGER',
      index: '4'
    }
  })

  // Create locations
  const global = await prisma.location.upsert({
    where: { id: 'global-1' },
    update: {},
    create: {
      id: 'global-1',
      name: 'Global',
      type: 'GLOBAL',
      code: 'GLB',
      index: '1'
    }
  })

  const northItaly = await prisma.location.upsert({
    where: { id: 'region-1' },
    update: {},
    create: {
      id: 'region-1',
      name: 'North Italy',
      type: 'REGION',
      code: 'NIT',
      parentId: global.id,
      index: '1'
    }
  })

  const milanoCentral = await prisma.location.upsert({
    where: { id: 'facility-1' },
    update: {},
    create: {
      id: 'facility-1',
      name: 'Milano Central',
      type: 'FACILITY',
      code: 'MIL',
      parentId: northItaly.id,
      index: '1'
    }
  })

  const torinoEast = await prisma.location.upsert({
    where: { id: 'facility-2' },
    update: {},
    create: {
      id: 'facility-2',
      name: 'Torino East',
      type: 'FACILITY',
      code: 'TOR',
      parentId: northItaly.id,
      index: '2'
    }
  })

  const genovaWest = await prisma.location.upsert({
    where: { id: 'facility-3' },
    update: {},
    create: {
      id: 'facility-3',
      name: 'Genova West',
      type: 'FACILITY',
      code: 'GEN',
      parentId: northItaly.id,
      index: '3'
    }
  })

  // Create pools
  const mainPool = await prisma.location.upsert({
    where: { id: 'pool-1' },
    update: {},
    create: {
      id: 'pool-1',
      name: 'Main Pool',
      type: 'POOL',
      code: 'MP1',
      parentId: milanoCentral.id,
      index: '1'
    }
  })

  const kidsPool = await prisma.location.upsert({
    where: { id: 'pool-2' },
    update: {},
    create: {
      id: 'pool-2',
      name: 'Kids Pool',
      type: 'POOL',
      code: 'KP1',
      parentId: milanoCentral.id,
      index: '2'
    }
  })

  const lapPool = await prisma.location.upsert({
    where: { id: 'pool-3' },
    update: {},
    create: {
      id: 'pool-3',
      name: 'Lap Pool',
      type: 'POOL',
      code: 'LP1',
      parentId: torinoEast.id,
      index: '1'
    }
  })

  const spaPool = await prisma.location.upsert({
    where: { id: 'pool-4' },
    update: {},
    create: {
      id: 'pool-4',
      name: 'Spa Pool',
      type: 'POOL',
      code: 'SP1',
      parentId: genovaWest.id,
      index: '1'
    }
  })

  // Create users for each role
  const adminPassword = await hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@lineaazzurra.it' },
    update: {},
    create: {
      email: 'admin@lineaazzurra.it',
      name: 'Global Admin',
      password: adminPassword,
      roleId: globalAdmin.id
    }
  })

  const regionalManagerPassword = await hash('regional123', 12)
  const regionalManagerUser = await prisma.user.upsert({
    where: { email: 'regional@lineaazzurra.it' },
    update: {},
    create: {
      email: 'regional@lineaazzurra.it',
      name: 'North Italy Regional Manager',
      password: regionalManagerPassword,
      roleId: regionalManager.id
    }
  })

  const maintenancePassword = await hash('maintenance123', 12)
  const maintenanceUser = await prisma.user.upsert({
    where: { email: 'maintenance@lineaazzurra.it' },
    update: {},
    create: {
      email: 'maintenance@lineaazzurra.it',
      name: 'Maintenance Company',
      password: maintenancePassword,
      roleId: maintenanceCompany.id
    }
  })

  const facilityManagerPassword = await hash('facility123', 12)
  const facilityManagerUser = await prisma.user.upsert({
    where: { email: 'facility@lineaazzurra.it' },
    update: {},
    create: {
      email: 'facility@lineaazzurra.it',
      name: 'Milano Facility Manager',
      password: facilityManagerPassword,
      roleId: facilityManager.id
    }
  })

  const poolManagerPassword = await hash('pool123', 12)
  const poolManagerUser = await prisma.user.upsert({
    where: { email: 'pool@lineaazzurra.it' },
    update: {},
    create: {
      email: 'pool@lineaazzurra.it',
      name: 'Main Pool Manager',
      password: poolManagerPassword,
      roleId: poolManager.id
    }
  })

  const technicianPassword = await hash('tech123', 12)
  const technicianUser = await prisma.user.upsert({
    where: { email: 'tech@lineaazzurra.it' },
    update: {},
    create: {
      email: 'tech@lineaazzurra.it',
      name: 'Pool Technician',
      password: technicianPassword,
      roleId: poolManager.id
    }
  })

  const viewerPassword = await hash('viewer123', 12)
  const viewerUser = await prisma.user.upsert({
    where: { email: 'viewer@lineaazzurra.it' },
    update: {},
    create: {
      email: 'viewer@lineaazzurra.it',
      name: 'Pool Viewer',
      password: viewerPassword,
      roleId: poolManager.id
    }
  })

  // Assign locations to users
  await prisma.userLocation.createMany({
    data: [
      // Global Admin - access to all locations
      { userId: admin.id, locationId: global.id },
      { userId: admin.id, locationId: northItaly.id },
      { userId: admin.id, locationId: milanoCentral.id },
      { userId: admin.id, locationId: torinoEast.id },
      { userId: admin.id, locationId: genovaWest.id },
      { userId: admin.id, locationId: mainPool.id },
      { userId: admin.id, locationId: kidsPool.id },
      { userId: admin.id, locationId: lapPool.id },
      { userId: admin.id, locationId: spaPool.id },

      // Regional Manager - access to North Italy region and below
      { userId: regionalManagerUser.id, locationId: northItaly.id },
      { userId: regionalManagerUser.id, locationId: milanoCentral.id },
      { userId: regionalManagerUser.id, locationId: torinoEast.id },
      { userId: regionalManagerUser.id, locationId: genovaWest.id },
      { userId: regionalManagerUser.id, locationId: mainPool.id },
      { userId: regionalManagerUser.id, locationId: kidsPool.id },
      { userId: regionalManagerUser.id, locationId: lapPool.id },
      { userId: regionalManagerUser.id, locationId: spaPool.id },

      // Maintenance Company - access to all facilities and pools
      { userId: maintenanceUser.id, locationId: milanoCentral.id },
      { userId: maintenanceUser.id, locationId: torinoEast.id },
      { userId: maintenanceUser.id, locationId: genovaWest.id },
      { userId: maintenanceUser.id, locationId: mainPool.id },
      { userId: maintenanceUser.id, locationId: kidsPool.id },
      { userId: maintenanceUser.id, locationId: lapPool.id },
      { userId: maintenanceUser.id, locationId: spaPool.id },

      // Facility Manager - access to Milano Central and its pools
      { userId: facilityManagerUser.id, locationId: milanoCentral.id },
      { userId: facilityManagerUser.id, locationId: mainPool.id },
      { userId: facilityManagerUser.id, locationId: kidsPool.id },

      // Pool Manager - access to Main Pool only
      { userId: poolManagerUser.id, locationId: mainPool.id },

      // Technician - access to Main Pool and Kids Pool
      { userId: technicianUser.id, locationId: mainPool.id },
      { userId: technicianUser.id, locationId: kidsPool.id },

      // Viewer - access to Main Pool only
      { userId: viewerUser.id, locationId: mainPool.id }
    ],
    skipDuplicates: true
  })

  // Create sensor readings
  const now = new Date()
  await prisma.sensorReading.createMany({
    data: [
      // Main Pool readings
      { type: 'TEMPERATURE', value: 28, unit: '°C', status: 'normal', locationId: mainPool.id, timestamp: now },
      { type: 'PH', value: 7.2, unit: 'pH', status: 'normal', locationId: mainPool.id, timestamp: now },
      { type: 'CHLORINE', value: 2.0, unit: 'ppm', status: 'normal', locationId: mainPool.id, timestamp: now },
      { type: 'ALKALINITY', value: 100, unit: 'ppm', status: 'normal', locationId: mainPool.id, timestamp: now },

      // Kids Pool readings
      { type: 'TEMPERATURE', value: 29, unit: '°C', status: 'normal', locationId: kidsPool.id, timestamp: now },
      { type: 'PH', value: 7.4, unit: 'pH', status: 'normal', locationId: kidsPool.id, timestamp: now },
      { type: 'CHLORINE', value: 1.8, unit: 'ppm', status: 'warning', locationId: kidsPool.id, timestamp: now },
      { type: 'ALKALINITY', value: 90, unit: 'ppm', status: 'normal', locationId: kidsPool.id, timestamp: now },

      // Lap Pool readings
      { type: 'TEMPERATURE', value: 26, unit: '°C', status: 'normal', locationId: lapPool.id, timestamp: now },
      { type: 'PH', value: 7.3, unit: 'pH', status: 'normal', locationId: lapPool.id, timestamp: now },
      { type: 'CHLORINE', value: 2.2, unit: 'ppm', status: 'normal', locationId: lapPool.id, timestamp: now },
      { type: 'ALKALINITY', value: 110, unit: 'ppm', status: 'normal', locationId: lapPool.id, timestamp: now },

      // Spa Pool readings
      { type: 'TEMPERATURE', value: 32, unit: '°C', status: 'warning', locationId: spaPool.id, timestamp: now },
      { type: 'PH', value: 7.8, unit: 'pH', status: 'warning', locationId: spaPool.id, timestamp: now },
      { type: 'CHLORINE', value: 1.5, unit: 'ppm', status: 'warning', locationId: spaPool.id, timestamp: now },
      { type: 'ALKALINITY', value: 80, unit: 'ppm', status: 'normal', locationId: spaPool.id, timestamp: now }
    ]
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 