const express = require('express');
const router = express.Router();

const supplierController = require('../controllers/supplierDetail.controllers');

router.get('/listDataSupplier', supplierController.listDataSupplier);
router.get('/ldr', supplierController.listDataRegisterd);

module.exports = router;


