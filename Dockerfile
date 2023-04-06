FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/short-visions-front /usr/share/nginx/html
