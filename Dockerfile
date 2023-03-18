#stage 1
FROM node:latest as node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
WORKDIR /app/client
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/short-visions-front/ /usr/share/nginx/html

