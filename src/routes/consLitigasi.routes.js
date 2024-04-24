const express = require('express');
const router = express.Router();

const apl = require('../controllers/consLitigasi.controllers');

router.get('/getConsLitigasiList', apl.getConsLitigasiList);
router.post('/viewbycdtinfo', apl.viewbycdtinfo);
router.post('/viewbycdtdetail', apl.viewbycdtdetail);
router.post('/actionClosed', apl.actionClosed);
router.post('/actionUpdateSLI', apl.actionUpdateSLI);
router.post('/updateUrl', apl.updateUrl);

module.exports = router;
