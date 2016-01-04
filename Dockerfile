FROM  mhart/alpine-node:4

ENV NEPTUNE_BACK_URL=http://neptune-back:3000

ADD . /neptune-front
WORKDIR neptune-front

RUN npm run build

EXPOSE 8080

ENTRYPOINT ["npm", "run", "start"]
