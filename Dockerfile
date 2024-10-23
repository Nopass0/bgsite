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

# Образ для Nginx
FROM nginx:alpine AS runner

# Копирование собранного приложения в директорию Nginx
COPY --from=builder /app/.next/standalone /usr/share/nginx/html
COPY --from=builder /app/.next/static /usr/share/nginx/html/.next/static
COPY --from=builder /app/public /usr/share/nginx/html/public

# Копирование конфигурации Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Копирование SSL-сертификатов
COPY ssl/certificate.crt /etc/ssl/certs/certificate.crt
COPY ssl/certificate.key /etc/ssl/private/certificate.key

# Открытие порта 443 для HTTPS
EXPOSE 443

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]