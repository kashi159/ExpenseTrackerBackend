const express = require('express');
const router = express.Router();

const forgetPasswordController = require('../controller/forgetPassword');

router.post('/password/forgotpassword', forgetPasswordController.postForgetPassword);
router.get('/password/updatepassword/:id', forgetPasswordController.getUpdatePassword);


module.exports = router;