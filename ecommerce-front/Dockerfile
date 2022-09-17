FROM node:alpine
WORKDIR /app
COPY package* ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]