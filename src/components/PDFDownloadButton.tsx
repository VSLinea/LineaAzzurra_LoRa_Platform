"use client"

import React from 'react'
import dynamic from 'next/dynamic'
import { FileText } from 'lucide-react'
import { PDFDownloadLink as PDFDownloadLinkType } from '@react-pdf/renderer'

interface PDFDownloadButtonProps {
  document: React.ReactElement
  fileName: string
}

interface BlobProviderProps {
  blob: Blob | null
  url: string | null
  loading: boolean
  error: Error | null
}

// Dynamic import both components
const PDFDownloadLink = dynamic<any>(
  () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
  { ssr: false }
)

export default function PDFDownloadButton({ document, fileName }: PDFDownloadButtonProps) {
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient || !PDFDownloadLink) {
    return (
      <button className="mt-4 text-sm font-medium text-gray-400" disabled>
        Loading...
      </button>
    )
  }

  return (
    <PDFDownloadLink
      document={document}
      fileName={fileName}
    >
      {({ blob, url, loading, error }: BlobProviderProps) => (
        <button 
          className={`mt-4 text-sm font-medium ${
            loading || error
              ? 'text-gray-400' 
              : 'text-blue-500 hover:text-blue-600'
          }`}
          disabled={!!loading || !!error}
        >
          {loading ? 'Generating PDF...' : 
           error ? 'Error generating PDF' : 
           'Download PDF'}
        </button>
      )}
    </PDFDownloadLink>
  )
} 