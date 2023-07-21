FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /home/node/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install --production --silent && mv node_modules ../

COPY . .

EXPOSE 3000

RUN chown -R node /home/node/app

USER node

CMD ["node", "server.js"]
