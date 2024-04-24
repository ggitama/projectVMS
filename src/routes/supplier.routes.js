const express = require('express');
const router = express.Router();

const s = require('../controllers/supplier.controllers');

router.get('/getSupplierAll', s.getSupplierAll);
router.post('/createSupplier', s.createSupplier);
router.post('/userSupplier', s.userSupplier);
router.get('/suppRegList', s.suppRegList);
router.post('/suppRegDetail1', s.suppRegDetail1);
router.post('/suppRegDetail2', s.suppRegDetail2);
router.post('/suppRegDetail3', s.suppRegDetail3);
router.post('/editUserSupplier', s.editUserSupplier);
router.get('/getUserSupplier', s.getUserSupplier);
router.post('/daftarSuppMaster', s.daftarSuppMaster);
router.post('/getP2pSupplier', s.getP2pSupplier);
router.post('/editAktifSupplier', s.editAktifSupplier);
router.post('/editAktifDigInvSupplier', s.editAktifDigInvSupplier);

module.exports = router;


