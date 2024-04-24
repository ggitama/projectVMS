const express = require('express');
const router = express.Router();

const i = require('../controllers/invoice.controllers');
const uploadTaxInv = require('../middleware/uploadTaxInv.js');
const UTI = require('../controllers/uploadTaxInv');
const uploadFile = require('../middleware/uploadInv.js');
const UFI = require('../controllers/uploadInv');
const uploadSuratJalan = require('../middleware/uploadSuratJalan.js');
const USJ = require('../controllers/uploadSuratJalan');
const uploadKwitansi = require('../middleware/uploadKwitansi.js');
const UK = require('../controllers/uploadKwitansi');
const uploadEkspedisi = require('../middleware/uploadEkspedisi.js');
const UE = require('../controllers/uploadEkspedisi');


const uploadCTaxInv = require('../middleware/uploadConsTaxInv.js');
const UTIC = require('../controllers/uploadConsTaxInv');
const uploadCFile = require('../middleware/uploadConsInv.js');
const UFIC = require('../controllers/uploadConsInv');
const uploadCKwitansi = require('../middleware/uploadConsKwitansi.js');
const UKC = require('../controllers/uploadConsKwitansi');

router.get('/getInvoiceAll', i.getInvoiceAll);
router.post('/actionSaveDetailInv', i.actionSaveDetailInv);
router.post('/actionSaveInfoSupp', i.actionSaveInfoSupp);
router.post('/actionSaveDetailItem', i.actionSaveDetailItem);
router.post('/updateUrl', i.updateUrl);

router.post('/actionSend', i.actionSend);
router.post('/actionBack', i.actionBack);
router.post('/verifikasiDoc', i.verifikasiDoc);
router.post('/actionSaveDetailItem', i.actionSaveDetailItem);
router.post('/getDataUpload', i.getDataUpload);
router.get('/convertPdftoPng', i.convertPdftoPng);
router.post('/updateTaxExpired', i.updateTaxExpired);


router.post('/taxInvoiceFile', i.taxInvoiceFile);
router.post('/supportDocSuratJalan', i.supportDocSuratJalan);
router.post('/supportDocFileInvoice', i.supportDocFileInvoice);
router.post('/supportDocFileKwitansi', i.supportDocFileKwitansi);
router.post('/supportDocEkspedisi', i.supportDocEkspedisi);

router.post('/downloadtaxInvoice', i.taxInvoiceFile);
router.post('/downloadInvoice', i.supportDocFileInvoice);
router.post('/downloadKwitansi', i.supportDocFileKwitansi);
router.post('/downloadSuratJalan', i.supportDocSuratJalan);
router.post('/downloadEkspedisi', i.supportDocEkspedisi);

router.post('/uploadTaxInv', uploadTaxInv.single('namafile'), UTI.uploadFiles);
router.post('/uploadSuratJalan', uploadSuratJalan.single('namafile'), USJ.uploadFiles);
router.post('/uploadInv', uploadFile.single('namafile'), UFI.uploadFiles);
router.post('/uploadKwitansi', uploadKwitansi.single('namafile'), UK.uploadFiles);
router.post('/uploadEkspedisi', uploadEkspedisi.single('namafile'), UE.uploadFiles);


router.post('/deleteTaxInv', i.deleteTaxInv);
router.post('/deleteSuratJalan', i.deleteSuratJalan);
router.post('/deleteInv', i.deleteInv);
router.post('/deleteKwitansi', i.deleteKwitansi);
router.post('/deleteEkspedisi', i.deleteEkspedisi);

router.post('/uploadConsTaxInv', uploadCTaxInv.single('namafile'), UTIC.uploadFiles);
router.post('/uploadConsInv', uploadCFile.single('namafile'), UFIC.uploadFiles);
router.post('/uploadConsKwitansi', uploadCKwitansi.single('namafile'), UKC.uploadFiles);

module.exports = router;


