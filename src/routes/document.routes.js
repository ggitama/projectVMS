const express = require('express');
const router = express.Router();

const doc = require('../controllers/document.controllers');
router.get('/getDocumentListNew', doc.getDocumentListNew);
router.get('/getDocumentList', doc.getDocumentList);
router.get('/getDocumentRetur', doc.getDocumentRetur);
router.get('/getDocumentCons', doc.getDocumentCons);

module.exports = router;


