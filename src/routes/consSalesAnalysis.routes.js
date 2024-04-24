const express = require('express');
const router = express.Router();

const sa = require('../controllers/consSalesAnaysis.controllers');

router.get('/getConsSalesAnalysisList', sa.getConsSalesAnaysisList);

module.exports = router;
