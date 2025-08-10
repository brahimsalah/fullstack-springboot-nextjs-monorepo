# fullstack-springboot-nextjs-monorepo

Monorepo **Spring Boot (API)** + **Next.js/React (web)**. Dev rapide en local, Docker prêt, CI GitHub Actions.

## Prérequis
- Node.js 20+ et pnpm 9+
- JDK 21
- Gradle installé (ou ajoutez le wrapper via `gradle wrapper`)

## Démarrer en local
```bash
pnpm install
pnpm dev
# web: http://localhost:3000
# api: http://localhost:8080/api/health
```

> Le front consomme `NEXT_PUBLIC_API_URL` (par défaut `http://localhost:8080`).

## Docker
```bash
docker compose up --build
# web: http://localhost:3000
# api: http://localhost:8080/api/health (exposé)
```
Dans Docker, le front parle à l'API via `http://api:8080` (configuré dans `docker-compose.yml`).

## Scripts utiles
- `pnpm dev` : lance API (Gradle) + web (Next) en parallèle
- `pnpm --dir apps/web build` : build du front
- `cd apps/api && gradle bootJar` : build du back
- `pnpm format|lint|typecheck` : outillage front

## CORS
Côté Spring Boot, un bean CORS autorise `http://localhost:3000` (dev). Ajustez les origines pour la prod.

## CI
GitHub Actions compile et teste les deux parties (voir `.github/workflows/ci.yml`).

## Personnalisation rapide
- Ajoutez Spring Data JPA + Flyway si vous branchez une base
- Ajoutez un proxy Next.js si vous préférez éviter les variables d'env

## Endpoints
- Health: `GET /api/health`
- Todos:
  - `GET /api/todos`
  - `POST /api/todos` (JSON: `{ "title": "..." }`)
  - `DELETE /api/todos/{id}`

## OpenAPI / Swagger
- Swagger UI: `http://localhost:8080/swagger-ui/index.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

To generate a TypeScript client (local tooling required):
```bash
npm i -g @openapitools/openapi-generator-cli
openapi-generator-cli generate -i http://localhost:8080/v3/api-docs -g typescript-fetch -o apps/web/src/api
```


## Backend avec Maven (au lieu de Gradle)
- Dev : `mvn -f apps/api/pom.xml spring-boot:run`
- Build : `mvn -f apps/api/pom.xml -DskipTests package`
- Dockerfile backend : basé sur l'image `maven:3.9-eclipse-temurin-21` (multi-stage)
