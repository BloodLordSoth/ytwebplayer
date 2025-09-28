FROM node:22-bullseye
WORKDIR /app
COPY package*.json /
RUN npm install --only=production
COPY frontend /
COPY . .
EXPOSE 4600
CMD ["node", "server.js"]