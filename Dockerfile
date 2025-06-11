# Stage 0: Base image
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat

# Stage 1: Dependencies
FROM base AS deps
WORKDIR /app

# Accept build arguments from docker-compose
ARG AUTH_SECRET
ARG GITHUB_CLIENT_ID
ARG GITHUB_CLIENT_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG FACEBOOK_CLIENT_ID
ARG FACEBOOK_CLIENT_SECRET
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_API_ACCESS_TOKEN
ARG NEXT_YOUTUBE_BASE_VIDEO
ARG NEXT_PUBLIC_IMAGE_BASE_URL

# Install npm
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Stage 2: Builder
FROM base AS builder
WORKDIR /app

# Copy build arguments to environment variables
ARG AUTH_SECRET
ARG GITHUB_CLIENT_ID
ARG GITHUB_CLIENT_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG FACEBOOK_CLIENT_ID
ARG FACEBOOK_CLIENT_SECRET
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_API_ACCESS_TOKEN
ARG NEXT_YOUTUBE_BASE_VIDEO
ARG NEXT_PUBLIC_IMAGE_BASE_URL

ENV AUTH_SECRET=${AUTH_SECRET}
ENV GITHUB_CLIENT_ID=${GITHUB_CLIENT_ID}
ENV GITHUB_CLIENT_SECRET=${GITHUB_CLIENT_SECRET}
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
ENV FACEBOOK_CLIENT_ID=${FACEBOOK_CLIENT_ID}
ENV FACEBOOK_CLIENT_SECRET=${FACEBOOK_CLIENT_SECRET}
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NEXT_PUBLIC_API_ACCESS_TOKEN=${NEXT_PUBLIC_API_ACCESS_TOKEN}
ENV NEXT_YOUTUBE_BASE_VIDEO=${NEXT_YOUTUBE_BASE_VIDEO}
ENV NEXT_PUBLIC_IMAGE_BASE_URL=${NEXT_PUBLIC_IMAGE_BASE_URL}

# Copy dependencies and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Stage 3: Production runtime
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"] 