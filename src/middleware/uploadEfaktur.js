const multer = require("multer");
let fs = require("fs");
const { Op } = require('sequelize');

function getDatePath(date) {
  return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + "/";
}

function getDirPath(dirPath) {
  try {
      if (!fs.existsSync(dirPath)) fs.promises.mkdir(dirPath, { recursive: true });
      return dirPath;
  } catch (error) {
      console.log(error.message);
  }
}

const imageFilter = (req, file, cb) => {
  if (['pdf']){
    cb(null, true)
  } else {
    cb("Please upload only pdf.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, getDirPath('upload/Efaktur/' + getDatePath(new Date())+ req.query.supplier_code + '/'));
  },
  filename: (req, file, cb) => {
    console.log(req.query.taxnumber);
    cb(null, `EF_${req.query.taxnumber}.pdf`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;