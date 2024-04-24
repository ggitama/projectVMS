const express = require('express');
const router = express.Router();

const ci = require('../controllers/consInvoice.controllers');

router.get('/getConsInvAll', ci.getConsInvAll);
router.post('/consInvInfo', ci.consInvInfo);
router.post('/consInvDetail', ci.consInvDetail);
router.post('/updateUrl', ci.updateUrl);

//GET DATA UPLOAD
router.post('/consTaxInvoiceFile', ci.taxInvoiceFile);
router.post('/consFileInvoice', ci.supportDocFileInvoice);
router.post('/consFileKwitansi', ci.supportDocFileKwitansi);

router.post('/downloadconsTax', ci.taxInvoiceFile);
router.post('/downloadconsInvoice', ci.supportDocFileInvoice);
router.post('/downloadconsKwitansi', ci.supportDocFileKwitansi);

//ACTION
router.post('/actionSend', ci.actionSend);
router.post('/actionSaveInfoSupp', ci.actionSaveInfoSupp);
router.post('/actionSaveDetailInv', ci.actionSaveDetailInv);
router.post('/actionSaveDetailItem', ci.actionSaveDetailItem);


//DELETE
router.post('/deleteConsTaxInv', ci.deleteTaxInv);
router.post('/deleteConsInv', ci.deleteInv);
router.post('/deleteConsKwitansi', ci.deleteKwitansi);

module.exports = router;


