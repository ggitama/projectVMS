
const express = require('express');
const router = express.Router();

const adm = require('../controllers/admAnnouch.controllers');

router.get('/getDashoard', adm.getDashoard);
router.get('/getLogin', adm.getLogin);
router.post('/updateDashoard', adm.updateDashoard);
router.post('/updateLogin', adm.updateLogin);


module.exports = router;


