# ---- Deps ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json ./
# (si tu as un pnpm-lock.yaml dans apps/web, décommente la ligne suivante)
# COPY pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@9 --activate
RUN pnpm install

# ---- Build ----
FROM deps AS build
WORKDIR /app
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# (si besoin de contourner ESLint sous Next 14, tu peux aussi faire:)
# RUN pnpm build -- --no-lint
RUN pnpm build

# ---- Runtime ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=deps  /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node","node_modules/next/dist/bin/next","start","-p","3000"]
