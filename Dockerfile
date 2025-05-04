FROM nginx:stable-alpine

WORKDIR /app

COPY . .

RUN cp -r /app/dist/* /usr/share/nginx/html

EXPOSE 80

FROM node:20-alpine as builder
WORKDIR /app

COPY . .
RUN npm install -g pnpm && pnpm install && pnpm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
