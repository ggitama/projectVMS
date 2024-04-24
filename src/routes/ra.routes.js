const express = require('express');
const router = express.Router();

const ra = require('../controllers/receivingAdvice.controllers');

router.get('/getRaAll', ra.getRaAll);
router.post('/viewbycdtinfo', ra.viewbycdtinfo);
router.post('/viewbycdtdetail', ra.viewbycdtdetail);
router.post('/actionRa', ra.actionRa);
router.post('/updateUrl', ra.updateUrl);

module.exports = router;
