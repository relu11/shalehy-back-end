# Shalehy Back-End
[![Build Status](https://travis-ci.com/relu11/shalehy-back-end.svg?token=KVusU9h63sgf5C8C21wL&branch=develop)](https://travis-ci.com/relu11/shalehy-back-end)

## Setting up development environment
### Install dependencies
Using npm
``` 
npm i 
```
Usin yarn
``` 
yarn 
```
### Environment variables
In the project's root directory, create file named `.env`. This file should hold the project's [environment variables](https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa#:~:text=An%20environment%20variable%20is%20a,at%20a%20point%20in%20time.)
Environment variables:
* DATABASE_URL="DATABASE CONNECTION STRING"
* PORT=port number for the development server
### Setup Database
This project uses PostgreSQL.
#### Setup the database locally
Refer to [Postgresql Documentation](https://www.postgresql.org/docs/9.3/tutorial-install.html) to install Postgresql on your machine.
After setting up the database create an empty database. The name of the database can be any name.
After creating the database, add this line to your `.env` file.
```
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<dbname>"
```
replace `<username>` with your username, `<password>` with your password and `<dbname>` with the name of the database you've created. Refere to [this link](https://superuser.com/questions/576623/default-password-for-postgresql) to find out the default credentials of postgresql. Also, if you want to change or add credentials, check out [this article](https://chartio.com/resources/tutorials/how-to-set-the-default-user-password-in-postgresql/)
#### Setup the database database online
Choose your convenient database service provider and find the connection string from your provider then add the following line to your `.env` file.
```
DATABASE_URL="CONNECTION STRING"
```

## NPM Scripts
### `startdev`
Start the production server.
### `start`
Start the production server.
### `prestart`
This script automatically runs when running `start` script.
### `test`
Run the project tests
### `runCreateQueries`
Creates the tables of the database with empty values.
### `runSeedQueries`
Creates the tables of the database with initials values for development.

## Run and test the project locally
### Run the development server
To run the project with npm, run this command in your terminal
```
npm run startdev
```
To run the project with yarn, run this command in your terminal
```
yarn startdev
```
### Test the project
To test the project using npm, run this command in your terminal
```
npm run test
```
To test the project using yarn, run this command in your terminal
```
yarn test
```
