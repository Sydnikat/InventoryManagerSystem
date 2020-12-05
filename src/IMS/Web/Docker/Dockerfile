FROM node:14.7-alpine

WORKDIR /code
COPY Web/Client/package*.json Web/Client/tsconfig.json ./
RUN npm install

COPY Web/Client/public ./public
COPY Web/Client/src ./src
COPY Web/Client/tsconfig.json ./tsconfig.json


CMD [ "npm", "start" ]