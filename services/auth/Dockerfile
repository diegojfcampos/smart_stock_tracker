FROM node:21-alpine

WORKDIR /smart_stock_tracker/services/auth

COPY . .

RUN npm install 

EXPOSE 3001

CMD ["npm", "start"]

