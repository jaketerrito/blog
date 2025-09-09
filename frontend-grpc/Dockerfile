FROM node:22 AS builder
WORKDIR /frontend
COPY package.json package-lock.json ./
RUN npm ci --production

FROM builder AS development
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

FROM builder as production
COPY . .
USER node
CMD ["npm", "start"]

