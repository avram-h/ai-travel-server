FROM node:18-alpine

WORKDIR /app

COPY server/package*.json ./
RUN npm install --production

COPY server/ ./

ENV PORT=80
EXPOSE 80

CMD ["node", "index.js"]
