const express = require('express');
const router = express.Router();

const rc = require('../controllers/returConfirmation.controllers');

router.get('/getReturnConfirmList', rc.getReturnConfirmList);
router.post('/viewbycdtinfo', rc.viewbycdtinfo);
router.post('/viewbycdtdetail', rc.viewbycdtdetail);
router.post('/updateUrl', rc.updateUrl);

module.exports = router;
