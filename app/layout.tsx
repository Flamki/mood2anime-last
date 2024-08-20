import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '../components/Navigation'
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mood2Anime',
  description: 'Find anime based on your mood',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main>
          {children}
        </main>
        <SpeedInsights />
      </body>
    </html>
  )
}