FROM node:lts-alpine

COPY . .
ENV PORT 8080
EXPOSE ${PORT}
RUN ls 

RUN rm rf client && \
 rm *.yaml *.md 

RUN rm Dockerfile && \
rm -rf node_modules && \
npm install --slient && \
npm install -g nodemon 

ENTRYPOINT ["npm","start"]