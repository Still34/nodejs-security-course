FROM node:alpine
RUN apk --no-cache add --virtual builds-deps build-base python
COPY app /usr/src/app
WORKDIR /usr/src/app
RUN rm /usr/src/app/node_modules -rf
RUN npm install
CMD node app.js