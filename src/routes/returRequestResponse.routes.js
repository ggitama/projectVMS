const express = require('express');
const router = express.Router();

const rrr = require('../controllers/returRequestResponse.controllers');

router.get('/getReturnReqResponseList', rrr.getReturnReqResponseList);
router.post('/viewbycdtinfo', rrr.viewbycdtinfo);
router.post('/viewbycdtdetail', rrr.viewbycdtdetail);
router.post('/editRRR', rrr.editRRR);
router.post('/kirimRRR', rrr.kirimRRR);
router.post('/updateUrl', rrr.updateUrl);

module.exports = router;