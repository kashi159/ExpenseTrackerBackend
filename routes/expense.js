const express = require('express');
const router = express.Router();

const expenseController = require('../controller/expense')
const userAuthenticate = require('../middleware/auth')

// router.get('/user/expense',userAuthenticate.authenticate, expenseController.getUserExpense);
// router.get('/user/expense/page/',userAuthenticate.authenticate, expenseController.getPageData);
// router.post('/user/expense',userAuthenticate.authenticate, expenseController.postUserExpense);
// router.delete('/user/delete/:id',userAuthenticate.authenticate, expenseController.deleteUserExpense);
// router.get('/user/edit/:id', userAuthenticate.authenticate, expenseController.getEditExpense);
// router.put('/user/edit/:id', userAuthenticate.authenticate, expenseController.postEditExpense);

module.exports = router;