FROM node:10.16.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# RUN apk add --no-cache --virtual .gyp python make g++ 

# RUN apk add vips-dev fftw-dev build-base --update-cache \
#     --repository https://alpine.global.ssl.fastly.net/alpine/edge/community/ \
#     --repository https://alpine.global.ssl.fastly.net/alpine/edge/main \
#     && npm install

# RUN apk --no-cache --virtual build-dependencies add \
#     python \
#     make \
#     g++ \
#     && npm install \
#     && apk del build-dependencies

# RUN npm install


# RUN npm install
# If you are building your code for production
# RUN npm ci --only=production


# Dis is the good one, todo add back in
RUN apk add vips-dev fftw-dev build-base --update-cache \
     --repository https://alpine.global.ssl.fastly.net/alpine/edge/community/ \
     --repository https://alpine.global.ssl.fastly.net/alpine/edge/main/ \
     && apk --no-cache --virtual build-dependencies add \
     python \
     make \
     g++ \
     && npm install

#RUN npm install

# Bundle app source
COPY . .

#RUN npm install

EXPOSE 8080
CMD [ "node", "index.js" ]