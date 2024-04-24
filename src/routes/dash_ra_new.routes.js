const express = require('express');
const router = express.Router();

const d = require('../controllers/dashboard.controllers');

//NEW
router.get('/getdashranew', d.dash_ra_new);
router.get('/getdashpfi', d.dash_pfi_new);

//AWAITING ACTION
router.get('/getdashra', d.dash_ra_aa);
router.get('/getdashrar', d.dash_rar_new);
router.get('/getdashpfiaa', d.dash_pfi_aa);
router.get('/getdashinv', d.dash_inv_draft);


router.get('/getdashrar2', d.dash_rar_aa2);
router.get('/getdashpfir', d.dash_pfir_draft);

module.exports = router;

