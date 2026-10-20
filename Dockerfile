# ---------- Build Stage ----------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build NestJS
RUN npm run build


# ---------- Production Stage ----------
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Copy dependency files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy compiled application
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]