FROM node:20

WORKDIR ./notification-service/index.js

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 3030

CMD ["npm", "run" ,"dev"]