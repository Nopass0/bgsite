#!/bin/bash
SSL_DIR="./ssl"
DOMAIN="bgalin.ru"

# Создаем директорию для сертификатов если её нет
mkdir -p "$SSL_DIR"

# Проверяем наличие сертификатов
if [ ! -f "$SSL_DIR/certificate.pem" ] || [ ! -f "$SSL_DIR/certificate.pem" ]; then
    echo "SSL certificates not found. Generating self-signed certificates..."
    
    # Генерируем приватный ключ
    openssl genrsa -out "$SSL_DIR/privkey.pem" 2048
    
    # Генерируем CSR (Certificate Signing Request)
    openssl req -new -key "$SSL_DIR/privkey.pem" -out "$SSL_DIR/csr.pem" -subj "/CN=$DOMAIN/O=BGalin/C=RU"
    
    # Генерируем самоподписной сертификат
    openssl x509 -req -days 365 -in "$SSL_DIR/csr.pem" -signkey "$SSL_DIR/certificate.pem" -out "$SSL_DIR/certificate.pem"
    
    # Удаляем временный CSR файл
    rm "$SSL_DIR/csr.pem"
    
    echo "Self-signed certificates generated successfully"
else
    echo "SSL certificates already exist"
fi

# Устанавливаем правильные разрешения
chmod 600 "$SSL_DIR/certificate.pem"
chmod 644 "$SSL_DIR/certificate.pem"