FROM node:12

LABEL MAINTAINER="Boris Mateev"

ENV JWT_SECRET="your mom goes to college"
ENV MONGODB_URL="mongodb://localhost:27888"
ENV NODE_ENV=development
ENV PORT=3000

COPY . /var/www
WORKDIR /var/www

RUN npm install
RUN npm install bcrypt

EXPOSE $PORT

ENTRYPOINT ["npm", "start"]
