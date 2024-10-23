# Базовый образ для сборки
FROM oven/bun:1 AS builder

WORKDIR /app

# Копирование файлов package.json и зависимостей
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Копирование исходного кода
COPY . .

# Генерация Prisma клиента
RUN bunx prisma generate

# Сборка приложения
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

# Продакшн образ
FROM oven/bun:1-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Копирование необходимых файлов из builder
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./

# Установка только production зависимостей
RUN bun install --production
RUN bunx prisma generate

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["bun", "server.js"]