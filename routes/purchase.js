const express = require('express');
const router = express.Router();

const purchaseController = require('../controller/purchase');
const userAuthenticate = require('../middleware/auth')

router.get('/premium',userAuthenticate.authenticate, purchaseController.purchaseMembership);
router.post('/updatetransactionstatus', userAuthenticate.authenticate, purchaseController.transactionUpdate);
router.post('/transactionfailstatus',userAuthenticate.authenticate,purchaseController.failTransactionUpdate)

module.exports = router;