# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern, full-stack web application built with Next.js 15, React 19, and TypeScript. It serves as a business website for Think Bigg Development, featuring web development, cloud engineering, and business consulting services. The application uses a custom Dracula-themed design with pixel art aesthetics and animations.

## Development Commands

### Essential Commands
```bash
# Start development server
bun dev

# Build for production
bun run build

# Start production server
bun start

# Run linter
bun run lint

# Clean build artifacts and dependencies
bun run clean

# Clean and reinstall dependencies
bun run reinstall
```

### Single-file Development
When working on individual components or pages, use hot reload in dev mode. The dev server runs on `http://localhost:3000`.

## Architecture Overview

### Routing & Pages
- **App Router Structure**: Uses Next.js 15 App Router (`/app` directory)
- **Services Pages**: Dynamic routing with both static service pages (`/services/web`, `/services/cloud`, `/services/consulting`) and dynamic route (`/services/[id]`)
- **Contact Form**: Integrated at `/contact` with email functionality via Nodemailer

### Component Organization
- **`/app/components`**: Page-level components specific to the app (PixelatedBackground, FloatingPixels, AnimatedContent, NavMenu, MobileNav, etc.)
- **`/components/ui`**: Reusable Radix UI-based components (buttons, dialogs, forms, etc.) - these are shadcn/ui components
- **`/components/theme-provider.tsx`**: Theme management (though currently uses Dracula theme exclusively)

### Styling Architecture
- **Dracula Theme**: Custom color palette defined in `tailwind.config.js` and `app/globals.css`
- **Custom CSS Variables**: HSL-based color system in `:root` for flexibility
- **Pixel Art Typography**: Uses "Press Start 2P" font (loaded via Next.js Google Fonts)
- **Responsive Design**: Mobile-first approach with specific mobile header behavior
  - Homepage: Full-screen immersive experience
  - Non-homepage mobile: Compact header (73px) with title hidden, only mobile nav visible
- **Animation**: Framer Motion for page transitions and component animations

### API Routes
- **`/api/contact`**: Handles contact form submissions with rate limiting (5 requests/minute via middleware)
- **`/api/test-email`**: Development-only endpoint for testing email configuration (requires API key header)

### Email System
- **Location**: `lib/email.ts`
- **Provider**: Nodemailer with SMTP
- **Configuration**: Requires environment variables (EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE, EMAIL_USER, EMAIL_PASS, DEFAULT_FROM)
- **Rate Limiting**: Implemented in `middleware.ts` for contact endpoint

### State Management
- Currently uses React component state and props
- No global state management library in use
- Form handling via `react-hook-form` with Zod validation

### Type Safety
- **TypeScript Configuration**: `tsconfig.json` with strict mode enabled
- **Path Aliases**: `@/*` maps to root directory
- **Build Errors**: Currently ignored in production builds (see `next.config.mjs`)

## Code Style Guidelines (from .cursor/rules/next-js1.mdc)

### Key Principles
- Use functional and declarative programming patterns; avoid classes
- Minimize `'use client'`, `useEffect`, and `setState`; favor React Server Components (RSC)
- Use descriptive variable names with auxiliary verbs (e.g., `isLoading`, `hasError`)
- Implement early returns and guard clauses for error handling
- Use lowercase with dashes for directory names (e.g., `components/auth-wizard`)

### Optimization
- Implement dynamic imports for code splitting
- Use responsive design with mobile-first approach
- Optimize images: WebP format, size data, lazy loading
- Minimize use of client-side state management

### UI Patterns
- Radix UI primitives for accessibility
- Tailwind CSS for styling with custom Dracula theme
- Consistent design patterns across platform

## Environment Setup

Required environment variables (see README.md for details):
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-app-specific-password
DEFAULT_FROM="Your App Name <noreply@yourapp.com>"
TEST_EMAIL_API_KEY=your-secure-api-key  # For development test endpoint
```

## Deployment

### Digital Ocean App Platform
The application is deployed on Digital Ocean App Platform with automatic builds, deployments, and native bun support.

**Build Command**: Leave empty for auto-detection, or `bun install && bun run build`
**Run Command**: `bun run start`
**Port**: `3000`

**How it works**:
- Digital Ocean auto-detects bun from `bun.lockb` file
- Uses buildpacks to install and run with native bun runtime
- Automatic deployments on git push to main branch

See README.md for complete deployment instructions and configuration.

## Known Issues & TODOs

- Blog functionality currently blocked by redirect issues (mentioned in README.md)
- TypeScript and ESLint errors ignored during builds (consider addressing for production)
- No environment variable template file (`.env.local.example` referenced in README but doesn't exist)

## Important File Locations

- **Email service**: `lib/email.ts`
- **Middleware (rate limiting)**: `middleware.ts`
- **Root layout**: `app/layout.tsx`
- **Global styles**: `app/globals.css`
- **Tailwind config**: `tailwind.config.js`
- **TypeScript config**: `tsconfig.json`
- **Docker config**: `Dockerfile`
