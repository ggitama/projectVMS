const express = require('express');
const router = express.Router();

const W = require('../controllers/worksheet.controller');

router.get('/getworksheetAll', W.getworksheetAll);
router.post('/viewbycdtinfo', W.viewbycdtinfo);
router.post('/viewbycdtDetail', W.viewbycdtDetail);
router.post('/createPPWorksheet', W.createPPWorksheet);
router.post('/getBarcode', W.getBarcodeItem);
router.post('/getStoreWorksheet', W.getStoreWorksheet);


module.exports = router;
