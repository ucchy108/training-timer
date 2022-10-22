FROM node:lts-buster-slim

WORKDIR /app

RUN apt-get update -y \ 
 && apt-get upgrade -y \
 && apt-get install -y git