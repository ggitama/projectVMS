const express = require('express');
const router = express.Router();

const s = require('../controllers/search.controllers');

router.get('/getStore', s.getStore);
router.get('/getSupplier', s.getSupplier);
router.get('/getDepartment', s.getDepartment);
router.get('/getBusiness', s.getBusiness);
router.get('/getBusiness2', s.getBusiness2);
router.get('/getRole', s.getRole);

module.exports = router;
