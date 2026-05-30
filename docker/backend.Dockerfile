FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
COPY apps/backend/package.json apps/backend/package.json
COPY packages/shared-types/package.json packages/shared-types/package.json
RUN npm install
FROM deps AS build
COPY . .
WORKDIR /app/apps/backend
RUN npx prisma generate && npm run build
FROM node:22-alpine
WORKDIR /app
COPY --from=build /app /app
WORKDIR /app/apps/backend
EXPOSE 8007
