FROM node:10-alpine

# build tools for native dependencies

# RUN apk add --update imagemagick && \
#     apk add --update graphicsmagick && \
#     apk add --update bash

WORKDIR /app/vr-english-backend

COPY . .

EXPOSE 8001

RUN cp .env.example .env

# RUN PROJECT_FOLDER=<project_folder_name> bash setup_upload.sh

RUN npm install

CMD ["npm","start"]