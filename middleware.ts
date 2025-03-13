import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory store for rate limiting
const rateLimit = new Map()

// Rate limit configuration
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 5 // Maximum requests per window

export function middleware(request: NextRequest) {
  // Only apply rate limiting to the contact API
  if (request.nextUrl.pathname === '/api/contact') {
    const ip = request.ip ?? 'anonymous'
    const now = Date.now()
    const windowStart = now - RATE_LIMIT_WINDOW

    // Clean up old entries
    for (const [key, timestamp] of rateLimit.entries()) {
      if (timestamp < windowStart) {
        rateLimit.delete(key)
      }
    }

    // Count requests in current window
    const requestCount = [...rateLimit.entries()]
      .filter(([key, timestamp]) => key.startsWith(ip) && timestamp > windowStart)
      .length

    if (requestCount >= MAX_REQUESTS) {
      return new NextResponse(
        JSON.stringify({
          error: 'Too many requests, please try again later.',
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60',
          },
        }
      )
    }

    // Store this request
    rateLimit.set(`${ip}-${now}`, now)
  }

  return NextResponse.next()
} 