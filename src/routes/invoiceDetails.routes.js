const express = require('express');
const router = express.Router();

const invdetail = require('../controllers/invoiceDetail.controllers');

router.post('/invdetails', invdetail.invoicedetails);
router.post('/invdetailsitem', invdetail.invoicedetailsitem);

module.exports = router;


