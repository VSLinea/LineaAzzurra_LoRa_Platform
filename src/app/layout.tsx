import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import { Providers } from './providers'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/authOptions'
import './globals.css'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import { ThemeProvider } from '../contexts/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Linea Azzurra LoRa Platform',
  description: 'Pool management and monitoring system',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <Providers session={session}>
            <div className="flex h-screen bg-white dark:bg-[#151521]">
              <Sidebar />
              <div className="flex-1">
                <Header />
                <main>
                  {children}
                </main>
              </div>
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
} 