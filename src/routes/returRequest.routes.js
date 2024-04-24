const express = require('express');
const router = express.Router();

const rr = require('../controllers/returRequest.controllers');

router.get('/getReturnReqList', rr.getReturnReqList);
router.post('/viewbycdtinfo', rr.viewbycdtinfo);
router.post('/viewbycdtdetail', rr.viewbycdtdetail);
router.post('/updateReturReq', rr.updateReturReq);
router.post('/actionSent', rr.actionSent);
router.post('/updateUrl', rr.updateUrl);

module.exports = router;