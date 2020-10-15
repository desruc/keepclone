
FROM node:lts-alpine AS dependencies

ARG FIREBASE_CONFIG_B64
ARG FIREBASE_FIRESTORE_ID

ENV FIREBASE_CONFIG_B64=${FIREBASE_CONFIG_B64}
ENV FIREBASE_FIRESTORE_ID=${FIREBASE_FIRESTORE_ID}

WORKDIR /app
COPY package.json . 
RUN yarn install --silent
COPY . .
RUN yarn build

FROM node:lts-alpine
WORKDIR /app
RUN yarn add express
COPY --from=dependencies /app/build .
COPY server.js .

CMD ["node", "server.js"]
