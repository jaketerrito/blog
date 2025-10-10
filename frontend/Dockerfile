FROM node:24-alpine3.22 AS development
WORKDIR /frontend
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
CMD ["npm", "run", "dev"]

FROM development AS builder
RUN npm run build

FROM node:24-alpine3.22 AS production
WORKDIR /frontend
# Copy only the built output from the builder stage
COPY --from=builder /frontend/.output ./.output

CMD ["node", ".output/server/index.mjs"]

