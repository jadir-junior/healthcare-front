
FROM node:14.19.2-alpine AS builder

WORKDIR /dist/src/app

COPY . .

RUN npm ci

RUN npm run build

FROM nginx:latest AS ngi

COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /dist/src/app/dist/healthcare-front /usr/share/nginx/html

CMD /bin/bash -c "envsubst '\$PORT' < etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g "daemon off;"