'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const performLogout = async () => {
      await signOut({ redirect: false })
      // Redirect to signin page after logout
      setTimeout(() => {
        router.push('/auth/signin')
      }, 1500)
    }

    performLogout()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-[#1E1E2D] dark:to-[#1A1A27]">
      <div className="text-center space-y-6 p-8 max-w-sm w-full bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center">
              <LogOut className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div 
            className="w-16 h-16 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin mx-auto"
            style={{ animationDuration: '1s' }}
          />
        </div>
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Signing Out...
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Thank you for using Pool Monitor
          </p>
        </div>

        <div className="pt-4">
          <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-1500 ease-out"
              style={{ 
                width: '100%',
                animation: 'shrink 1.5s linear forwards'
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  )
} 