FROM node:lts-alpine

COPY . server/
ENV PORT 8080
EXPOSE ${PORT}

WORKDIR server
RUN rm Dockerfile && \
npm install --slient && \
npm install -g nodemon 

ENTRYPOINT ["npm","start"]