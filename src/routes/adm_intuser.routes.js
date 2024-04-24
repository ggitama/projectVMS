const express = require('express');
const router = express.Router();

const adm = require('../controllers/admInternalUser.controllers');

router.get('/getIntUserList', adm.getIntUserList);
router.post('/getIntById', adm.getIntById);
router.post('/createIntUser', adm.actionCreate)
router.post('/updateIntUser', adm.actionUpdate)

module.exports = router;


