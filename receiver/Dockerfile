FROM node:16

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY src src

RUN yarn install --prod

CMD yarn start
