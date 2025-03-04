FROM node:20-alpine3.19 AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:20-alpine3.19 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:20-alpine3.19 AS runner
WORKDIR /usr/src/inventory-management
COPY package.json yarn.lock ./
RUN yarn install --prod
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main"]
