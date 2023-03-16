const express = require('express');
const router = express.Router();

const premiumController = require('../controller/premium');
const userAuthenticate = require('../middleware/auth')

router.get('/leadershipboard',userAuthenticate.authenticate,premiumController.getAllUsersWithExpenses );
router.get('/download', userAuthenticate.authenticate, premiumController.download );
router.get('/downloadlink', userAuthenticate.authenticate, premiumController.downloadFile)
module.exports = router;