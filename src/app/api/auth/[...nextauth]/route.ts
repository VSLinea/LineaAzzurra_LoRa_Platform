import NextAuth from 'next-auth'
import { authOptions } from './authOptions'; // Ensure this is the correct path
import type { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'
import type { User, UserRoleType, Location } from '@/lib/auth/types'

interface UserLocation {
  location: Location
}

interface DbUser {
  id: string
  email: string
  name: string | null
  password: string
  role: {
    name: UserRoleType
  }
  locations: UserLocation[]
}

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    name?: string | null
    role: UserRoleType
    locations: Location[]
  }
  
  interface Session {
    user: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: UserRoleType
    locations?: Location[]
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST } 