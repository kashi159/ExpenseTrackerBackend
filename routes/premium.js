const express = require('express');
const router = express.Router();

const premiumController = require('../controller/premium');
const userAuthenticate = require('../middleware/auth')

// router.get('/premium/leadershipboard',userAuthenticate.authenticate,premiumController.getAllUsersWithExpenses );
// router.get('/user/download', userAuthenticate.authenticate, premiumController.download );
// router.get('/user/downloadlink', userAuthenticate.authenticate, premiumController.downloadFile)
module.exports = router;