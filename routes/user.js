const express = require('express');
const router = express.Router();

const userController = require('../controller/user');
const loginController = require('../controller/user');
const userAuthenticate = require('../middleware/auth')

router.post('/signup', userController.postSignUpUser);
router.post('/login', loginController.postLoginUser);
router.get('/status', userAuthenticate.authenticate, loginController.getUserStatus)

module.exports = router;