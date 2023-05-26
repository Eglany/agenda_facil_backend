FROM node:16-alpine as backend_build

WORKDIR /app/backend

COPY package.json .
COPY package-lock.json .

RUN [ "npm", "install"]

COPY . .

CMD [ "npm", "start" ]