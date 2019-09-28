FROM node:alpine
RUN mkdir /src
COPY app /src/app
WORKDIR /src/app
RUN npm install
EXPOSE 3000
CMD node app.js