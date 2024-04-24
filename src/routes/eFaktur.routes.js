const express = require('express');
const router = express.Router();

const ef = require('../controllers/eFaktur.controllers');
const UE = require('../controllers/uploadEFaktur');
const uploadEF = require('../middleware/uploadEfaktur.js');

router.get('/getEFakturList', ef.getEFakturList);
router.post('/download', ef.getEFakturList);
router.post('/downloadPdf', ef.downloadFile);

router.post('/uploadEfaktur', uploadEF.single('namafile'), UE.uploadFiles);

module.exports = router;
