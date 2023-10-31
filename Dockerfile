FROM node:lts-alpine AS dependencies
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm ci


FROM node:lts-alpine AS builder
WORKDIR /opt/app
COPY . .
COPY --from=dependencies /opt/app/node_modules ./node_modules
RUN npx prisma generate
RUN npm run build && npm prune --production


FROM node:lts-alpine AS runner
ENV NODE_ENV=production

# Set user and group IDs for the node user
ARG UID=1000
ARG GID=1000
RUN deluser node
RUN adduser -u $UID -g $GID node -D
USER node

WORKDIR /opt/app
COPY --from=builder /opt/app/node_modules ./node_modules
COPY --from=builder /opt/app/dist ./dist
COPY --from=builder /opt/app/prisma ./prisma
COPY --from=builder /opt/app/package.json ./
COPY --from=builder /opt/app/tsconfig.* ./

ENV HOST=0.0.0.0
EXPOSE 8080

# Application startup
CMD npm run start:prod