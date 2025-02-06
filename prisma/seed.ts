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

  // Create users
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

  // Assign locations to users
  await prisma.userLocation.createMany({
    data: [
      { userId: admin.id, locationId: global.id },
      { userId: admin.id, locationId: northItaly.id },
      { userId: admin.id, locationId: milanoCentral.id },
      { userId: admin.id, locationId: torinoEast.id },
      { userId: admin.id, locationId: genovaWest.id },
      { userId: admin.id, locationId: mainPool.id },
      { userId: admin.id, locationId: kidsPool.id },
      { userId: admin.id, locationId: lapPool.id },
      { userId: admin.id, locationId: spaPool.id }
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