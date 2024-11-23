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
