# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
WORKDIR /app

# Instalar dependencias del sistema necesarias para bcrypt
RUN apk add --no-cache python3 make g++

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias de producción
RUN npm ci --only=production

# Copiar el resto del código
COPY . .

# Exponer puerto
EXPOSE 4001

# Usar Node 20 con soporte de --env-file en scripts; por contenedor usamos variables env
ENV NODE_ENV=production

# Comando de inicio
CMD ["node", "index.js"]


