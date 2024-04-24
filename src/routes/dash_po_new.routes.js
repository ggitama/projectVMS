const express = require('express');
const router = express.Router();

const POController = require('../controllers/dash_po_new.controllers');

router.get('/getdashponew', POController.dash_po_new);
router.get('/getdashpoaa', POController.dash_po_aa);

module.exports = router;

//purchase-order/detail/TRI1601227947084