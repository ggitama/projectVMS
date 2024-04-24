
const express = require('express');
const router = express.Router();

const adm = require('../controllers/admWarehouse.controllers');

router.get('/getWarehouseList', adm.getWarehouseList);
router.post('/actionCreate', adm.actionCreate);
router.post('/getWarehouseById', adm.getWarehouseById);
router.post('/warehouseUpdate', adm.warehouseUpdate);
module.exports = router;


