const express = require('express');
const router = express.Router();

const cn = require('../controllers/creditNote.controllers');

router.get('/getCreditNoteList', cn.getCreditNoteList);
router.post('/viewbycdtinfo', cn.viewbycdtinfo);
router.post('/viewbycdtdetail', cn.viewbycdtdetail);
router.post('/updateUrl', cn.updateUrl);

module.exports = router;


