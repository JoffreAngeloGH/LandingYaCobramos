FROM node:lts AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN corepack enable
COPY . .
RUN pnpm run build

FROM nginx:alpine AS runtime
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80