FROM node:17

USER root

WORKDIR /app

COPY ./prisma ./prisma
COPY ./src ./src
COPY ./package.json .
COPY ./yarn.lock .
COPY ./tsconfig.json .

RUN yarn

EXPOSE 5000