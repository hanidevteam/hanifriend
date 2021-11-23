FROM node:16

WORKDIR /usr/src/app

COPY *.js ./
COPY package.json ./
COPY yarn.lock ./
COPY app ./app
COPY middlewares ./middlewares
COPY utils ./utils

RUN yarn install --prod

CMD yarn start
