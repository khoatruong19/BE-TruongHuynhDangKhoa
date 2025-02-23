FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache \
    libc6-compat \
    build-base

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["node", "dist/src/main.js"]