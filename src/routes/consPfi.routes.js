const express = require('express');
const router = express.Router();

const cp = require('../controllers/consPFI.controllers');

router.get('/getConsPfList', cp.getConsPfList);
router.post('/viewbycdtinfo', cp.viewbycdtinfo);
router.post('/viewbycdtdetail', cp.viewbycdtdetail);
router.post('/acceptConsPfi', cp.acceptConsPfi);
router.post('/updateUrl', cp.updateUrl);

module.exports = router;
