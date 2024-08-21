import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '../components/Navigation'
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://mood2anime.com'),
  title: {
    default: 'Mood2Anime - Find Anime Based on Your Mood',
    template: '%s | Mood2Anime'
  },
  description: 'Mood2Anime helps you discover anime, manga, and memes that match your current mood. Get personalized recommendations for every emotion.',
  keywords: ['mood2anime', 'anime recommendations', 'manga recommendations', 'anime mood', 'otaku', 'Japanese animation', 'mood-based anime'],
  authors: [{ name: 'Mood2Anime Team', url: 'https://mood2anime.com' }],
  creator: 'Mood2Anime Team',
  publisher: 'Mood2Anime',
  alternates: {
    canonical: 'https://mood2anime.com',
  },
  openGraph: {
    title: 'Mood2Anime - Discover Anime Based on Your Mood',
    description: 'Find the perfect anime, manga, or meme to match your current mood with Mood2Anime. Personalized recommendations for every emotion.',
    url: 'https://mood2anime.com',
    siteName: 'Mood2Anime',
    images: [
      {
        url: 'https://mood2anime.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mood2Anime - Personalized Anime Recommendations',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mood2Anime - Find Your Perfect Anime Match',
    description: 'Discover anime, manga, and memes tailored to your mood. Mood2Anime offers personalized recommendations for every emotion.',
    creator: '@mood2anime',
    images: ['https://mood2anime.com/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8606722643335158"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <SpeedInsights />
        <Script id="schema-org" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Mood2Anime",
              "url": "https://mood2anime.com",
              "description": "Discover anime, manga, and memes that match your mood. Mood2Anime offers personalized recommendations for every emotion.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://mood2anime.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </Script>
      </body>
    </html>
  )
}