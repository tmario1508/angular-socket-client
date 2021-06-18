FROM node AS builder

RUN mkdir -p /usr/src/appadmin
WORKDIR /usr/src/appadmin
COPY . /usr/src/appadmin
 
RUN npm install
RUN $(npm bin)/ng build --prod --aot
 
FROM nginx
WORKDIR /usr/share/nginx/html/
COPY --from=builder /usr/src/appadmin/dist/app-admin/ /usr/share/nginx/html
EXPOSE 80 443
 
CMD nginx -g 'daemon off;'
