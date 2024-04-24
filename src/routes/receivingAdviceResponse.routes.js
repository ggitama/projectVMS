const express = require('express');
const router = express.Router();

const rar = require('../controllers/receivingAdviceResponse.controllers');

router.get('/getRarAll', rar.getRarAll);
router.post('/viewbycdtinfo', rar.viewbycdtinfo);
router.post('/viewbycdtdetail', rar.viewbycdtdetail);
router.post('/actionAcceptReject', rar.actionAcceptReject);
router.post('/actionRar', rar.actionRar);
router.post('/actionSave', rar.actionSave);
router.post('/updateUrl', rar.updateUrl);

module.exports = router;


