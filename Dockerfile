# 1. Установка зависимостей
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --no-cache

# 2. Сборка приложения
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# 3. Финальный образ
FROM node:20-alpine
WORKDIR /app

# Копируем только нужные файлы
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --no-cache --production

COPY --from=builder /app/build ./build
COPY --from=builder /app/server.js ./server.js

EXPOSE 3000
CMD ["node", "server.js"]
