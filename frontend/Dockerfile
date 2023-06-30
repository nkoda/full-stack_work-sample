#Official Node.js runtime image
FROM node:18

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

EXPOSE 4200

CMD ["npm", "start"]