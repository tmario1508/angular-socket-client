FROM node AS builder

RUN mkdir -p /front/app-admin
WORKDIR /front/app-admin
COPY . /front/app-admin

RUN npm install
RUN $(npm bin)/ng build --prod --aot

FROM nginx
WORKDIR /usr/share/nginx/html/
COPY --from=builder /usr/front/app-admin/dist/app/ /usr/share/nginx/html
EXPOSE 80 443

CMD nginx -g 'daemon off;'