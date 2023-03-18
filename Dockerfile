#stage 1
FROM node:latest as node
RUN rm -rf nodes_modules
RUN rm -rf package-lock.json
RUN npm install
RUN npm run build --prod

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/short-visions-front/ /usr/share/nginx/html

