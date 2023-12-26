FROM node:latest

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

CMD ["bash", "-c", "npx prisma generate &&  npx prisma migrate dev --name init && npm rebuild bcrypt --build-from-source && npm run build && npm run start:prod"]

EXPOSE 3001
