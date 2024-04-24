const express = require('express');
const router = express.Router();

const rrn = require('../controllers/returRequestNotification.controllers');

router.get('/getReturnReqNotifList', rrn.getReturnReqNotifList);
router.post('/viewbycdtinfo', rrn.viewbycdtinfo);
module.exports = router;


