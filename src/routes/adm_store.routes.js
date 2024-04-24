const express = require('express');
const router = express.Router();

const adm = require('../controllers/admStore.controllers');

router.get('/getStoreList', adm.getStoreList);
router.post('/actionSave', adm.actionSave);
router.post('/postStoreList', adm.postStoreList);
router.post('/postStoreUpdate', adm.postStoreUpdate);

module.exports = router;


