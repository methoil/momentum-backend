FROM node:12

LABEL MAINTAINER="Boris Mateev"

ENV JWT_SECRET="your mom goes to college"
ENV MONGODB_URL="mongodb://mongo:27017"
ENV NODE_ENV=development
ENV PORT=3000

WORKDIR /var/www

COPY ./package.json /var/www
COPY ./src /var/www/src

RUN npm install
RUN npm install bcrypt

EXPOSE $PORT

ENTRYPOINT ["npm", "start"]
