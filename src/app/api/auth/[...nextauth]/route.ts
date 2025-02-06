import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
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

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any, // Type assertion needed due to version mismatch
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            role: true,
            locations: {
              include: {
                location: true
              }
            }
          }
        }) as DbUser | null

        if (!user || !await compare(credentials.password, user.password)) {
          throw new Error('Invalid credentials')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role.name,
          locations: user.locations.map((ul: UserLocation) => ul.location)
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.locations = user.locations
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
          locations: token.locations
        } as User
      }
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST } 