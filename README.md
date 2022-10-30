# EatNow-Server
NodeJS backend server for EatNow project.
This repo contains the backend for the EatNow project which is Food ordering Application.

## Built With:
 - NodeJS
 - TypeScript
 - MongoDB
 - ExpressJS
 
 ## Cloning the project
```
git clone  https://github.com/sheldonhenriques/EatNow-Server.git
```

## Building Dependencies local
```
npm i
```

## Setting .env file
```
MONGO_URI='mongodb://0.0.0.0:27017/test' // used to connect to local mongoDB server
TOKEN_KEY=token secret // used to sign token to authenticate user
COOKIE_SCERET=some secret // used to sign cookies
```

## Deploy local
```
npm run start:dev
```

## Local server
```
http://localhost:8080/
```


