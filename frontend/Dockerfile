FROM node:20 AS development

# Set working directory
WORKDIR /frontend

COPY package.json package-lock.json  ./
RUN npm ci

CMD ["sleep", "infinity"]