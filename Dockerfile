FROM nginx:alpine as node
WORKDIR /app
COPY . .
RUN npm install && ng build
COPY --from=node /app/dist/short-visions-front /usr/share/nginx/html