import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { UserRoleType } from '@/lib/auth/types'

// Configuration object for protected routes
const protectedRoutes = {
  // Admin routes
  '/admin': { requiredRole: 'GLOBAL_ADMIN' as UserRoleType },
  '/api/admin': { requiredRole: 'GLOBAL_ADMIN' as UserRoleType },
  
  // Regional management routes
  '/regions': { requiredRole: 'REGIONAL_MANAGER' as UserRoleType },
  '/api/regions': { requiredRole: 'REGIONAL_MANAGER' as UserRoleType },
  
  // Maintenance company routes
  '/company/maintenance': { requiredRole: 'MAINTENANCE_COMPANY' as UserRoleType },
  '/api/company/maintenance': { requiredRole: 'MAINTENANCE_COMPANY' as UserRoleType },
  
  // Facility management routes
  '/facilities': { requiredRole: 'FACILITY_MANAGER' as UserRoleType },
  '/api/facilities': { requiredRole: 'FACILITY_MANAGER' as UserRoleType },
  
  // Pool management routes
  '/pools': { requiredRole: 'POOL_MANAGER' as UserRoleType },
  '/api/pools': { requiredRole: 'POOL_MANAGER' as UserRoleType },
  
  // Maintenance routes
  '/maintenance': { requiredRole: 'TECHNICIAN' as UserRoleType },
  '/api/maintenance': { requiredRole: 'TECHNICIAN' as UserRoleType },
}

const ROLE_HIERARCHY: Record<UserRoleType, number> = {
  GLOBAL_ADMIN: 50,
  REGIONAL_MANAGER: 40,
  MAINTENANCE_COMPANY: 35,
  FACILITY_MANAGER: 30,
  POOL_MANAGER: 20,
  TECHNICIAN: 10,
  POOL_VIEWER: 0
}

// Function to check if a user has sufficient role level
function hasRequiredRole(userRole: UserRoleType, requiredRole: UserRoleType): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole]
}

export async function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected, /api/admin)
  const path = request.nextUrl.pathname

  // If it's an api route that doesn't require authentication
  if (path.startsWith('/api/auth') || path === '/api/health') {
    return NextResponse.next()
  }

  // Check if the path matches any of our protected routes
  const matchedRoute = Object.entries(protectedRoutes).find(([route]) => 
    path.startsWith(route)
  )

  // If this is not a protected route, allow the request
  if (!matchedRoute) {
    return NextResponse.next()
  }

  const [_, config] = matchedRoute

  // Get the token from the request
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  // If there's no token and this is a protected route,
  // redirect to the sign-in page
  if (!token) {
    const signInUrl = new URL('/auth/signin', request.url)
    signInUrl.searchParams.set('callbackUrl', request.url)
    return NextResponse.redirect(signInUrl)
  }

  // If there's a token but no role, or the role is insufficient,
  // redirect to the unauthorized page
  if (
    !token.role ||
    !hasRequiredRole(token.role as UserRoleType, config.requiredRole)
  ) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  // If all checks pass, allow the request
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
} 