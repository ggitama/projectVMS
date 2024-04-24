const express = require('express');
const router = express.Router();

const adm = require('../controllers/admArcdoc.controllers');

router.get('/getArcdocList', adm.getArcdocList);
module.exports = router;


