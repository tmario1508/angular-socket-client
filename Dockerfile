FROM node AS builder

RUN mkdir -p /home/mario/usr/src/app
WORKDIR /home/mario/usr/src/app
COPY . /home/mario/usr/src/app

RUN npm install
RUN $(npm bin)/ng build --prod --aot

FROM nginx
WORKDIR /usr/share/nginx/html/
COPY --from=builder /usr/src/app/dist/app-admin/ /usr/share/nginx/html
EXPOSE 80 443

CMD nginx -g 'daemon off;'
