const express = require('express');
const router = express.Router();

const expenseController = require('../controller/expense')
const userAuthenticate = require('../middleware/auth')

router.get('/expense',userAuthenticate.authenticate, expenseController.getUserExpense);
router.get('/expense/page/',userAuthenticate.authenticate, expenseController.getPageData);
router.post('/expense',userAuthenticate.authenticate, expenseController.postUserExpense);
router.delete('/delete/:id',userAuthenticate.authenticate, expenseController.deleteUserExpense);
router.get('/edit/:id', userAuthenticate.authenticate, expenseController.getEditExpense);
router.put('/edit/:id', userAuthenticate.authenticate, expenseController.postEditExpense);

module.exports = router;