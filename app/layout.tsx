import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '../components/Navigation'
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from 'next/script'
import dynamic from 'next/dynamic'

const AdSense = dynamic(() => import('../components/AdSense'), { ssr: false })

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://mood2anime.com'),
  title: {
    default: 'Mood2Anime - Global Anime & Manga Discovery Platform',
    template: '%s | Mood2Anime'
  },
  description: 'Explore anime and manga from around the world based on your mood. Mood2Anime connects global fans with personalized recommendations, memes, and a vibrant community.',
  keywords: ['mood2anime', 'global anime', 'international manga', 'anime recommendations', 'mood-based entertainment', 'otaku community', 'Japanese animation', 'global pop culture', 'anime memes', 'multilingual anime'],
  authors: [{ name: 'Mood2Anime Global Team', url: 'https://mood2anime.com' }],
  creator: 'Mood2Anime Global Team',
  publisher: 'Mood2Anime',
  alternates: {
    canonical: 'https://mood2anime.com',
  },
  openGraph: {
    title: 'Mood2Anime - Discover Anime & Manga Worldwide',
    description: 'Connect with anime and manga fans globally. Find content that matches your mood, explore diverse cultures, and join an international community of enthusiasts.',
    url: 'https://mood2anime.com',
    siteName: 'Mood2Anime',
    images: [
      {
        url: 'https://mood2anime.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mood2Anime - Global Anime & Manga Community',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mood2Anime - Your Global Anime & Manga Companion',
    description: 'Discover anime and manga from around the world, tailored to your mood. Join a global community of fans and explore Japanese culture internationally.',
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
  category: 'Entertainment',
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
        <Script id="infolinks-setup" strategy="afterInteractive">
          {`
            var infolinks_pid = 3424750;
            var infolinks_wsid = 0;
          `}
        </Script>
        <Script 
          src="//resources.infolinks.com/js/infolinks_main.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="mt-auto">
            <AdSense />
          </footer>
        </div>
        <SpeedInsights />
        <Script id="schema-org" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Mood2Anime",
              "url": "https://mood2anime.com",
              "description": "Explore anime and manga from around the world based on your mood. Mood2Anime connects global fans with personalized recommendations, memes, and a vibrant community.",
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