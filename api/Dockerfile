FROM node:16

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/

RUN npm install

COPY ./ /app/

RUN npx prisma generate
RUN npm run build

ENTRYPOINT [ "bash", "docker-entrypoint.sh" ]
