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

<!-- Features -->

Morgan logger using file system. Config and max files, gip
Rate limiter
Controllers
Mysql with all config
models, migration and seeders
routes with version system
validation with zod, body query and params
custom validation like unique and exists
app container
eslint integrated

Token with RSA encrypt with private and public key
https://travistidwell.com/jsencrypt/demo/

Nodemailer with configuration
Sentry for error handling in production
Socket with setup with events
caching
cron jobs
