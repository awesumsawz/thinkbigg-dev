"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-dracula-background">
      <div className="flex justify-between items-center px-4 py-3 border-b border-dracula-currentLine">
        <Link href="/" className="text-dracula-purple font-pixel text-sm truncate mobile-nav-title">
          Think Bigg
        </Link>
        <button
          onClick={toggleMenu}
          className="p-2 text-dracula-foreground hover:text-dracula-purple transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-[100%] bg-dracula-background border-b border-dracula-currentLine px-4 py-4 shadow-lg z-50"
          >
            <nav className="flex flex-col space-y-4">
              <Link
                href="/services/web"
                className="flex items-center space-x-2 text-dracula-foreground hover:text-dracula-green transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span className="font-pixel">Web Development</span>
              </Link>
              <Link
                href="/services/cloud"
                className="flex items-center space-x-2 text-dracula-foreground hover:text-dracula-cyan transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span className="font-pixel">Cloud Engineering</span>
              </Link>
              <Link
                href="/services/consulting"
                className="flex items-center space-x-2 text-dracula-foreground hover:text-dracula-yellow transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span className="font-pixel">Business Consulting</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center space-x-2 text-dracula-foreground hover:text-dracula-purple transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span className="font-pixel">Contact</span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileNav 