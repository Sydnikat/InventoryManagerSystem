FROM node:14.7-alpine

WORKDIR /code

COPY Users/server/package*.json Users/server/tsconfig.json ./

RUN npm install

RUN npm install pm2 -g # pm2 is a process manager in production for Node.js applications. it helps to manage the processes of Node.js applications. it comes with a lot of advanced feature such as application cluster, load balancing, etc.

COPY Users/server/src ./src

RUN npm run build

CMD ["pm2-runtime","build/src/app.js"]