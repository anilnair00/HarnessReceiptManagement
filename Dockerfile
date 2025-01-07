
FROM node:12.21.0-alpine3.10 as build

ARG stage
ENV build=build:${stage}
RUN echo $build

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm i

COPY . /app

RUN npm run $build

FROM nginx:1.19.8
COPY --from=build /app/dist/receipt-storage-search /usr/share/nginx/html