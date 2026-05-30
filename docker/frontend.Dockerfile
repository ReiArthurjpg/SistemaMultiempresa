FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
COPY apps/frontend/package.json apps/frontend/package.json
COPY packages/shared-types/package.json packages/shared-types/package.json
RUN npm install
FROM deps AS build
COPY . .
WORKDIR /app/apps/frontend
RUN npm run build
FROM node:22-alpine
WORKDIR /app
COPY --from=build /app /app
WORKDIR /app/apps/frontend
EXPOSE 3000
CMD ["npm","run","start"]
