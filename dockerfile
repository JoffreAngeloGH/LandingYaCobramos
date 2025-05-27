# Etapa 1: Build
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY astro.config.* tsconfig.* ./
COPY public ./public
COPY src ./src

RUN pnpm install --frozen-lockfile
RUN pnpm build

# Etapa 2: Runner
FROM node:20-alpine AS runner

# ⛳️ Usamos npm porque ya viene incluido
RUN npm install -g serve

RUN adduser -D astro
USER astro

WORKDIR /home/astro/app

COPY --from=builder /app/dist ./dist

EXPOSE 4321
CMD ["serve", "dist", "-l", "4321"]