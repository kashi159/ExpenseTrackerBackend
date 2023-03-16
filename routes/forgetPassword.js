const express = require('express');
const router = express.Router();

const forgetPasswordController = require('../controller/forgetPassword');

router.post('/forgotpassword', forgetPasswordController.postForgetPassword);
router.get('/updatepassword/:id', forgetPasswordController.getUpdatePassword);


module.exports = router;