<!-- Server update to mySql -->

Register
username,email and password

Login 
Email, password - jwt autheticate

Income and expense
IncomeExpenseModel
title - string,char255
amount - string
type - Income, expense
date 
category - string, trim
description - description of our payment
userId - from user model
timestamps


router
  .post('/register', Register)
  .post('/login', Login)
  .post('/logout', Logout);

crud routes for updating incomeexpense model



User Model can have multiple income and expense model



1. ES6+ features with babel (including **es6 import/export** feature).
2. SQL database implementation with **[Sequelize v6](https://sequelize.org/docs/v6/)** for **postgres dialect** (you can change postgresql anytime).
3. Compatible with [12 factor app](https://12factor.net/).
4. Including authentication system with rest api endpoints.
5. Linting with eslint (airbnb config).
6. Implemented nodemailer. If you are in development or test mode, you use test smtp account. In production mode, you use real smtp server.
For more info, browse `src/helpers/mail.js` file.
7. Production ready Dockerfile.
8. Test cases written with mocha and chai.
9. Implemented [sentry](https://sentry.io) error tracking.
10. Api documentation with [swagger](https://swagger.io/).
11. Records are never deleted from the database. They are marked as deleted.
12. Cache management with [redis](https://redis.io/).
13. One click deploy to [Google Cloud Run](https://cloud.google.com/run).
