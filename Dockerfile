# ---------- Build Stage ----------
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# ---------- Production Stage ----------
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --omit=dev

# Install PM2 globally
RUN npm install pm2@latest -g

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["pm2-runtime", "dist/main.js"]