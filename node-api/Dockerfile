FROM node:22-alpine AS builder

WORKDIR /var/www/app

COPY . .

RUN npm run build

# ---------

FROM node:22-alpine AS start

WORKDIR /var/www/app

COPY --from=builder ./var/www/app/dist ./dist

COPY --from=builder ./var/www/app/node_modules ./node_modules

EXPOSE 3000

ENTRYPOINT [ "node", "dist/server.js" ]