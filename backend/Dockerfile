FROM node:10-alpine as pkg

LABEL maintainer=samuelrbo@gmail.com

WORKDIR /usr/src/app

COPY package*.json ./

ARG NODE_ENV

ENV NODE_ENV=${NODE_ENV}

RUN yarn


FROM node:10-alpine as server

WORKDIR /app

COPY --from=pkg /usr/src/app/node_modules /app/node_modules

COPY . .

ARG NODE_ENV
ARG MONGO_URI
ARG JWT_SECRET

ENV NODE_ENV=${NODE_ENV}
ENV MONGO_URI=${MONGO_URI}
ENV JWT_SECRET=${JWT_SECRET}

EXPOSE 8001
