# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json pnpm-lock.yaml* .npmrc* ./ 2>/dev/null || true
# This Dockerfile is used within the monorepo; deps are installed from root in CI.
# For standalone build, uncomment below:
# RUN corepack enable && corepack prepare pnpm@9 --activate
# RUN pnpm install
COPY . .
RUN npx --yes next telemetry disable && npx --yes next build

# ---- Run stage ----
FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY package*.json ./
RUN corepack enable && corepack prepare pnpm@9 --activate && pnpm install --prod --ignore-scripts
EXPOSE 3000
CMD ["npx", "next", "start"]