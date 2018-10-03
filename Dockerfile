FROM node:carbon-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm i

# Bundle app source
COPY . .

RUN npm run build

RUN rm -rf node_modules/

RUN npm i --only=production

RUN npm i pm2 -g

EXPOSE 80
CMD ["pm2-runtime", "dist/main.js"]
