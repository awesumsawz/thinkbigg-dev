"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Code, Briefcase, WorkflowIcon as Wordpress, Server, Cloud, Mail } from "lucide-react"
import MobileNav from "./MobileNav"

const NavMenu = () => {
  const pathname = usePathname()
  
  return (
    <div className="space-y-4">
      <MobileNav />
      {/* Primary Navigation - Services */}
      <nav className="hidden md:flex justify-center gap-4 my-4 max-w-[800px] mx-auto">
        <Link
          href="/services/web"
          className={`flex-1 flex flex-col items-center p-2 rounded hover:bg-dracula-comment transition-colors pixelated-border ${
            pathname.startsWith('/services/web') ? 'bg-dracula-currentLine' : 'bg-transparent'
          }`}
        >
          <Code className="w-8 h-8 mb-1 text-dracula-green drop-shadow-icon" />
          <span className="text-xs font-pixel whitespace-nowrap">Web</span>
        </Link>
        <Link
          href="/services/cloud"
          className={`flex-1 flex flex-col items-center p-2 rounded hover:bg-dracula-comment transition-colors pixelated-border ${
            pathname.startsWith('/services/cloud') ? 'bg-dracula-currentLine' : 'bg-transparent'
          }`}
        >
          <Cloud className="w-8 h-8 mb-1 text-dracula-cyan drop-shadow-icon" />
          <span className="text-xs font-pixel whitespace-nowrap">Cloud</span>
        </Link>
        <Link
          href="/services/consulting"
          className={`flex-1 flex flex-col items-center p-2 rounded hover:bg-dracula-comment transition-colors pixelated-border ${
            pathname.startsWith('/services/consulting') ? 'bg-dracula-currentLine' : 'bg-transparent'
          }`}
        >
          <Briefcase className="w-8 h-8 mb-1 text-dracula-yellow drop-shadow-icon" />
          <span className="text-xs font-pixel whitespace-nowrap">Consulting</span>
        </Link>
        <Link
          href="/contact"
          className={`flex-1 flex flex-col items-center p-2 rounded hover:bg-dracula-comment transition-colors pixelated-border ${
            pathname === '/contact' ? 'bg-dracula-currentLine' : 'bg-transparent'
          }`}
        >
          <Mail className="w-8 h-8 mb-1 text-dracula-purple drop-shadow-icon" />
          <span className="text-xs font-pixel whitespace-nowrap">Contact</span>
        </Link>
      </nav>
    </div>
  )
}

export default NavMenu

