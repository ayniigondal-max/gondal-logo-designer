import './globals.css'
import { Footer } from '@/next-app/components/Footer'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Gondal AI Logo Generator',
  description: 'Create premium logos with Gondal AI - now with improved routing and pages',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="min-h-screen bg-white text-slate-900">
        <div className="flex min-h-screen flex-col">
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
