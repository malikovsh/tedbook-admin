FROM node:22-alpine AS build

WORKDIR /app
COPY . .
COPY .env.production .

RUN npm install -g pnpm@latest
RUN pnpm install

RUN pnpm run build
RUN find ./dist -type f | xargs gzip -k

FROM nginx:1-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
