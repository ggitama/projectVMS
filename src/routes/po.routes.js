const express = require('express');
const router = express.Router();

const POController = require('../controllers/ponew.controllers');
const auth = require('../middleware/authJwt');

router.get('/getPoAll', POController.getPoAll);
router.post('/viewbycdtinfo', POController.viewbycdtinfo);
router.get('/viewbycdtdetail', POController.viewbycdtdetail);
router.get('/revisionPo', POController.revisionPo);
router.post('/updateUrl', POController.updateUrl);
router.get('/poSupplier', auth.authJwt, POController.poSupplier);
router.get('/poItemSupplier', auth.authJwt, POController.poItemSupplier);


module.exports = router;
