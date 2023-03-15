const express = require('express');
const router = express.Router();

const loginController = require('../controller/user');
const userAuthenticate = require('../middleware/auth')

router.post('/user/login', loginController.postLoginUser);
router.get('/user/status', userAuthenticate.authenticate, loginController.getUserStatus)

module.exports = router;