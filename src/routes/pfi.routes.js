const express = require('express');
const router = express.Router();

const pfi = require('../controllers/proformaInvoice.controllers');

router.get('/getPfiAll', pfi.getPfiAll);
router.post('/viewbycdtinfo', pfi.viewbycdtinfo);
router.post('/viewbycdtdetail', pfi.viewbycdtdetail);
router.post('/actionPfi', pfi.actionPfi);
router.post('/actionBack', pfi.actionBack);
router.post('/updateUrl', pfi.updateUrl);

module.exports = router;
