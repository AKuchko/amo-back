FROM node

WORKDIR /app

COPY package.json package-lock.json .

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["node", "src/main.js"]