FROM node:20-alpine
 
WORKDIR /app
 
COPY package*.json ./
COPY prisma.config.ts ./
COPY prisma ./prisma

# Dummy value so `prisma generate` (runs via postinstall) passes config
# validation at build time. Overridden at runtime with the real one.
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"

RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node src/index.js"]