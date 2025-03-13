"use client"

import React, { useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"

export default function AnimatedContent({ children, header }: { children: React.ReactNode; header: React.ReactNode }) {
  const [isAnimated, setIsAnimated] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    // Check if viewport is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    // Initial check
    checkMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkMobile)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    setIsAnimated(!isHome)
    
    // Add/remove class to body to control footer visibility and scrolling
    if (isHome) {
      document.body.classList.add('is-home')
      document.body.style.overflow = 'hidden'
    } else {
      document.body.classList.remove('is-home')
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.classList.remove('is-home')
      document.body.style.overflow = ''
    }
  }, [isHome])

  useEffect(() => {
    const adjustHeaderPosition = () => {
      if (headerRef.current && !isAnimated) {
        const headerHeight = headerRef.current.offsetHeight
        const windowHeight = window.innerHeight
        const topSpace = (windowHeight - headerHeight) / 2
        headerRef.current.style.marginTop = `${Math.max(0, topSpace)}px`
      } else if (headerRef.current) {
        headerRef.current.style.marginTop = "0px"
      }
    }

    adjustHeaderPosition()
    window.addEventListener("resize", adjustHeaderPosition)
    return () => window.removeEventListener("resize", adjustHeaderPosition)
  }, [isAnimated])

  return (
    <div className={`flex flex-col ${isHome ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      <header 
        ref={headerRef} 
        className={`transition-all duration-500 ease-in-out border-b md:border-none md:relative bg-transparent ${
          isAnimated 
            ? "py-4 border-dracula-currentLine border-opacity-100 sticky top-0 z-50" 
            : "py-8 border-dracula-currentLine border-opacity-0"
        } ${!isHome && isMobile ? 'mobile-non-home-header' : ''}`}
      >
        {header}
      </header>
      <main className={`${isHome ? 'flex-grow' : 'flex-grow overflow-auto'}`}>
        <div className={`flex flex-col ${isHome ? 'h-full' : 'min-h-full'}`}>
          <div className="flex-grow">
            {children}
          </div>
          {isHome && (
            <footer className="py-4 text-center text-dracula-comment home-footer">
              © {new Date().getFullYear()} Think Bigg Development. All rights reserved.
            </footer>
          )}
        </div>
      </main>
    </div>
  )
}

