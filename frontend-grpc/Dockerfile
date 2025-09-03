FROM node:22 AS development
WORKDIR /frontend
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
CMD ["npm", "run", "dev"]