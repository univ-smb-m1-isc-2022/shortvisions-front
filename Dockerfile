FROM nginx:alpine
WORKDIR /app
COPY . .
RUN npm install && ng build
COPY /app/dist/short-visions-front /usr/share/nginx/html