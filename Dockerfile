FROM node:9.11

RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm install

CMD node server.js

EXPOSE 50051

