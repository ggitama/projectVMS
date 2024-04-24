const express = require('express');
const router = express.Router();

const prd = require('../controllers/prd.controllers');

router.get('/getPrdList', prd.getPrdList);
router.post('/viewbycdtinfo', prd.viewbycdtinfo);
router.post('/viewbycdtdetail', prd.viewbycdtdetail);

module.exports = router;


