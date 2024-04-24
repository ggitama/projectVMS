const express = require('express');
const router = express.Router();

const nr = require('../controllers/notaRetur.controllers');

router.get('/getNrAll', nr.getNrAll);
router.get('/getNrDownload', nr.getNrDownload);
module.exports = router;


