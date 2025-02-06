'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function Unauthorized() {
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Access Denied
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {session ? (
              <>
                Your current role ({session.user.role}) does not have permission to access this resource.
              </>
            ) : (
              'You need to be signed in to access this resource.'
            )}
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <button
              onClick={() => router.back()}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go Back
            </button>
          </div>
          {!session && (
            <div>
              <button
                onClick={() => router.push('/auth/signin')}
                className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 