import { NextAuthOptions } from 'next-auth';
import { UserRoleType, LocationType } from '@/lib/auth/types';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
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
          throw new Error('Invalid credentials');
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
        });
      
        if (!user || !await compare(credentials.password, user.password)) {
          throw new Error('Invalid credentials');
        }
      
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role.name as UserRoleType,
          locations: user.locations.map((ul) => ({
            ...ul.location,
            type: ul.location.type as LocationType
          }))
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account, trigger }) {
      if (trigger === "signIn" && user) {
        token.id = user.id;
        token.role = user.role;
        token.locations = user.locations;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRoleType;
        session.user.locations = token.locations as any[];
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    signOut: '/auth/signout'
  },
  secret: process.env.NEXTAUTH_SECRET
};