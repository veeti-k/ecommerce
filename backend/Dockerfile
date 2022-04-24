FROM node:17-alpine as base

WORKDIR /app

FROM base AS pruner

ARG SCOPE

RUN yarn global add turbo

COPY ./*.json yarn.lock ./
COPY ./apps ./apps
COPY ./packages ./packages

RUN turbo prune --scope=${SCOPE} --docker


FROM base as installer

COPY --from=pruner /app/out/json .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock

RUN yarn


FROM base as builder

ARG SCOPE

COPY --from=installer /app/ .
COPY --from=pruner /app/out/full .

RUN yarn 
RUN yarn turbo run build --scope=${SCOPE} --include-dependencies --no-deps