const express = require('express');
const router = express.Router();

const administration = require('../controllers/adm_internaluser.controller');

router.get('/getalluser', administration.getallintuser);
router.get('/getalldept', administration.getDepartment);
router.get('/getallstore', administration.getStore);
router.get('/getwarehouse', administration.getwarehouse);



module.exports = router;

// router.post('/getalluser', adm.getallintuser);
// module.exports = router;