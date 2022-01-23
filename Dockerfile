FROM node:latest
WORKDIR /app
COPY package.json ./app
COPY server.js ./app
COPY . ./app
RUN npm install
EXPOSE 5000
ENTRYPOINT ["node", "server.js"]