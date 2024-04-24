const express = require("express");
const router = express.Router();

const cm = require("../controllers/uploadDataMaster.js");
const user = require("../middleware/uploadDataMasterUser.js");
const userItem = require("../middleware/uploadDataMasterUserItem.js");
const agreement = require("../middleware/uploadDataMasterAgreement.js");
const coverage = require("../middleware/uploadDataMasterCoverage.js");
const contract = require("../middleware/uploadDataMasterContract.js");
const AI = require("../middleware/uploadAgreementItem.js");

const pa = require("../controllers/approvalPa.controllers.js");
const cp = require("../controllers/calculatePa.controllers.js");
const na = require("../controllers/newAgreement.controllers.js");

router.post("/uploadDataMaster", user.single("namafile"), cm.uploadFilesUser);
router.post(
  "/uploadDataMasterUserItem",
  userItem.single("namafile"),
  cm.uploadFilesUserItem
);
router.post(
  "/uploadDataMasterAgreement",
  agreement.single("namafile"),
  cm.uploadFilesAgreement
);
router.post(
  "/uploadDataMasterCoverage",
  coverage.single("namafile"),
  cm.uploadFilesCoverage
);
router.post(
  "/uploadDataMasterContract",
  contract.single("namafile"),
  cm.uploadFilesContract
);
router.get("/getUserList", cm.getUserList);
router.get("/getUserItemList", cm.getUserItemList);
router.get("/getAgreementTypeList", cm.getAgreementTypeList);
router.get("/getCoverageList", cm.getCoverageList);
router.get("/getContractList", cm.getContractList);

router.get("/getCoverage", na.getCoverage);
router.post("/createNewAgreementSave", na.createNewAgreementSave);
router.post("/createSendToSupplier", na.createNewAgreementSendToSupp);
router.get("/getScc", na.getScc);
router.get("/getPP", na.getPP);
router.post("/actionNASupplier", na.actionNASupplier);
router.post("/actionNABuyer", na.actionNABuyer);
router.post(
  "/uploadFilesAgreementItem",
  AI.single("namafile"),
  na.uploadFilesAgreementItem
);
router.get("/getContractType", na.getContractType);


router.get("/getApprovalPaList", pa.getApprovalPaList);
router.get("/getAgreementType", pa.getAgreementType);
router.get("/getPromotionType", pa.getPromotionType);

router.get("/getCalculatePaList", cp.getCalculatePaList);


router.get("/getCai", na.getCai);
router.get("/getCoverageIsland", na.getCoverageIsland); // get island
router.get("/getCoverageCity", na.getCoverageCity); // get city
router.get("/getCoverageProvince", na.getCoverageProvince); // get province
router.get("/getCoverageSite", na.getCoverageSite); // get city
router.get("/getCatDept", na.getCatDept); // get category dept
router.get("/getNegotiator", na.getNegotiator); // get negotiator


module.exports = router;
