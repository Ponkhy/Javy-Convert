FROM node:current-alpine3.15

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache ffmpeg

COPY . .

RUN npm install

RUN mkdir /watch && mkdir /convert && mkdir /to && mkdir /move

CMD [ "npm", "run", "start" ]
