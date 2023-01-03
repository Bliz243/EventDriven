FROM node:16.17.1 AS ui-build
WORKDIR /usr/client/src
COPY client ./client/
RUN cd client && yarn install && yarn build


FROM node:16.17.1 AS server-run
WORKDIR /root/
COPY --from=ui-build /usr/client/src/client/build ./client/build
COPY server/package* ./server/
RUN cd server && yarn install
COPY server/index.js ./server/

EXPOSE 3001

CMD ["node", "./server/index.js"]