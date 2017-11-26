FROM npmwharf/kickerd:latest

# File Author / Maintainer
MAINTAINER Alex Robson

WORKDIR /app/src
COPY ./build/ /app/src/build/
COPY ./server/ /app/src/server/

COPY ./package.json /app/src/
COPY ./.kicker.toml /app/src/

RUN apk add --update git
RUN npm i

RUN npm uninstall node-gyp -g && apk del python make g++ && rm -rf /var/cache/apk/*

EXPOSE 8028
