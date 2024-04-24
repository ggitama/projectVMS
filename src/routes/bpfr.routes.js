const express = require('express');
const router = express.Router();
const upload = require('../models/multer.config.js');

const bpfr = require('../controllers/bpfr.controllers');
const unggahBpfrList = require('../models/unggahBpfrList.models.js');
const uploadFile = require('../middleware/upload.js');
const UF = require('../controllers/upload');

router.get('/getBpfrList', bpfr.getBpfrList);
router.get('/getBpfrDownload', bpfr.getBpfrDownload);
router.get('/getUnggahBpfrList', bpfr.getUnggahBpfrList);
router.post('/uploadFile', uploadFile.single('namafile'), UF.uploadFiles);

module.exports = router;
