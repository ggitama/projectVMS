const express = require('express');
const router = express.Router();

const adm = require('../controllers/admDepartment.controllers');

router.get('/getDepartmentList', adm.getDepartmentList);
module.exports = router;


