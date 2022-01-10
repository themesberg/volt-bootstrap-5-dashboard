FROM node:12

LABEL NAME "volt-bootstrap5-dashboard"

WORKDIR /app

COPY . /app

EXPOSE 3000
EXPOSE 3001

RUN npm install gulp-cli -g

RUN npm install

CMD ["gulp", "build:dist"]
