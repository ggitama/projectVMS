const express = require('express');
const router = express.Router();

const pfir = require('../controllers/proformaInvoiceResponse.controllers');

router.get('/getPfirAll', pfir.getPfirAll);
router.post('/viewbycdtinfo', pfir.viewbycdtinfo);
router.post('/viewbycdtdetail', pfir.viewbycdtdetail);
router.post('/actionPfir', pfir.actionPfir);
router.post('/actionAcceptReject', pfir.actionAcceptReject);
router.post('/actionSave', pfir.actionSave);
router.post('/updateUrl', pfir.updateUrl);

module.exports = router;


