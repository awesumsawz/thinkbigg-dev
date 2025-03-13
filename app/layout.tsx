import "./globals.css"
import { Roboto_Mono, Press_Start_2P } from "next/font/google"
import type React from "react"
import Link from "next/link"
import NavMenu from "./components/NavMenu"
import PixelatedBackground from "./components/PixelatedBackground"
import FloatingPixels from "./components/FloatingPixels"
import AnimatedContent from "./components/AnimatedContent"
import BlinkingCursor from "./components/BlinkingCursor"

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
})

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
})

export const metadata = {
  title: "Think Bigg Development",
  description: "Web, Cloud, and Business Consulting Services",
  generator: 'v0.dev',
  metadataBase: new URL('https://thinkbigg.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thinkbigg.dev',
    title: 'Think Bigg Development',
    description: 'Web, Cloud, and Business Consulting Services',
  },
  headers: {
    'Content-Security-Policy': 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https:; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "connect-src 'self'; " +
      "frame-ancestors 'none';",
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${robotoMono.variable} ${pressStart2P.variable} font-sans bg-dracula-background text-dracula-foreground h-full`}
      >
        <PixelatedBackground />
        <div className="relative z-10 h-full flex flex-col">
          <AnimatedContent
            header={
              <div className="text-center px-4 md:pt-0 pt-[73px] bg-transparent">
                <Link href="/" className="inline-block max-w-full">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-pixel text-dracula-purple break-keep  hyphens-auto max-w-full overflow-hidden text-ellipsis">Think Bigg Development</h1>
                </Link>
                <p className="text-sm sm:text-base md:text-xl pb-2 text-dracula-cyan">Web Development • Cloud Engineering • Business Consulting<BlinkingCursor /></p>
                <NavMenu />
              </div>
            }
          >
            <div className="max-w-4xl mx-auto px-4 py-8">{children}</div>
            <footer className="py-4 text-center text-dracula-comment non-home-footer">
              © {new Date().getFullYear()} Think Bigg Development. All rights reserved.
            </footer>
          </AnimatedContent>
        </div>
        <FloatingPixels />
      </body>
    </html>
  )
}



import './globals.css'
