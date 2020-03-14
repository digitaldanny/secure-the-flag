FROM node:lts-alpine

COPY . stf/
ENV PORT 8080
EXPOSE ${PORT}

RUN cd stf/ && \
rm Dockerfile && \
npm install --slient && \
npm install -g serve && \
npm run build && \
mv build ../ 

RUN rm -rf stf/


ENTRYPOINT ["serve","-l","8080","-s","build"]