FROM node:lts-alpine

ARG REACT_APP_BASE_API_URL_G

ENV REACT_APP_BASE_API_URL ${REACT_APP_BASE_API_URL_G}

ENV PORT 8080
EXPOSE ${PORT}

COPY . stf/
RUN cd stf/ && \
rm Dockerfile && \
npm install --slient && \
npm install -g serve && \
npm run build && \
mv build ../ 

RUN rm -rf stf/


ENTRYPOINT ["serve","-l","8080","-s","build"]