FROM node:18-alpine
WORKDIR /app
COPY ../../package*.json ../../turbo.json ./
RUN npm i -g pnpm && pnpm i
COPY . .
EXPOSE 3000
CMD ["pnpm","--filter","web","dev","-p","3000"]
