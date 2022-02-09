FROM node:17

WORKDIR /app
COPY package* .
RUN npm install
COPY . . 
CMD npm start