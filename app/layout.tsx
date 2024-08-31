// app/layout.tsx

import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '../components/Navigation'
import TopBanner from '../components/TopBanner'
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
  // ... (keep existing metadata)
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-688GX32X4Q"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-688GX32X4Q');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <TopBanner />
          <div className="pt-[40px]">
            <Navigation />
            <main className="flex-grow">
              {children}
            </main>
          </div>
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