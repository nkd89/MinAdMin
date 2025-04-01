FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV CHOKIDAR_USEPOLLING=true
ENV CHOKIDAR_INTERVAL=100

CMD ["npm", "run", "start:dev"]
