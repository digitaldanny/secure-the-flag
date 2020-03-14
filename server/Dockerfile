FROM node:lts-alpine

COPY server/ .
ENV PORT 8080
EXPOSE ${PORT}

RUN rm Dockerfile && \
rm -rf node_modules && \
npm install --slient && \
npm install -g nodemon 

ENTRYPOINT ["npm","start"]