const express = require('express');
const router = express.Router();

const resetLinkController = require('../controller/resetLink');

router.get('/password/resetpassword/:id', resetLinkController.getResetLink);

module.exports = router;