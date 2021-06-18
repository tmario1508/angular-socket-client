FROM node AS builder

RUN mkdir -p /usr/src/appadmin
WORKDIR /usr/src/appadmin
COPY . /usr/src/appadmin
 
RUN npm install
RUN $(npm bin)/ng build --prod --aot
 
FROM nginx
COPY /etc/nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
WORKDIR /usr/share/nginx/html/
COPY src/etc/nginx/ng.conf /etc/nginx/conf.d/
COPY --from=builder /usr/src/appadmin/dist/app-admin/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80 443
 
CMD nginx -g 'daemon off;'
