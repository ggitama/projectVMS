const express = require('express');
const router = express.Router();

const nr = require('../controllers/consNotaRetur.controllers');

router.get('/getConsNotaReturList', nr.getConsNotaReturList);
router.get('/getConsNotaReturDownload', nr.getConsNotaReturDownload);
router.post('/updateUrl', nr.updateUrl);

module.exports = router;
