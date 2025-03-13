# Set the platform ARG at the top
ARG TARGETPLATFORM=linux/amd64

# Build stage
FROM --platform=$TARGETPLATFORM node:18-alpine AS builder
WORKDIR /app
COPY package*.json bun.lock ./
# Install bun for package management
RUN npm install -g bun
RUN bun install --frozen-lockfile
COPY . .
RUN npm run build

# Production stage
FROM --platform=$TARGETPLATFORM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set the correct permission for prerender cache
RUN chown -R nextjs:nodejs .next

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]