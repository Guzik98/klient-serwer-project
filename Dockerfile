FROM node:latest
WORKDIR /app
COPY package*.json .
COPY server.js .
RUN npm install
EXPOSE 5000
ENTRYPOINT ["node", "server.js"]