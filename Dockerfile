FROM node AS builder

RUN mkdir -p /src/app-admin
WORKDIR /src/app-admin
COPY . /src/app-admin

RUN npm install
RUN $(npm bin)/ng build --prod --aot

FROM nginx
WORKDIR /usr/share/nginx/html/
COPY --from=builder /usr/src/app/dist/app-admin/ /usr/share/nginx/html
EXPOSE 80 443

CMD nginx -g 'daemon off;'