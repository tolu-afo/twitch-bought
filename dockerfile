FROM node:18.16-alpine3.17

RUN mkdir -p /var/www/dockerized-projects/twitch-bot
WORKDIR /var/www/dockerized-projects/twitch-bot

COPY package*.json ./
RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 3000

CMD ["yarn", "run", "start"]