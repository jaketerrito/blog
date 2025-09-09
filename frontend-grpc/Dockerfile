FROM node:22 AS development
WORKDIR /frontend
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "run", "dev"]

FROM node:22-alpine AS production
WORKDIR /frontend
# Copy only the built output from the builder stage
COPY --from=builder /frontend/.output ./.output

CMD ["node", ".output/server/index.mjs"]

