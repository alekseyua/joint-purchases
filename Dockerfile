FROM node:20-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN yarn install --frozen-lockfile

FROM node:20-alpine AS production-dependencies-env
COPY ./package.json yarn.lock server.js /app/ 
WORKDIR /app
RUN yarn install --frozen-lockfile

FROM node:20-alpine AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN yarn build

FROM node:20-alpine
COPY ./package.json yarn.lock server.js /app/ 
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["node", "server.js"]
# create ok test v15