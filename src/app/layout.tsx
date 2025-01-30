import React from 'react'
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import { ThemeProvider } from '../contexts/ThemeContext'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pool Monitoring Dashboard",
  description: "Real-time swimming pool monitoring system",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <div className="flex h-screen bg-white dark:bg-[#151521]">
            <Sidebar />
            <div className="flex-1">
              <Header />
              <main>
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
} 