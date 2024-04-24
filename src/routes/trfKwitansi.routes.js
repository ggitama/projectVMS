const express = require('express');
const router = express.Router();

const tk = require('../controllers/trfKwitansi.controllers');

router.get('/getTrfKwitansiist', tk.getTrfKwitansiist);
router.get('/getTKDetailPdf', tk.getDetailPdf);

module.exports = router;
