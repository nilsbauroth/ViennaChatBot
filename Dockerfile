#Dockerfile

FROM node:14-alpine
WORKDIR /app
COPY package*.json ./

RUN npm install
RUN npm build

COPY . .
EXPOSE 8080

CMD [ "npm", "run", "start:prod" ]


#-- build image -- 
# docker build -t viennachatbot .

# -- start container --
# docker run -dp 8080:8080 viennachatbot