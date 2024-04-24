const express = require('express');
const router = express.Router();

const adm = require('../controllers/admBusinessUnit.controllers');

router.get('/getBusinessUnitList', adm.getBusinessUnitList);
router.post('/actionCreateBU', adm.actionCreateBU);
router.post('/getBusinessUnitById', adm.getBusinessUnitById);
router.post('/businessUnitUpdate', adm.businessUnitUpdate);
module.exports = router;


