# passportjs-github

## About  
GitHub OAuth strategy implementation using Express and PassportJS

## Setup  
0. Clone repository
```
git clone https://github.com/bee-joo/passportjs-github
```
1. Install dependencies
```
npm install
```
2. Configure environment  
2.1. You can use [dotenv](https://www.npmjs.com/package/dotenv) to use Node environment variables  
2.2. Setup [MongoDB](https://www.mongodb.com/docs/manual/tutorial/getting-started/)  
2.3. There is basic usage of MongoDB server - `MONGO_ADDRESS` and `MONGO_PORT` env variables. Use these variables in your dotenv file or refactor [this](https://github.com/bee-joo/passportjs-github/blob/main/app.js#L14) line for your usage  
2.4. Create an OAuth GitHub app [(docs)](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)  
2.5. Use `CLIENT_ID` and `CLIENT_SECRET` env variables for client ID and secret. Use `CALLBACK_URL` variable for your callback URL  
3. Run app
```
npm start
```
