const multer = require("multer");
let fs = require("fs");
const { dirname } = require("path");


const imageFilter = (req, file, cb) => {
  if (['xlsx']){
    cb(null, true);
  } else {
    cb("Please upload only xlsx.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dirname(''));
  },
  filename: (req, file, cb) => {
    cb(null, `test1.xlsx`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;