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

## TODO

- [Y] Morgan logger using file system
  - Config and max files
  - Gzip - done
- [Y] Rate limiter
- [Y] Controllers
- [x] MySQL with all config
  - Models
  - Migration and seeders - Remaining
- [Y] Routes with version system
- [Y] Validation with Zod
  - Body, query, and params
  - Custom validation like unique and exists. Remaining
- [Y] App container
- [Y] ESLint integrated
- [x] Token with RSA encryption using private and public key
  - [JS Encrypt Demo](https://travistidwell.com/jsencrypt/demo/)
- [x] Nodemailer with configuration
- [x] Sentry for error handling in production
- [x] Socket setup with events
- [x] Caching
- [x] Cron jobs
